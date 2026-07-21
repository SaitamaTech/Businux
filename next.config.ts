import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't leak framework fingerprinting via the X-Powered-By header.
  poweredByHeader: false,

  // Fail the build on React runtime issues rather than warning silently.
  reactStrictMode: true,

  // Next.js 16 no longer runs ESLint as part of `next build` (it dropped the
  // built-in `eslint` config key entirely) — lint is a separate, explicit
  // step now. `npm run verify` runs typecheck + lint + build together so
  // nothing slips through; CI should call that instead of `next build` alone.
  typescript: {
    ignoreBuildErrors: false,
  },

  // Basic hardening headers. A production deployment sitting behind
  // Vercel/Netlify's edge network can add more (CSP, HSTS, etc.) at the
  // platform level, but these are safe defaults regardless of host.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
