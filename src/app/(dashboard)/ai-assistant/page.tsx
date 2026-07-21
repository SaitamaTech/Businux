"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mic, Plus } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "@/features/ai-assistant/components/chat-bubble";
import { ChatComposer } from "@/features/ai-assistant/components/chat-composer";
import { AIAssistantSidePanel } from "@/features/ai-assistant/components/ai-assistant-side-panel";
import { useAIAssistantStore } from "@/store/ai-assistant-store";

export default function AIAssistantPage() {
  const messages = useAIAssistantStore((s) => s.messages);
  const isThinking = useAIAssistantStore((s) => s.isThinking);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <DashboardShell>
      <div className="flex h-[calc(100vh-6rem)] gap-0 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-accent" /> AI Assistant
              </h2>
              <p className="text-xs text-muted-foreground">Your intelligent business partner. Ask anything, get everything.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Mic className="h-3.5 w-3.5" /> Voice Mode</Button>
              <Button size="sm"><Plus className="h-3.5 w-3.5" /> New Chat</Button>
            </div>
          </div>

          <div ref={scrollRef} className="scrollbar-thin flex-1 space-y-5 overflow-y-auto p-5">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}
            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 pl-11 text-xs text-muted-foreground">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
                </span>
                Thinking...
              </motion.div>
            )}
          </div>

          <ChatComposer />
        </div>

        <AIAssistantSidePanel />
      </div>
    </DashboardShell>
  );
}
