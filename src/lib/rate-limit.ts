import { createHmac, randomBytes } from "node:crypto";

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
const MEMORY_CLEANUP_THRESHOLD = 100;
const MEMORY_CLEANUP_INTERVAL = 50;

type MemoryEntry = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, MemoryEntry>();

let memoryOperationCount = 0;
let warnedAboutFallback = false;
let warnedAboutMissingSalt = false;
let warnedAboutUpstashUnavailable = false;
let ephemeralSalt: string | null = null;

/**
 * A persistent RATE_LIMIT_SALT is required for consistent rate limiting
 * across multiple server instances. Without it, each instance uses its own
 * ephemeral salt and limits are not shared between processes.
 */
function getRateLimitSalt(): string {
  const envSalt = process.env.RATE_LIMIT_SALT;
  if (envSalt) {
    return envSalt;
  }

  if (process.env.NODE_ENV === "development") {
    return "development-rate-limit-salt";
  }

  if (!ephemeralSalt) {
    if (!warnedAboutMissingSalt) {
      warnedAboutMissingSalt = true;
      console.warn(
        "RATE_LIMIT_SALT is missing; using an ephemeral process salt.",
      );
    }
    ephemeralSalt = randomBytes(32).toString("hex");
  }

  return ephemeralSalt;
}

function hashIp(ip: string): string {
  const salt = getRateLimitSalt();
  return createHmac("sha256", salt).update(ip).digest("hex");
}

function maybeCleanupMemoryStore(now: number): void {
  memoryOperationCount += 1;

  if (
    memoryOperationCount % MEMORY_CLEANUP_INTERVAL !== 0 &&
    memoryStore.size < MEMORY_CLEANUP_THRESHOLD
  ) {
    return;
  }

  for (const [key, entry] of memoryStore) {
    if (now >= entry.resetAt) {
      memoryStore.delete(key);
    }
  }
}

function createMemoryLimiter(): RateLimiter {
  return {
    async limit(identifier: string) {
      const now = Date.now();
      maybeCleanupMemoryStore(now);

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

const memoryLimiter = createMemoryLimiter();

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

let cachedUpstashLimiter: RateLimiter | null | undefined;

function getUpstashLimiter(): RateLimiter | null {
  if (cachedUpstashLimiter !== undefined) {
    return cachedUpstashLimiter;
  }

  cachedUpstashLimiter = createUpstashLimiter();
  return cachedUpstashLimiter;
}

async function limitWithFallback(identifier: string): Promise<RateLimitResult> {
  const upstashLimiter = getUpstashLimiter();

  if (upstashLimiter) {
    try {
      return await upstashLimiter.limit(identifier);
    } catch {
      if (!warnedAboutUpstashUnavailable) {
        warnedAboutUpstashUnavailable = true;
        console.warn(
          "Persistent rate limiter unavailable; using temporary fallback.",
        );
      }

      return memoryLimiter.limit(identifier);
    }
  }

  if (process.env.NODE_ENV === "production" && !warnedAboutFallback) {
    warnedAboutFallback = true;
    console.warn(
      "Production rate limiting is using a non-persistent fallback.",
    );
  }

  return memoryLimiter.limit(identifier);
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
  return limitWithFallback(hashedIp);
}

export function buildRateLimitHeaders(
  result: RateLimitResult,
): Record<string, string> {
  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((result.reset - Date.now()) / 1000),
  );

  return {
    "Retry-After": String(retryAfterSeconds),
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
  };
}
