import { createHash } from "node:crypto";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

type RateLimiter = {
  limit: (identifier: string) => Promise<RateLimitResult>;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

type MemoryEntry = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, MemoryEntry>();
let warnedAboutFallback = false;

function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "development-rate-limit-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function createMemoryLimiter(): RateLimiter {
  return {
    async limit(identifier: string) {
      const now = Date.now();
      const entry = memoryStore.get(identifier);

      if (!entry || now >= entry.resetAt) {
        memoryStore.set(identifier, {
          count: 1,
          resetAt: now + RATE_LIMIT_WINDOW_MS,
        });

        return {
          success: true,
          limit: RATE_LIMIT_MAX,
          remaining: RATE_LIMIT_MAX - 1,
          reset: now + RATE_LIMIT_WINDOW_MS,
        };
      }

      if (entry.count >= RATE_LIMIT_MAX) {
        return {
          success: false,
          limit: RATE_LIMIT_MAX,
          remaining: 0,
          reset: entry.resetAt,
        };
      }

      entry.count += 1;
      memoryStore.set(identifier, entry);

      return {
        success: true,
        limit: RATE_LIMIT_MAX,
        remaining: RATE_LIMIT_MAX - entry.count,
        reset: entry.resetAt,
      };
    },
  };
}

function createUpstashLimiter(): RateLimiter | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const redis = new Redis({ url, token });
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, "15 m"),
    prefix: "contact-form",
    analytics: false,
  });

  return {
    async limit(identifier: string) {
      const result = await ratelimit.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    },
  };
}

let cachedLimiter: RateLimiter | null = null;

function getRateLimiter(): RateLimiter {
  if (cachedLimiter) {
    return cachedLimiter;
  }

  const upstashLimiter = createUpstashLimiter();
  if (upstashLimiter) {
    cachedLimiter = upstashLimiter;
    return cachedLimiter;
  }

  if (process.env.NODE_ENV === "production" && !warnedAboutFallback) {
    warnedAboutFallback = true;
    console.warn(
      "Production rate limiting is using a non-persistent fallback.",
    );
  }

  cachedLimiter = createMemoryLimiter();
  return cachedLimiter;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export async function checkContactRateLimit(
  request: Request,
): Promise<RateLimitResult> {
  const ip = getClientIp(request);
  const hashedIp = hashIp(ip);
  const limiter = getRateLimiter();
  return limiter.limit(hashedIp);
}
