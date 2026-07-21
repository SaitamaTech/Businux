import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDocumentsByOrg } from '../db.js';

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.XAI_API_KEY || process.env.GROK_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-mini';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1';

/**
 * POST /api/ai-assistant/messages
 * Send a message to the AI assistant and get a response
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
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message ?? 'Gemini request failed.';
      return res.status(response.status).json({ error: { message: errorMessage } });
    }

    const assistantMessage = result?.candidates?.[0]?.output || 'The AI did not return a response.';
    res.json({
      id: uuidv4(),
      role: 'assistant',
      content: assistantMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({
      error: { message: error instanceof Error ? error.message : 'Unexpected error calling Grok.' },
    });
  }
});

export default router;
