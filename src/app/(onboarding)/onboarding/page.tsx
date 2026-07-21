"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { OnboardingSidebar } from "@/features/onboarding/components/onboarding-sidebar";
import { BusinessInformationStep, StaffDistributionStep } from "@/features/onboarding/components/business-info-step";
import { ProductsStep, ServicesStep } from "@/features/onboarding/components/list-builder-steps";
import { ReviewStep } from "@/features/onboarding/components/review-step";
import { useOnboardingStore } from "@/store/onboarding-store";

const stepComponents = [BusinessInformationStep, StaffDistributionStep, ProductsStep, ServicesStep, ReviewStep];
const stepTitles = ["Business Information", "Staff Distribution", "Products", "Services", "Review & Finish"];

export default function OnboardingPage() {
  const router = useRouter();
  const { step, totalSteps, nextStep, prevStep } = useOnboardingStore();
  const StepComponent = stepComponents[step - 1];

  const handleNext = () => {
    if (step === totalSteps) {
      router.push("/onboarding/complete");
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        <OnboardingSidebar />

        <div className="flex-1 p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Logo size="sm" showText={false} />
              <h1 className="mt-3 text-xl font-bold tracking-tight">Let&apos;s set up your business</h1>
              <p className="text-sm text-muted-foreground">Tell us about your business to personalize your experience.</p>
            </div>
            <Button variant="outline" size="sm">
              <Save className="h-3.5 w-3.5" /> Save & Exit
            </Button>
          </div>

          <p className="mb-3 text-xs font-medium text-muted-foreground">
            Step {step} of {totalSteps} — {stepTitles[step - 1]}
          </p>

          <StepComponent />

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext}>
              {step === totalSteps ? "Finish Setup" : "Next Step"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
