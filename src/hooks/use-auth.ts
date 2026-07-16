import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/api";
import type { LoginRequest, SignupRequest } from "@/types/api";

/**
 * These wrap the same authApi used by src/store/auth-store.ts. The Zustand
 * store remains the source of truth for "am I logged in" across the app
 * (see docs/STATE_MANAGEMENT.md for why), but these hooks are here for any
 * new component that wants React Query's loading/error states directly
 * (e.g. a settings page "change password" form) without touching global state.
 */
export function useLoginMutation() {
  return useMutation({ mutationFn: (payload: LoginRequest) => authApi.login(payload) });
}

export function useSignupMutation() {
  return useMutation({ mutationFn: (payload: SignupRequest) => authApi.signup(payload) });
}

export function useRequestPasswordResetMutation() {
  return useMutation({ mutationFn: (email: string) => authApi.requestPasswordReset(email) });
}
