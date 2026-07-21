"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface DialogField {
  name: string;
  label: string;
  type?: "text" | "number" | "select";
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
}

interface CreateItemDialogProps {
  triggerLabel: string;
  title: string;
  description: string;
  fields: DialogField[];
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
}

export function CreateItemDialog({ triggerLabel, title, description, fields, onSubmit }: CreateItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const reset = () => {
    setValues({});
    setErrors({});
    setFeedback(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !values[field.name]?.trim()) {
        nextErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setFeedback(null);
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await onSubmit(values);
      setFeedback("Saved successfully.");
      reset();
      setOpen(false);
    } catch {
      setFeedback("Unable to save right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldRows = useMemo(() => fields.map((field) => ({ ...field })), [fields]);

  return (
    <Dialog open={open} onOpenChange={(next) => {
      setOpen(next);
      if (!next) reset();
    }}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="h-3.5 w-3.5" /> {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {fieldRows.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  value={values[field.name] ?? ""}
                  onValueChange={(value) => {
                    setValues((current) => ({ ...current, [field.name]: value }));
                    setErrors((current) => ({ ...current, [field.name]: "" }));
                  }}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder={field.placeholder ?? `Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "number" ? (
                <Input
                  id={field.name}
                  type="number"
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) => {
                    setValues((current) => ({ ...current, [field.name]: event.target.value }));
                    setErrors((current) => ({ ...current, [field.name]: "" }));
                  }}
                />
              ) : (
                <Input
                  id={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) => {
                    setValues((current) => ({ ...current, [field.name]: event.target.value }));
                    setErrors((current) => ({ ...current, [field.name]: "" }));
                  }}
                />
              )}
              {errors[field.name] && <p className="text-sm text-destructive">{errors[field.name]}</p>}
            </div>
          ))}

          {feedback && (
            <p className="rounded-lg border border-success/20 bg-success/10 p-3 text-sm text-success" role="status">
              {feedback}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
