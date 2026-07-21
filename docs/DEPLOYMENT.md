# Deployment

This is a standard Next.js 16 App Router project — no unusual build steps, no server-only code
beyond `src/proxy.ts` (Edge runtime). Both platforms below support that out of the box.

## Vercel (recommended — built by the Next.js team)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. [Import the repo](https://vercel.com/new) in Vercel. Framework preset auto-detects as Next.js
   — no configuration needed.
3. Add environment variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_USE_MOCK_API` (set to `false` once the backend is live)
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Deploy. Every push to the connected branch redeploys automatically; every PR gets a preview URL.

No `vercel.json` is included because there's nothing to override — default behavior is correct
for this project.

## Netlify

A `netlify.toml` is included at the repo root with the build command, publish directory, and the
official `@netlify/plugin-nextjs` runtime plugin declared (handles the App Router, `proxy.ts`,
and image optimization automatically).

1. [Import the repo](https://app.netlify.com/start) in Netlify.
2. It should read `netlify.toml` automatically. If prompted, confirm build command
   `npm run build` and publish directory `.next`.
3. Add the same three environment variables as above under Site configuration → Environment
   variables (the `NEXT_PUBLIC_USE_MOCK_API = "true"` in `netlify.toml` is just a safe default —
   override it in the UI once real, since you generally don't want production env values
   hardcoded in a committed file).
4. Deploy.

## Both platforms

- **Build command:** `npm run build`
- **Node version:** 20.x (set via platform UI, or add a `.nvmrc`/`engines` field if your team
  wants it pinned explicitly — not included here since the project hasn't been pinned to one).
- **Before every deploy**, run `npm run verify` locally (typecheck + lint + build) — this is
  exactly what should also run in CI so a broken build never reaches the platform in the first
  place. Neither platform's zero-config setup runs ESLint or `tsc` on its own; Next.js 16 no
  longer bundles ESLint into `next build` (see `docs/ARCHITECTURE.md`), so `npm run verify`
  (not just `npm run build`) is genuinely the check to wire into CI.

## Custom domain, HTTPS, headers

Both platforms provision HTTPS automatically for custom domains. `next.config.ts` sets a small
set of security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`) that apply regardless of host. If you need a stricter Content-Security-Policy,
add it there too — it wasn't included by default because a CSP that's too strict will silently
break things (inline styles from Radix, the theme-flash-prevention script, etc.) unless tuned
carefully against the actual deployed app, which needs to happen with the real domain in hand
rather than guessed at here.
