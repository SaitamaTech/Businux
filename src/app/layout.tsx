import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "Businux — AI-Powered Business OS",
    template: "%s — Businux",
  },
  description: "Manage your entire business with the power of AI.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

// Runs before hydration so the correct theme class is on <html> for the very
// first paint — this is what actually prevents a flash of the wrong theme.
// React's own state (see ThemeProvider) re-syncs to match immediately after,
// which is why <html> below needs suppressHydrationWarning: the class
// attribute this script sets is expected to differ from the server-rendered
// markup, and that specific, intentional mismatch is safe to ignore.
const themeInitScript = `
  try {
    var stored = window.localStorage.getItem("businux-theme");
    if (stored === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
