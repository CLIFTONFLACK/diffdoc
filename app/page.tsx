import Link from "next/link";
import {
  ArrowRight,
  FileText,
  GitCompare,
  MessagesSquare,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { UploadWidget } from "@/components/upload-widget";
import { Pricing } from "@/components/pricing";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: FileText,
    title: "Upload two versions",
    body: ".docx or .pdf, up to 25 MB each. Drop in your reference and the document to compare.",
  },
  {
    icon: ScanSearch,
    title: "DiffDoc reads & scores",
    body: "It parses both documents, measures how similar they are, and locates every change.",
  },
  {
    icon: GitCompare,
    title: "See exactly what changed",
    body: "A clean, marked-up view of insertions, deletions and edits — line by line.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero — big logo + nav inline (no separate header bar), a full-height
            visual bleeding in from the right behind the value prop and the
            live upload widget. */}
        <section className="relative isolate overflow-hidden border-b bg-background">
          {/* Office backdrop bleeding in from the right, faded into the page on
              the left — same treatment as the CliftonAi-CRM hero photo. */}
          <picture className="absolute inset-y-0 left-[22%] right-0 -z-10 hidden sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/landing/office.webp"
              alt=""
              className="h-full w-full object-cover object-[80%_center] [mask-image:linear-gradient(to_right,transparent,black_35%)] dark:opacity-40"
            />
          </picture>
          {/* White scrim over the photo's left half so the headline and copy stay
              readable. Theme-aware: a white wash in light mode, dark in dark. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-[5] hidden bg-gradient-to-r from-background from-10% via-background/55 via-45% to-transparent to-68% sm:block"
          />

          {/* In-hero top bar: logo left, theme toggle + auth right */}
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-y-3 px-6 pt-6 sm:flex-nowrap">
            <Logo />
            <nav className="flex items-center gap-1 sm:gap-2">
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

          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-2 lg:pb-24 lg:pt-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-leaf-wash px-3 py-1 text-xs font-medium text-leaf-deep">
                <Sparkles className="h-3.5 w-3.5" />
                Document comparison, done right
              </p>
              <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                See exactly what changed<span className="text-primary">.</span>
              </h1>
              <div className="mt-5 h-0.5 w-12 bg-primary" />
              <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
                Upload two versions of a document. DiffDoc reads both, measures their
                similarity, and marks up precisely what was inserted, deleted and edited.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Works with .docx and .pdf",
                  "Similarity score on every comparison",
                  "Download marked-up exports, add comments & edits",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#try"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Try it free <ArrowRight className="h-4 w-4" />
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

            {/* The onboarding widget, embedded as the hero's interactive element.
                The "start here" cue lives inside the card so it stays readable
                over the photo backdrop. */}
            <div id="try" className="scroll-mt-24">
              <UploadWidget
                heading={
                  <>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      1
                    </span>
                    Start here — compare two documents
                  </>
                }
              />
            </div>
          </div>

          {/* Mobile-only: the office backdrop stacks below as a plain banner */}
          <div aria-hidden="true" className="mx-auto w-full max-w-6xl px-6 pb-10 sm:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/landing/office-mobile.webp"
              alt=""
              className="h-52 w-full overflow-hidden rounded-xl border object-cover"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="border-b bg-paper-deep">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-display text-3xl font-semibold tracking-tight">
                Three steps, about a minute
              </h2>
              <p className="mt-3 text-ink-soft">
                No settings to configure. Upload, and DiffDoc does the reading for you.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <div key={s.title} className="rounded-lg border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-leaf-wash text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-ink-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature showcases */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-20 sm:space-y-24">
            <Feature
              kicker="Precise diff"
              title="Every insertion, deletion and edit — marked in place"
              body="DiffDoc aligns the two documents and highlights exactly what moved, so you never re-read a whole contract to find the one clause that changed."
              points={[
                "Word-level highlighting, not just line-level",
                "Similarity score tells you how far the versions drifted",
                "Risk flags surface the changes worth a second look",
              ]}
            >
              <DiffPreview />
            </Feature>

            <Feature
              reverse
              kicker="Review & export"
              title="Comment, edit, and hand it off"
              body="Turn a comparison into a working document: leave margin comments, make tracked edits on the primary, then export a clean marked-up .docx or .pdf."
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

        {/* Final CTA */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              <ShieldCheck className="h-8 w-8 opacity-80" aria-hidden />
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Stop hunting for the change that matters.
              </h2>
              <p className="mt-4 max-w-xl text-pretty leading-relaxed opacity-90">
                Drop in two versions and let DiffDoc show you exactly what&apos;s different —
                your first comparison is free, right now.
              </p>
              <div className="mt-8">
                <a
                  href="#try"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "border-transparent bg-white text-leaf-deep hover:bg-white/90",
                  )}
                >
                  Compare documents free
                </a>
              </div>
              <p className="mt-3 text-xs opacity-75">
                No card required · 5 free comparisons every month.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-ink-soft sm:flex-row">
          <Logo size="sm" />
          <div className="flex items-center gap-5">
            <Link href="#pricing" className="hover:text-ink">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-ink">
              Sign in
            </Link>
            <Link href="/signup" className="hover:text-ink">
              Start free
            </Link>
          </div>
          <span className="flex items-center gap-2 text-ink-faint">
            <MessagesSquare className="h-4 w-4" />
            Compare .docx & .pdf, line by line
          </span>
        </div>
      </footer>
    </div>
  );
}

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
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {kicker}
        </p>
        <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">{body}</p>
        <ul className="mt-5 space-y-2.5">
          {points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
    <figure className="overflow-hidden rounded-xl border bg-card shadow-lg">
      <div className="flex items-center gap-1.5 border-b bg-paper-deep px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/50" />
        <span className="ml-2 truncate font-mono text-[11px] text-ink-faint">{path}</span>
      </div>
      <div className="p-4">{children}</div>
    </figure>
  );
}

