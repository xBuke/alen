import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          // Hover: brončana podloga sa svijetlim tekstom (4.74:1; tamni tekst bio je 4.18:1).
          "bg-gold text-background hover:bg-bronze hover:text-text-light active:scale-[0.98]",
        secondary:
          "border border-gold/40 bg-transparent text-text-light hover:border-gold hover:bg-gold/10",
        /** Obrubni gumb za svijetle (ivory) sekcije: tamni tekst umjesto svijetlog. */
        secondaryOnLight:
          "border border-text-dark/50 bg-transparent text-text-dark hover:border-bronze hover:bg-bronze/10 focus-visible:ring-text-dark focus-visible:ring-offset-ivory",
        ghost:
          "text-text-muted hover:bg-surface-elevated hover:text-text-light",
        ivory:
          "bg-text-dark text-ivory hover:bg-bronze hover:text-text-light",
        link: "text-gold underline decoration-gold/60 underline-offset-4 hover:decoration-gold",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-13 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
