import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

/**
 * Compact "DiffDoc" logo lockup for in-app and secondary placements (headers,
 * footers, auth, tasks). Same mark + two-tone Space Grotesk wordmark as the
 * marketing `Logo`, just sized down. For the big marketing hero use `Logo`.
 *
 * `size` sets the wordmark text size (a Tailwind text-* class); the mark scales
 * to match. Pass `iconClassName` to override the mark size independently.
 */
export function Wordmark({
  size = "text-2xl",
  iconClassName,
  className,
  href = "/",
}: {
  size?: string;
  iconClassName?: string;
  className?: string;
  href?: string | null;
}) {
  const markSize = MARK_SIZE[size] ?? "h-7 w-7";
  const content = (
    <>
      <LogoMark className={cn(markSize, "shrink-0", iconClassName)} />
      <span className={cn("font-display font-bold leading-none tracking-tight", size)}>
        <span className="text-ink">Diff</span>
        <span className="text-primary">Doc</span>
      </span>
    </>
  );

  const base = cn("inline-flex items-center gap-2", className);

  if (href === null) {
    return <span className={base}>{content}</span>;
  }
  return (
    <a href={href} className={cn(base, "cursor-pointer")}>
      {content}
    </a>
  );
}

/** Pair the mark height to the wordmark text size so the lockup stays balanced. */
const MARK_SIZE: Record<string, string> = {
  "text-lg": "h-6 w-6",
  "text-xl": "h-7 w-7",
  "text-2xl": "h-8 w-8",
  "text-3xl": "h-10 w-10",
  "text-4xl": "h-12 w-12",
  "text-5xl": "h-14 w-14",
};
