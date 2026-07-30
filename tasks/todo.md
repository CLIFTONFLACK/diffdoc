# DiffDoc → GetBrian brand rebuild (2026-07-29)

Source of truth: `C:\Users\clift\Ai-Projects\CliftonAi\docs\brand-book.html`.
Reference implementation: the Brian marketing site (`C:\Users\clift\Ai-Projects\CliftonAi`).

## Decisions taken

- **Scope**: everything — marketing homepage *and* the signed-in app.
- **Lockup**: Brian mark + "DiffDoc" product word, plus a "Built by Brian ↗"
  credit linking to getbrian.xyz. Replaces the CliftonAi wordmark and the
  "Part of CliftonAi" / "More from CliftonAi" bands.
- **Gold discipline** (brand book ch. 03): gold is a *fill and logotype* colour.
  `--primary` is gold with **ink** text on top (5.8:1). Small gold text uses
  Gold Deep `#8A6520` only. Reversed artwork uses Gold Light `#E0B84F`.
- **Functional diff colours are pulled out of the brand ramp** so gold always
  means "brand", never "a change": insertion → green, deletion → red, tracked
  edit → violet `#6A1B9A` (DiffDoc's own accent in Brian's product catalogue),
  comment → navy-bright.
- **Dark mode is kept.** The brand book ships its own dark palette
  (`--paper #14172B`, `--ink #F3EFE4`, `--blue #97A7D6`, `--spark #E0B83F`);
  the dark theme is derived from those values rather than invented.
- **The office stock photo goes.** A CliftonAi-CRM leftover; the Brian system is
  white ground + navy/gold + glass, no stock photography.

## Tasks

- [x] 1. Brand assets — Brian mark/wordmark/badge SVGs + favicons into `public/brand/`
- [x] 2. Tokens — rewrite `app/globals.css` + `tailwind.config.ts` onto the navy/gold ramp
- [x] 3. Type — DM Sans body + Space Grotesk headings; metadata in Brian's voice
- [x] 4. Logo — rebuild `components/logo.tsx` (display cut ≥40px, compact <40px, reversed in dark)
- [x] 5. Marketing homepage — rebuild `app/page.tsx`
- [x] 6. Pricing section — glass cards, gold CTA on the featured tier
- [x] 7. Auth screens — `auth-panel.tsx`, `signup-prompt.tsx`
- [x] 8. Upload widget + `/c/[id]` loading states
- [x] 9. Comparison view — the main signed-in surface
- [x] 10. Report view
- [x] 11. Legacy `/demo` workspace — mechanical stone→token swap
- [x] 12. Verify — `next build && next start`, contrast/overflow/tap-target audit, light + dark

## Review

**Gates**: typecheck clean, lint clean, 72/72 tests pass, production build succeeds
(13/13 static pages).

**Verified against `next start`** (not `next dev` — lesson 5), on `/`, `/login`,
`/signup`, `/tasks`, `/demo` and `/c/<bad-id>`, in light and dark, at 375 / 768 /
1440:

- 0 WCAG AA contrast failures (scripted audit over every rendered text node,
  compositing alpha against the real ancestor ground; the navy gradient is
  measured against its *lightest* stop, Navy Bright, not the navy it reads as)
- no horizontal scroll at any width; no tap target under 32px
- every `<img>` has alt, every icon-only button has an `aria-label`
- correct mark cut per context: display ≥40px, compact below, `-white` in dark

**Three token bugs the audit caught and fixed:**

1. `--ink-faint` at the Brian site's `#6B7089` measures **4.49:1** against
   `--paper-deep` — a hundredth under AA, and that's where most of the small
   print sits. Darkened to 46% L.
2. Dark `--ink-faint` at 61% L measures **4.38:1** against `--muted`, the
   lightest dark ground. Raised to 64% L.
3. `text-white/65` on the final CTA band is **3.63:1** over Navy Bright. Raised
   to `/85`.

**Colour-semantics fixes made along the way** (pre-existing, surfaced by
separating brand from function):

- The "Changed" filter chip reused the "Added" green, so the two were
  indistinguishable when active → now violet, matching the register's left
  border and the proof-mark glyph.
- `EntryIcon` coloured every non-deletion mark green, including replacements.
- `<Pencil className="text-pen-wash">` used a *wash* as a text colour —
  effectively invisible on white.
- Two CTA hovers used `bg-primary/90` (a lighter gold, which pushes the ink
  label the wrong way) instead of Gold Hover.

**Known gaps / decisions for you:**

- `ComparisonView` with real data could not be rendered here — Supabase is
  unreachable from this sandbox (`/api/comparisons` → `fetch failed`). Its
  restyle is covered by build/lint/typecheck and by the `/demo` mockup, which
  exercises the same surfaces, but the live diff panes are unverified.
- Pricing is still **USD** ($0/$5/$25) while Brian's positioning is UK SMB.
  That's a billing decision, not a brand one, so the numbers are untouched.
- `public/landing/` (the CliftonAi-era office stock photos + `clifton-icon.webp`)
  is now unreferenced. Deletion was blocked by the sandbox — safe to remove.
- `public/brand/built-by-badge.html` was copied across for reference. It's the
  badge for *client* sites; DiffDoc is Brian's own product and uses the verbal
  "Built by Brian" credit instead, so this file is inert and can go.

