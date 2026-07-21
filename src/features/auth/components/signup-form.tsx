"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SocialLoginRow } from "./social-login-row";
import { PasswordStrength } from "./password-strength";
import { authApi } from "@/services/api/auth";
import { useToast } from "@/components/providers/toast-provider";
import { env } from "@/lib/env";
import { firebaseSignup } from "@/lib/firebase";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v, { message: "You must agree to continue" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FormValues = z.infer<typeof schema>;

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", terms: false, demo: true, template: 'software' },
  });

  // useWatch (not the `watch()` method) keeps this component compatible with
  // the React Compiler's memoization instead of opting the whole tree out.
  const password = useWatch({ control, name: "password" }) || "";
  const termsChecked = watch("terms", false);

  const toast = useToast();

  const onSubmit = async (values: FormValues) => {
    try {
      const payload: any = { fullName: values.fullName, email: values.email, password: values.password, seed_demo: values.demo, template: values.template };
      if (env.useFirebase) {
        try {
          await firebaseSignup(values.email, values.password, values.fullName);
        } catch (firebaseError) {
          console.warn("Firebase signup failed, falling back to mock signup", firebaseError);
          await authApi.signup(payload);
        }
      } else {
        await authApi.signup(payload);
      }
      toast.success({ title: "Account created", description: "Your account is ready. You can continue to the dashboard." });
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.message ?? "Signup failed";
      toast.error({ title: "Signup error", description: message });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">Start your journey with Businux today.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="fullName"
              autoComplete="name"
              placeholder="Enter your full name"
              className="pl-9"
              error={!!errors.fullName}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="text-xs text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="pl-9"
              error={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              className="pl-9 pr-9"
              error={!!errors.password}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
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
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className="pl-9 pr-9"
              error={!!errors.confirmPassword}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              aria-pressed={showConfirm}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" role="alert" className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            className="mt-0.5"
            checked={termsChecked}
            onCheckedChange={(checked) => setValue("terms", checked === true, { shouldValidate: true, shouldDirty: true })}
            aria-describedby={errors.terms ? "terms-error" : undefined}
          />
          <Label htmlFor="terms" className="font-normal leading-snug text-muted-foreground">
            I agree to the{" "}
            <Link href="/terms-of-service" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.terms && (
          <p id="terms-error" role="alert" className="text-xs text-destructive">
            {errors.terms.message}
          </p>
        )}

        <div className="flex items-center gap-2">
          <Checkbox id="demo" className="mt-0.5" defaultChecked {...register('demo')} />
          <Label htmlFor="demo" className="font-normal leading-snug text-muted-foreground">
            Start with demo data (recommended)
          </Label>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="template">Industry template</Label>
          <select id="template" className="w-full rounded-lg border px-3 py-2" {...register('template')}>
            <option value="software">Software</option>
            <option value="retail">Retail</option>
            <option value="consulting">Consulting</option>
          </select>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      <SocialLoginRow label="Or sign up with" />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
