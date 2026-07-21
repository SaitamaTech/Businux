import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Businux",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-16 text-foreground">
      <Link href="/signup" className="mb-8 text-sm font-medium text-primary hover:underline">
        ← Back to sign up
      </Link>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your privacy matters to us. This policy explains what information we collect and how we use it.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              We collect account information such as your name, email address, and authentication details when you create an account.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">2. How We Use Information</h2>
            <p>
              We use your information to provide account access, improve the product, personalize your experience, and send service-related notifications.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">3. Data Protection</h2>
            <p>
              We take reasonable steps to protect your data and only share it with trusted service providers where necessary to operate the product.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">4. Your Choices</h2>
            <p>
              You can request access to, correction of, or deletion of your account information by contacting us through the support channel.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
