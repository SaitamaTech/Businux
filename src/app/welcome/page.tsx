"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/shared/logo";
import { useAuthStore } from "@/store/auth-store";

export default function WelcomePage() {
  const router = useRouter();
  const establishSession = useAuthStore((s) => s.establishSession);
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-between px-6 py-10">
        <div>
          <Logo />
          <Badge variant="accent" className="mt-8 gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> AI-Powered
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight"
          >
            Your Business. Smarter. Faster. Stronger.
          </motion.h1>
          <p className="mt-3 text-muted-foreground">
            Businux is the all-in-one operating system that helps you manage, automate, and grow your business with the power of AI.
          </p>

          <div className="relative mt-10">
            <div className="absolute -left-4 top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div className="absolute -right-2 top-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
              <Users className="h-5 w-5" />
            </div>
            <div className="absolute -right-3 bottom-16 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500 text-white shadow-lg">
              <BarChart3 className="h-5 w-5" />
            </div>
            <Card className="shadow-popover">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Revenue Overview</p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">₦128,430</span>
                  <span className="text-xs font-medium text-success">+12.5%</span>
                </div>
                <div className="h-16 rounded-lg bg-gradient-to-t from-primary/10 to-transparent" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">Active Customers</p>
                    <p className="text-lg font-bold">1,240</p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <p className="text-lg font-bold">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-6 bg-primary" : "w-1.5 bg-secondary"}`} />
            ))}
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href="/signup">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => {
              establishSession({ name: "Guest User" });
              router.push("/dashboard");
            }}
          >
            Explore as Guest
          </Button>
        </div>
      </div>
    </div>
  );
}
