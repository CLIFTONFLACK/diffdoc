import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Cookies and analytics",
  description: "What DiffDoc measures with Google Analytics, only if you say yes, and the cookies that sets.",
};

const LINK = "font-medium text-ink underline underline-offset-2 hover:text-navy-bright";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who runs this site",
    body: (
      <p>
        DiffDoc is a GetBrian product (
        <a href="https://getbrian.xyz" className={LINK}>
          getbrian.xyz
        </a>
        ). Questions about this notice or your data:{" "}
        <a href="mailto:diffdoc@getbrian.xyz" className={LINK}>
          diffdoc@getbrian.xyz
        </a>
        .
      </p>
    ),
  },
  {
    heading: "What we measure, and only if you say yes",
    body: (
      <p>
        If you press Accept in the cookie banner, we use Google Analytics 4 to count visits to diffdoc.getbrian.xyz:
        which pages are viewed, roughly where from (country level), device and browser type, and how you arrived (the
        site that referred you, reduced to its address). We use it to see which pages are useful. Nothing is sent to
        Google before you accept. Pages measured: the home page and the demo page. Everything else on the site,
        including sign-in, sign-up, your comparisons and the task board, is never measured.
      </p>
    ),
  },
  {
    heading: "What we switch off",
    body: (
      <p>
        Advertising features, ad personalisation and Google signals are off. The address of each page is sent without
        its query string (except campaign tags that start with utm_) and without any fragment. Referrers from this same
        site are not sent.
      </p>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        Accepting sets these on this site only (not shared with other GetBrian sites): <code>_ga</code> and{" "}
        <code>_ga_&lt;container id&gt;</code> (tell visits apart; Google Analytics keeps them up to 2 years). Your choice
        itself is stored in your browser&rsquo;s local storage under <code>gb_consent</code> (&ldquo;granted&rdquo; or
        &ldquo;denied&rdquo;), not in a cookie, and never leaves your device. Declining sets no analytics cookies.
      </p>
    ),
  },
  {
    heading: "Changing your mind",
    body: (
      <p>
        Use &ldquo;Cookie settings&rdquo; (in the footer of the home page) at any time. Choosing Decline switches the
        tag off and deletes the analytics cookies immediately.
      </p>
    ),
  },
  {
    heading: "Google",
    body: (
      <p>
        Google acts as our processor for analytics; data may be processed outside the UK/EEA under Google&rsquo;s
        safeguards. Data retention in Google Analytics is set to 14 months. See Google&rsquo;s own policy at{" "}
        <a href="https://policies.google.com/privacy" className={LINK} target="_blank" rel="noopener">
          policies.google.com/privacy
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Other data",
    body: (
      <p>
        When you compare two documents, the two files you upload (.docx or .pdf), their names, the comparison results,
        and any comments or edits you add are stored on our server so the comparison can be reopened at its own
        address. These are not sent to Google Analytics. Contact us at{" "}
        <a href="mailto:diffdoc@getbrian.xyz" className={LINK}>
          diffdoc@getbrian.xyz
        </a>{" "}
        about any other data, or about removing a comparison.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="glass-nav sticky top-0 z-30 border-b">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <Logo />
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Back to home
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:py-16">
        <h1 className="text-balance font-display text-3xl font-bold tracking-tight">Cookies and analytics</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: 4 October 2026.</p>
        <div className="mt-8 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-lg font-semibold">{s.heading}</h2>
              <div className="mt-2 text-base leading-relaxed text-ink-soft [&_code]:rounded [&_code]:bg-paper-deep [&_code]:px-1 [&_code]:text-sm">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
