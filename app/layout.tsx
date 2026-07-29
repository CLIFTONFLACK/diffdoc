import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Brand book ch. 03: Space Grotesk for headings, DM Sans for body. Geist Mono
// stays for the diff gutters, similarity figures and file paths — that's a
// functional need, not brand type.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = "https://diffdoc.cliftonai.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DiffDoc — see exactly what changed",
    template: "%s · DiffDoc",
  },
  description:
    "Drop in two versions of a document. DiffDoc reads both, scores how far they've drifted, and marks up every insertion, deletion and edit. Built by Brian.",
  openGraph: {
    title: "DiffDoc — see exactly what changed",
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
      className={`${dmSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-background text-ink">{children}</body>
    </html>
  );
}
