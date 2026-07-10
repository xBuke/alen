import { Resend } from "resend";

import { siteConfig } from "@/data/site";

let resendClient: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function getContactToEmail(): string {
  return process.env.CONTACT_TO_EMAIL ?? siteConfig.contactRecipient;
}

export function getContactFromEmail(): string | null {
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  return fromEmail ? fromEmail : null;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && getContactFromEmail());
}
