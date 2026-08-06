"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Item = { href: string; label: string };

/**
 * Phone-width nav sheet.
 *
 * At 390px the header cannot fit the lockup, Pricing, the theme toggle, Sign
 * in and Start free — measured, it overruns by ~30px — so Pricing was simply
 * `hidden … sm:block` and unreachable on a phone. Moving Pricing and Sign in
 * behind this control leaves the header at lockup + theme + menu + Start free,
 * which fits with room to spare and keeps the primary CTA always visible.
 */
export function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  // A portal cannot exist during SSR; gating on mount keeps the server and the
  // first client render identical.
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    // Rotating to tablet width hides the sheet via sm:hidden but would leave
    // the scroll lock on, freezing a page with no visible way to close it.
    const wide = window.matchMedia("(min-width: 640px)");
    const onBreakpoint = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <div className="sm:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="diffdoc-mobile-nav"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-ink-soft transition-colors hover:text-ink"
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
              open ? "top-[7px] rotate-45" : "top-0.5"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
              open ? "top-[7px] -rotate-45" : "top-[13px]"
            }`}
          />
        </span>
      </button>

      {/* Portalled to <body>: .glass-nav on the header sets backdrop-filter,
          and a filtered element becomes the containing block for its
          position:fixed descendants — rendered in place, `inset-0` would
          resolve to the header bar rather than the viewport. */}
      {mounted &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              onClick={close}
              className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 sm:hidden ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
            <div
              id="diffdoc-mobile-nav"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              tabIndex={-1}
              inert={!open}
              // Solid bg-card, not the header's glass: a menu has to stay
              // legible over whatever it lands on, and backdrop-filter is the
              // first thing dropped in reduced-transparency modes.
              className={`fixed inset-x-3 top-[4.5rem] z-50 origin-top rounded-xl border bg-card p-2 shadow-xl transition duration-200 focus:outline-none sm:hidden ${
                open
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
              }`}
            >
              <nav aria-label="Primary mobile">
                <ul>
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className="flex min-h-12 items-center rounded-lg px-4 text-base font-medium text-ink-soft transition-colors hover:bg-muted hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
