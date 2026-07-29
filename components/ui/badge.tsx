import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        // Gold as a wash with Gold Deep text — the brand-safe way to tint a
        // chip, since gold at text sizes only clears contrast at Gold Deep.
        default: "border-transparent bg-gold/12 text-gold-deep",
        secondary: "border-transparent bg-muted text-ink-soft",
        outline: "border-border text-ink-soft",
        success: "border-transparent bg-leaf-wash text-leaf-deep",
        warning: "border-transparent bg-flag-wash/60 text-warning",
        info: "border-transparent bg-note-wash text-note",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
