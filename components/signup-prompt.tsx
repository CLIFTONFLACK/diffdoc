"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Google "G" mark. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.26-2.09 3.58-5.17 3.58-8.87Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.87-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.28a12 12 0 0 0 0 10.76l3.99-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

/**
 * "Continue with Google" button. Front-end only this pass — it links to /signup,
 * where the real OAuth handoff will live once the provider is enabled.
 */
export function GoogleButton({
  label = "Continue with Google",
  className,
  href = "/signup",
}: {
  label?: string;
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "secondary" }), "w-full", className)}
    >
      <GoogleG className="h-[18px] w-[18px]" />
      {label}
    </Link>
  );
}

const PERKS = [
  "Download marked-up .docx & .pdf exports",
  "Add comments and track edits",
  "Save every comparison to your workspace",
];

export function SignupPrompt({
  open,
  reason,
  onClose,
}: {
  open: boolean;
  reason?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm dark:bg-black/70"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-prompt-title"
    >
      <div
        className="w-full max-w-sm rounded-xl border bg-card p-6 text-card-foreground shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Free account
            </p>
            <h2
              id="signup-prompt-title"
              className="mt-1 font-display text-xl font-semibold tracking-tight"
            >
              Sign up to keep going
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-ink-faint transition-colors hover:bg-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {reason ??
            "Comparing is free. Create a free account to download exports and unlock comments & edits."}
        </p>

        <ul className="mt-4 space-y-2">
          {PERKS.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-ink-soft">
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-2">
          <GoogleButton />
          <p className="text-center text-xs text-ink-faint">
            5 comparisons/month free · no card required
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-ink-faint transition-colors hover:text-ink"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

/**
 * Gate hook: `promptSignup(reason?)` opens the modal; render `gate` once in the
 * component tree. Used to wall off download / comment / edit until sign-up.
 */
export function useSignupGate() {
  const [state, setState] = useState<{ open: boolean; reason?: string }>({
    open: false,
  });
  const promptSignup = useCallback(
    (reason?: string) => setState({ open: true, reason }),
    [],
  );
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const gate = (
    <SignupPrompt open={state.open} reason={state.reason} onClose={close} />
  );
  return { promptSignup, gate };
}
