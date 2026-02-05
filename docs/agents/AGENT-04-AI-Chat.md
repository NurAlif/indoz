# AGENT 04: AI Chat Feature (CORE)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 02 (Navigation), Agent 03 (Onboarding)
**Priority:** HIGHEST - This is the core feature of the application

---

## 🎯 Your Mission

Build the complete AI Chat feature with Google AI Studio integration, tab menu system, and chat interface. This is the MOST COMPLEX and MOST IMPORTANT feature.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Section 3.2 (AI Chat Feature) - COMPLETE SPEC
   - Focus on: Section 2.1 (AI Chat MUST FIX issues)
   - Focus on: Section 4.3 (Critical Implementation Notes)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: Section 3 (AI Chat / Ollie) - all issues and good practices

3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - For components and utilities

4. **Screenshots to Reference:**
   - `../first-page-ai-chat.png` - Initial state with tab menu
   - `../contoh-chat.png` - Active chat state

---

## 🔑 Google AI Studio API

**API Key:** `AIzaSyCNI-frnjR5oBJjSCREteLXOhysAg8ahG8`
**Base URL:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ❌ **Issue:** Menu in-chat bertumpukan (tab + menu bercampur)
   → ✅ **Fix:** Pisahkan secara visual dengan container yang jelas

2. ❌ **Issue:** Input field aktif saat AI generate (bisa spam)
   → ✅ **Fix:** Disable input saat `isGenerating = true`

3. ❌ **Issue:** Tab menu kurang jelas strukturnya
   → ✅ **Fix:** Tambahkan border/container untuk tab

### MUST KEEP (Good Practices):

- Privacy notice (JANGAN share TFN/Passport)
- Status "Online" dengan titik hijau
- Tombol saran one-click

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Create Google AI Service

**File:** `src/services/googleAI.js`

```javascript
const API_KEY = 'AIzaSyCNI-frnjR5oBJjSCREteLXOhysAg8ahG8';
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
        systemInstruction: SYSTEM_PROMPT,
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
```

### Task 2: Create Chat Suggestion Data

**File:** `src/data/chatSuggestions.js`

```javascript
export const CHAT_SUGGESTIONS = {
  persiapan: [
    { id: 1, text: 'Tips IELTS 4.5 kilat?', query: 'Apa tips cepat mendapatkan IELTS 4.5 untuk WHV?' },
    { id: 2, text: 'Syarat visa WHV Indonesia', query: 'Apa saja syarat mendapatkan WHV untuk WNI?' },
    { id: 3, text: 'Cari lowongan fruit picking?', query: 'Bagaimana cara mencari kerja fruit picking di Australia?' },
    { id: 4, text: 'Biaya hidup di Australia', query: 'Berapa biaya hidup per bulan di Australia untuk WHV?' },
    { id: 5, text: 'Asuransi wajib WHV', query: 'Asuransi apa saja yang wajib dimiliki pemegang WHV?' },
  ],
  kerja: [
    { id: 6, text: 'Cari kerja di farm', query: 'Bagaimana cara mencari kerja di farm Australia?' },
    { id: 7, text: 'Hitung 88 days saya', query: 'Bagaimana cara menghitung 88 days untuk extension visa?' },
    { id: 8, text: 'Tips negosiasi gaji', query: 'Bagaimana cara negosiasi gaji di Australia?' },
    { id: 9, text: 'Dokumen untuk kerja', query: 'Dokumen apa saja yang dibutuhkan untuk bekerja di Australia?' },
    { id: 10, text: 'Cara claim tax back', query: 'Bagaimana cara mengclaim tax back di Australia?' },
  ],
  menetap: [
    { id: 11, text: 'Syarat dapat PR', query: 'Apa saja syarat untuk mendapatkan Permanent Residency Australia?' },
    { id: 12, text: 'Kalkulator poin PR', query: 'Bagaimana cara menghitung poin untuk visa PR 189/190?' },
    { id: 13, text: 'Strategi skill assessment', query: 'Bagaimana persiapan untuk skill assessment?' },
    { id: 14, text: 'Visa 189 vs 190', query: 'Apa perbedaan visa 189 dan 190 untuk PR?' },
    { id: 15, text: 'State sponsorship options', query: 'Negara bagian mana yang menawarkan state sponsorship untuk PR?' },
  ],
};
```

### Task 3: Create AIProfile Component

