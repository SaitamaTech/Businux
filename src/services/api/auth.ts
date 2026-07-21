import { env } from "@/lib/env";
import { apiClient } from "./client";
import { createMockUser, mockUser } from "@/services/mock-data";
import type { AuthUserResponse, LoginRequest, LoginResponse, SignupRequest } from "@/types/api";

async function mockDelay(ms = 500) {
  await new Promise((r) => setTimeout(r, ms));
}

export const authApi = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    if (env.useMockApi) {
      await mockDelay();
      if (!payload.email || payload.password.length < 6) {
        throw new Error("Invalid email or password.");
      }
      const user: AuthUserResponse = createMockUser(payload.email);
      return { user };
    }
    // Real backend contract — see docs/API_INTEGRATION.md → POST /auth/login
    return apiClient<LoginResponse>("/auth/login", { method: "POST", body: payload });
  },

  async signup(payload: SignupRequest): Promise<LoginResponse> {
    if (env.useMockApi) {
      await mockDelay();
      const user: AuthUserResponse = { ...mockUser, name: payload.fullName, email: payload.email };
      return { user };
    }
    return apiClient<LoginResponse>("/auth/signup", { method: "POST", body: payload });
  },

  async logout(): Promise<void> {
    if (env.useMockApi) {
      await mockDelay(150);
      return;
    }
    await apiClient<void>("/auth/logout", { method: "POST" });
  },

  async me(): Promise<AuthUserResponse | null> {
    if (env.useMockApi) {
      await mockDelay(150);
      return createMockUser();
    }
    return apiClient<AuthUserResponse | null>("/auth/me");
  },

  async verifyEmail(code: string): Promise<{ verified: boolean }> {
    if (env.useMockApi) {
      await mockDelay(400);
      return { verified: code.length === 6 };
    }
    return apiClient<{ verified: boolean }>("/auth/verify-email", { method: "POST", body: { code } });
  },

  async requestPasswordReset(email: string): Promise<{ sent: boolean }> {
    if (env.useMockApi) {
      await mockDelay(500);
      return { sent: true };
    }
    return apiClient<{ sent: boolean }>("/auth/forgot-password", { method: "POST", body: { email } });
  },

  async resetPassword(token: string, password: string): Promise<{ success: boolean }> {
    if (env.useMockApi) {
      await mockDelay(500);
      return { success: true };
    }
    return apiClient<{ success: boolean }>("/auth/reset-password", { method: "POST", body: { token, password } });
  },
};
