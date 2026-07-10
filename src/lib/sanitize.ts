const CONTROL_CHAR_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitizeTextField(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\0/g, "")
    .replace(CONTROL_CHAR_PATTERN, "")
    .trim();
}

export function sanitizeMessageField(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\0/g, "")
    .replace(CONTROL_CHAR_PATTERN, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

export function sanitizeContactPayload<
  T extends {
    fullName: string;
    email: string;
    phone?: string;
    instrumentLocation?: string;
    message: string;
  },
>(data: T): T {
  return {
    ...data,
    fullName: sanitizeTextField(data.fullName),
    email: sanitizeTextField(data.email),
    phone: data.phone ? sanitizeTextField(data.phone) : data.phone,
    instrumentLocation: data.instrumentLocation
      ? sanitizeTextField(data.instrumentLocation)
      : data.instrumentLocation,
    message: sanitizeMessageField(data.message),
  };
}
