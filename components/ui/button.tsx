import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Brand-book note on `default`: the CTA is a Brian Gold fill with **ink** text
 * on top (5.8:1). White on gold is 2.9:1 and is never allowed. The hover state
 * is Gold Hover — not Gold Deep, which drops ink to 3.3:1.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-gold-hover shadow-sm",
        // Navy reverses to a light blue in dark mode, so the solid-navy button
        // becomes a raised panel there rather than light-on-light.
        navy: "bg-navy text-white hover:bg-navy-mid shadow-sm dark:bg-secondary dark:text-ink dark:hover:bg-muted",
        secondary:
          "border border-navy/25 bg-background text-navy-soft hover:border-navy/45 hover:bg-muted shadow-sm dark:text-ink",
        ghost: "text-ink-soft hover:bg-muted hover:text-ink",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        link: "text-info underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-6 text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
