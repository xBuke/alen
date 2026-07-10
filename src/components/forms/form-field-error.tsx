import { cn } from "@/lib/utils";

type FormFieldErrorProps = {
  id: string;
  message?: string;
  className?: string;
};

export function FormFieldError({ id, message, className }: FormFieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "mt-2 font-body text-sm text-red-400 before:mr-1 before:content-['⚠']",
        className,
      )}
    >
      {message}
    </p>
  );
}
