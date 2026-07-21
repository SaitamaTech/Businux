import type { Metadata } from "next";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { SignupForm } from "@/features/auth/components/signup-form";
import { SignupBenefitsPanel } from "@/features/auth/components/signup-benefits-panel";

export const metadata: Metadata = { title: "Create Account — Businux" };

export default function SignupPage() {
  return (
    <AuthShell panel={<SignupBenefitsPanel />}>
      <SignupForm />
    </AuthShell>
  );
}
