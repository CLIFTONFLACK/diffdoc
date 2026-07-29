import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Everything you need to try DiffDoc.",
    features: [
      "Up to 5 comparisons per month",
      "Full marked-up diff & similarity score",
      "Download .docx & .pdf exports",
      "Comments & tracked edits",
    ],
    cta: "Start free with Google",
    href: "/signup",
  },
  {
    name: "Pro",
    price: "$5",
    cadence: "per month",
    tagline: "For steady, everyday reviewing.",
    features: [
      "50 comparisons per month",
      "Everything in Free",
      "Full comparison history",
      "Priority processing",
    ],
    cta: "Choose Pro",
    href: "/signup?plan=pro",
    featured: true,
  },
  {
    name: "Unlimited",
    price: "$25",
    cadence: "per month",
    tagline: "For teams that compare all day.",
    features: [
      "Unlimited comparisons",
      "Everything in Pro",
      "Bulk uploads",
      "Priority support",
    ],
    cta: "Go Unlimited",
    href: "/signup?plan=unlimited",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative isolate scroll-mt-16 overflow-hidden border-t bg-paper-deep"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob blob-gold absolute -left-24 bottom-0 h-[360px] w-[360px]" />
        <div className="blob blob-navy absolute -right-24 top-8 h-[320px] w-[320px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
            Pricing
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Start free. Pay when you compare more.
          </h2>
          <p className="mt-4 text-ink-soft">
            Every plan gets the full diff, the similarity score, exports and edits. The
            only thing that changes is how many comparisons you run a month.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "glass relative flex flex-col rounded-xl p-6 text-card-foreground",
                tier.featured
                  ? // Gold keyline on the featured tier — a fill/accent use, which
                    // is what gold is for. The tier's own text stays ink.
                    "border-gold shadow-lift ring-1 ring-gold lg:-mt-3 lg:pb-8"
                  : "glass-hover",
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{tier.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold tracking-tight text-ink">
                  {tier.price}
                </span>
                <span className="text-sm text-ink-faint">/ {tier.cadence}</span>
              </div>

              <Link
                href={tier.href}
                className={cn(
                  buttonVariants({
                    variant: tier.featured ? "default" : "secondary",
                    size: "lg",
                  }),
                  "mt-6 w-full",
                )}
              >
                {tier.cta}
              </Link>

              <ul className="mt-6 space-y-3 border-t pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <Check
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-faint">
          Prices in USD. Cancel any time. The free plan needs a Google sign-up and
          nothing else — no card.
        </p>
      </div>
    </section>
  );
}
