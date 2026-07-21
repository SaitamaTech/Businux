import { create } from "zustand";
import { aiAssistantApi } from "@/services/api/ai-assistant";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIAssistantState {
  messages: ChatMessage[];
  isThinking: boolean;
  sendMessage: (content: string) => Promise<void>;
}

const initialAssistantReply = `Here's a summary of your business performance:

Revenue increased by 24.3%, driven by strong performance in Software Services and Consulting. Net profit improved by 32.1% due to cost optimization and higher project margins. Your business health score is 87/100 (Excellent) — keep up the momentum!

Recommended actions: increase marketing budget by 15%, focus on high-value enterprise clients, and review pricing for high-demand services.`;

// NOTE: these seed timestamps are fixed ISO strings rather than computed via
// `Date.now()` at module-eval time. Next.js server-renders "use client"
// components too, so a Date.now()-based value computed once at import time
// would differ between the server's render pass and the client's, producing
// a hydration text mismatch the first time this page loads. Fixed strings
// are deterministic across both environments.
export const useAIAssistantStore = create<AIAssistantState>()((set) => ({
  messages: [
    {
      id: "m1",
      role: "user",
      content: "Give me a summary of our business performance this month and recommend 3 actions to increase revenue.",
      timestamp: "2025-05-26T10:25:00.000Z",
    },
    {
      id: "m2",
      role: "assistant",
      content: initialAssistantReply,
      timestamp: "2025-05-26T10:30:00.000Z",
    },
  ],
  isThinking: false,
  sendMessage: async (content) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({ messages: [...s.messages, userMsg], isThinking: true }));

    try {
      const reply = await aiAssistantApi.sendMessage({ content });
      set((s) => ({
        messages: [
          ...s.messages,
          {
            id: reply.id,
            role: reply.role,
            content: reply.content,
            timestamp: reply.timestamp,
          },
        ],
        isThinking: false,
      }));
    } catch {
      const fallbackReply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "I couldn't reach the AI service right now, but I can still help you refine your next step. Try asking for a summary, trend analysis, or an action plan.",
        timestamp: new Date().toISOString(),
      };
      set((s) => ({ messages: [...s.messages, fallbackReply], isThinking: false }));
    }
  },
}));
