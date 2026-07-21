import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Businux",
};

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-16 text-foreground">
      <Link href="/signup" className="mb-8 text-sm font-medium text-primary hover:underline">
        ← Back to sign up
      </Link>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          These Terms of Service govern your use of Businux and its related services.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By creating an account and using Businux, you agree to comply with these Terms of Service and any related policies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">2. Account Responsibilities</h2>
            <p>
              You are responsible for keeping your account credentials secure and for all activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">3. Acceptable Use</h2>
            <p>
              You agree not to misuse the service, attempt unauthorized access, or upload harmful content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">4. Changes to the Service</h2>
            <p>
              Businux may update, improve, or suspend parts of the platform at any time to improve the experience or maintain security.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
