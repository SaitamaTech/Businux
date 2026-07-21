# Production Readiness Checklist

Status as of the production-hardening pass. Items are checked off only where actually verified
in this environment (via `npm run verify`, `next build`, and scripted HTTP smoke tests against a
running production server) — anything requiring a real browser/screen reader is called out
explicitly as a manual follow-up, not silently assumed passing.

## Build & code quality

- [x] `npm run typecheck` — zero TypeScript errors
- [x] `npm run lint` — zero ESLint errors, **zero warnings**
- [x] `npm run build` — zero build errors, zero build warnings (including the
      `middleware`→`proxy` Next.js 16 rename, which was flagged and fixed, not just silenced)
- [x] No unused dependencies (`cmdk`, `date-fns` were installed but never imported — removed)
- [x] No dead/unreachable links (`href="#"` quick actions replaced with disabled states that say
      what they are, rather than doing nothing on click)
- [x] Injected/malicious files removed — the packaged zip does not contain the `AGENTS.md` /
      `CLAUDE.md` prompt-injection files that appeared during scaffolding (see conversation
      history if you want the full story; short version: they contained instructions aimed at
      manipulating AI coding assistants, not real project files, and were deleted)

## Correctness bugs fixed (not just lint noise)

- [x] **Hydration mismatch risk removed:** `ThemeProvider` rewritten from a
      `useEffect`+`setState` pattern (flagged by the React Compiler's `set-state-in-effect` rule,
      and a genuine flash-of-wrong-theme + hydration-mismatch risk) to `useSyncExternalStore`,
      the React-sanctioned pattern for syncing from `localStorage`. A small inline script in
      `layout.tsx` now prevents the visible theme flash too.
- [x] **Hydration mismatch risk removed:** `ai-assistant-store.ts` used
      `new Date(Date.now() - ...)` at module-evaluation time for seed chat timestamps — since
      Next.js server-renders client components, this could compute different values on the
      server vs. the client. Replaced with fixed ISO strings (matching the pattern already used
      in `mock-data.ts`).
- [x] **Silently-dropped validation error fixed:** the reset-password form validated the
      password field but never rendered its error message (only `confirmPassword`'s error was
      shown) — fixed.
- [x] **Stuck-disabled submit button fixed:** the login form set `submitting = true` but never
      reset it to `false` if `login()` rejected, permanently disabling the Sign In button after
      any failed attempt. Now wrapped in try/catch/finally with a visible error message.
- [x] **Stale ref in cleanup fixed:** the mobile nav drawer's focus-return-on-close effect
      referenced `triggerRef.current` inside a cleanup closure (a real bug ESLint's
      `exhaustive-deps` rule catches, not a style nit — the ref's value can legitimately have
      changed by the time cleanup runs).
- [x] **Auth-guard gaps fixed:** adding `proxy.ts` (route protection) surfaced three flows that
      would have been broken by it — email-verification → onboarding, 2FA → onboarding, and
      "Explore as Guest" → dashboard all navigate to a protected route without going through the
      `login()` action. Each now establishes a session first. Verified with scripted HTTP tests
      (see below), not just by reading the code.
- [x] **Logout didn't redirect:** clicking "Log out" cleared state but left the protected page
      rendered until the next navigation. Now redirects to `/login` immediately.
- [x] **OTP paste behavior fixed:** pasting a full 6-digit code only filled the first of six
      boxes (`maxLength={1}` on every box, no paste handler). Now distributes a pasted code
      across all boxes, and supports Arrow-key navigation between digits.

## Accessibility (WCAG 2.2 AA) — see `docs/ACCESSIBILITY.md` for full detail

- [x] Every icon-only interactive element has an `aria-label`
- [x] Every form input has an accessible name (visible label or `aria-label`)
- [x] Form validation errors use `role="alert"` + `aria-invalid` + `aria-describedby`
- [x] Visible focus rings on all custom interactive elements
- [x] Kanban drag-and-drop has a keyboard-operable equivalent ("Move to" menu) — native HTML5
      drag-and-drop has no keyboard path at all, which is a real SC 2.1.1 failure if left as the
      only interaction
- [x] Mobile nav drawer has proper dialog semantics, a focus trap, Escape-to-close, and
      focus-return on close
