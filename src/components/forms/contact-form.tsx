"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { FormFieldError } from "@/components/forms/form-field-error";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  contactFormDefaultValues,
  contactFormSchema,
  inquiryTypeLabels,
  inquiryTypeValues,
  resolveInquiryTypeFromQuery,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error" | "rate-limited";

type ApiSuccessResponse = {
  success: true;
  message: string;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
};

const SUCCESS_MESSAGE =
  "Hvala na upitu. Vaša poruka je uspješno poslana. Javit ćemo Vam se u najkraćem mogućem roku.";

const ERROR_MESSAGE =
  "Poruku trenutačno nije moguće poslati. Molimo pokušajte ponovno ili nam se javite izravno putem telefona ili e-pošte.";

const RATE_LIMIT_MESSAGE =
  "Poslano je previše zahtjeva u kratkom razdoblju. Molimo pokušajte ponovno nešto kasnije.";

const fieldClassName =
  "rounded-sm border-border-dark bg-background focus-visible:border-gold/50 focus-visible:ring-gold/30";

function buildDescribedBy(...ids: Array<string | false | undefined>): string | undefined {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  const initialInquiryType = useMemo(() => {
    return (
      resolveInquiryTypeFromQuery(searchParams.get("vrsta")) ??
      contactFormDefaultValues.inquiryType
    );
  }, [searchParams]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      ...contactFormDefaultValues,
      inquiryType: initialInquiryType,
    },
    mode: "onBlur",
  });

  const messageValue = useWatch({ control, name: "message" }) ?? "";
  const messageLength = messageValue.length;
  const showMessageLengthWarning = messageLength > 3800;

  useEffect(() => {
    const fromQuery = resolveInquiryTypeFromQuery(searchParams.get("vrsta"));
    if (fromQuery) {
      setValue("inquiryType", fromQuery, { shouldValidate: true });
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [status]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(async (values) => {
      if (status === "submitting") {
        return;
      }

      setStatus("submitting");
      setStatusMessage("");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        let data: ApiSuccessResponse | ApiErrorResponse;
        try {
          data = (await response.json()) as
            | ApiSuccessResponse
            | ApiErrorResponse;
        } catch {
          setStatus("error");
          setStatusMessage(ERROR_MESSAGE);
          return;
        }

        if (
          typeof data !== "object" ||
          data === null ||
          typeof data.success !== "boolean"
        ) {
          setStatus("error");
          setStatusMessage(ERROR_MESSAGE);
          return;
        }

        if (response.status === 429) {
          setStatus("rate-limited");
          setStatusMessage(RATE_LIMIT_MESSAGE);
          return;
        }

        if (!response.ok || !data.success) {
          const errorData = data as ApiErrorResponse;

          if (errorData.fieldErrors) {
            const fieldNames = Object.keys(
              errorData.fieldErrors,
            ) as (keyof ContactFormValues)[];

            for (const fieldName of fieldNames) {
              const messages = errorData.fieldErrors[fieldName];
              if (messages?.[0]) {
                setError(fieldName, { type: "server", message: messages[0] });
              }
            }

            const firstInvalidField = fieldNames[0];
            if (firstInvalidField) {
              const element = document.getElementById(firstInvalidField);
              element?.focus();
            }

            setStatus("error");
            setStatusMessage(
              errorData.message || "Provjerite unesene podatke.",
            );
            return;
          }

          setStatus("error");
          setStatusMessage(ERROR_MESSAGE);
          return;
        }

        setStatus("success");
        setStatusMessage(SUCCESS_MESSAGE);
        reset(contactFormDefaultValues);
      } catch {
        setStatus("error");
        setStatusMessage(ERROR_MESSAGE);
      }
    })(event);
  };

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="space-y-6"
      aria-busy={isSubmitting}
    >
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="false"
      >
        <Label htmlFor="companyWebsite" className="sr-only">
          Ostavite ovo polje prazno
        </Label>
        <Input
          id="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className={fieldClassName}
          {...register("companyWebsite")}
        />
      </div>

      <div>
        <Label htmlFor="fullName">Ime i prezime</Label>
        <Input
          id="fullName"
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

      <div>
        <Label htmlFor="email">E-pošta</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={buildDescribedBy(errors.email && "email-error")}
          className={cn(fieldClassName, "mt-2")}
          {...register("email")}
        />
        <FormFieldError id="email-error" message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={buildDescribedBy(errors.phone && "phone-error")}
          className={cn(fieldClassName, "mt-2")}
          {...register("phone")}
        />
        <FormFieldError id="phone-error" message={errors.phone?.message} />
      </div>

      <div>
        <Label htmlFor="inquiryType">Vrsta upita</Label>
        <Controller
          name="inquiryType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="inquiryType"
                aria-invalid={Boolean(errors.inquiryType)}
                aria-describedby={buildDescribedBy(
                  errors.inquiryType && "inquiryType-error",
                )}
                className={cn(fieldClassName, "mt-2")}
              >
                <SelectValue placeholder="Odaberite vrstu upita" />
              </SelectTrigger>
              <SelectContent>
                {inquiryTypeValues.map((value) => (
                  <SelectItem key={value} value={value}>
                    {inquiryTypeLabels[value]}
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
        <Label htmlFor="instrumentLocation">Lokacija instrumenta</Label>
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
          Mjesto, župa, crkva ili drugi prostor, ako je poznato.
        </p>
        <FormFieldError
          id="instrumentLocation-error"
          message={errors.instrumentLocation?.message}
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <Label htmlFor="message">Poruka</Label>
          <span
            id="message-count"
            className="font-body text-xs text-text-muted"
          >
            {messageLength}/4000
          </span>
        </div>
        <Textarea
          id="message"
          rows={6}
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
          Opišite instrument, trenutačno stanje i vrstu zahvata koja Vas zanima.
        </p>
        {showMessageLengthWarning ? (
          <p
            id="message-length-warning"
            className="mt-2 font-body text-xs text-gold/80"
          >
            Približavate se maksimalnoj duljini poruke.
          </p>
        ) : null}
        <FormFieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="space-y-3 border-t border-border-dark pt-6">
        <div className="flex min-h-11 items-start gap-3">
          <Controller
            name="privacyAcknowledged"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="privacyAcknowledged"
                checked={field.value === true}
                onCheckedChange={(checked) =>
                  field.onChange(checked === true)
                }
                aria-invalid={Boolean(errors.privacyAcknowledged)}
                aria-describedby={buildDescribedBy(
                  errors.privacyAcknowledged && "privacyAcknowledged-error",
                )}
                className="mt-1 h-5 w-5 shrink-0"
              />
            )}
          />
          <Label
            htmlFor="privacyAcknowledged"
            className="cursor-pointer py-1 text-sm leading-relaxed text-text-muted"
          >
            Pročitao/la sam{" "}
            <Link
              href="/pravila-privatnosti"
              className="text-gold underline-offset-4 hover:underline"
            >
              Pravila privatnosti
            </Link>{" "}
            i razumijem kako se moji podatci koriste radi odgovora na upit.
          </Label>
        </div>
        <FormFieldError
          id="privacyAcknowledged-error"
          message={errors.privacyAcknowledged?.message}
        />
      </div>

      <div aria-live="polite" className="space-y-3">
        {status === "success" ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="rounded-sm border border-gold/30 bg-gold/10 px-4 py-3 font-body text-sm text-text-light"
          >
            {statusMessage}
          </div>
        ) : null}

        {status === "error" || status === "rate-limited" ? (
          <div
            role="alert"
            className="rounded-sm border border-red-400/30 bg-red-950/30 px-4 py-3 font-body text-sm text-red-200"
          >
            {statusMessage}
          </div>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="min-h-11 w-full rounded-sm sm:w-auto"
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Slanje…
          </>
        ) : (
          "Pošaljite upit"
        )}
      </Button>
    </form>
  );
}
