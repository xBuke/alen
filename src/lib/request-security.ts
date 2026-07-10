import { getSiteOrigin } from "@/lib/site-url";

const LOCAL_DEV_ORIGIN = "http://localhost:3000";

export const MAX_REQUEST_BODY_BYTES = 20 * 1024;

export function getAllowedOrigins(): string[] {
  const origins = new Set<string>([getSiteOrigin()]);

  if (process.env.NODE_ENV === "development") {
    origins.add(LOCAL_DEV_ORIGIN);
  }

  return [...origins];
}

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) {
    return process.env.NODE_ENV !== "production";
  }

  return getAllowedOrigins().includes(origin);
}

export function isJsonContentType(contentType: string | null): boolean {
  if (!contentType) {
    return false;
  }

  const normalized = contentType.split(";")[0]?.trim().toLowerCase();
  return normalized === "application/json";
}

export function createNoStoreJsonResponse(
  body: unknown,
  init?: ResponseInit & { headers?: Record<string, string> },
): Response {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Cache-Control", "no-store");

  return new Response(JSON.stringify(body), {
    ...init,
    headers,
  });
}
