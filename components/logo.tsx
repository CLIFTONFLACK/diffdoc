import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The shared GetBrian product lockup: mark + "GetBrian" + hairline + product
 * word. Matches flow.getbrian.xyz, which is the reference implementation:
 *
 *   .lockup      inline-flex, align-items center, gap .6rem
 *   .lockup-mark height 40px, width auto
 *   .wordmark    display face, 600, 1.4rem, -0.02em
 *   .wm-get      Brian Navy      .wm-brian  Gold Deep
 *   .product-tag same type, navy, 1px left keyline, .8rem padding + margin,
 *                hidden below 520px
 *
 * Two brand-book rules are enforced here rather than left to call sites:
 *
 *  • **"Brian" is Gold Deep, never Brian Gold.** At lockup sizes Brian Gold is
 *    3.1:1 on white and fails AA; Gold Deep is 5.3:1. (crm.getbrian.xyz sets
 *    this one with the full gold and is failing contrast because of it.)
 *  • **Never set the display cut below 40px.** The mark's B has no left stem —
 *    the gold traces running into its open counter are what close the letter,
 *    and below ~40px the display cut silts into mud and reads as a 3. `size="sm"`
 *    therefore swaps in `brian-mark-compact.svg`, the same geometry with
 *    thickened traces and filled ring interiors. An optical-size cut, not a
 *    different logo.
 *
 * Dark grounds get the reversed artwork: the on-white gold ramp goes muddy on
 * navy.
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

  return (
    <Link
      href="/"
      aria-label="GetBrian DiffDoc — home"
      className={cn(
        "inline-flex min-w-0 items-center rounded-md no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        lg ? "gap-2.5" : "gap-2",
        className,
      )}
    >
      <BrandMark height={lg ? 40 : 28} />
      <span
        className={cn(
          "flex min-w-0 items-center font-display font-semibold leading-none tracking-[-0.02em]",
          lg ? "text-[1.4rem]" : "text-lg",
        )}
      >
        <span className="text-navy">Get</span>
        <span className="text-gold-deep">Brian</span>
        {/* Below 520px the product word drops and the wordmark carries the
            lockup on its own — same rule as the sibling sites. The keyline is
            a border on the product word rather than its own element, so it
            can't be left dangling after "GetBrian" when the word hides. */}
        <span
          className={cn(
            "hidden truncate self-center border-l border-border text-navy min-[520px]:inline-block",
            lg ? "ml-[0.8rem] pl-[0.8rem]" : "ml-2.5 pl-2.5",
          )}
        >
          DiffDoc
        </span>
      </span>
    </Link>
  );
}

/**
 * The mark on its own — for tight chrome where the product word is already
 * stated nearby. Dimensions are fixed so the header doesn't reflow on load:
 * the viewBox is 654.5 × 518, so width tracks height at ~1.264:1.
 *
 * The cut is chosen from the height rather than passed in, so the brand book's
 * 40px threshold can't be missed by a caller picking the wrong artwork.
 */
export function BrandMark({
  height = 28,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const cut = height >= 40 ? "brian-mark" : "brian-mark-compact";
  const h = height;
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
        aria-hidden="true"
        width={w}
        height={h}
        className="block h-full w-full dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brand/${cut}-white.svg`}
        alt=""
        aria-hidden="true"
        width={w}
        height={h}
        className="hidden h-full w-full dark:block"
      />
    </span>
  );
}

/**
 * The "Built by GetBrian" footer credit, ported from ContentFlow's `.built-by`
 * so every Brian product carries the same badge. Reference spec, read off
 * flow.getbrian.xyz:
 *
 *   display inline-flex, align-items center, gap .5rem
 *   border 1px solid var(--border), radius 999px, padding .35rem .8rem
 *   colour var(--ink-muted); hover flips border and text to navy
 *   img height 20px, width auto        b: display face, 600, navy
 *
 * Two deliberate departures:
 *  • `whitespace-nowrap` — ContentFlow's pill wraps to two lines in a narrow
 *    footer column, which reads as broken rather than as a badge.
 *  • Dark mode, which ContentFlow has no need for: the mark reverses to the
 *    `-white` cut via BrandMark, and navy reverses with the token.
 */
export function BuiltByGetBrian({ className }: { className?: string }) {
  return (
    <a
      href="https://getbrian.xyz"
      target="_blank"
      rel="noopener"
      className={cn(
        "group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border px-[0.8rem] py-[0.35rem] text-[0.85rem] text-ink-soft no-underline transition-colors duration-200 hover:border-navy hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <BrandMark height={20} />
      <span>
        Built by{" "}
        <b className="font-display font-semibold text-navy">GetBrian</b>
      </span>
    </a>
  );
}
