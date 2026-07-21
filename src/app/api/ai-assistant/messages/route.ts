import { NextResponse } from "next/server";
import type { SendChatMessageRequest, SendChatMessageResponse } from "@/types/api";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key is not configured." }, { status: 500 });
  }

  const payload = (await request.json()) as SendChatMessageRequest;
  if (!payload?.content) {
    return NextResponse.json({ error: "Missing content in request." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the Businux AI assistant. Answer business questions clearly, provide concise insights, and help users with strategy, reporting, and CRM guidance.",
          },
          { role: "user", content: payload.content },
        ],
        temperature: 0.8,
        max_tokens: 600,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result?.error?.message ?? "OpenAI request failed.";
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const assistantMessage = result.choices?.[0]?.message?.content;
    const aiResponse: SendChatMessageResponse = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: assistantMessage ?? "The AI did not return a response.",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected OpenAI error." },
      { status: 500 }
    );
  }
}
