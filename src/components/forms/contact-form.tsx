"use client";

/*
 * Obrazac za upit (isti princip kao na vinagovorko.hr): poruka se automatski
 * složi iz polja i otvori u posjetiteljevoj e-pošti (mailto:) ili na WhatsAppu
 * (wa.me) prema Orguljarstvu Kvaternik. Nema servera, ključeva ni spremanja
 * podataka; posjetitelj poruku pregleda i sam pošalje.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { FormFieldError } from "@/components/forms/form-field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";
import {
  contactFormDefaultValues,
  contactMessageMax,
  createContactFormSchema,
  getInquiryTypeLabels,
  inquiryTypeValues,
  resolveInquiryTypeFromQuery,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";
import { getUi, type UiStrings } from "@/i18n/ui";
import { cn } from "@/lib/utils";

type Channel = "email" | "whatsapp";

type SentState = {
  via: Channel;
  href: string;
};

// Rub polja: border-input (3.8:1 prema pozadini, WCAG 1.4.11).
const fieldClassName =
  "rounded-sm border-border-input bg-background focus-visible:border-gold/50 focus-visible:ring-gold";

const fieldOrder: (keyof ContactFormValues)[] = [
  "fullName",
  "email",
  "phone",
  "inquiryType",
  "instrumentLocation",
  "message",
];

function buildDescribedBy(...ids: Array<string | false | undefined>): string | undefined {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-gold">
      {" "}*
    </span>
  );
}

/** Tekst poruke, složen na jeziku stranice na kojoj je posjetitelj. */
function buildMessage(
  values: ContactFormValues,
  t: UiStrings["form"],
  inquiryLabel: string,
): string {
  const lines = [t.msgHello, t.msgIntro, "", `${t.inquiryType}: ${inquiryLabel}`];
  const location = values.instrumentLocation?.trim();
  if (location) lines.push(`${t.instrumentLocation}: ${location}`);
  const message = values.message.trim();
  if (message) lines.push("", message);
  lines.push("", t.msgBye, values.fullName.trim());
  const email = values.email.trim();
  const phone = values.phone.trim();
  if (email) lines.push(email);
  if (phone) lines.push(phone);
  return lines.join("\n");
}

