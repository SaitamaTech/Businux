"use client";
import { useState } from "react";
import { Package, Wrench, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ListBuilderStep({
  icon: Icon,
  title,
  description,
  placeholder,
  defaultItems,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  placeholder: string;
  defaultItems: string[];
}) {
  const [items, setItems] = useState<string[]>(defaultItems);
  const [value, setValue] = useState("");

  const add = () => {
    if (!value.trim()) return;
    setItems((prev) => [...prev, value.trim()]);
    setValue("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="flex gap-2">
          <Input
            aria-label={title}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          />
          <Button type="button" onClick={add}>
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <Badge key={`${item}-${i}`} variant="secondary" className="gap-1.5 py-1.5 pl-3 pr-2 text-sm">
              {item}
              <button
                onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
                aria-label={`Remove ${item}`}
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </Badge>
          ))}
          {items.length === 0 && <p className="text-sm text-muted-foreground">No items added yet.</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductsStep() {
  return (
    <ListBuilderStep
      icon={Package}
      title="Products"
      description="What products does your business sell?"
      placeholder="e.g. AI Integration Package"
      defaultItems={["Custom Software Development", "AI Integration Package"]}
    />
  );
}

export function ServicesStep() {
  return (
    <ListBuilderStep
      icon={Wrench}
      title="Services"
      description="What services does your business offer?"
      placeholder="e.g. Technical Consulting"
      defaultItems={["Technical Consulting", "Ongoing Support & Maintenance"]}
    />
  );
}
