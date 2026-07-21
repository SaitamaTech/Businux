"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import TourOverlay from "@/components/onboarding/tour-overlay";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { OnboardingSidebar } from "@/features/onboarding/components/onboarding-sidebar";
import { BusinessInformationStep, StaffDistributionStep } from "@/features/onboarding/components/business-info-step";
import { ProductsStep, ServicesStep } from "@/features/onboarding/components/list-builder-steps";
import { ReviewStep } from "@/features/onboarding/components/review-step";
import { useOnboardingStore } from "@/store/onboarding-store";
import { setDismissedTutorial } from "@/services/mock-store";
import React from "react";

const stepComponents = [BusinessInformationStep, StaffDistributionStep, ProductsStep, ServicesStep, ReviewStep];
const stepTitles = ["Business Information", "Staff Distribution", "Products", "Services", "Review & Finish"];

export default function OnboardingPage() {
  const router = useRouter();
  const { step, totalSteps, nextStep, prevStep, setStep } = useOnboardingStore();
  const StepComponent = stepComponents[step - 1];

  const handleNext = () => {
    if (step === totalSteps) {
      router.push("/onboarding/complete");
    } else {
      nextStep();
    }
  };

  const [tourOpen, setTourOpen] = React.useState(false);

  const steps = [
    { selector: '[data-tour="company-name"]', title: 'Company name', description: 'Fill in your company name here so Businux can personalize your workspace.', stepIndex: 1 },
    { selector: '[data-tour="business-address"]', title: 'Business address', description: 'Add your business address for invoices and contact info.', stepIndex: 1 },
    { selector: '[data-tour="add-staff"]', title: 'Add staff', description: 'Use this button to add new team members during onboarding.', stepIndex: 2, tryIt: { fill: 'Alex Team', targetSelector: '[data-tour="input-staff-name"]', clickSelector: '[data-tour="add-staff"]' } },
    { selector: '[data-tour="remove-staff"]', title: 'Remove staff', description: 'Remove a staff member using this action.', stepIndex: 2 },
    { selector: '[data-tour="input-products"]', title: 'Add a product', description: 'Type a product name and click Add to include it in your catalog.', stepIndex: 3, tryIt: { fill: 'Demo Product', targetSelector: '[data-tour="input-products"]', clickSelector: '[data-tour="add-products"]' } },
    { selector: '[data-tour="add-products"]', title: 'Add product', description: 'Click Add to save the product into your list.', stepIndex: 3 },
    { selector: '[data-tour="remove-item"]', title: 'Remove item', description: 'Remove a product or service from your list.', stepIndex: 3 },
    { selector: '[data-tour="input-services"]', title: 'Add a service', description: 'Type a service name and click Add to include it.', stepIndex: 4, tryIt: { fill: 'Demo Service', targetSelector: '[data-tour="input-services"]', clickSelector: '[data-tour="add-services"]' } },
    { selector: '[data-tour="add-services"]', title: 'Add service', description: 'Click Add to save the service into your list.', stepIndex: 4 },
    { selector: '[data-tour="step-indicator"]', title: 'Progress', description: 'This shows which step you are on in the onboarding flow.' },
    { selector: '[data-tour="save-exit"]', title: 'Save & Exit', description: 'Save your progress and return later.' },
    { selector: '[data-tour="next-step"]', title: 'Next Step', description: 'Move to the next step when you are ready.' },
  ];

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
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => setTourOpen(true)}>
                Interactive tutorial
              </Button>
              <Button data-tour="save-exit" variant="outline" size="sm">
                <Save className="h-3.5 w-3.5" /> Save & Exit
              </Button>
            </div>
          </div>

          <p data-tour="step-indicator" className="mb-3 text-xs font-medium text-muted-foreground">
            Step {step} of {totalSteps} — {stepTitles[step - 1]}
          </p>

          <div data-tour="step-area">
            <StepComponent />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <Button data-tour={step === totalSteps ? "finish-setup" : "next-step"} onClick={handleNext}>
              {step === totalSteps ? "Finish Setup" : "Next Step"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <TourOverlay
        steps={steps}
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        onFinish={() => {
          setDismissedTutorial(true);
          setTourOpen(false);
        }}
        onStepChange={(i) => {
          const s = steps[i];
          if (s && (s as any).stepIndex) {
            setStep((s as any).stepIndex);
          }
        }}
      />
    </div>
  );
}
