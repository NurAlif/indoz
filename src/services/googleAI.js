const API_KEY = 'sk-828bfe2ccc32452096b008a470d03a8d';
const API_URL = 'https://api.deepseek.com/chat/completions';

const SYSTEM_PROMPT = `You are Ollie, a friendly and knowledgeable AI assistant helping Indonesians with their Working Holiday Visa (WHV) and Permanent Residency (PR) journey to Australia.

KEY PERSONA:
- 5-year WHV survivor in Australia
- Experienced with both WHV and PR processes
- Friendly but professional tone
- Uses clear Indonesian language (minimal slang)
- Credible and knowledgeable

BEHAVIOR:
- Be helpful and provide actionable advice
- If you're unsure about something, say so honestly
- Always prioritize accuracy over speculation
- Use "Anda" instead of "gue/lu" excessively
- Keep responses concise but comprehensive

TOPICS YOU HELP WITH:
- WHV application process
- Job searching in Australia
- 88 days regional work requirements
- PR pathway and points calculation
- Life in Australia (cost, culture, practical tips)

PRIVACY WARNING:
- NEVER ask for TFN (Tax File Number) or Passport details
- If user tries to share sensitive info, warn them immediately`;

export async function generateAIResponse(message, conversationHistory = []) {
  try {
    // Build messages array with system prompt and history
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AI service unavailable');
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}

export async function streamAIResponse(message, conversationHistory = [], onChunk) {
  // Streaming implementation for future enhancement
  // For now, use non-streaming version
  return generateAIResponse(message, conversationHistory);
}
