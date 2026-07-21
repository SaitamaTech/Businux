"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, ArrowRight, ShieldCheck, Zap, UserCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { SecurityIllustrationPanel } from "@/features/auth/components/security-illustration-panel";
import { PasswordStrength, passwordRequirements } from "@/features/auth/components/password-strength";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });
type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { password: "", confirmPassword: "" } });
  // useWatch (rather than the `watch()` method returned by useForm) is the
  // React Compiler-friendly way to subscribe to a single field's value.
  const password = useWatch({ control, name: "password" }) || "";
  const requirements = passwordRequirements(password);

  return (
    <AuthShell
      panel={
        <SecurityIllustrationPanel
          icon={Lock}
          heading="Secure"
          subheading="Your password is encrypted and kept completely secure."
          benefits={[
            { icon: ShieldCheck, title: "Secure", description: "Your password is encrypted and kept completely secure." },
            { icon: Zap, title: "Fast Recovery", description: "Reset your password in just a few simple steps." },
            { icon: UserCheck, title: "Your Account, Protected", description: "We ensure only you can access your account." },
          ]}
        />
      }
    >
      <h1 className="text-2xl font-bold tracking-tight">Create a new password</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">Your new password must be different from previously used passwords.</p>

      <form onSubmit={handleSubmit(() => router.push("/login"))} className="mt-8 space-y-5" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type={show1 ? "text" : "password"}
              autoComplete="new-password"
              className="pl-9 pr-9"
              error={!!errors.password}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShow1((v) => !v)}
              aria-label={show1 ? "Hide password" : "Show password"}
              aria-pressed={show1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {show1 ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" role="alert" className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
          <PasswordStrength password={password} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="confirmPassword"
              type={show2 ? "text" : "password"}
              autoComplete="new-password"
              className="pl-9 pr-9"
              error={!!errors.confirmPassword}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShow2((v) => !v)}
              aria-label={show2 ? "Hide password" : "Show password"}
              aria-pressed={show2}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {show2 ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirm-password-error" role="alert" className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-secondary/40 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-medium">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" /> Password requirements
          </p>
          <ul className="space-y-1.5">
            {requirements.map((r) => (
              <li key={r.label} className="flex items-center gap-2 text-xs">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full",
                    r.met ? "bg-success text-white" : "bg-muted text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3" />
                </span>
                <span className={r.met ? "text-foreground" : "text-muted-foreground"}>
                  {r.label}
                  <span className="sr-only">{r.met ? " — met" : " — not met"}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          Reset Password <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your old password?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
