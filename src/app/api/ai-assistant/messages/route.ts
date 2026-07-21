import { NextResponse } from "next/server";
import type { SendChatMessageRequest, SendChatMessageResponse } from "@/types/api";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.XAI_API_KEY || process.env.GROK_API_KEY;
const GEMINI_MODEL = "gemini-1.5-mini";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1";

export async function POST(request: Request ) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
  }

  const payload = (await request.json()) as SendChatMessageRequest;
  if (!payload?.content) {
    return NextResponse.json({ error: "Missing content in request." }, { status: 400 });
  }

  try {
    const isApiKey = GEMINI_API_KEY.startsWith("AIza");
    const requestUrl = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generate${isApiKey ? `?key=${encodeURIComponent(GEMINI_API_KEY)}` : ""}`;
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(isApiKey ? {} : { Authorization: `Bearer ${GEMINI_API_KEY}` }),
    };

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        prompt: {
          text: payload.content,
        },
        temperature: 0.8,
        maxOutputTokens: 600,
        candidateCount: 1,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result?.error?.message ?? "Gemini request failed.";
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const assistantMessage = result?.candidates?.[0]?.output ?? "The AI did not return a response.";
    const aiResponse: SendChatMessageResponse = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: assistantMessage,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected Gemini error." },
      { status: 500 }
    );
  }
}