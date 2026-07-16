import { cn } from "@/lib/utils";

export function Logo({ className, showText = true, size = "md" }: { className?: string; showText?: boolean; size?: "sm" | "md" | "lg" }) {
  const dims = { sm: 28, md: 36, lg: 56 }[size];
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg width={dims} height={dims} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#logo-grad)" />
        <path
          d="M14 10h9.5a5 5 0 0 1 2.6 9.3A5.5 5.5 0 0 1 23.5 30H14V10Zm4 4v6h5a3 3 0 0 0 0-6h-5Zm0 10v6h5.5a3 3 0 0 0 0-6H18Z"
          fill="white"
        />
      </svg>
      {showText && <span className="text-xl font-bold tracking-tight text-foreground">Businux</span>}
    </div>
  );
}
