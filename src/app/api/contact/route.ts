import { randomUUID } from "node:crypto";

import {
  contactFormSchema,
  inquiryTypeLabels,
  type ContactFormValues,
} from "@/lib/contact-schema";
import {
  buildRateLimitHeaders,
  checkContactRateLimit,
} from "@/lib/rate-limit";
import {
  getContactFromEmail,
  getContactToEmail,
  getResendClient,
  isResendConfigured,
} from "@/lib/resend";
import {
  createNoStoreJsonResponse,
  isAllowedOrigin,
  isJsonContentType,
  MAX_REQUEST_BODY_BYTES,
} from "@/lib/request-security";
import { getAbsoluteUrl } from "@/lib/site-url";
import { normalizeContactInput } from "@/lib/sanitize";
import {
  buildContactEmailText,
  ContactEmail,
} from "@/emails/contact-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVICE_UNAVAILABLE_MESSAGE =
  "Poruku trenutačno nije moguće poslati. Molimo pokušajte ponovno ili nam se javite izravno putem telefona ili e-pošte.";

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("hr-HR", {
    timeZone: "Europe/Zagreb",
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function mapFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Partial<Record<keyof ContactFormValues, string[]>> {
  const fieldErrors: Partial<Record<keyof ContactFormValues, string[]>> = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field !== "string") {
      continue;
    }

    const key = field as keyof ContactFormValues;
    if (!fieldErrors[key]) {
      fieldErrors[key] = [];
    }
    fieldErrors[key]?.push(issue.message);
  }

  return fieldErrors;
}

function successResponse(message: string, status = 200) {
  return createNoStoreJsonResponse(
    {
      success: true,
      message,
    },
    { status },
  );
}

function errorResponse(
  message: string,
  status: number,
  options?: {
    fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
    headers?: Record<string, string>;
  },
) {
  return createNoStoreJsonResponse(
    {
      success: false,
      message,
      ...(options?.fieldErrors ? { fieldErrors: options.fieldErrors } : {}),
    },
    {
      status,
      headers: options?.headers,
    },
  );
}

export async function POST(request: Request) {
  const requestId = randomUUID();

  try {
    if (request.method !== "POST") {
      return errorResponse("Metoda nije dopuštena.", 405);
    }

    const contentType = request.headers.get("content-type");
    if (!isJsonContentType(contentType)) {
      return errorResponse("Neispravan format zahtjeva.", 400);
    }

    const contentLengthHeader = request.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = Number.parseInt(contentLengthHeader, 10);
      if (
        Number.isFinite(contentLength) &&
        contentLength > MAX_REQUEST_BODY_BYTES
      ) {
        return errorResponse("Zahtjev je prevelik.", 413);
      }
    }

    const origin = request.headers.get("origin");
    if (!isAllowedOrigin(origin)) {
      return errorResponse("Zahtjev nije dopušten.", 403);
    }

    const rateLimit = await checkContactRateLimit(request);
    if (!rateLimit.success) {
      return errorResponse(
        "Poslano je previše zahtjeva u kratkom razdoblju. Molimo pokušajte ponovno nešto kasnije.",
        429,
        { headers: buildRateLimitHeaders(rateLimit) },
      );
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BODY_BYTES) {
      return errorResponse("Zahtjev je prevelik.", 413);
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return errorResponse("Neispravan JSON.", 400);
    }

    const extracted = normalizeContactInput(parsedBody);
    if (!extracted) {
      return errorResponse("Neispravan JSON.", 400);
    }

    if (extracted.companyWebsite.trim()) {
      return successResponse(
        "Hvala na upitu. Vaša poruka je uspješno poslana.",
      );
    }

    const candidate = {
      ...extracted.normalized,
      inquiryType: extracted.inquiryType,
      privacyAcknowledged: extracted.privacyAcknowledged,
      companyWebsite: "",
    };

    const validation = contactFormSchema.safeParse(candidate);
    if (!validation.success) {
      return errorResponse(
        "Provjerite unesene podatke.",
        400,
        { fieldErrors: mapFieldErrors(validation.error.issues) },
      );
    }

    const sanitized = validation.data;
    const inquiryLabel = inquiryTypeLabels[sanitized.inquiryType];

    if (!isResendConfigured()) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[contact:${requestId}] Resend configuration is missing.`,
        );
      }

      return errorResponse(SERVICE_UNAVAILABLE_MESSAGE, 503);
    }

    const resend = getResendClient();
    const fromEmail = getContactFromEmail();
    const toEmail = getContactToEmail();

    if (!resend || !fromEmail) {
      return errorResponse(SERVICE_UNAVAILABLE_MESSAGE, 503);
    }

    const submittedAt = new Date();
    const pageUrl = getAbsoluteUrl("/kontakt");

    const emailProps = {
      fullName: sanitized.fullName,
      email: sanitized.email,
      phone: sanitized.phone || undefined,
      inquiryType: sanitized.inquiryType,
      instrumentLocation: sanitized.instrumentLocation || undefined,
      message: sanitized.message,
      submittedAt: formatSubmittedAt(submittedAt),
      pageUrl,
      requestId,
    };

    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: sanitized.email,
      subject: `Novi upit — Orguljarstvo Kvaternik — ${inquiryLabel}`,
      react: ContactEmail(emailProps),
      text: buildContactEmailText(emailProps),
    });

    if (sendResult.error) {
      console.error(
        `[contact:${requestId}] Resend error code: ${sendResult.error.name}`,
      );
      return errorResponse(SERVICE_UNAVAILABLE_MESSAGE, 503);
    }

    return successResponse(
      "Hvala na upitu. Vaša poruka je uspješno poslana.",
    );
  } catch {
    console.error(`[contact:${requestId}] Unexpected contact API error.`);
    return errorResponse(SERVICE_UNAVAILABLE_MESSAGE, 500);
  }
}
