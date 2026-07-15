"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2, Plus } from "lucide-react";
import { BuildStamp } from "@/components/build-stamp";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

type Task = {
  id: string;
  title: string | null;
  doc_a_name: string | null;
  doc_b_name: string | null;
  similarity_score: number | null;
  status: string;
  created_at: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/comparisons", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((body) => {
        if (!cancelled) setTasks(body.comparisons);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const complete = tasks?.filter((t) => t.status === "complete") ?? [];
  const inFlight =
    tasks?.filter((t) => t.status === "pending" || t.status === "processing") ?? [];
  const failed = tasks?.filter((t) => t.status === "failed") ?? [];
  const avgSimilarity =
    complete.length > 0
      ? Math.round(
          (complete.reduce((sum, t) => sum + (t.similarity_score ?? 0), 0) /
            complete.length) *
            10,
        ) / 10
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink">
      <header className="flex items-center justify-between border-b border-line px-6 py-3 sm:px-8">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/"
            className="flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> New comparison
          </a>
        </div>
      </header>

      <main className="flex-1 px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-1 font-display text-3xl font-bold tracking-tight">
            My Tasks<span className="text-primary">.</span>
          </h1>
          <p className="mb-8 text-sm text-ink-soft">
            Every comparison you&apos;ve run, in one place.
          </p>

          {tasks === null && !error && (
            <div className="flex items-center gap-2 text-sm text-ink-soft">
              <Loader2 className="h-4 w-4 animate-spin text-primary" /> Loading tasks…
            </div>
          )}
          {error && (
            <p className="rounded-md border border-destructive/30 bg-flag-wash px-4 py-3 text-sm text-destructive">
              Couldn&apos;t load tasks — refresh to try again.
            </p>
          )}

          {tasks && (
            <>
              <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat label="Tasks" value={String(tasks.length)} />
                <Stat label="Complete" value={String(complete.length)} accent />
                <Stat label="In progress" value={String(inFlight.length)} />
                <Stat
                  label="Avg similarity"
                  value={avgSimilarity != null ? `${avgSimilarity}%` : "—"}
                />
              </div>

              {tasks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-line py-16 text-center">
                  <FileText
                    className="mx-auto mb-3 h-8 w-8 text-ink-faint"
                    strokeWidth={1.25}
                  />
                  <p className="mb-4 text-ink-soft">No comparisons yet.</p>
                  <a
                    href="/"
                    className="inline-block cursor-pointer rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                  >
                    Run your first comparison
                  </a>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tasks.map((task) => (
                    <a
                      key={task.id}
                      href={`/c/${task.id}`}
                      className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-line bg-card p-5 transition-all hover:border-primary/50 hover:shadow-sm"
                    >
                      <div className="min-w-0">
                        <h2 className="truncate font-display font-bold text-ink transition-colors group-hover:text-leaf-deep">
                          {task.title ??
                            `${task.doc_a_name ?? "Primary"} vs ${task.doc_b_name ?? "Comparator"}`}
                        </h2>
                        <p className="mt-0.5 truncate text-xs text-ink-faint">
                          {task.doc_a_name ?? "Primary"} ·{" "}
                          {task.doc_b_name ?? "Comparator"}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        {task.status === "complete" &&
                        task.similarity_score != null ? (
                          <span className="font-mono text-sm font-bold text-leaf-deep">
                            {task.similarity_score}%{" "}
                            <span className="text-[11px] font-normal text-ink-faint">
                              similar
                            </span>
                          </span>
                        ) : (
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                              task.status === "failed"
                                ? "bg-flag-wash text-destructive"
                                : "bg-paper-deep text-ink-soft"
                            }`}
                          >
                            {task.status}
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-ink-faint">
                          {new Date(task.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {failed.length > 0 && (
                <p className="mt-6 text-xs text-ink-faint">
                  {failed.length} failed {failed.length === 1 ? "task" : "tasks"} shown
                  above — open one to retry with new files.
                </p>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-line px-6 py-2.5 text-center font-mono text-xs text-ink-faint">
        <BuildStamp />
      </footer>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
        {label}
      </div>
      <div
        className={`mt-1 font-mono text-2xl font-bold ${accent ? "text-leaf-deep" : "text-ink"}`}
      >
        {value}
      </div>
    </div>
  );
}
