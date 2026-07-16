import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Full brand lockup — the shared CliftonAi mark (same segmented-C molecule icon
 * as CliftonAi-CRM) + "CliftonAi" wordmark + "-DiffDoc" product suffix. `size="lg"`
 * for the marketing hero's top bar; `size="sm"` everywhere else (footer, in-app
 * headers, auth).
 */
export function Logo({
  size = "lg",
  className,
}: {
  size?: "lg" | "sm";
  className?: string;
}) {
  const lg = size === "lg";
  return (
    <Link
      href="/"
      aria-label="CliftonAi — DiffDoc"
      className={cn("inline-flex items-center", lg ? "gap-3" : "gap-2", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/clifton-icon.webp"
        alt=""
        className={cn(
          "shrink-0 object-contain",
          lg ? "h-11 w-11 sm:h-14 sm:w-14 lg:h-[68px] lg:w-[68px]" : "h-8 w-8",
        )}
      />
      <span className="flex items-center font-display font-bold leading-none tracking-tight">
        <span className={lg ? "text-2xl sm:text-4xl lg:text-[44px]" : "text-xl"}>
          <span className="text-ink">Clifton</span>
          <span className="text-primary">Ai</span>
        </span>
        {/* Divider + product suffix — the shared CliftonAi lockup grammar
            (wordmark | hairline | product name in the muted technical voice). */}
        <span
          aria-hidden="true"
          className={cn(
            "inline-block w-0.5 shrink-0 self-center bg-primary/60",
            lg ? "mx-2.5 h-7 sm:h-9" : "mx-1.5 h-4",
          )}
        />
        <span
          className={cn(
            "font-semibold text-ink-soft",
            lg ? "text-lg sm:text-2xl lg:text-[26px]" : "text-sm",
          )}
        >
          DiffDoc
        </span>
      </span>
    </Link>
  );
}
