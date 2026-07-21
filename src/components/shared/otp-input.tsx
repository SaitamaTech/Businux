"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

export function OTPInput({ length = 6, onComplete }: { length?: number; onComplete?: (code: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string[]) => {
    setValues(next);
    if (next.every((v) => v !== "")) onComplete?.(next.join(""));
  };

  const handleChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[i] = digit;
    commit(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
  };

  // Pasting a full code (e.g. from a password manager or SMS) should fill
  // every box, not just the one that was focused when the paste happened.
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
    if (digits.length < 2) return;
    e.preventDefault();
    const next = Array(length).fill("");
    digits.forEach((d, i) => (next[i] = d));
    commit(next);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
  };

  return (
    <div role="group" aria-label={`${length}-digit verification code`} className="flex gap-2.5">
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={values[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1} of ${length}`}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          className="h-14 w-12 text-center text-lg font-semibold"
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}
