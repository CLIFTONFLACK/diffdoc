import { GitCompare } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Decorative hero backdrop: an enlarged, floating mockup of DiffDoc's own
 * diff view (rather than stock photography we don't have) — same role as the
 * laptop photo in the CliftonAi-CRM hero, sized to fill the section height.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <div className="absolute -right-16 top-1/4 h-[380px] w-[380px] rounded-full bg-leaf-wash blur-2xl" />
      <div className="absolute right-1/3 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-2xl" />

      {/* Secondary card: comparison stats */}
      <div className="absolute right-[6%] top-[16%] w-56 -rotate-6 rounded-xl border bg-card p-4 text-card-foreground shadow-xl">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { n: "27", l: "Changes" },
            { n: "8", l: "Flagged" },
            { n: "92%", l: "Similar" },
          ].map((s) => (
            <div key={s.l} className="rounded-md border bg-paper-deep p-2">
              <div className="font-mono text-sm font-bold text-ink">{s.n}</div>
              <div className="mt-0.5 text-[9px] text-ink-faint">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary card: marked-up diff */}
      <div className="absolute right-[2%] top-1/2 w-[340px] -translate-y-1/2 rotate-3 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-2xl">
        <div className="flex items-center gap-1.5 border-b bg-paper-deep px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/50" />
          <span className="ml-2 flex items-center gap-1.5 truncate font-mono text-[11px] text-ink-faint">
            <GitCompare className="h-3 w-3 text-primary" /> Services_Agreement.docx
          </span>
        </div>
        <div className="space-y-1.5 p-4 font-mono text-[12px] leading-relaxed">
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
          <p className="rounded bg-note-wash px-1 text-note">
            + New clause 8.4 — Confidentiality survives termination.
          </p>
        </div>
      </div>
    </div>
  );
}
