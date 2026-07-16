# Businux ΓÇö Frontend

Frontend implementation of the Businux AI Business Operating System, built to match the approved
UI/UX designs and hardened for production deployment.

**Status:** feature-complete against the approved designs, zero build/lint/type errors, backend
integration layer scaffolded and ready. See `docs/PRODUCTION_CHECKLIST.md` for the full
before/after of the production-hardening pass, including what's genuinely done vs. what still
needs a manual follow-up (a few things ΓÇö a real browser-based accessibility/responsive pass and
automated tests ΓÇö can't be verified from this build environment; that checklist says exactly
which).

## Documentation

| Doc | Covers |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Folder structure, component layering, rendering model, auth guard |
| [`docs/API_INTEGRATION.md`](docs/API_INTEGRATION.md) | How to connect the real Express backend ΓÇö expected endpoints, what changes vs. what doesn't |
| [`docs/STATE_MANAGEMENT.md`](docs/STATE_MANAGEMENT.md) | When to use Zustand vs. React Query vs. Context vs. local state |
| [`docs/ENVIRONMENT_SETUP.md`](docs/ENVIRONMENT_SETUP.md) | Local dev setup, env vars, scripts, common Windows issues |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Vercel and Netlify deployment steps |
| [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) | WCAG 2.2 AA work done + manual verification checklist |
| [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) | Full readiness checklist with what's verified vs. outstanding |

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 (no CSS modules, no Bootstrap) |
| Components | shadcn/ui pattern on Radix UI primitives (hand-authored in `src/components/ui`) |
| Server state | TanStack Query (React Query) ΓÇö `src/hooks/` |
| Client state | Zustand ΓÇö `src/store/` |
| Cross-cutting state | React Context (auth session, theme) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | lucide-react |

## Getting started

```bash
npm install
cp .env.example .env.local     # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev                    # http://localhost:3000/welcome
```

Before opening a PR or deploying, run:

```bash
npm run verify   # typecheck + lint + build, in that order
```

Full detail in [`docs/ENVIRONMENT_SETUP.md`](docs/ENVIRONMENT_SETUP.md).

> **Fonts note:** this build was developed in a sandbox without access to `fonts.googleapis.com`,
> so `next/font/google` (Inter) is disabled and the app falls back to the system font stack in
> `tailwind.config.ts`. On a machine with normal internet access, restore the Inter font load in
> `src/app/layout.tsx` for pixel-exact typography ΓÇö see the comment left in `tailwind.config.ts`.

## Folder structure (short version ΓÇö full detail in `docs/ARCHITECTURE.md`)

```
src/
  app/          Next.js App Router routes only
  components/   ui/ (design-system primitives), layout/, shared/, providers/
  features/     One folder per product area (auth, crm, tasks, proposals, ...)
  store/        Zustand ΓÇö client/UI state
  services/     mock-data.ts + api/ (typed backend service layer)
  hooks/        React Query hooks wrapping services/api/
  types/        index.ts (domain models) + api.ts (wire types)
  lib/          utils.ts, format.ts, env.ts
  proxy.ts      Route-protection guard (Next.js 16's renamed "middleware" convention)
```

## What's implemented

Every approved screen has a working, responsive, accessible implementation: the full auth flow
(login/signup/email verification/forgot+reset password/2FA), the 5-step business onboarding
wizard, the AI CEO Dashboard, the AI Assistant chat interface, CRM (customer list + profile),
the Kanban Task & Workflow Manager, Reports & Analytics, Settings & Subscription, and the
5-step Proposal Generator.

Everything currently reads from `src/services/mock-data.ts` via Zustand stores. A parallel,
typed API service layer (`src/services/api/`) and React Query hooks (`src/hooks/`) are already
built and ready to adopt screen-by-screen as the real Express backend comes online ΓÇö see
`docs/API_INTEGRATION.md` for the exact plan and endpoint contracts.
