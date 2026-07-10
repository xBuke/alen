import { randomUUID } from "node:crypto";

import {
  contactFormSchema,
  inquiryTypeLabels,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { checkContactRateLimit } from "@/lib/rate-limit";
import {
  getContactFromEmail,
  getContactToEmail,
  getResendClient,
  isResendConfigured,
} from "@/lib/resend";
import {
  createNoStoreJsonResponse,
  getSiteOrigin,
  isAllowedOrigin,
  isJsonContentType,
  MAX_REQUEST_BODY_BYTES,
} from "@/lib/request-security";
import { sanitizeContactPayload } from "@/lib/sanitize";
import {
  buildContactEmailText,
  ContactEmail,
} from "@/emails/contact-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FORM_DURATION_MS = 2000;

type ContactRequestBody = ContactFormValues & {
  formStartedAt?: number;
};

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
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>,
) {
  return createNoStoreJsonResponse(
    {
      success: false,
      message,
      ...(fieldErrors ? { fieldErrors } : {}),
    },
    { status },
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
      );
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_REQUEST_BODY_BYTES) {
      return errorResponse("Zahtjev je prevelik.", 413);
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return errorResponse("Neispravan JSON.", 400);
    }

    const body = parsedBody as ContactRequestBody;
    const formStartedAt =
      typeof body.formStartedAt === "number" ? body.formStartedAt : null;

    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(
        "Provjerite unesene podatke.",
        400,
        mapFieldErrors(validation.error.issues),
      );
    }

    if (validation.data.companyWebsite?.trim()) {
      return successResponse(
        "Hvala na upitu. Vaša poruka je uspješno poslana.",
      );
    }

    if (
      formStartedAt &&
      Date.now() - formStartedAt < MIN_FORM_DURATION_MS
    ) {
      return successResponse(
        "Hvala na upitu. Vaša poruka je uspješno poslana.",
      );
    }

    const sanitized = sanitizeContactPayload(validation.data);
    const inquiryLabel = inquiryTypeLabels[sanitized.inquiryType];

    if (!isResendConfigured()) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[contact:${requestId}] Resend configuration is missing.`,
        );
      }

      return errorResponse(
        "Poruku trenutačno nije moguće poslati.",
        503,
      );
    }

    const resend = getResendClient();
    const fromEmail = getContactFromEmail();
    const toEmail = getContactToEmail();

    if (!resend || !fromEmail) {
      return errorResponse(
        "Poruku trenutačno nije moguće poslati.",
        503,
      );
    }

    const submittedAt = new Date();
    const pageUrl = `${getSiteOrigin() ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://orguljarstvo-kvaternik.hr"}/kontakt`;

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
      return errorResponse(
        "Poruku trenutačno nije moguće poslati.",
        503,
      );
    }

    return successResponse(
      "Hvala na upitu. Vaša poruka je uspješno poslana.",
    );
  } catch {
    console.error(`[contact:${requestId}] Unexpected contact API error.`);
    return errorResponse(
      "Poruku trenutačno nije moguće poslati.",
      500,
    );
  }
}