/** Synthetic marked-up diff preview (no screenshot dependency). */
function DiffPreview() {
  return (
    <ShotFrame path="diffdoc.app/c/8f2a…">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-ink-soft">
          <GitCompare className="h-4 w-4 text-primary" /> Services_Agreement.docx
        </div>
        <span className="rounded-md bg-leaf-wash px-2 py-0.5 font-mono text-xs font-semibold text-leaf-deep">
          92% similar
        </span>
      </div>
      <div className="space-y-1.5 font-mono text-[12px] leading-relaxed">
        <p className="text-ink-soft">3.1 The term of this Agreement shall be</p>
        <p>
          <span className="rounded bg-flag-wash px-1 text-destructive line-through">
            twelve (12) months
          </span>{" "}
          <span className="rounded bg-leaf-wash px-1 text-leaf-deep">
            twenty-four (24) months
          </span>
        </p>
        <p className="text-ink-soft">commencing on the Effective Date.</p>
        <p className="pt-1 text-ink-soft">5.2 Payment is due within</p>
        <p>
          <span className="rounded bg-flag-wash px-1 text-destructive line-through">
            30 days
          </span>{" "}
          <span className="rounded bg-leaf-wash px-1 text-leaf-deep">45 days</span>{" "}
          <span className="text-ink-soft">of invoice.</span>
        </p>
        <p className="rounded bg-note-wash px-1 text-note">
          + New clause 8.4 — Confidentiality survives termination.
        </p>
      </div>
    </ShotFrame>
  );
}

/** Synthetic report/export preview. */
function ReportPreview() {
  return (
    <ShotFrame path="diffdoc.app/c/8f2a…/report">
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
        <div className="flex items-start gap-2 rounded-md border border-pen/30 bg-pen-wash p-2.5 text-xs">
          <MessagesSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pen" />
          <span className="text-ink-soft">
            <span className="font-medium text-pen">Comment:</span> Confirm the 45-day
            term with finance before signing.
          </span>
        </div>
        <div className="flex items-center justify-between rounded-md border bg-background p-2.5 text-xs">
          <span className="flex items-center gap-2 text-ink-soft">
            <FileText className="h-3.5 w-3.5" /> Marked-up export
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
