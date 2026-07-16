# Environment Setup

## Requirements

- **Node.js 20 LTS recommended.** The project has been built and verified against Node 24 too,
  but 20 LTS is the safer choice for matching most hosting platforms' default runtime.
- npm (ships with Node). Yarn/pnpm would also work but the project has only been verified with npm.

## First-time setup

```bash
npm install
cp .env.example .env.local     # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Then open `http://localhost:3000/welcome`.

## Environment variables

All env access goes through `src/lib/env.ts` — don't read `process.env.X` directly elsewhere in
the app. See `.env.example` for the full list with descriptions. The two that matter day-to-day:

| Variable | Default | What it does |
|---|---|---|
| `NEXT_PUBLIC_USE_MOCK_API` | `true` | While true, every function in `src/services/api/*` returns mock data instead of calling the network. Flip to `false` once the backend exists. |
| `NEXT_PUBLIC_API_BASE_URL` | *(empty)* | Base URL of the Express API. Only matters once `NEXT_PUBLIC_USE_MOCK_API=false`. |

Remember: any variable exposed to the browser **must** be prefixed `NEXT_PUBLIC_`. Anything
without that prefix is server-only — safe for real secrets once the app has server-only code
that needs them (it currently doesn't).

## Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally (run `build` first) |
| `npm run lint` | ESLint — should always report zero errors/warnings |
| `npm run lint:fix` | Same, auto-fixing what it can |
| `npm run typecheck` | `tsc --noEmit` — should always report zero errors |
| `npm run verify` | typecheck + lint + build, in that order — run this before opening a PR |
| `npm run clean` | Removes `.next/` (cross-platform, works on Windows PowerShell too) |

## Common local issues

- **Slow/failed `npm install` on Windows:** if the project folder is inside a OneDrive-synced
  directory (like the default `Downloads` folder on many Windows setups), file locks during
  install can cause `EPERM`/`ECONNRESET`-style errors. Move the project to a plain local folder
  (e.g. `C:\dev\businux`) outside any synced directory.
- **Port already in use:** `npm run dev -- -p 3001` (or any free port).
- **Theme flash on first load:** shouldn't happen — see the inline script in
  `src/app/layout.tsx` and `docs/ARCHITECTURE.md`. If you do see one, check that script wasn't
  accidentally removed.
