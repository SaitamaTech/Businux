import { ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useOnboardingStore } from "@/store/onboarding-store";

export function ReviewStep() {
  const { businessInfo, staff } = useOnboardingStore();

  const rows = [
    { label: "Company Name", value: businessInfo.companyName },
    { label: "Business Type", value: businessInfo.businessType },
    { label: "Address", value: businessInfo.address },
    { label: "Phone", value: businessInfo.phone },
    { label: "Email", value: businessInfo.email },
    { label: "Team Size", value: `${staff.length} staff added` },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-4 w-4 text-primary" /> Review & Finish
        </CardTitle>
        <CardDescription>Confirm your details before finishing setup.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <dl className="divide-y divide-border rounded-lg border border-border">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between px-4 py-3 text-sm">
              <dt className="text-muted-foreground">{r.label}</dt>
              <dd className="font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
