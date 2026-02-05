const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

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
    // Build contents array with history
    const contents = [
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AI service unavailable');
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated');
    }

    return data.candidates[0].content.parts[0].text;
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
