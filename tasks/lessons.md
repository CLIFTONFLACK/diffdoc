# Lessons

## 2026-06-10 — "review and improve your last response"

1. **Never ask the user to paste secrets into chat.** Point them at the exact
   file/line to edit themselves (`.env.local`), or to the dashboard. Chat
   transcripts are not a secrets channel.
2. **Attempt before declaring a blocker.** I reported "GitHub auth needed" without
   trying `git push` — Git Credential Manager (configured system-wide on Windows)
   had cached credentials and the push just worked. Verify a blocker is real by
   attempting the action cheaply first.
3. **Pure functions get tests in the same commit.** `validateUpload` shipped
   untested despite being trivially testable. If it has no I/O, there is no
   excuse to defer the test.
4. **Single-branch workflow means pushes join the open draft PR.** Pushing more
   commits to `claude/build-diffdoc-pr90b` extends PR #2 — keep its title/body
   in sync with the actual contents.

## 2026-06-10 — production-only bugs after merge

5. **`next dev` is not verification for API routes.** Two bugs shipped that dev
   mode masked: webpack's production bundle broke pdf-parse's vendored pdf.js,
   and Next's default fetch() caching in route handlers froze polled Supabase
   reads. Smoke tests must run against `next build && next start` before
   declaring a route works.
6. **Next caches fetch() GETs in route handlers by default** — any supabase-js
   read (PostgREST or Storage) can be silently replayed stale. The service
   client pins `cache: "no-store"` globally; keep it that way.
7. **pdf.js v1 + Node Buffer + supabase-js loaded = "bad XRef entry" on valid
   PDFs.** Pass a plain `new Uint8Array(buffer)` to pdf-parse, never a Buffer.
   Found by bisecting: same bytes, same parser, different container.
8a. **Never edit JSON files with PowerShell `Set-Content -Encoding utf8`.**
   On Windows PowerShell 5.1 it writes a UTF-8 BOM, which broke Vercel's
   package.json parsing (Node version detected as "") and failed the
   deploy. Use the Edit tool or strip with `sed -i '1s/^\xEF\xBB\xBF//'`.
   Also: always check deployment state after pushing — a CDN cache HIT of
   the old version can masquerade as a successful deploy.

8. **When local and prod disagree, compare hashes first.** Confirming the
   stored bytes were identical eliminated upload/transport corruption in one
   query and pointed the investigation at the runtime.

## 2026-07-29 — GetBrian brand rebuild

9. **Toggling `.dark` at runtime gives stale `getComputedStyle` results.**
   Adding the class via `javascript_tool` and measuring in the same session
   reported dark custom properties on `:root` but *light* computed colours on
   descendants — 21 phantom contrast failures. Nothing was wrong. To verify a
   theme, persist it (`localStorage.setItem('theme','dark')`) and **reload**, so
   the pre-paint script applies it before first paint.
10. **`pkill -f "next start"` doesn't kill an npx-spawned Next server.** The
   replacement silently died on `EADDRINUSE` and the old build kept serving, so
   an edit looked like it hadn't compiled. Always check the served HTML for the
   change, or start on a fresh port; `netstat -ano | grep :PORT` + `taskkill
   //PID //F` is what actually stops it on Windows.
11. **Audit contrast against the real ancestor ground, not the page.** A naive
   walk that only looks at `background-color` misses `background-image` — the
   navy gradient band read as white and flagged every white heading on it.
   Special-case gradients to their *lightest* stop, which is the worst case.
12. **Brand tokens copied from a sibling repo still need re-measuring in situ.**
   `#6B7089` clears AA on white but measures 4.49:1 on the panelled sections
   where the small print actually lives. Same hex, different ground, different
   answer.
13. **Separating a brand ramp from functional colours surfaces latent bugs.**
   Pulling green out of the chrome exposed a filter chip that reused the "Added"
   colour for "Changed", a glyph that coloured replacements as additions, and a
   `-wash` token used as a text colour. If one colour is doing two jobs, at
   least one of them is probably being done wrong.

14. **`gh` holds several accounts and git uses whichever is *active*.** A push
   that worked earlier failed with `Permission to CLIFTONFLACK/diffdoc denied
   to slapharma` because the active account had flipped. Git is wired to
   `gh auth git-credential`, so it presents the active account, not the one
   that owns the remote. Fix: `gh auth switch --user <owner>`. Check
   `gh auth status` before blaming the remote or the token.
15. **A degenerate viewport (`clientWidth === 0`) silently breaks media
   queries and overflow checks.** When the Browser pane isn't displayed,
   `min-[520px]` evaluates false and `scrollWidth > clientWidth` reports a
   phantom horizontal scroll. Always `resize_window` to an explicit size
   before asserting anything responsive.
16. **Match a design system by measuring the reference, not by eye.** Reading
   the computed styles off flow.getbrian.xyz gave the exact spec (40px mark,
   600/1.4rem/-0.02em, Gold Deep on "Brian") — and revealed that a *second*
   sibling site, crm.getbrian.xyz, implements the same lockup with full Brian
   Gold at 18px, which is 3.1:1 and fails AA. Two sites disagreed; measuring
   showed which one to copy.
17. **Whole-percent HSL is not lossless for brand hexes.** Every brand anchor
   rounded 1-2 RGB units off the sampled value. Invisible in isolation, but
   the wordmark is live text sitting against an SVG using the literal hex.
   One decimal place lands them exactly.

## 2026-07-29 — "the site isn't working"

18. **Verifying presentation is not verifying the app.** I audited contrast,
   type, layout and assets exhaustively across every route and both themes,
   and called it verified — while the database behind the whole product was
   deleted and every API route was 500ing. Rendering is not function. When a
   deploy is declared good, at least one call down the real data path has to
   have succeeded.
19. **An error handler that flattens causes will cost hours.**
   `if (error || !comparison) -> 404 "Comparison not found."` turned a total
   outage into a tidy, plausible error screen. I saw that screen earlier in
   this very session, on a deliberately bad id, and recorded it as *correct
   behaviour*. Match the specific error (PostgREST's PGRST116 for "no rows");
   anything else is a fault and must say so.
20. **Two endpoints disagreeing is a signal, not noise.** The list route said
   500 `fetch failed` while the `[id]` route said a clean 404 — same database,
   same instant. That contradiction was the whole diagnosis, and it was
   visible long before I acted on it.
21. **`nslookup`'s exit code lies; read its output.** `if nslookup host` passed
   for a host whose answer was literally "Non-existent domain", which briefly
   pointed the investigation the wrong way. Grep the output.
22. **Stale memory named the wrong database.** Memory said the DiffDoc DB was
   `sngukuhttvamqtiuuwpz`; `.env.local` said `pjcbkqbxajtykwfgawli`. Config on
   disk is ground truth for what an app actually talks to — check it before
   acting on a remembered identifier.
23. **Hand the user PowerShell, not bash.** I gave
   `cd … && VAR=value node script.mjs`, which is a parser error in Windows
   PowerShell 5.1 — no `&&`, no inline env prefix. This machine's shell is
   PowerShell; my own Bash tool is a separate POSIX environment and its syntax
   does not transfer. Correct shape:
   `cd "C:\path"; $env:VAR='value'; node script.mjs; Remove-Item Env:\VAR`
   — and run it through the PowerShell tool first to confirm it parses.
24. **Clear a secret out of `$env:` after using it.** `$env:X='secret'` persists
   for the whole shell session, so any later child process inherits it. Append
   `Remove-Item Env:\X`.
