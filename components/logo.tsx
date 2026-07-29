import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The DiffDoc lockup: the GetBrian mark + the product word.
 *
 * Three brand-book rules are enforced here rather than left to call sites:
 *
 *  • **Never set the display cut below 40px.** The mark's B has no left stem —
 *    the gold traces running into its open counter are what close the letter,
 *    and below ~40px the display cut silts into mud and starts reading as a 3.
 *    `size="sm"` therefore swaps in `brian-mark-compact.svg`, which is the same
 *    geometry with thickened traces and filled ring interiors. An optical-size
 *    cut, not a different logo.
 *  • **Reversed artwork on dark grounds.** The on-white gold ramp goes muddy on
 *    navy, so dark mode swaps to the `-white` cuts rather than filtering.
 *  • **Clear space equal to the height of the gold swoosh on every side** — the
 *    `gap` and the wrapper's leading account for it.
 *
 * The artwork is generated from `docs/GetBrian_Logo.png` by `npm run brand` in
 * the Brian site repo. Don't hand-edit the SVGs here; re-copy them.
 */
export function Logo({
  size = "lg",
  className,
}: {
  size?: "lg" | "sm";
  className?: string;
}) {
  const lg = size === "lg";
  // Display cut at 44px+ (lg), compact cut at 28px (sm).
  const cut = lg ? "brian-mark" : "brian-mark-compact";

  return (
    <Link
      href="/"
      aria-label="DiffDoc, built by Brian — home"
      className={cn(
        "group inline-flex items-center",
        lg ? "gap-3" : "gap-2",
        className,
      )}
    >
      <BrandMark cut={cut} lg={lg} />
      <span
        className={cn(
          "font-display font-semibold leading-none tracking-tight text-ink",
          lg ? "text-2xl sm:text-[28px]" : "text-base",
        )}
      >
        DiffDoc
      </span>
    </Link>
  );
}

/**
 * The mark on its own — for tight chrome (mobile headers, the auth card) where
 * the product word is already stated nearby.
 */
export function BrandMark({
  cut = "brian-mark-compact",
  lg = false,
  className,
}: {
  cut?: string;
  lg?: boolean;
  className?: string;
}) {
  // viewBox is 654.5 × 518, so width tracks height at ~1.264:1. Fixing both
  // dimensions reserves the space and stops the header reflowing on load.
  const h = lg ? 44 : 28;
  const w = Math.round(h * 1.2635);

  return (
    <span
      className={cn("relative shrink-0", className)}
      style={{ width: w, height: h }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brand/${cut}.svg`}
        alt=""
        width={w}
        height={h}
        className="block h-full w-full dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brand/${cut}-white.svg`}
        alt=""
        width={w}
        height={h}
        className="hidden h-full w-full dark:block"
      />
    </span>
  );
}

/**
 * The "Built by Brian" credit. The mark alone doesn't say "Brian" — that's the
 * point of the identity — so attribution is carried verbally, in the voice, and
 * links out to getbrian.xyz.
 */
export function BuiltByBrian({ className }: { className?: string }) {
  return (
    <a
      href="https://getbrian.xyz"
      target="_blank"
      rel="noopener"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint transition-colors hover:text-gold-deep",
        className,
      )}
    >
      Built by
      <span className="font-display font-semibold text-ink-soft">Brian</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-3 w-3"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}