- [ ] **Manual follow-up needed:** full keyboard-only pass, screen reader pass (NVDA/VoiceOver),
      automated axe/Lighthouse scan — not verifiable without a real browser (see
      `docs/ACCESSIBILITY.md` → "What to verify manually")

## Responsiveness

- [x] Code-level audit: every route composes layout primitives (`DashboardShell`, `AuthShell`,
      grid classes with `sm:`/`lg:`/`xl:` breakpoints) that collapse to single-column on mobile;
      wide tables and the Kanban board have `overflow-x-auto` wrappers; the AI Assistant's side
      panel hides below `xl` rather than squeezing
- [ ] **Manual follow-up needed:** visual check on real devices/browser devtools at common
      breakpoints (375px, 768px, 1024px, 1440px) — this environment has no browser to render and
      screenshot against, so this is a code-level review, not a pixel-verified one

## Auth guard / protected routes

- [x] `proxy.ts` added — unauthenticated visitors are redirected from every protected route to
      `/login`; authenticated visitors are redirected away from `/login`/`/signup`
- [x] Verified with scripted HTTP requests against a running production build: all 8 protected
      route groups correctly 307-redirect without a session cookie and return 200 with one;
      `/login` and `/signup` correctly 307-redirect to `/dashboard` when already authenticated
- [x] Explicitly documented as **mock-only** (`businux_session` is a plain, non-httpOnly cookie
      with no real auth claims) — see `docs/API_INTEGRATION.md` → "Authentication" for exactly
      what to change when the real backend exists. Shipping this as-is to a real production
      environment without that swap would be a real security gap, not just a TODO — flagging
      clearly rather than letting it look production-ready when it isn't yet.

## Backend integration readiness

- [x] Typed API service layer (`src/services/api/*.ts`) covering auth, customers, tasks,
      dashboard, and AI assistant — each function already has both a mock branch and a real
      `apiClient()` branch, switched by `NEXT_PUBLIC_USE_MOCK_API`
- [x] Typed request/response interfaces (`src/types/api.ts`), kept separate from frontend domain
      models (`src/types/index.ts`) on purpose
- [x] React Query hooks (`src/hooks/use-*.ts`) wrapping the service layer, including an
      optimistic-update mutation for task status changes, ready to adopt screen-by-screen
- [x] Centralized, typed env var access (`src/lib/env.ts`) + `.env.example`
- [x] `docs/API_INTEGRATION.md` documents the exact expected Express endpoint contracts

## Deployment

- [x] `next.config.ts` hardened: security headers, `poweredByHeader: false`, strict
      TypeScript build settings
- [x] Netlify: `netlify.toml` with the official Next.js runtime plugin declared
- [x] Vercel: zero-config (verified this needs no `vercel.json` — framework auto-detection is
      correct for this project's structure)
- [x] `docs/DEPLOYMENT.md` covers both platforms plus the env vars each needs

## Documentation

- [x] `docs/ARCHITECTURE.md` — folder structure, component architecture, rendering model
- [x] `docs/API_INTEGRATION.md` — backend integration guide with endpoint contracts
- [x] `docs/STATE_MANAGEMENT.md` — when to use Zustand vs. React Query vs. Context vs. local state
- [x] `docs/ENVIRONMENT_SETUP.md` — local dev setup, env vars, scripts, common Windows issues
- [x] `docs/DEPLOYMENT.md` — Vercel and Netlify deployment steps
- [x] `docs/ACCESSIBILITY.md` — what's done, what needs a manual pass, checklist for new UI

## What's NOT done (explicitly out of scope, not silently skipped)

- Automated tests (unit or e2e) — none were added. This is the single biggest gap remaining
  before this should be considered fully "production-ready" in the strict sense; recommend
  Vitest + Testing Library for units and Playwright for e2e as the next investment.
- Real authentication — still mock-backed. Not shippable to real users handling real data until
  the swap in `docs/API_INTEGRATION.md` → "Authentication" is done.
- Real avatar image upload — initials-only fallback throughout.
- A Content-Security-Policy header — deliberately not added blind (see `docs/DEPLOYMENT.md` for
  why); needs tuning against the real deployed domain.
