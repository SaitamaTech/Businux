import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * POST /api/ai-assistant/messages
 * Send a message to the AI assistant and get a response.
 *
 * Provider: Google Gemini (generateContent REST API). Requires
 * GEMINI_API_KEY set on the backend (Render). See docs/API_INTEGRATION.md.
 */
router.post('/messages', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: { message: 'Message content required' } });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: { message: 'Gemini API key is not configured on the backend.' } });
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: 'You are the Businux AI assistant. Answer business questions clearly, provide concise insights, and help users with strategy, reporting, and CRM guidance.',
            },
          ],
        },
        contents: [{ role: 'user', parts: [{ text: content }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 600 },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message ?? 'Gemini request failed.';
      return res.status(response.status).json({ error: { message: errorMessage } });
    }

    const assistantMessage = result?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ;

    res.json({
      id: uuidv4(),
      role: 'assistant',
      content: assistantMessage || 'The AI did not return a response.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({
      error: { message: error instanceof Error ? error.message : 'Unexpected error calling Gemini.' },
    });
  }
});

export default router;

