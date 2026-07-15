"use client";

import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Side = "a" | "b";

/**
 * Two-document upload + compare — the onboarding hook, embedded on the homepage.
 * Files go straight to Supabase Storage via signed URLs (Vercel's 4.5 MB body
 * limit would reject large docs); the server then validates the bytes and kicks
 * off processing. Comparing is free and anonymous — the sign-up wall lives on the
 * result screen (download / comments / edits).
 */
export function UploadWidget({
  className,
  heading,
}: {
  className?: string;
  heading?: ReactNode;
}) {
  const router = useRouter();
  const [files, setFiles] = useState<{ a: File | null; b: File | null }>({
    a: null,
    b: null,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCompare = files.a && files.b && !busy;

  async function compare() {
    if (!files.a || !files.b) return;
    setBusy(true);
    setError(null);
    try {
      const init = await postJson("/api/upload/init", {
        doc_a: { name: files.a.name, size: files.a.size },
        doc_b: { name: files.b.name, size: files.b.size },
      });

      const { getBrowserClient } = await import("@/lib/supabase/client");
      const storage = getBrowserClient().storage.from("documents");
      const [upA, upB] = await Promise.all([
        storage.uploadToSignedUrl(init.doc_a.path, init.doc_a.token, files.a),
        storage.uploadToSignedUrl(init.doc_b.path, init.doc_b.token, files.b),
      ]);
      const upError = upA.error ?? upB.error;
      if (upError) throw new Error(`Upload failed: ${upError.message}`);

      const done = await postJson("/api/upload/complete", {
        comparison_id: init.comparison_id,
        doc_a_name: files.a.name,
        doc_b_name: files.b.name,
      });

      // Fire the processing pipeline without awaiting — the comparison page
      // polls status and self-heals if this trigger is lost.
      void fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comparison_id: done.comparison_id }),
      });

      router.push(`/c/${done.comparison_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6",
        className,
      )}
    >
      {heading && (
        <div className="mb-5 flex items-center gap-2 border-b pb-4 text-sm font-medium text-ink-soft">
          {heading}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FileSlot
          side="a"
          label="Primary"
          hint="your reference document"
          file={files.a}
          disabled={busy}
          onSelect={(f) => setFiles((prev) => ({ ...prev, a: f }))}
        />
        <FileSlot
          side="b"
          label="Comparator"
          hint="the document to compare"
          file={files.b}
          disabled={busy}
          onSelect={(f) => setFiles((prev) => ({ ...prev, b: f }))}
        />
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-destructive/30 bg-flag-wash px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-5 flex flex-col items-center gap-2">
        <Button
          onClick={compare}
          disabled={!canCompare}
          size="lg"
          className="w-full sm:w-auto"
        >
          {busy ? (
            <>
              <Loader2 className="animate-spin" /> Uploading…
            </>
          ) : (
            <>Compare documents</>
          )}
        </Button>
        <p className="text-xs text-ink-faint">
          Free · .docx or .pdf · up to 25 MB each · no sign-up to try
        </p>
      </div>
    </div>
  );
}

/**
 * POST JSON and parse defensively — platform-level errors (e.g. proxy limits)
 * return plain text, which must surface as a readable message.
 */
async function postJson(
  url: string,
  payload: unknown,
): Promise<Record<string, any>> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body: Record<string, any> | null = null;
  try {
    body = JSON.parse(text);
  } catch {
    // not JSON — fall through to the status-based error below
  }
  if (!res.ok) {
    throw new Error(
      body?.error ?? `Request failed (${res.status}): ${text.slice(0, 120)}`,
    );
  }
  if (!body) throw new Error("Unexpected non-JSON response from the server.");
  return body;
}

function FileSlot({
  side,
  label,
  hint,
  file,
  disabled,
  onSelect,
}: {
  side: Side;
  label: string;
  hint: string;
  file: File | null;
  disabled: boolean;
  onSelect: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (disabled) return;
        const dropped = e.dataTransfer.files[0];
        if (dropped) onSelect(dropped);
      }}
      className={cn(
        "rounded-lg border bg-background p-5 transition-colors",
        dragging
          ? "border-primary ring-2 ring-leaf-ring"
          : file
            ? "border-primary/50"
            : "border-dashed border-input",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".docx,.pdf"
        className="hidden"
        disabled={disabled}
        onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
      />
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-leaf-deep">
          {label}
        </span>
        <span className="text-xs text-ink-faint">{hint}</span>
      </div>
      {file ? (
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 shrink-0 text-ink" strokeWidth={1.25} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ink">{file.name}</div>
            <div className="font-mono text-xs text-ink-faint">
              {(file.size / 1024).toFixed(0)} KB
            </div>
          </div>
          <button
            onClick={() => onSelect(null)}
            disabled={disabled}
            aria-label={`Remove document ${side.toUpperCase()}`}
            className="rounded p-1 text-ink-faint transition-colors hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="flex w-full flex-col items-center gap-2 py-4 text-ink-soft transition-colors hover:text-ink"
        >
          <Upload className="h-6 w-6" strokeWidth={1.25} />
          <span className="text-sm">
            Drop a file here or{" "}
            <span className="font-medium text-primary underline decoration-2 underline-offset-2">
              browse
            </span>
          </span>
          <span className="font-mono text-xs text-ink-faint">.docx / .pdf</span>
        </button>
      )}
    </div>
  );
}
