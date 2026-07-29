import type { Config } from "tailwindcss";

/**
 * The GetBrian brand system — navy + gold on white, Space Grotesk headings over
 * DM Sans body. Colors are wired to CSS variables (see app/globals.css) as
 * `hsl(var(--x) / <alpha-value>)` so opacity modifiers work (bg-primary/90,
 * border-flag/30, …).
 *
 * Two scales, deliberately separate:
 *   • `navy` / `gold` — brand. Structure, headings, CTAs, the mark.
 *   • `leaf` / `flag` / `pen` / `note` — functional diff colours. Kept out of
 *     the brand ramp so a gold accent never reads as "this text changed".
 */
const hsl = (v: string) => `hsl(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // brand ramp — see the gold-discipline note in app/globals.css
        navy: {
          DEFAULT: hsl("--navy"),
          mid: hsl("--navy-mid"),
          soft: hsl("--navy-soft"),
          bright: hsl("--navy-bright"),
        },
        gold: {
          DEFAULT: hsl("--gold"),
          hover: hsl("--gold-hover"),
          deep: hsl("--gold-deep"),
          light: hsl("--gold-light"),
        },

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

        // paper/ink + the functional diff scales
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
        // Brand book ch. 03: Space Grotesk headings, DM Sans body. Mono is a
        // functional need (diff gutters, hashes, file paths), not brand type —
        // Geist Mono stays.
        sans: ["var(--font-dm-sans)", "DM Sans", "-apple-system", "sans-serif"],
        display: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "var(--font-dm-sans)",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "monospace"],
        // Old serif usages neutralize to the body face.
        serif: ["var(--font-dm-sans)", "DM Sans", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
    },
  },
  plugins: [],
};

export default config;
