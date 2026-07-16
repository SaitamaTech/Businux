"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Compass, Users, Rocket, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { useOnboardingStore } from "@/store/onboarding-store";
import { formatDate } from "@/lib/format";

const confettiColors = ["#4F46E5", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];

export default function OnboardingCompletePage() {
  const { businessInfo, staff } = useOnboardingStore();

  return (
    <div className="min-h-screen bg-secondary/30 lg:flex">
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="mb-8" />
          <h1 className="text-2xl font-bold tracking-tight">You&apos;re all set! 🎉</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Congratulations! Your Businux account is ready to help you manage and grow your business with ease.
          </p>

          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">🎁</div>
              <div>
                <p className="text-sm font-semibold">Welcome aboard!</p>
                <p className="text-xs text-muted-foreground">Explore powerful features built just for you.</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 space-y-4">
            <p className="text-sm font-semibold">What&apos;s Next?</p>
            {[
              { icon: Compass, title: "Explore your dashboard", desc: "Get an overview of your business at a glance." },
              { icon: Users, title: "Invite your team", desc: "Collaborate with your team and get more done together." },
              { icon: Rocket, title: "Discover powerful features", desc: "From project management to analytics, Businux has you covered." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-8 w-full">
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <div className="mt-3 text-center">
            <button className="text-sm font-medium text-primary hover:underline">Take a quick tour</button>
          </div>
        </div>
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden bg-primary/5 p-16 lg:flex lg:w-1/2">
        {confettiColors.map((c, i) => (
          <motion.span
            key={i}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{ y: [null, 400], opacity: [0, 1, 0], rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeIn" }}
            className="absolute h-3 w-2 rounded-sm"
            style={{ backgroundColor: c, left: `${10 + i * 15}%`, top: "5%" }}
          />
        ))}

        <div className="w-full max-w-sm space-y-6 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white shadow-lg"
          >
            <Check className="h-12 w-12" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold">Onboarding Complete!</h2>
            <p className="text-sm text-muted-foreground">Welcome to Businux 💙</p>
          </div>

          <Card className="text-left">
            <CardContent className="space-y-3 p-5">
              <p className="text-sm font-semibold">Your Account Summary</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Company Name</span>
                <span className="font-medium">{businessInfo.companyName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Account Type</span>
                <span className="font-medium">{businessInfo.businessType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Team Members</span>
                <span className="font-medium">{staff.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Onboarding Date</span>
                <span className="font-medium">{formatDate(new Date())}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-success/5 text-left">
            <CardContent className="flex items-start gap-3 p-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
              <div>
                <p className="text-sm font-semibold">Your data is secure</p>
                <p className="text-xs text-muted-foreground">We use industry-standard security to keep your business information safe.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
