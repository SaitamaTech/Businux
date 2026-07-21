import { cn } from "@/lib/utils";

function scorePassword(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const LABELS = ["Too weak", "Weak", "Fair", "Strong", "Very strong"];
const COLORS = ["bg-destructive", "bg-destructive", "bg-warning", "bg-success", "bg-success"];

export function PasswordStrength({ password }: { password: string }) {
  const score = password ? scorePassword(password) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={cn("font-medium", score >= 3 ? "text-success" : score >= 2 ? "text-warning" : "text-destructive")}>
          {password ? LABELS[score] : ""}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn("h-1.5 flex-1 rounded-full bg-secondary transition-colors", i < score && COLORS[score])}
          />
        ))}
      </div>
    </div>
  );
}

export function passwordRequirements(password: string) {
  return [
    { label: "At least 8 characters long", met: password.length >= 8 },
    { label: "Include uppercase and lowercase letters", met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: "Include at least one number", met: /\d/.test(password) },
    { label: "Include at least one special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
}
