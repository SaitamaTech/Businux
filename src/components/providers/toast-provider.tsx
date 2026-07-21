"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type ToastVariant = "success" | "error" | "info";
type Toast = { id: string; title?: string; description?: string; variant?: ToastVariant };

interface ToastContextValue {
  toast: (t: Omit<Toast, "id">) => string;
  success: (t: Omit<Toast, "id">) => string;
  error: (t: Omit<Toast, "id">) => string;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (t: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    const next: Toast = { id, ...t };
    setToasts((s) => [next, ...s]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4500);
    return id;
  };

  const success = (t: Omit<Toast, "id">) => toast({ ...t, variant: "success" });
  const error = (t: Omit<Toast, "id">) => toast({ ...t, variant: "error" });

  const value = useMemo(() => ({ toast, success, error }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto w-80 rounded border px-4 py-3 shadow-lg transform transition-all duration-200 ease-out flex items-start gap-3 ${
              t.variant === "success"
                ? "bg-success/10 border-success"
                : t.variant === "error"
                ? "bg-destructive/10 border-destructive"
                : "bg-background border-border"
            }`}>
            <div className="text-xl leading-none" aria-hidden>
              {t.variant === "success" ? "✅" : t.variant === "error" ? "⚠️" : "ℹ️"}
            </div>
            <div>
              {t.title && <div className="font-semibold mb-1">{t.title}</div>}
              {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
