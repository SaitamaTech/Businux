# State Management Guide

Four tools are in play, each with a specific job. Reaching for the wrong one for a given piece
of state is the most common way this kind of app gets hard to follow, so here's the rule of
thumb for each.

## 1. React Query (`@tanstack/react-query`) — server state

**Use for:** anything that originates from an API and can go stale (customer lists, tasks,
dashboard numbers). Lives in `src/hooks/use-*.ts`, wrapping `src/services/api/*.ts`.

Why: it gives you loading/error states, caching, and cache invalidation for free, and it's the
one tool in this list actually designed for "data that lives on a server and I'm borrowing a
copy of." Don't reach for `useState` + `useEffect` + manual fetch for this — that's exactly the
pattern React Query exists to replace, and it's also a common source of the hydration/race-condition
bugs we specifically fixed during the production-hardening pass (see PRODUCTION_CHECKLIST.md).

```ts
const { data: customers, isLoading } = useCustomers({ search });
```

**Current status:** the hooks exist and are typed, but most screens still read from
`services/mock-data.ts` directly via Zustand (see below) rather than through these hooks — that
was a deliberate choice to avoid touching already-approved, working UI mid-project. Adopt these
hooks screen-by-screen as real endpoints come online (see API_INTEGRATION.md).

## 2. Zustand — client/UI state

**Use for:** state that's genuinely local to the browser session and isn't "a copy of server
data" — form wizard step, sidebar collapsed/expanded, which dialog is open, the Kanban board's
current column layout, the AI chat transcript for the current session.

Current stores (`src/store/`):

| Store | Owns |
|---|---|
| `auth-store.ts` | Current user, `isAuthenticated`, session cookie sync (see ARCHITECTURE.md → Auth guard) |
| `ui-store.ts` | Sidebar collapsed state, mobile nav open/closed |
| `onboarding-store.ts` | 5-step wizard progress, in-progress form values |
| `task-board-store.ts` | Kanban tasks + column assignment (candidate for React Query migration — see API_INTEGRATION.md) |
| `proposal-store.ts` | Proposal generator step + draft title |
| `ai-assistant-store.ts` | Chat transcript for the current session |

Why Zustand and not Context for this: none of this state needs the "avoid prop drilling for a
subtree" property that Context provides — it needs to be read/written from far-apart components
(sidebar reads `auth-store`, topbar reads it too, login page writes it) without wrapping
everything in a provider tree, and without the re-render-everything-on-any-change behavior
naive Context + `useState` has. Zustand's selector pattern (`useAuthStore((s) => s.user)`) means
a component only re-renders when the specific slice it reads changes.

## 3. React Context — cross-cutting concerns only

**Use for:** the two things that are genuinely "ambient" to the whole app rather than a specific
feature: `AuthProvider` (thin wrapper exposing `auth-store` via Context for consumers that prefer
that API) and `ThemeProvider` (light/dark mode, built on `useSyncExternalStore` — see the
comment in `src/components/providers/theme-provider.tsx` for why it's built that way instead of
a plain `useState`+`useEffect`).

Don't add new Context providers for feature-specific state — that's what Zustand stores or
component-local state are for. Context re-renders every consumer on every change with no
selector mechanism, which is fine for "which theme" (changes rarely) and wrong for e.g. "the
task list" (changes often, only some components care).

## 4. Component-local state (`useState`, `useReducer`)

**Use for:** anything that only one component (or its direct children via props) needs —
whether a password field is masked, whether a dropdown is open, form input values before
submission (via React Hook Form, see below).

If you find yourself lifting local state up through 3+ levels of props, that's usually the
signal it should have been a Zustand store instead.

## Forms: React Hook Form + Zod

Every form (`src/features/auth/components/*-form.tsx`, onboarding steps, etc.) uses
`useForm` + `zodResolver`. Two patterns worth knowing:

- Use **`useWatch({ control, name })`**, not the `watch()` method returned by `useForm()`, when
  a component needs to react to a field's live value (e.g. password strength meter). `watch()`
  returns a new function reference that isn't compiler-memoizable and will opt the whole
  component out of React Compiler optimization — this was an actual lint finding fixed during
  the production-hardening pass, not a style preference.
- Validation errors get `role="alert"` and are linked to their input via `aria-describedby` —
  keep that pairing when adding new form fields (see ACCESSIBILITY.md).

## Quick decision table

| "I need state for..." | Use |
|---|---|
| Data that comes from (or will come from) an API | React Query hook in `src/hooks/` |
| Something read/written across unrelated parts of the app, browser-session-only | Zustand store |
| Truly app-wide, rarely-changing (theme, current user identity) | Context |
| One component's own UI detail | `useState` |
| A form's field values/validation | React Hook Form + Zod |
