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
      <span className="flex items-end font-display font-bold leading-none tracking-tight">
        <span className={lg ? "text-2xl sm:text-4xl lg:text-[44px]" : "text-xl"}>
          <span className="text-ink">Clifton</span>
          <span className="text-primary">Ai</span>
        </span>
        <span
          className={cn(
            "font-semibold text-primary",
            lg ? "ml-0.5 pb-0.5 text-sm sm:text-lg lg:text-xl" : "ml-0.5 text-[0.7rem]",
          )}
        >
          -DiffDoc
        </span>
      </span>
    </Link>
  );
}
