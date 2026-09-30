import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

/**
 * `viewportFit: "cover"` is what makes `env(safe-area-inset-*)` resolve to a
 * real value instead of 0 — without it, bottom-docked UI sits under the iPhone
 * home indicator. `userScalable` is left alone so pinch-zoom stays available.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Bricolage Grotesque for headings and the wordmark (matches getbrian.xyz), DM Sans for body. Geist Mono
// stays for the diff gutters, similarity figures and file paths — that's a
// functional need, not brand type.
// Variable font: no `weight` list, so 600-800 all come from one file. The opsz
// axis is what gives it the tight display cut at large sizes.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = "https://diffdoc.getbrian.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Title convention matches the sibling product sites (flow.getbrian.xyz:
  // "ContentFlow, built by Brian — …").
  title: {
    default: "DiffDoc, built by Brian — see exactly what changed",
    template: "%s · DiffDoc",
  },
  description:
    "Drop in two versions of a document. DiffDoc reads both, scores how far they've drifted, and marks up every insertion, deletion and edit. Built by Brian.",
  openGraph: {
    title: "DiffDoc, built by Brian — see exactly what changed",
    description:
      "One clause changed. Did anyone catch it? DiffDoc marks up exactly what moved between two versions of a document, then lets you comment, edit and export it.",
    url: siteUrl,
    siteName: "DiffDoc",
    type: "website",
  },
};

// Apply the saved/system theme before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${GeistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-background text-ink">{children}</body>
    </html>
  );
}
