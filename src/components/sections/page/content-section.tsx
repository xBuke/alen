import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type ContentSectionProps = {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
  as?: "section" | "div";
};

export function ContentSection({
  children,
  dark = false,
  className,
  id,
  as: Component = "section",
}: ContentSectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        "section-padding scroll-mt-20",
        dark ? "bg-ivory" : "bg-background",
        className,
      )}
    >
      <Container>{children}</Container>
    </Component>
  );
}
