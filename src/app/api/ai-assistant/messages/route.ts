import { NextResponse } from "next/server";
import type { SendChatMessageRequest, SendChatMessageResponse } from "@/types/api";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
  }

  const payload = (await request.json()) as SendChatMessageRequest;
  if (!payload?.content) {
    return NextResponse.json({ error: "Missing content in request." }, { status: 400 });
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: "You are the Businux AI assistant. Answer business questions clearly, provide concise insights, and help users with strategy, reporting, and CRM guidance.",
            },
          ],
        },
        contents: [{ role: "user", parts: [{ text: payload.content }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 600 },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message ?? "Gemini request failed.";
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const assistantMessage = result?.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join("");

    const aiResponse: SendChatMessageResponse = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: assistantMessage || "The AI did not return a response.",
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error calling Gemini." },
      { status: 500 }
    );
  }
}
