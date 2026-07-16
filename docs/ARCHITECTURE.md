# Architecture

## Folder structure

```
src/
  app/                        Next.js App Router routes ONLY — no business logic here.
                               Each page.tsx composes components from components/ and features/.
    (auth)/                   Route group: login, signup, verify-email, forgot/reset password, 2FA
                               (parentheses = doesn't affect the URL, just groups related routes)
    (onboarding)/onboarding/  Business setup wizard + completion screen
    (dashboard)/              Route group: dashboard, crm, tasks, reports, settings, ai-assistant, proposals
    welcome/                  Public landing screen
    layout.tsx                Root layout: fonts, providers, theme-flash-prevention script
    globals.css                Design tokens (CSS variables) — the single source of truth for colors/radii/shadows

  components/
    ui/                       Design-system primitives (Button, Card, Dialog, Select, Tabs, ...).
                               shadcn/ui pattern on Radix UI. Edit here to re-theme the whole app.
    layout/                   App shell: DashboardShell, Sidebar, Topbar, MobileNav
    shared/                   Small components reused across 3+ features: Logo, MetricCard, OTPInput
    providers/                React Context providers: QueryProvider, AuthProvider, ThemeProvider

  features/                   One folder per product area. Each contains components/ specific
                               to that area — NOT reused elsewhere. If a component starts being
                               used by two features, promote it to components/shared/.
    auth/, onboarding/, dashboard/, crm/, tasks/, proposals/, ai-assistant/, settings/

  store/                      Zustand stores — client/UI state (see STATE_MANAGEMENT.md)
  services/
    mock-data.ts               Static mock data. Swap-out target once the backend exists.
    api/                       Typed API service layer (see API_INTEGRATION.md)
  hooks/                       React Query hooks wrapping services/api/*
  types/
    index.ts                   Frontend domain models (Customer, Task, Deal, ...)
    api.ts                      Wire types for API requests/responses — kept separate from
                                domain models on purpose; see API_INTEGRATION.md
  lib/
    utils.ts                    cn() — Tailwind class merging
    format.ts                   formatNaira, formatDate, relativeTime, initials
    env.ts                      Typed environment variable access

  middleware / proxy.ts        Route guard — see "Auth guard" below. (Named proxy.ts, not
                                middleware.ts, per the Next.js 16 rename.)
```

## Component architecture

Three layers, in order of "how reusable is this":

1. **`components/ui/`** — pure, unopinionated design-system primitives. No app-specific data, no
   business logic. A `<Button>` doesn't know what a "customer" is.
2. **`components/shared/` and `components/layout/`** — composed from `ui/`, still reusable across
   the whole app, but can be opinionated about layout/behavior (e.g. `DashboardShell` always
   renders the sidebar).
3. **`features/*/components/`** — specific to one product area. `features/crm/components/deal-pipeline-card.tsx`
   only makes sense on a customer profile page. These are the components that read from
   `services/mock-data.ts` or (going forward) the `hooks/` layer.

Route files in `app/` should mostly just *compose* — importing feature components and wiring
them into a page layout — rather than containing large amounts of JSX or logic directly.

## Rendering model

- Every interactive screen is a Client Component (`"use client"`), since almost everything here
  reads from Zustand stores or uses hooks/animation. This is a dashboard-style app, not a
  content/SEO site, so that trade-off is intentional.
- `src/app/layout.tsx` is the one place doing anything server-side by default (metadata, the
  theme-flash-prevention inline script).
- `proxy.ts` runs on the Edge runtime for every request (see "Auth guard" below) — keep it free
  of Node-only APIs and heavy imports, per Next.js's own guidance.

## Auth guard

`src/proxy.ts` (Next.js's file-based request-interception convention — renamed from
`middleware.ts` in Next.js 16) redirects unauthenticated visitors away from protected routes
(`/dashboard`, `/crm`, `/tasks`, etc.) to `/login`, and redirects already-authenticated visitors
away from `/login` and `/signup` to `/dashboard`.

It currently checks for a plain cookie (`businux_session`) set client-side by
`src/store/auth-store.ts`. **This is not real authentication** — it's scaffolding so the
route-protection *shape* is already correct and doesn't need to be re-architected later. See
`API_INTEGRATION.md` → "Authentication" for exactly what to change once the real backend exists.

## Design system

All colors, radii, and shadows are CSS variables defined once in `src/app/globals.css` and
surfaced through `tailwind.config.ts`. Components use Tailwind's semantic classes
(`bg-primary`, `text-muted-foreground`, `border-border`) — never a hardcoded hex value — so a
future re-theme is a one-file change.

| Token | Use |
|---|---|
| `primary` (indigo, `#4F46E5`) | Primary CTAs, active nav state, links |
| `accent` (purple, `#8B5CF6`) | AI-related surfaces only (AI Assistant, AI Recommendations, "AI Write") |
| `success` / `warning` / `destructive` | Status pills, metric deltas, form validation |

## Known intentional simplifications (mock-data build)

These aren't bugs — they're deliberate placeholders that keep the mock-data build simple, each
with a documented swap-in path:

- `businux_session` cookie — see "Auth guard" above.
- `src/store/task-board-store.ts` — Kanban state lives only in memory; nothing persists a
  drag/drop or a "Move to" action to a server. `src/hooks/use-tasks.ts` already has the React
  Query mutation (`useUpdateTaskStatus`, with optimistic updates) ready for when the board is
  migrated off local Zustand state.
- Avatars are initials-only (no image upload flow yet).
