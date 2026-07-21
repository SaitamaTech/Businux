import { Card } from "@/components/ui/card";

interface SocialLoginRowProps {
  label: string;
  onGoogleSignIn?: () => Promise<void>;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.42 2.14-1.34 2.94-.94.79-1.98 1.29-3.05 1.2-.1-1.16.42-2.24 1.32-3.02.9-.79 2.06-1.29 3.07-1.12zM20.9 17.03c-.34.78-.75 1.55-1.26 2.28-.7 1.01-1.28 1.71-1.72 2.11-.68.65-1.4 1-2.18 1.02-.55.02-1.22-.16-1.99-.5-.78-.35-1.49-.52-2.15-.52-.68 0-1.41.17-2.19.52-.79.34-1.42.52-1.91.53-.75.03-1.5-.33-2.19-1.03-.48-.44-1.1-1.16-1.85-2.19-.8-1.1-1.46-2.38-1.98-3.83-.55-1.56-.83-3.07-.83-4.53 0-1.67.36-3.11 1.08-4.31.57-.97 1.32-1.73 2.26-2.28.94-.55 1.95-.84 3.03-.86.6-.02 1.32.19 2.19.6.87.42 1.42.63 1.67.63.19 0 .82-.24 1.87-.71 1-.44 1.85-.62 2.55-.56 1.89.15 3.31.9 4.26 2.25-1.69 1.03-2.53 2.46-2.51 4.31.02 1.44.53 2.63 1.53 3.58.45.44.96.78 1.53 1.03-.12.36-.25.71-.4 1.06z"/>
    </svg>
  );
}

export function SocialLoginRow({ label, onGoogleSignIn }: SocialLoginRowProps) {
  const providers = [
    { icon: <GoogleIcon />, label: "Google", onClick: onGoogleSignIn },
    { icon: <MicrosoftIcon />, label: "Microsoft", onClick: undefined },
    { icon: <AppleIcon />, label: "Apple", onClick: undefined },
  ];

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">{label}</span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {providers.map((p) => (
          <Card
            key={p.label}
            className={
              `flex flex-col items-center gap-2 py-3 text-xs font-medium text-muted-foreground transition-colors ` +
              (p.onClick ? "cursor-pointer hover:bg-secondary" : "cursor-default")
            }
            onClick={p.onClick}
            role={p.onClick ? "button" : undefined}
            tabIndex={p.onClick ? 0 : undefined}
          >
            {p.icon}
            {p.label}
          </Card>
        ))}
      </div>
    </div>
  );
}
