import { z } from "zod";

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

export function resolveInquiryTypeFromQuery(
  value: string | null | undefined,
): InquiryType | null {
  if (!value) return null;
  return (inquiryTypeValues as readonly string[]).includes(value)
    ? (value as InquiryType)
    : null;
}

const phonePattern = /^[\d\s+()-]*$/;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Unesite ime i prezime.")
    .min(2, "Ime i prezime mora imati najmanje 2 znaka.")
    .max(100, "Ime i prezime može imati najviše 100 znakova."),
  email: z
    .string()
    .min(1, "Unesite e-poštu.")
    .email("Unesite valjanu email adresu.")
    .max(254, "E-pošta može imati najviše 254 znaka."),
  phone: z
    .string()
    .max(30, "Telefon može imati najviše 30 znakova.")
    .regex(
      phonePattern,
      "Telefon može sadržavati samo brojke, razmake, plus, crtice i zagrade.",
    )
    .optional()
    .or(z.literal("")),
  inquiryType: z.enum(inquiryTypeValues, {
    error: "Odaberite vrstu upita.",
  }),
  instrumentLocation: z
    .string()
    .max(150, "Lokacija može imati najviše 150 znakova.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(1, "Unesite poruku.")
    .min(20, "Poruka mora imati najmanje 20 znakova.")
    .max(4000, "Poruka može imati najviše 4000 znakova."),
  privacyAcknowledged: z
    .boolean()
    .refine((value) => value === true, {
      message: "Potrebno je potvrditi upoznavanje s Pravilima privatnosti.",
    }),
  companyWebsite: z.string().optional(),
});

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
