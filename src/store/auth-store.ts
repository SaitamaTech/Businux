import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { createMockUser, mockUser } from "@/services/mock-data";
import { env } from "@/lib/env";
import { firebaseLogin, firebaseLogout, firebaseOnAuthStateChanged, firebaseUpdateProfile } from "@/lib/firebase";
import {
  supabaseLoginWithEmail,
  supabaseSignOut,
  supabaseSignupWithEmail,
  supabaseOnAuthStateChanged,
} from "@/lib/supabase";

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
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<User, "name" | "companyName" | "avatarUrl">>) => Promise<void>;
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
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        if (!email || password.length < 6) {
          throw new Error("Invalid email or password.");
        }

        if (env.useSupabase) {
          try {
            const user = await supabaseLoginWithEmail(email, password);
            if (!user) throw new Error("Unable to sign in with Supabase.");
            set({ user, isAuthenticated: true });
            setSessionCookie(true);
            return;
          } catch (supabaseError) {
            console.warn("Supabase login failed, falling back to mock login", supabaseError);
          }
        }

        if (env.useFirebase) {
          try {
            const user = await firebaseLogin(email, password);
            if (!user) throw new Error("Unable to sign in with Firebase.");
            set({ user, isAuthenticated: true });
            setSessionCookie(true);
            return;
          } catch (firebaseError) {
            console.warn("Firebase login failed, falling back to mock login", firebaseError);
          }
        }

        await new Promise((r) => setTimeout(r, 600));
        const user: User = createMockUser(email);
        set({ user, isAuthenticated: true });
        setSessionCookie(true);
      },
      logout: async () => {
        if (env.useSupabase) {
          try {
            await supabaseSignOut();
          } catch {
            // Ignore Supabase sign-out errors and fall back to local state reset.
          }
        }

        if (env.useFirebase) {
          try {
            await firebaseLogout();
          } catch {
            // Ignore Firebase sign-out errors and fall back to local state reset.
          }
        }

        set({ user: null, isAuthenticated: false });
        setSessionCookie(false);
      },
      updateProfile: async (updates) => {
        const currentUser = get().user;
        if (!currentUser) throw new Error("No active user to update.");

        if (env.useFirebase) {
          try {
            const firebaseUser = await firebaseUpdateProfile({
              displayName: updates.name ?? currentUser.name,
              photoURL: updates.avatarUrl ?? null,
            });
            set({
              user: { ...currentUser, ...updates, ...(firebaseUser ? { name: firebaseUser.name, email: firebaseUser.email } : {}) },
              isAuthenticated: true,
            });
            setSessionCookie(true);
            return;
          } catch (firebaseError) {
            console.warn("Firebase profile update failed, falling back to local state update", firebaseError);
          }
        }

        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user,
          isAuthenticated: true,
        }));
        setSessionCookie(true);
      },
      establishSession: (overrides) => {
        const email = overrides?.email ?? mockUser.email;
        set({ user: createMockUser(email), isAuthenticated: true });
        setSessionCookie(true);
      },
      hydrateMock: () => {
        set({ user: createMockUser(mockUser.email), isAuthenticated: true });
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

if (typeof window !== "undefined") {
  if (env.useSupabase) {
    supabaseOnAuthStateChanged((user) => {
      useAuthStore.setState({ user, isAuthenticated: !!user });
      setSessionCookie(!!user);
    });
  }

  if (env.useFirebase) {
    firebaseOnAuthStateChanged((user) => {
      useAuthStore.setState({ user, isAuthenticated: !!user });
      setSessionCookie(!!user);
    });
  }
}
