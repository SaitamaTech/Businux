"use client";
import Link from "next/link";
import { Sparkles, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AIAssistantMiniPanel() {
  return (
    <Card className="border-accent/20 bg-gradient-to-b from-accent/5 to-transparent">
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <CardTitle>AI CEO Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <p className="text-sm text-muted-foreground">Hi John! I&apos;ve analyzed your business data. Here&apos;s what I found:</p>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs">
          Revenue is up 24.3% this month! Consider investing in marketing to maintain this growth.
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
          <label htmlFor="mini-ai-input" className="sr-only">
            Ask AI Assistant
          </label>
          <Input id="mini-ai-input" placeholder="Ask AI Assistant..." className="h-9 text-sm" />
          <Button asChild size="icon" variant="ai" className="h-9 w-9 shrink-0">
            <Link href="/ai-assistant" aria-label="Open full AI Assistant chat">
              <Send className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
