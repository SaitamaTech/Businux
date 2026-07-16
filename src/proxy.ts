import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "businux_session";

// Route prefixes that require an active session.
const PROTECTED_PREFIXES = ["/dashboard", "/crm", "/tasks", "/reports", "/settings", "/ai-assistant", "/proposals", "/onboarding"];

// Auth pages a logged-in user shouldn't see again (redirect to /dashboard instead).
const AUTH_ONLY_PREFIXES = ["/login", "/signup"];

/**
 * IMPORTANT — read before wiring this up to the real backend:
 *
 * `businux_session` is currently a plain, client-readable cookie set by
 * `src/store/auth-store.ts` purely so this proxy file (which runs on the
 * Edge runtime and can't see Zustand/localStorage) has something to check.
 * It carries no auth claims and proves nothing on its own — anyone can set
 * it in devtools. That's fine for gating *navigation* in a mock-data build,
 * but it is NOT a real auth guard.
 *
 * Once the Express backend exists:
 *   1. Have POST /auth/login set a real httpOnly, Secure, SameSite cookie
 *      (e.g. a signed JWT or session id) instead of this one.
 *   2. Replace the `hasSession` check below with real verification —
 *      at minimum decode/verify the JWT here; ideally call a lightweight
 *      /auth/verify endpoint, or use next-auth/Auth.js if you'd rather not
 *      hand-roll this.
 *   3. Remove `setSessionCookie()` from auth-store.ts once the backend
 *      cookie takes over that job.
 */
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthOnly && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except static assets and Next internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"],
};
