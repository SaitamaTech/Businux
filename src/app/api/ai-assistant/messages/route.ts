import { NextResponse } from "next/server";
import type { SendChatMessageRequest, SendChatMessageResponse } from "@/types/api";

const GROK_API_KEY = process.env.GROK_API_KEY;

export async function POST(request: Request) {
  if (!GROK_API_KEY) {
    return NextResponse.json({ error: "Grok API key is not configured." }, { status: 500 });
  }

  const payload = (await request.json()) as SendChatMessageRequest;
  if (!payload?.content) {
    return NextResponse.json({ error: "Missing content in request." }, { status: 400 });
  }

  try {
    const prompt = `You are the Businux AI assistant. Answer business questions clearly, provide concise insights, and help users with strategy, reporting, and CRM guidance.\n\nHuman: ${payload.content}\nAssistant:`;

    const response = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": GROK_API_KEY,
      },
      body: JSON.stringify({
        model: "grok-1",
        prompt,
        max_tokens_to_sample: 600,
        temperature: 0.8,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result?.error?.message ?? "Grok request failed.";
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const assistantMessage = result.completion || result?.choices?.[0]?.text || result?.output || "The AI did not return a response.";
    const aiResponse: SendChatMessageResponse = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: assistantMessage ?? "The AI did not return a response.",
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
