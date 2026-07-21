import { env } from "@/lib/env";
import { apiClient } from "./client";
import type { SendChatMessageRequest, SendChatMessageResponse } from "@/types/api";

async function mockDelay(ms = 1000) {
  await new Promise((r) => setTimeout(r, ms));
}

export const aiAssistantApi = {
  async sendMessage(payload: SendChatMessageRequest): Promise<SendChatMessageResponse> {
    if (env.useMockApi) {
      await mockDelay();
      return {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "I've noted that. Once connected to the live backend, I'll pull real-time data from your CRM, Finance, and Task services to answer this precisely.",
        timestamp: new Date().toISOString(),
      };
    }
    // Real backend should stream via Server-Sent Events or a ReadableStream
    // response for a typing effect — this call is the non-streaming fallback.
    // See docs/API_INTEGRATION.md → "AI Assistant streaming" for the plan.
    return apiClient<SendChatMessageResponse>("/api/ai-assistant/messages", { method: "POST", body: payload });
  },
};
