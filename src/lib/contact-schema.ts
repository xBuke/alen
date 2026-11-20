import { z } from "zod";

import type { Locale } from "@/i18n/config";

export const inquiryTypeValues = [
  "izrada-novih-orgulja",
  "servis",
  "restauracija",
  "digitalna-elektromagnetska-traktura",
  "intonacija",
  "polovne-orgulje",
  "drugo",
] as const;

export type InquiryType = (typeof inquiryTypeValues)[number];

export const inquiryTypeLabels: Record<InquiryType, string> = {
  "izrada-novih-orgulja": "Izrada novih orgulja",
  servis: "Servis",
  restauracija: "Restauracija",
  "digitalna-elektromagnetska-traktura": "Digitalna elektromagnetska traktura",
  intonacija: "Intonacija",
  "polovne-orgulje": "Polovne orgulje",
  drugo: "Drugo",
};

export const inquiryTypeLabelsEn: Record<InquiryType, string> = {
  "izrada-novih-orgulja": "Building new organs",
  servis: "Service",
  restauracija: "Restoration",
  "digitalna-elektromagnetska-traktura": "Digital electromagnetic action",
  intonacija: "Voicing",
  "polovne-orgulje": "Used organs",
  drugo: "Other",
};

export function getInquiryTypeLabels(
  locale: Locale,
): Record<InquiryType, string> {
  return locale === "en" ? inquiryTypeLabelsEn : inquiryTypeLabels;
}

export function resolveInquiryTypeFromQuery(
  value: string | null | undefined,
): InquiryType | null {
  if (!value) return null;
  return (inquiryTypeValues as readonly string[]).includes(value)
    ? (value as InquiryType)
    : null;
}

const phonePattern = /^[\d\s+()-]*$/;

const messages = {
  hr: {
    nameRequired: "Unesite ime i prezime.",
    nameMin: "Ime i prezime mora imati najmanje 2 znaka.",
    nameMax: "Ime i prezime može imati najviše 100 znakova.",
    emailRequired: "Unesite e-poštu.",
    emailInvalid: "Unesite valjanu adresu e-pošte, npr. ime@primjer.hr.",
    emailMax: "E-pošta može imati najviše 254 znaka.",
    phoneMax: "Telefon može imati najviše 30 znakova.",
    phonePattern:
      "Telefon može sadržavati samo brojke, razmake, plus, crtice i zagrade.",
    inquiryType: "Odaberite vrstu upita.",
    locationMax: "Lokacija može imati najviše 150 znakova.",
    messageRequired: "Unesite poruku.",
    messageMin: "Poruka mora imati najmanje 20 znakova.",
    messageMax: "Poruka može imati najviše 4000 znakova.",
    privacy: "Potrebno je potvrditi upoznavanje s Pravilima privatnosti.",
  },
  en: {
    nameRequired: "Enter your full name.",
    nameMin: "Your name must be at least 2 characters long.",
    nameMax: "Your name can be at most 100 characters long.",
    emailRequired: "Enter your e-mail.",
    emailInvalid: "Enter a valid e-mail address, e.g. name@example.com.",
    emailMax: "The e-mail can be at most 254 characters long.",
    phoneMax: "The phone number can be at most 30 characters long.",
    phonePattern:
      "The phone number can only contain digits, spaces, plus signs, hyphens and parentheses.",
    inquiryType: "Select the type of inquiry.",
    locationMax: "The location can be at most 150 characters long.",
    messageRequired: "Enter a message.",
    messageMin: "The message must be at least 20 characters long.",
    messageMax: "The message can be at most 4000 characters long.",
    privacy: "Please confirm that you have read the Privacy policy.",
  },
} as const;

export function createContactFormSchema(locale: Locale = "hr") {
  const m = messages[locale];

  return z.object({
    fullName: z
      .string()
      .min(1, m.nameRequired)
      .min(2, m.nameMin)
      .max(100, m.nameMax),
    email: z
      .string()
      .min(1, m.emailRequired)
      .email(m.emailInvalid)
      .max(254, m.emailMax),
    phone: z
      .string()
      .max(30, m.phoneMax)
      .regex(phonePattern, m.phonePattern)
      .optional()
      .or(z.literal("")),
    inquiryType: z.enum(inquiryTypeValues, {
      error: m.inquiryType,
    }),
    instrumentLocation: z
      .string()
      .max(150, m.locationMax)
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .min(1, m.messageRequired)
      .min(20, m.messageMin)
      .max(4000, m.messageMax),
    privacyAcknowledged: z.boolean().refine((value) => value === true, {
      message: m.privacy,
    }),
    companyWebsite: z.string().optional(),
  });
}

export const contactFormSchema = createContactFormSchema("hr");

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  inquiryType: "izrada-novih-orgulja",
  instrumentLocation: "",
  message: "",
  privacyAcknowledged: false,
  companyWebsite: "",
};
