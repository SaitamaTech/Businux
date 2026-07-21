import type { Metadata } from "next";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { AuthDashboardPreview } from "@/features/auth/components/auth-dashboard-preview";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Sign In — Businux" };

export default function LoginPage() {
  return (
    <AuthShell panel={<AuthDashboardPreview />}>
      <LoginForm />
    </AuthShell>
  );
}
