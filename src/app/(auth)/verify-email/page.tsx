"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ShieldCheck, Zap, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { SecurityIllustrationPanel } from "@/features/auth/components/security-illustration-panel";
import { OTPInput } from "@/components/shared/otp-input";
import { useAuthStore } from "@/store/auth-store";

export default function VerifyEmailPage() {
  const router = useRouter();
  const establishSession = useAuthStore((s) => s.establishSession);
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  return (
    <AuthShell
      panel={
        <SecurityIllustrationPanel
          icon={Mail}
          heading="Secure & Private"
          subheading="Your data is encrypted and always protected."
          benefits={[
            { icon: ShieldCheck, title: "Secure & Private", description: "Your data is encrypted and always protected." },
            { icon: Zap, title: "Quick Verification", description: "Takes less than a minute to verify your email." },
            { icon: Lock, title: "Account Security", description: "Email verification helps keep your account secure." },
          ]}
        />
      }
    >
      <h1 className="text-2xl font-bold tracking-tight">Verify your email 📧</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        We&apos;ve sent a 6-digit verification code to <span className="font-medium text-foreground">ibrahim@example.com</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Enter the code below to verify your email address.</p>

      <div className="mt-8">
        <OTPInput onComplete={setCode} />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        {seconds > 0 ? (
          <span>
            Resend code in <span className="font-medium text-foreground">00:{seconds.toString().padStart(2, "0")}</span>
          </span>
        ) : (
          <button onClick={() => setSeconds(45)} className="font-medium text-primary hover:underline">
            Resend code
          </button>
        )}
      </p>

      <Button
        size="lg"
        className="mt-6 w-full"
        disabled={code.length < 6}
        onClick={() => {
          establishSession();
          router.push("/onboarding");
        }}
      >
        Verify Email <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="outline" size="lg" className="w-full">
        Continue with Gmail
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Wrong email address?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Change email
        </Link>
      </p>
    </AuthShell>
  );
}