export function ContactForm() {
  const locale = useLocale();
  const t = getUi(locale).form;
  const labels = getInquiryTypeLabels(locale);
  const schema = useMemo(() => createContactFormSchema(locale), [locale]);
  const searchParams = useSearchParams();
  const [sent, setSent] = useState<SentState | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const initialInquiryType = useMemo(() => {
    return (
      resolveInquiryTypeFromQuery(searchParams.get("vrsta")) ??
      contactFormDefaultValues.inquiryType
    );
  }, [searchParams]);

  const {
    register,
    control,
    getValues,
    reset,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...contactFormDefaultValues,
      inquiryType: initialInquiryType,
    },
    mode: "onBlur",
  });

  const watched = useWatch({ control }) as ContactFormValues;
  const messageLength = (watched.message ?? "").length;
  const showMessageLengthWarning = messageLength > contactMessageMax - 200;

  const preview = buildMessage(
    { ...contactFormDefaultValues, ...watched },
    t,
    labels[watched.inquiryType ?? contactFormDefaultValues.inquiryType],
  );

  useEffect(() => {
    const fromQuery = resolveInquiryTypeFromQuery(searchParams.get("vrsta"));
    if (fromQuery) {
      setValue("inquiryType", fromQuery, { shouldValidate: true });
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    if (sent && successRef.current) {
      successRef.current.focus();
    }
  }, [sent]);

  /*
   * Provjera je sinkrona (safeParse), a ne preko handleSubmit, kako bi se
   * WhatsApp otvorio unutar istog klika. Inače ga Safari na iOS-u blokira
   * kao skočni prozor.
   */
  function send(via: Channel) {
    const values = getValues();
    const result = schema.safeParse(values);

    clearErrors();
    if (!result.success) {
      let firstField: keyof ContactFormValues | undefined;
      const seen = new Set<keyof ContactFormValues>();
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (!field || seen.has(field)) continue;
        seen.add(field);
        setError(field, { type: "validate", message: issue.message });
        if (
          !firstField ||
          fieldOrder.indexOf(field) < fieldOrder.indexOf(firstField)
        ) {
          firstField = field;
        }
      }
      if (firstField) {
        formRef.current
          ?.querySelector<HTMLElement>(`#${firstField}`)
          ?.focus();
      }
      return;
    }

    const data = result.data;
    const inquiryLabel = labels[data.inquiryType];
    const body = buildMessage(data, t, inquiryLabel);

    if (via === "email") {
      const subject = `${t.msgSubject} — ${inquiryLabel} — ${data.fullName}`;
      const href = `mailto:${siteConfig.contactRecipient}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
      setSent({ via, href });
    } else {
      const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(body)}`;
      window.open(href, "_blank", "noopener");
      setSent({ via, href });
    }
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send("email");
  };

  if (sent) {
    const isEmail = sent.via === "email";
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="space-y-4 rounded-sm border border-gold/30 bg-gold/10 px-5 py-6 font-body text-sm text-text-light outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <p className="font-heading text-xl text-text-light">{t.okTitle}</p>
        <p>{isEmail ? t.okEmail : t.okWhatsapp}</p>
        <p className="text-text-muted">
          <a
            href={sent.href}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            className="text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
          >
            {t.okRetry}
            {isEmail ? null : (
              <span className="sr-only"> {t.sendWhatsappNote}</span>
            )}
          </a>{" "}
          {t.okFallback}{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
          >
            {siteConfig.email}
          </a>{" "}
          ·{" "}
          <a
            href={siteConfig.phoneHref}
            className="text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
          >
            {siteConfig.phoneDisplay}
          </a>
        </p>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="min-h-11"
          onClick={() => {
            reset({ ...contactFormDefaultValues, inquiryType: initialInquiryType });
            setSent(null);
          }}
        >
          {t.okNew}
        </Button>
      </div>
    );
  }

  const contactError = errors.email?.message;

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      noValidate
      className="space-y-6"
    >
      <p className="font-body text-sm text-text-muted">{t.requiredNote}</p>

      <div>
        <Label htmlFor="fullName">
          {t.fullName}
          <RequiredMark />
        </Label>
        <Input
          id="fullName"
          aria-required="true"
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={buildDescribedBy(
            errors.fullName && "fullName-error",
          )}
          className={cn(fieldClassName, "mt-2")}
          {...register("fullName")}
        />
        <FormFieldError
          id="fullName-error"
          message={errors.fullName?.message}
        />
      </div>

      <fieldset className="space-y-4">
        <legend className="font-body text-sm text-text-muted" id="contact-hint">
          {t.contactHint}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={buildDescribedBy(
                "contact-hint",
                contactError && "email-error",
              )}
              className={cn(fieldClassName, "mt-2")}
              {...register("email")}
            />
          </div>
          <div>
            <Label htmlFor="phone">{t.phone}</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={buildDescribedBy(
                "contact-hint",
                errors.phone && "phone-error",
              )}
              className={cn(fieldClassName, "mt-2")}
              {...register("phone")}
            />
          </div>
        </div>
        <FormFieldError id="email-error" message={contactError} />
        <FormFieldError id="phone-error" message={errors.phone?.message} />
      </fieldset>

      <div>
        <Label htmlFor="inquiryType">
          {t.inquiryType}
          <RequiredMark />
        </Label>
        <Controller
          name="inquiryType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="inquiryType"
                aria-required="true"
                aria-invalid={Boolean(errors.inquiryType)}
                aria-describedby={buildDescribedBy(
                  errors.inquiryType && "inquiryType-error",
                )}
                className={cn(fieldClassName, "mt-2")}
              >
                <SelectValue placeholder={t.inquiryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypeValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {labels[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FormFieldError
          id="inquiryType-error"
          message={errors.inquiryType?.message}
        />
      </div>

      <div>
        <Label htmlFor="instrumentLocation">
          {t.instrumentLocation}{" "}
          <span className="font-normal text-text-muted">{t.optional}</span>
        </Label>
        <Input
          id="instrumentLocation"
          aria-invalid={Boolean(errors.instrumentLocation)}
          aria-describedby={buildDescribedBy(
            "instrumentLocation-help",
            errors.instrumentLocation && "instrumentLocation-error",
          )}
          className={cn(fieldClassName, "mt-2")}
          {...register("instrumentLocation")}
        />
        <p
          id="instrumentLocation-help"
          className="mt-2 font-body text-sm text-text-muted"
        >
          {t.instrumentLocationHelp}
        </p>
        <FormFieldError
          id="instrumentLocation-error"
          message={errors.instrumentLocation?.message}
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <Label htmlFor="message">
            {t.message}
            <RequiredMark />
          </Label>
          <span
            id="message-count"
            className="font-body text-xs text-text-muted"
          >
            {messageLength}/{contactMessageMax}
          </span>
        </div>
        <Textarea
          id="message"
          aria-required="true"
          rows={6}
          maxLength={contactMessageMax}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={buildDescribedBy(
            "message-help",
            "message-count",
            showMessageLengthWarning && "message-length-warning",
            errors.message && "message-error",
          )}
          className={cn(fieldClassName, "mt-2 min-h-[160px]")}
          {...register("message")}
        />
        <p id="message-help" className="mt-2 font-body text-sm text-text-muted">
          {t.messageHelp}
        </p>
        {showMessageLengthWarning ? (
          <p
            id="message-length-warning"
            className="mt-2 font-body text-xs text-gold/80"
          >
            {t.messageNearLimit}
          </p>
        ) : null}
        <FormFieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="space-y-4 border-t border-border-dark pt-6">
        <p className="font-body text-sm leading-relaxed text-text-muted">
          {t.howItWorks} {t.privacyBefore}{" "}
          <Link
            href={localizePath("/pravila-privatnosti", locale)}
            className="text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
          >
            {t.privacyLink}
          </Link>
          {t.privacyAfter}
        </p>

        <div role="group" aria-labelledby="send-via" className="space-y-3">
          <p id="send-via" className="font-body text-sm text-text-light">
            {t.sendVia}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" size="lg" className="min-h-11">
              <Mail aria-hidden="true" />
              {t.sendEmail}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="min-h-11"
              onClick={() => send("whatsapp")}
            >
              <MessageCircle aria-hidden="true" />
              {t.sendWhatsapp}
              <span className="sr-only"> {t.sendWhatsappNote}</span>
            </Button>
          </div>
        </div>

        <details className="group rounded-sm border border-border-dark px-4 py-3 font-body text-sm">
          <summary className="min-h-6 cursor-pointer text-text-muted hover:text-text-light">
            {t.preview}
          </summary>
          <pre className="mt-3 whitespace-pre-wrap break-words font-body text-sm text-text-light">
            {preview}
          </pre>
          <p className="mt-3 text-xs text-text-muted">
            {t.previewTo}: {siteConfig.name} · {siteConfig.contactRecipient} ·{" "}
            {siteConfig.phoneDisplay}
          </p>
        </details>
      </div>
    </form>
  );
}
