import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  GitCompare,
  MessagesSquare,
  ScanSearch,
} from "lucide-react";

import { UploadWidget } from "@/components/upload-widget";
import { Pricing } from "@/components/pricing";
import { BuiltByGetBrian, Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: FileText,
    title: "Drop in two versions",
    body: ".docx or .pdf, up to 25 MB each. Your reference document, and the one you've been sent back.",
  },
  {
    icon: ScanSearch,
    title: "DiffDoc reads both",
    body: "It parses each file, scores how far the two have drifted apart, and locates every change.",
  },
  {
    icon: GitCompare,
    title: "You see what moved",
    body: "Insertions, deletions and edits marked in place — word by word, not line by line.",
  },
];

/** Brian's other builds, for the cross-sell band in the footer. */
const SIBLINGS = [
  {
    name: "CRM",
    tag: "Leisure & licensed property",
    href: "https://crm.getbrian.xyz",
  },
  {
    name: "ContentFlow",
    tag: "Content operations for WordPress",
    href: "https://flow.getbrian.xyz",
  },
  {
    name: "DealMaker",
    tag: "Deal pipeline for small business",
    href: "https://dealmaker.getbrian.xyz",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────────────────────
            White ground, navy and gold blobs behind glass. No stock photo: the
            brand runs on paper-white, the mark, and the type. */}
        <section className="relative isolate overflow-hidden border-b">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob blob-navy animate-float absolute -left-24 -top-32 h-[420px] w-[420px]" />
            <div className="blob blob-gold animate-float-slow absolute -right-16 top-24 h-[380px] w-[380px]" />
            <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </div>

          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:pb-24 lg:pt-20">
            <div className="animate-fade-in-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-deep">
                <GitCompare className="h-3.5 w-3.5" aria-hidden />
                Document comparison
              </p>

              <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[56px]">
                One clause changed.
                <br />
                <span className="brand-gradient-text">Did anyone catch it?</span>
              </h1>

              <div className="mt-6 h-1 w-14 rounded-full bg-primary" />

              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
                Drop in two versions of a document. DiffDoc reads both, scores how far
                they&apos;ve drifted, and marks up every insertion, deletion and edit —
                so you never re-read a whole contract hunting for the one line that
                moved.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "Works with .docx and .pdf",
                  "A similarity score on every comparison",
                  "Comment, edit, and export an audit-ready copy",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#try" className={cn(buttonVariants({ size: "lg" }))}>
                  Compare two documents <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="#pricing"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  See pricing
                </a>
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                No sign-up to try your first comparison.
              </p>
            </div>

            {/* The upload widget is the hero's interactive element — the whole
                point of the page is that you can just use it. */}
            <div id="try" className="scroll-mt-24">
              <UploadWidget
                heading={
                  <>
                    <span
                      aria-hidden
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                    >
                      1
                    </span>
                    Start here — compare two documents
                  </>
                }
              />
            </div>
          </div>
        </section>

        {/* ── What it's for ──────────────────────────────────────────────── */}
        <section className="border-b bg-paper-deep">
          <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <p className="text-center text-sm text-ink-faint">
              Built for the documents that come back marked up —{" "}
              <span className="text-ink-soft">
                contracts, leases, policies, specs, tenders
              </span>
              .
            </p>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden border-b">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob blob-navy absolute -right-32 top-0 h-[360px] w-[360px]" />
          </div>
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
                How it works
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Three steps, about a minute
              </h2>
              <p className="mt-4 text-ink-soft">
                Nothing to configure. Upload, and DiffDoc does the reading for you.
              </p>
            </div>

            <ol className="mt-12 grid gap-5 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="glass glass-hover rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/8 text-navy-soft">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-ink-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Feature showcases ──────────────────────────────────────────── */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl space-y-20 px-6 py-20 sm:space-y-28">
            <Feature
              kicker="Precise diff"
              title="Every insertion, deletion and edit — marked where it happened"
              body="DiffDoc lines the two documents up against each other and highlights exactly what moved. You read the changes, not the document."
              points={[
                "Word-level highlighting, not just line-level",
                "A similarity score tells you how far the versions drifted",
                "Risk flags surface the changes worth a second look",
              ]}
            >
              <DiffPreview />
            </Feature>

            <Feature
              reverse
              kicker="Review & export"
              title="Comment, edit, and hand it back"
              body="A comparison isn't the end of the job. Leave margin comments, make tracked edits on the primary, then export a clean marked-up copy for whoever needs to sign it."
              points={[
                "Comments and tracked edits on the primary document",
                "One-click .docx and .pdf exports",
                "Every comparison saved to your workspace",
              ]}
            >
              <ReportPreview />
            </Feature>
          </div>
        </section>

        <Pricing />

        {/* ── Final CTA ──────────────────────────────────────────────────── */}
        <section className="brand-gradient relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          >
            <div className="blob blob-gold absolute -right-20 -top-20 h-[420px] w-[420px]" />
          </div>
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Stop hunting for the change that matters.
              </h2>
              {/* The gradient's lightest stop is navy-bright, so these
                  opacities are set against that worst case, not against the
                  navy the band mostly reads as. */}
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-white/90">
                Drop in two versions and DiffDoc will show you exactly what&apos;s
                different. Your first comparison is free, right now, without an account.
              </p>
              <div className="mt-9">
                <a href="#try" className={cn(buttonVariants({ size: "lg" }))}>
                  Compare documents free <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
              <p className="mt-4 text-xs text-white/85">
                No card required · 5 free comparisons every month
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ── Chrome ──────────────────────────────────────────────────────────────── */

function SiteHeader() {
  return (
    <header className="glass-nav sticky top-0 z-30 border-b">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Logo />
        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="#pricing"
            className="hidden px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Pricing
          </a>
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Sign in
          </Link>
          <Link href="/signup" className={cn(buttonVariants({ size: "sm" }))}>
            Start free
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t">
      {/* More Brian builds — the cross-sell band */}
      <div className="border-b bg-paper-deep">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              More Brian builds
            </p>
            <a
              href="https://getbrian.xyz"
              target="_blank"
              rel="noopener"
              className="-my-2 inline-flex items-center gap-1 py-2.5 text-xs font-medium text-navy-bright hover:underline"
            >
              See the lot
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {SIBLINGS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 transition-colors hover:border-navy-bright/45"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {s.name}
                  </span>
                  <span className="block truncate text-xs text-ink-faint">{s.tag}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-navy-bright"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* `-my-2 … py-2.5` on the links keeps the visual rhythm of a plain text
          row while giving each one a ~44px tap target. */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-ink-soft sm:flex-row">
        <Logo size="sm" className="-my-2 py-2" />
        <div className="-my-2 flex items-center gap-3">
          {[
            { href: "#pricing", label: "Pricing" },
            { href: "/login", label: "Sign in" },
            { href: "/signup", label: "Start free" },
            { href: "mailto:diffdoc@getbrian.xyz", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded px-2 py-2.5 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>
<BuiltByGetBrian />
      </div>
    </footer>
  );
}

/* ── Section helpers ─────────────────────────────────────────────────────── */

function Feature({
  kicker,
  title,
  body,
  points,
  reverse,
  children,
}: {
  kicker: string;
  title: string;
  body: string;
  points: string[];
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className={reverse ? "lg:order-2" : undefined}>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
          {kicker}
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">{body}</p>
        <ul className="mt-6 space-y-2.5">
          {points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              />
              {pt}
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? "lg:order-1" : undefined}>{children}</div>
    </div>
  );
}

/** Faux browser frame reused by the synthetic previews. */
function ShotFrame({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <figure className="glass overflow-hidden rounded-xl">
      <div className="flex items-center gap-1.5 border-b bg-paper-deep px-3 py-2">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
        <span className="ml-2 truncate font-mono text-[11px] text-ink-faint">{path}</span>
      </div>
      <div className="p-4">{children}</div>
    </figure>
  );
}

/**
 * Synthetic marked-up diff preview. Uses the functional diff scale (green /
 * red / violet / blue) rather than the brand ramp — in a document, gold would
 * read as "this changed" and it must only ever mean "Brian".
 */
function DiffPreview() {
  return (
    <ShotFrame path="diffdoc.getbrian.xyz/c/8f2a…">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-ink-soft">
          <GitCompare className="h-4 w-4 shrink-0 text-navy-bright" aria-hidden />
          <span className="truncate">Services_Agreement.docx</span>
        </div>
        <span className="shrink-0 rounded-md bg-leaf-wash px-2 py-0.5 font-mono text-xs font-semibold text-leaf-deep">
          92% similar
        </span>
      </div>
      <div className="space-y-1.5 font-mono text-[12px] leading-relaxed">
        <p className="text-ink-soft">3.1 The term of this Agreement shall be</p>
        <p>
          <span className="rounded bg-flag-wash px-1 text-flag line-through">
            twelve (12) months
          </span>{" "}
          <span className="rounded bg-leaf-wash px-1 text-leaf-deep">
            twenty-four (24) months
          </span>
        </p>
        <p className="text-ink-soft">commencing on the Effective Date.</p>
        <p className="pt-1 text-ink-soft">5.2 Payment is due within</p>
        <p>
          <span className="rounded bg-flag-wash px-1 text-flag line-through">30 days</span>{" "}
          <span className="rounded bg-leaf-wash px-1 text-leaf-deep">45 days</span>{" "}
          <span className="text-ink-soft">of invoice.</span>
        </p>
        <p className="rounded bg-pen-wash px-1 text-pen">
          + New clause 8.4 — Confidentiality survives termination.
        </p>
      </div>
    </ShotFrame>
  );
}

/** Synthetic report/export preview. */
function ReportPreview() {
  return (
    <ShotFrame path="diffdoc.getbrian.xyz/c/8f2a…/report">
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { n: "27", l: "Changes" },
          { n: "8", l: "Flagged" },
          { n: "92%", l: "Similar" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border bg-paper-deep p-3">
            <div className="font-mono text-xl font-bold text-ink">{s.n}</div>
            <div className="mt-0.5 text-[11px] text-ink-faint">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-start gap-2 rounded-md border border-note/30 bg-note-wash p-2.5 text-xs">
          <MessagesSquare
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-note"
            aria-hidden
          />
          <span className="text-ink-soft">
            <span className="font-medium text-note">Comment:</span> Confirm the 45-day
            term with finance before signing.
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-md border bg-background p-2.5 text-xs">
          <span className="flex items-center gap-2 text-ink-soft">
            <Download className="h-3.5 w-3.5" aria-hidden /> Marked-up export
          </span>
          <span className="flex gap-1.5">
            <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px] text-secondary-foreground">
              .docx
            </span>
            <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px] text-secondary-foreground">
              .pdf
            </span>
          </span>
        </div>
      </div>
    </ShotFrame>
  );
}