**File:** `src/components/ai-chat/AIProfile.jsx`

```jsx
import React from 'react';
import { User } from 'lucide-react';

const AIProfile = ({ isCompact = false }) => {
  return (
    <div className={isCompact ? "flex items-center gap-3 mb-6" : "text-center mb-6"}>
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-indo-red to-red-600 rounded-full flex items-center justify-center">
          <User size={32} className="text-white" />
        </div>
        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-white" />
      </div>

      <div className={isCompact ? "text-left" : ""}>
        <h3 className="font-semibold text-gray-900">Ollie</h3>
        <p className="text-sm text-gray-600">5 year survivor in Aussie</p>
      </div>
    </div>
  );
};

export default AIProfile;
```

### Task 4: Create ChatTabMenu Component

**File:** `src/components/ai-chat/ChatTabMenu.jsx`

```jsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { CHAT_SUGGESTIONS } from '../../data/chatSuggestions';

const TABS = [
  { id: 'persiapan', label: 'Persiapan' },
  { id: 'kerja', label: 'Kerja & 88 Days' },
  { id: 'menetap', label: 'Menetap' },
];

const ChatTabMenu = ({ onSuggestionClick }) => {
  const [activeTab, setActiveTab] = useState('persiapan');

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-indo-red border-b-2 border-indo-red bg-indo-red/5"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content - Suggestions */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-3">Pilih topik untuk memulai:</p>
        <div className="space-y-2">
          {CHAT_SUGGESTIONS[activeTab].map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => onSuggestionClick(suggestion.query)}
              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-indo-red/5 hover:text-indo-red rounded-lg text-sm transition-colors"
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatTabMenu;
```

### Task 5: Create ChatHistory Component

**File:** `src/components/ai-chat/ChatHistory.jsx`

```jsx
import React, { useEffect, useRef } from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';

const ChatHistory = ({ messages = [], isTyping = false }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex gap-3",
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-8 h-8 bg-indo-red rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
          )}

          <div
            className={cn(
              "max-w-[80%] rounded-2xl px-4 py-3",
              message.role === 'user'
                ? "bg-indo-red text-white"
                : "bg-gray-100 text-gray-900"
            )}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 w-8 h-8 bg-oz-gold rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-3 justify-start">
          <div className="flex-shrink-0 w-8 h-8 bg-indo-red rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div className="bg-gray-100 rounded-2xl px-4 py-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatHistory;
```

### Task 6: Create PrivacyNotice Component

**File:** `src/components/ai-chat/PrivacyNotice.jsx`

```jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PrivacyNotice = () => {
  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg px-4 py-3 flex items-start gap-3">
      <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-amber-900">
          ⚠️ PRIVACY NOTICE
        </p>
        <p className="text-xs text-amber-800 mt-1">
          JANGAN share nomor TFN atau Passport Anda dalam percakapan ini.
        </p>
      </div>
    </div>
  );
};

export default PrivacyNotice;
```

### Task 7: Create Main AIChatContainer Component

**File:** `src/components/ai-chat/AIChatContainer.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { generateAIResponse } from '../../services/googleAI';
import AIProfile from './AIProfile';
import ChatTabMenu from './ChatTabMenu';
import ChatHistory from './ChatHistory';
import PrivacyNotice from './PrivacyNotice';
import Button from '../common/Button';

const AIChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTabMenu, setShowTabMenu] = useLocalStorage('indoz_chat_first_open', true);

  const handleSuggestionClick = (query) => {
    setInput(query);
    setShowTabMenu(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    setShowTabMenu(false);

    try {
      const response = await generateAIResponse(input, messages);
      const assistantMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi support jika masalah berlanjut.'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowTabMenu(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Show welcome message if no messages
  const showWelcome = messages.length === 0;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Chat</h1>
        {!showWelcome && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            icon={<X size={16} />}
          >
            Clear Chat
          </Button>
        )}
      </div>

      {/* Profile */}
      <AIProfile isCompact={!showWelcome} />

      {/* Welcome Message */}
      {showWelcome && (
        <div className="bg-white rounded-xl p-6 mb-6 text-center">
          <p className="text-gray-700 mb-2">
            Selamat datang di IndOz! Saya Ollie,
          </p>
          <p className="text-gray-700">
            asisten virtual yang akan membantu perjalanan WHV dan rencana PR ke Australia.
          </p>
        </div>
      )}

      {/* Tab Menu - First time only */}
      {showWelcome && showTabMenu && (
        <ChatTabMenu onSuggestionClick={handleSuggestionClick} />
      )}

      {/* Chat History */}
      {!showWelcome && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
          <ChatHistory messages={messages} isTyping={isGenerating} />
        </div>
      )}

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={2}
            disabled={isGenerating}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            variant="primary"
            className="self-end"
          >
            {isGenerating ? (
              '...'
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Send
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Privacy Notice */}
      <PrivacyNotice />
    </div>
  );
};

export default AIChatContainer;
```

