"use client";
import { useRouter } from "next/navigation";
import { ShieldCheck, Clock, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { SecurityIllustrationPanel } from "@/features/auth/components/security-illustration-panel";
import { OTPInput } from "@/components/shared/otp-input";
import { useAuthStore } from "@/store/auth-store";

export default function TwoFactorPage() {
  const router = useRouter();
  const establishSession = useAuthStore((s) => s.establishSession);

  return (
    <AuthShell
      panel={
        <SecurityIllustrationPanel
          icon={ShieldCheck}
          heading="Stronger security for complete peace of mind"
          subheading="2FA helps protect your business and customer data."
          benefits={[
            { icon: ShieldCheck, title: "Extra Protection", description: "Even if someone knows your password, they still need your 2FA code." },
            { icon: Clock, title: "Time-based Codes", description: "Authentication codes refresh every 30 seconds for maximum security." },
            { icon: Smartphone, title: "Works Everywhere", description: "Use any authenticator app on your phone or tablet." },
          ]}
        />
      }
    >
      <h1 className="text-2xl font-bold tracking-tight">Secure your account 🛡️</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">Two-factor authentication adds an extra layer of security to keep your account safe.</p>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium">Setup 2FA</p>
        <p className="mb-3 text-xs text-muted-foreground">Scan the QR code with your authenticator app</p>
        <div className="flex h-44 w-44 items-center justify-center rounded-lg border border-border bg-white p-3">
          {/* Placeholder QR pattern */}
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <rect width="100" height="100" fill="white" />
            {Array.from({ length: 10 }).map((_, r) =>
              Array.from({ length: 10 }).map((_, c) =>
                (r + c) % 3 === 0 || (r === 0 && c === 0) || (r === 0 && c === 9) || (r === 9 && c === 0) ? (
                  <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="9" height="9" fill="#0f172a" />
                ) : null
              )
            )}
          </svg>
        </div>
        <button className="mt-3 text-xs font-medium text-primary hover:underline">Can&apos;t scan? Enter setup key manually</button>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-medium">Enter 6-digit code</p>
        <OTPInput />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Checkbox id="trust" defaultChecked />
        <Label htmlFor="trust" className="font-normal text-muted-foreground">
          Trust this device for 30 days
        </Label>
      </div>

      <Button
        size="lg"
        className="mt-6 w-full"
        onClick={() => {
          establishSession();
          router.push("/onboarding");
        }}
      >
        Verify &amp; Enable 2FA <ArrowRight className="h-4 w-4" />
      </Button>
    </AuthShell>
  );
}
