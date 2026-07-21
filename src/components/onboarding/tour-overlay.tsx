"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

export interface TourStep {
  selector: string;
  title: string;
  description: string;
}

export default function TourOverlay({ steps = [], open = false, onClose, onStepChange, onFinish }: { steps: TourStep[]; open: boolean; onClose: () => void; onStepChange?: (index: number) => void; onFinish?: () => void }) {
  const [index, setIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const lastIndex = steps.length - 1;

  useEffect(() => {
    if (!open) return;
    const step = steps[index];
    if (!step) return;
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
    if (typeof onStepChange === 'function') {
      onStepChange(index);
      // allow parent to update UI (switch onboarding step) then retry finding element
      setTimeout(() => {
        const el2 = document.querySelector(step.selector) as HTMLElement | null;
        if (el2) {
          el2.scrollIntoView({ behavior: "smooth", block: "center" });
          setTargetRect(el2.getBoundingClientRect());
        }

        // handle try-it actions if provided
        const s: any = step as any;
        if (s?.tryIt) {
          // fill value
          if (s.tryIt.fill && s.tryIt.targetSelector) {
            const input = document.querySelector(s.tryIt.targetSelector) as HTMLInputElement | null;
            if (input) {
              input.value = s.tryIt.fill;
              input.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
          // click action
          if (s.tryIt.clickSelector) {
            const btn = document.querySelector(s.tryIt.clickSelector) as HTMLElement | null;
            if (btn) btn.click();
          }
        }
      }, 220);
    }
  }, [index, open, steps]);

  useEffect(() => {
    if (!open) setIndex(0);
  }, [open]);

  if (typeof document === "undefined") return null;
  if (!open) return null;

  const step = steps[index];

  return createPortal(
    <div className="fixed inset-0 z-[2000] pointer-events-none">
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" onClick={onClose} />

      {targetRect && (
        <>
          <div
            className="absolute rounded-full ring-4 ring-primary/50 animate-pulse pointer-events-none"
            style={{
              left: targetRect.left - 8 + window.scrollX,
              top: targetRect.top - 8 + window.scrollY,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
            }}
          />

          <div
            className="absolute max-w-xs rounded-lg bg-popover p-4 shadow-lg pointer-events-auto"
            style={{
              left: Math.min(window.innerWidth - 320, targetRect.left + window.scrollX + targetRect.width + 12),
              top: targetRect.top + window.scrollY,
            }}
          >
            <h4 className="mb-1 font-semibold">{step?.title}</h4>
            <p className="mb-3 text-sm text-muted-foreground">{step?.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>
                    Back
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (index === lastIndex) {
                        // finish
                        if (typeof onFinish === 'function') onFinish();
                        if (typeof onClose === 'function') onClose();
                      } else {
                        setIndex(Math.min(steps.length - 1, index + 1));
                      }
                    }}
                  >
                    {index === steps.length - 1 ? "Done" : "Next"}
                  </Button>
                </div>
                <Button size="sm" variant="ghost" onClick={onClose}>
                  Close
                </Button>
            </div>
          </div>
        </>
      )}

      {!targetRect && (
        <div className="absolute left-1/2 top-1/3 w-[420px] -translate-x-1/2 rounded-lg bg-popover p-4 shadow-lg pointer-events-auto">
          <h4 className="mb-1 font-semibold">{step?.title}</h4>
          <p className="mb-3 text-sm text-muted-foreground">{step?.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>
                Back
              </Button>
              <Button size="sm" onClick={() => setIndex(Math.min(steps.length - 1, index + 1))}>
                {index === steps.length - 1 ? "Done" : "Next"}
              </Button>
            </div>
            <Button size="sm" variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