### Task 8: Update App.jsx

**File:** `src/App.jsx` (update AIChat route)

```jsx
// ... imports
import AIChatContainer from './components/ai-chat/AIChatContainer';

// Update route
const AIChat = () => <AIChatContainer />;

// ... rest of App.jsx
```

---

## ✅ Checklist Before Completing

- [ ] Google AI service created with correct API key
- [ ] Chat suggestion data created (all 3 tabs with 5 items each)
- [ ] AIProfile component (avatar + online status)
- [ ] ChatTabMenu component (3 tabs with visual separation)
- [ ] ChatHistory component (user/AI bubbles + typing indicator)
- [ ] PrivacyNotice component (always visible)
- [ ] AIChatContainer (main component with state management)
- [ ] Tab menu only shows on first chat open
- [ ] Input disabled while AI generating
- [ ] Typing indicator shows during generation
- [ ] Clear Chat button functionality
- [ ] localStorage: `indoz_chat_first_open`
- [ ] Ollie persona: Professional but friendly
- [ ] Privacy warning in system prompt
- [ ] Error handling for API failures
- [ ] Messages auto-scroll to bottom
- [ ] Responsive design works
- [ ] Enter to send, Shift+Enter for new line
- [ ] Tested: AI responds correctly
- [ ] Tested: Tab menu disappears after first message

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   └── ai-chat/
│       ├── AIChatContainer.jsx    ✅
│       ├── AIProfile.jsx          ✅
│       ├── ChatTabMenu.jsx        ✅
│       ├── ChatHistory.jsx        ✅
│       └── PrivacyNotice.jsx      ✅
├── data/
│   └── chatSuggestions.js         ✅
├── services/
│   └── googleAI.js                ✅
└── App.jsx                        ✅ (updated)
```

---

## 🎨 Visual Reference

**Initial State (First Time):**
```
┌─────────────────────────────────────────────┐
│ AI Chat                              [Clear] │
├─────────────────────────────────────────────┤
│ [Ollie●] 5 year survivor in Aussie          │
│                                             │
│ Welcome message...                          │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ [Persiapan] [Kerja&88Days] [Menetap]   │ │
│ │ ─────────                                 │ │
│ │ [Tips IELTS 4.5 kilat?]                  │ │
│ │ [Syarat visa WHV Indonesia]              │ │
│ │ [Cari lowongan fruit picking?]           │ │
│ │ [Biaya hidup di Australia]               │ │
│ │ [Asuransi wajib WHV]                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Type your message...]              [Send→] │
│                                             │
│ ⚠️ PRIVACY NOTICE                           │
└─────────────────────────────────────────────┘
```

---

## 🚨 Critical Success Factors

1. ✅ **Tab menu ONLY shows first time** - check localStorage
2. ✅ **Input DISABLED while generating** - prevent spam
3. ✅ **Clear visual separation** - tabs have container
4. ✅ **Privacy notice ALWAYS visible** - bottom of chat
5. ✅ **Ollie persona** - professional, not excessive slang
6. ✅ **Error handling** - graceful failures
7. ✅ **Typing indicator** - animated dots

---

## ⚠️ Important Notes

1. **DO NOT** hardcode API key in frontend (for production use proxy)
2. **DO NOT** show tab menu after first message
3. **DO NOT** allow input while AI is generating
4. **DO** implement proper error boundaries
5. **DO** use streaming for better UX (future enhancement)
6. **DO** handle long messages properly (overflow)
7. **DO NOT** skip privacy notice - it's critical

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 3.2 for complete AI Chat specs
- [../final-evaluation.md](../final-evaluation.md) - Section 3 for AI Chat issues
- [../first-page-ai-chat.png](../first-page-ai-chat.png) - Initial state reference
- [../contoh-chat.png](../contoh-chat.png) - Chat state reference
