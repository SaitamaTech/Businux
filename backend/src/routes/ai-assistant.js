import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDocumentsByOrg } from '../db.js';

const router = express.Router();
<<<<<<< HEAD
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
=======
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.XAI_API_KEY || process.env.GROK_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-mini';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1';
>>>>>>> 8b90aebe369a87bfa3e3ad6aecf5d20646e5fdaf

/**
 * POST /api/ai-assistant/messages
 * Send a message to the AI assistant and get a response.
 *
 * Provider: Google Gemini (generateContent REST API). Requires
 * GEMINI_API_KEY set on the backend (Render). See docs/API_INTEGRATION.md.
 */
router.post('/messages', async (req, res) => {
  const { content, org_id } = req.body;

  if (!content) {
    return res.status(400).json({ error: { message: 'Message content required' } });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: { message: 'Gemini API key is not configured on the backend.' } });
  }

  try {
<<<<<<< HEAD
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
=======
    // Fetch top org documents to provide context
    let docsSummary = '';
    if (org_id) {
      const docs = getDocumentsByOrg(org_id) || [];
      const top = docs.slice(0, 5).map((d) => `- ${d.title}: ${d.content.slice(0, 300)}`).join('\n');
      if (top) docsSummary = `Organization documents:\n${top}\n\n`;
    }

    const systemPrompt = `You are the Businux AI assistant. Answer business questions clearly, provide concise insights, and help users with strategy, reporting, and CRM guidance. Use available organization documents when relevant.\n\n${docsSummary}`;
    const prompt = `${systemPrompt}\nHuman: ${content}\nAssistant:`;

    const isApiKey = GEMINI_API_KEY.startsWith('AIza');
    const requestUrl = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generate${isApiKey ? `?key=${encodeURIComponent(GEMINI_API_KEY)}` : ''}`;
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...(isApiKey ? {} : { Authorization: `Bearer ${GEMINI_API_KEY}` }),
    };

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        prompt: {
          text: prompt,
        },
        temperature: 0.8,
        maxOutputTokens: 600,
        candidateCount: 1,
>>>>>>> 8b90aebe369a87bfa3e3ad6aecf5d20646e5fdaf
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message ?? 'Gemini request failed.';
      return res.status(response.status).json({ error: { message: errorMessage } });
    }

<<<<<<< HEAD
    const assistantMessage = result?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ;

    res.json({
      id: uuidv4(),
      role: 'assistant',
      content: assistantMessage || 'The AI did not return a response.',
=======
    const assistantMessage = result?.candidates?.[0]?.output || 'The AI did not return a response.';
    res.json({
      id: uuidv4(),
      role: 'assistant',
      content: assistantMessage,
>>>>>>> 8b90aebe369a87bfa3e3ad6aecf5d20646e5fdaf
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({
<<<<<<< HEAD
      error: { message: error instanceof Error ? error.message : 'Unexpected error calling Gemini.' },
=======
      error: { message: error instanceof Error ? error.message : 'Unexpected error calling Grok.' },
>>>>>>> 8b90aebe369a87bfa3e3ad6aecf5d20646e5fdaf
    });
  }
});

export default router;

