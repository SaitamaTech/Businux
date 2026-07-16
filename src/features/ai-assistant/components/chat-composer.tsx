"use client";
import { useState } from "react";
import { Send, Upload, FileBarChart, FilePlus2, ChartBar, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAIAssistantStore } from "@/store/ai-assistant-store";

const quickActions = [
  { label: "Upload File", icon: Upload },
  { label: "Generate Report", icon: FileBarChart },
  { label: "Create Document", icon: FilePlus2 },
  { label: "Analyze Data", icon: ChartBar },
];

export function ChatComposer() {
  const [value, setValue] = useState("");
  const sendMessage = useAIAssistantStore((s) => s.sendMessage);

  const handleSend = () => {
    if (!value.trim()) return;
    sendMessage(value.trim());
    setValue("");
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="flex items-center gap-2">
        <label htmlFor="chat-composer-input" className="sr-only">
          Ask the AI Assistant about your business
        </label>
        <Input
          id="chat-composer-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && handleSend()}
          placeholder="Ask anything about your business..."
          className="h-11"
        />
        <Button size="icon" className="h-11 w-11 shrink-0" onClick={handleSend} aria-label="Send message">
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {quickActions.map((a) => (
          <Button key={a.label} variant="outline" size="sm" className="text-xs">
            <a.icon className="h-3.5 w-3.5" /> {a.label}
          </Button>
        ))}
        <Button variant="outline" size="sm" className="text-xs">
          <MoreHorizontal className="h-3.5 w-3.5" /> More Tools
        </Button>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Businux AI can make mistakes. Please verify important information.
      </p>
    </div>
  );
}
