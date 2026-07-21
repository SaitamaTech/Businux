"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Send, Mail, Clock, ShieldCheck, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { SecurityIllustrationPanel } from "@/features/auth/components/security-illustration-panel";

const schema = z.object({ email: z.string().email("Enter a valid email address") });
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <AuthShell
      panel={
        <SecurityIllustrationPanel
          icon={Mail}
          heading="Secure Reset Link"
          subheading="We'll send you a secure link to reset your password."
          benefits={[
            { icon: Mail, title: "Secure Reset Link", description: "We'll send you a secure link to reset your password." },
            { icon: Clock, title: "Link Expires Soon", description: "The reset link will expire in 15 minutes." },
            { icon: ShieldCheck, title: "Your Security Matters", description: "We take your account security very seriously." },
          ]}
        />
      }
    >
      <Link href="/login" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="text-2xl font-bold tracking-tight">Reset your password 🔒</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      {sent ? (
        <div className="mt-8 rounded-lg border border-success/30 bg-success/5 p-4 text-sm text-success">
          Reset link sent! Check your inbox for further instructions.
        </div>
      ) : (
        <form onSubmit={handleSubmit(() => setSent(true))} className="mt-8 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="Enter your email address" error={!!errors.email} {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            Send Reset Link <Send className="h-4 w-4" />
          </Button>
        </form>
      )}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="outline" size="lg" className="w-full">
        <ShieldQuestion className="h-4 w-4" /> Reset with phone number
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
