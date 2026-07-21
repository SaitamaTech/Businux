import { NextResponse } from "next/server";
import type { SendChatMessageRequest, SendChatMessageResponse } from "@/types/api";

const GROK_API_KEY = process.env.GROK_API_KEY;
const XAI_BASE_URL = "https://api.x.ai/v1";

export async function POST(request: Request ) {
  if (!GROK_API_KEY) {
    return NextResponse.json({ error: "Grok API key is not configured." }, { status: 500 });
  }

  const payload = (await request.json()) as SendChatMessageRequest;
  if (!payload?.content) {
    return NextResponse.json({ error: "Missing content in request." }, { status: 400 });
  }

  try {
    const response = await fetch(`${XAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini-latest",
        messages: [
          {
            role: "system",
            content:
              "You are the Businux AI assistant. Answer business questions clearly, provide concise insights, and help users with strategy, reporting, and CRM guidance.",
          },
          {
            role: "user",
            content: payload.content,
          },
        ],
        max_tokens: 600,
        temperature: 0.8,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result?.error?.message ?? "Grok request failed.";
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const assistantMessage = result.choices?.[0]?.message?.content ?? "The AI did not return a response.";
    const aiResponse: SendChatMessageResponse = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: assistantMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected Grok error." },
      { status: 500 }
    );
  }
}