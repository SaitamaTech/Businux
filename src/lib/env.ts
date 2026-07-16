/**
 * Centralized, typed access to environment variables.
 *
 * Import from here rather than reading `process.env.X` directly anywhere
 * else in the app — that way there's exactly one place that knows the
 * variable names, and exactly one place to update when the backend team
 * gives you a real API URL.
 */

function readBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
}

export const env = {
  /** Base URL of the Express API. Empty string is valid while mock mode is on. */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",

  /**
   * When true (the default until the backend is ready), every function in
   * `src/services/api/*` returns data from `src/services/mock-data.ts`
   * instead of making a network call. Flip to `false` (or unset it) once
   * the Express endpoints documented in docs/API_INTEGRATION.md exist.
   */
  useMockApi: readBool(process.env.NEXT_PUBLIC_USE_MOCK_API, true),

  /** Public site URL, used for metadata/canonical links in production. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;
