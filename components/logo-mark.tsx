import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * DiffDoc icon mark — a segmented teal ring around two overlapping document
 * pages with a "reviewed" check badge. Same lockup shape as the CliftonAi-CRM
 * mark (broken ring + centered glyph), recolored onto DiffDoc's own teal
 * palette instead of copying CRM's green.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const ring = `${id}-ring`;
  const doc = `${id}-doc`;
  const badge = `${id}-badge`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10", className)}
      role="img"
      aria-label="DiffDoc"
    >
      <defs>
        <linearGradient id={ring} x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="55%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#134E4A" />
        </linearGradient>
        <linearGradient id={doc} x1="14" y1="14" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0B4F49" />
        </linearGradient>
        <linearGradient id={badge} x1="33" y1="35" x2="47" y2="49" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
      </defs>

      {/* Segmented ring */}
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke={`url(#${ring})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="28.8 12"
        transform="rotate(-20 32 32)"
      />

      {/* Back page */}
      <rect
        x="19"
        y="15"
        width="21"
        height="27"
        rx="3.5"
        fill="#99F6E4"
        opacity="0.55"
        transform="rotate(9 32 32)"
      />

      {/* Front page */}
      <rect x="15" y="18" width="23" height="29" rx="3.5" fill={`url(#${doc})`} />
      <rect x="19.5" y="25" width="13" height="2.2" rx="1.1" fill="white" opacity="0.9" />
      <rect x="19.5" y="30.5" width="10" height="2.2" rx="1.1" fill="white" opacity="0.55" />
      <rect x="19.5" y="36" width="9" height="2.2" rx="1.1" fill="#FDE68A" opacity="0.95" />

      {/* Reviewed badge */}
      <circle cx="41" cy="43" r="8" fill={`url(#${badge})`} stroke="white" strokeWidth="2" />
      <path
        d="M37.5 43.2l2.2 2.2 4.3-5"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
