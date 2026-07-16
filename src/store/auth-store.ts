import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { mockUser } from "@/services/mock-data";

const SESSION_COOKIE = "businux_session";

/**
 * Sets/clears a lightweight, non-httpOnly cookie purely so `middleware.ts`
 * (which runs on the Edge runtime and has no access to Zustand/localStorage)
 * can tell whether a session exists and gate `/dashboard`, `/crm`, etc.
 *
 * This is NOT a real session token — it carries no auth claims and must be
 * replaced once the real backend issues an httpOnly session cookie on login.
 * See docs/API_INTEGRATION.md → "Authentication" for the swap-in plan.
 */
function setSessionCookie(active: boolean) {
  if (typeof document === "undefined") return;
  document.cookie = active
    ? `${SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
    : `${SESSION_COOKIE}=; path=/; max-age=0`;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  /**
   * Establishes a session without a password check — used by the signup →
   * verify-email → onboarding flow (and the 2FA setup step, and "Explore as
   * Guest") where the person hasn't "logged in" in the traditional sense but
   * does need `middleware.ts` to treat them as authenticated so the
   * onboarding/dashboard routes stop redirecting them to /login.
   *
   * TODO(backend): once /auth/signup and /auth/verify-email are real, have
   * each of those set the real session cookie directly and delete this
   * mock-only helper along with its call sites.
   */
  establishSession: (overrides?: Partial<User>) => void;
  hydrateMock: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // TODO(backend): replace this whole function body with:
        //   const res = await authApi.login({ email, password });
        //   set({ user: res.user, isAuthenticated: true });
        // See src/services/api/auth.ts — the real client is already typed
        // and ready, just gated behind NEXT_PUBLIC_USE_MOCK_API=false.
        if (!email || password.length < 6) {
          throw new Error("Invalid email or password.");
        }
        await new Promise((r) => setTimeout(r, 600));
        const user: User = { ...mockUser, email };
        set({ user, isAuthenticated: true });
        setSessionCookie(true);
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        setSessionCookie(false);
      },
      establishSession: (overrides) => {
        set({ user: { ...mockUser, ...overrides }, isAuthenticated: true });
        setSessionCookie(true);
      },
      hydrateMock: () => {
        set({ user: mockUser, isAuthenticated: true });
        setSessionCookie(true);
      },
    }),
    {
      name: "businux-auth",
      onRehydrateStorage: () => (state) => {
        // Keep the middleware-visible cookie in sync with persisted client state.
        if (state?.isAuthenticated) setSessionCookie(true);
      },
    }
  )
);
