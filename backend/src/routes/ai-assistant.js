import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDocumentsByOrg } from '../db.js';

const router = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * POST /api/ai-assistant/messages
 * Send a message to the AI assistant and get a response
 */
router.post('/messages', async (req, res) => {
  const { content, org_id } = req.body;

  if (!content) {
    return res.status(400).json({ error: { message: 'Message content required' } });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: { message: 'OpenAI API key is not configured on the backend.' } });
  }

  try {
    // Fetch top org documents to provide context
    let docsSummary = '';
    if (org_id) {
      const docs = getDocumentsByOrg(org_id) || [];
      const top = docs.slice(0, 5).map(d => `- ${d.title}: ${d.content.slice(0, 300)}`).join('\n');
      if (top) docsSummary = `Organization documents:\n${top}\n\n`;
    }

    const systemPrompt = `You are the Businux AI assistant. Answer business questions clearly, provide concise insights, and help users with strategy, reporting, and CRM guidance. Use available organization documents when relevant.\n\n${docsSummary}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content },
        ],
        temperature: 0.8,
        max_tokens: 600,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result?.error?.message ?? 'OpenAI request failed.';
      return res.status(response.status).json({ error: { message: errorMessage } });
    }

    const assistantMessage = result.choices?.[0]?.message?.content;

    res.json({
      id: uuidv4(),
      role: 'assistant',
      content: assistantMessage ?? 'The AI did not return a response.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({
      error: { message: error instanceof Error ? error.message : 'Unexpected error calling OpenAI.' },
    });
  }
});

export default router;
