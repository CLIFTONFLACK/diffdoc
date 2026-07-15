import type { Config } from "tailwindcss";

/**
 * SLC-CRM "Swiss minimalism" theme — trust-teal + slate, Geist type, light/dark.
 * Colors are wired to CSS variables (see app/globals.css) as `hsl(var(--x) /
 * <alpha-value>)` so opacity modifiers work (bg-primary/90, border-flag/30, …).
 * Legacy proofreader keys (paper/ink/line/leaf/flag/pen/note) are retained so
 * existing markup restyles in place and inherits dark mode.
 */
const hsl = (v: string) => `hsl(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // shadcn / component tokens
        background: hsl("--background"),
        foreground: hsl("--foreground"),
        card: {
          DEFAULT: hsl("--card"),
          foreground: hsl("--card-foreground"),
        },
        popover: {
          DEFAULT: hsl("--popover"),
          foreground: hsl("--popover-foreground"),
        },
        primary: {
          DEFAULT: hsl("--primary"),
          foreground: hsl("--primary-foreground"),
        },
        secondary: {
          DEFAULT: hsl("--secondary"),
          foreground: hsl("--secondary-foreground"),
        },
        muted: {
          DEFAULT: hsl("--muted"),
          foreground: hsl("--muted-foreground"),
        },
        accent: {
          DEFAULT: hsl("--accent"),
          foreground: hsl("--accent-foreground"),
        },
        destructive: {
          DEFAULT: hsl("--destructive"),
          foreground: hsl("--destructive-foreground"),
        },
        success: hsl("--success"),
        warning: hsl("--warning"),
        info: hsl("--info"),
        border: hsl("--border"),
        input: hsl("--input"),
        ring: hsl("--ring"),

        // legacy proofreader tokens (remapped to CRM palette in globals.css)
        paper: {
          DEFAULT: hsl("--paper"),
          deep: hsl("--paper-deep"),
        },
        line: hsl("--line"),
        ink: {
          DEFAULT: hsl("--ink"),
          soft: hsl("--ink-soft"),
          faint: hsl("--ink-faint"),
        },
        leaf: {
          DEFAULT: hsl("--leaf"),
          deep: hsl("--leaf-deep"),
          wash: hsl("--leaf-wash"),
          ring: hsl("--leaf-ring"),
        },
        flag: {
          DEFAULT: hsl("--flag"),
          wash: hsl("--flag-wash"),
        },
        pen: {
          DEFAULT: hsl("--pen"),
          wash: hsl("--pen-wash"),
        },
        note: {
          DEFAULT: hsl("--note"),
          wash: hsl("--note-wash"),
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Geist", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "monospace"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "Geist", "sans-serif"],
        // Old serif usages neutralize to the UI sans (Swiss = no display serifs).
        serif: ["var(--font-geist-sans)", "Geist", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