---

# DiffDoc — Phase 1 remainder

Picking up from the handover. Phase 0 (scaffold) + Phase 1a (parse + literal diff lib) are done and on GitHub.

## Plan

- [x] Set up local toolchain (Node 24 LTS + npm via winget; gh installing)
- [x] Clone `slapharma/DiffDoc` locally, feature branch `claude/build-diffdoc-pr90b`
- [x] **Step 1 — Supabase project + schema** (eu-west-2, project `sngukuhttvamqtiuuwpz`)
  - [x] Create project ($0/mo, confirmed)
  - [x] Apply migration: 8 core tables + enums + RLS + `documents` storage bucket
  - [x] Verify tables + advisors (only expected INFO: RLS-enabled-no-policy)
- [x] Verify baseline: `npm install`, then `npm test` (9/9 pass)
- [x] **Step 2 — Upload API route** (`app/api/upload/route.ts`) — committed locally (2 commits)
  - [x] `@supabase/supabase-js` dep + service-role server client
  - [x] File validation (type via extension + magic bytes, 25 MB cap)
  - [x] SHA-256 hashing, write both files to Storage, insert `comparisons` (pending)
  - [x] Write `comparison_created` audit event + orphan cleanup on failure
  - [x] `npm run typecheck` + `lint` + `test` + `build` all green
  - [x] Unit tests for `validateUpload` (9 cases incl. spoofed extensions) — 18/18 total
  - [x] **Pushed** to `origin/claude/build-diffdoc-pr90b` (Credential Manager had cached creds) — commits now part of draft PR #2
  - [ ] **Live smoke test against Supabase** — blocked on SUPABASE_SERVICE_ROLE_KEY (user pastes into `.env.local`, NOT into chat)
  - [ ] Retitle PR #2 to cover schema + upload work — needs gh/API auth (token extraction from GCM is off-limits; winget gh install failed twice)
- [x] **Step 3 — Processing pipeline** (done as code; Railway deployment still pending user account)
  - [x] `lib/pipeline/process.ts` — Storage download → parse → literal diff → differences rows + similarity + view_mode + status transitions + audit events (framework-free, Railway-ready)
  - [x] `app/api/process/route.ts` — interim Vercel-hosted trigger, maxDuration 60
  - [x] View-mode thresholds (>75 side-by-side, 40–75 aligned, <40 summary-first) + migration 0002 (doc names)
  - [x] 6 new tests (view-mode boundaries, chunk→row mapping, row cap) — 24/24 total
- [x] **Step 4 — Wire real data into workspace UI**
  - [x] `/` = real upload screen; `/c/[id]` polls then renders real diff; mockup preserved at `/demo`
  - [x] `app/api/comparisons/[id]/route.ts` serves comparison + differences + chunk stream
  - [x] Verified in dev server: upload page + demo render, invalid-id error path returns 400 and polling stops
- [x] All gates green (typecheck/lint/24 tests/build); pushed `9efd743` → PR #2

- [x] **Live smoke test** (2026-06-10, local dev against live Supabase) — all three paths verified:
  - identical docx pair → similarity 100, side_by_side, 0 differences
  - docx vs pdf → similarity 0, summary_first, 5 differences, UI renders register + panes
  - malformed pdf → status failed cleanly, audit event written, no partial data
  - DB state confirmed via SQL: 3 comparisons / 5 differences / 6 audit events / 8 storage objects

## Done after launch (2026-06-10)
- [x] PR #2 merged; env vars set in Vercel; production live and verified
- [x] Hotfix: pdf.js v1 + Buffer + supabase-js = "bad XRef entry" (pass Uint8Array); Next fetch caching froze status polling (no-store on service client, force-dynamic on polled routes)
- [x] **UX round 1** (commit d449749, deployed):
  - Rich rendering — paragraph skeletons stored by pipeline; panes render headings/lists/quotes with highlights via `lib/diff/project.ts`; old comparisons fall back to flat view
  - Local risk flags — numbers/dates/negations (`lib/pipeline/flags.ts`, migration 0003 `flag_reasons`); register shows reasons + Flagged/Added/Removed filter chips
  - Self-healing processing — page triggers pending comparisons; pipeline claims work atomically (no duplicate rows on double trigger)
  - Recent comparisons list on home page (`GET /api/comparisons`, global until auth)
  - Bug found en route: `groupIntoSections` lost heading offsets — fixed in parse-docx

## Next
1. **Railway worker** for heavy docs (>60s) — needs Railway account/token from user
2. **Phase 2 AI layer** — needs Anthropic + Voyage AI keys
3. Phase 3 workspace (comments/edits), Phase 4 export bundle, Phase 5 auth/Stripe

## Open items needing the user
- `SUPABASE_SERVICE_ROLE_KEY` — copy from dashboard → Project Settings → API (not exposed via MCP)
- Railway project/token (Step 3)
- Anthropic + Voyage AI keys (Phase 2)

## Notes / decisions this session
- DB stack: confirmed **Supabase** (free in SLA Team org; bundles storage + auth that Neon lacks)
- Schema mirrors `lib/` internal representation: `diff_op` enum = DiffOp; diff locations stored as jsonb `{offset,length}`
- RLS enabled, no policies yet — Phase 1 access is server-side via service-role key; policies land with auth (Phase 5)
