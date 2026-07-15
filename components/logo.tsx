import Link from "next/link";

import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

/**
 * Full lockup (mark + wordmark) for the marketing hero's in-hero top bar —
 * same icon-left, big-two-tone-wordmark structure as the CliftonAi-CRM logo.
 * For compact/in-app placements use `Wordmark` instead.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 shrink-0 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
      <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
        <span className="text-ink">Diff</span>
        <span className="text-primary">Doc</span>
      </span>
    </Link>
  );
}
