import type { InquiryType } from "@/lib/contact-schema";
import { inquiryTypeLabels } from "@/lib/contact-schema";

type ContactEmailProps = {
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType;
  instrumentLocation?: string;
  message: string;
  submittedAt: string;
  pageUrl: string;
  requestId: string;
};

function row(label: string, value: string) {
  return (
    <tr>
      <td
        style={{
          padding: "8px 12px 8px 0",
          verticalAlign: "top",
          fontWeight: 600,
          color: "#25211d",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "8px 0",
          verticalAlign: "top",
          color: "#25211d",
          wordBreak: "break-word",
        }}
      >
        {value}
      </td>
    </tr>
  );
}

export function ContactEmail({
  fullName,
  email,
  phone,
  inquiryType,
  instrumentLocation,
  message,
  submittedAt,
  pageUrl,
  requestId,
}: ContactEmailProps) {
  const inquiryLabel = inquiryTypeLabels[inquiryType];

  return (
    <html lang="hr">
      <body
        style={{
          margin: 0,
          padding: "24px",
          backgroundColor: "#f5f2ed",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#25211d",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            border: "1px solid #e9e3da",
            padding: "24px",
          }}
        >
          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "22px",
              lineHeight: 1.3,
              color: "#25211d",
            }}
          >
            Novi upit putem web-stranice
          </h1>

          <table
            role="presentation"
            cellPadding={0}
            cellSpacing={0}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tbody>
              {row("Ime i prezime", fullName)}
              {row("E-pošta", email)}
              {phone ? row("Telefon", phone) : null}
              {row("Vrsta upita", inquiryLabel)}
              {instrumentLocation
                ? row("Lokacija instrumenta", instrumentLocation)
                : null}
              {row("Vrijeme zaprimanja", submittedAt)}
              {row("Stranica", pageUrl)}
              {row("Zahtjev", requestId)}
            </tbody>
          </table>

          <h2
            style={{
              margin: "24px 0 8px",
              fontSize: "16px",
              color: "#25211d",
            }}
          >
            Poruka
          </h2>
          <p
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
              color: "#25211d",
            }}
          >
            {message}
          </p>
        </div>
      </body>
    </html>
  );
}

export function buildContactEmailText({
  fullName,
  email,
  phone,
  inquiryType,
  instrumentLocation,
  message,
  submittedAt,
  pageUrl,
  requestId,
}: ContactEmailProps): string {
  const lines = [
    "Novi upit putem web-stranice",
    "",
    `Ime i prezime: ${fullName}`,
    `E-pošta: ${email}`,
  ];

  if (phone) {
    lines.push(`Telefon: ${phone}`);
  }

  lines.push(
    `Vrsta upita: ${inquiryTypeLabels[inquiryType]}`,
  );

  if (instrumentLocation) {
    lines.push(`Lokacija instrumenta: ${instrumentLocation}`);
  }

  lines.push(
    `Vrijeme zaprimanja: ${submittedAt}`,
    `Stranica: ${pageUrl}`,
    `Zahtjev: ${requestId}`,
    "",
    "Poruka:",
    message,
  );

  return lines.join("\n");
}
