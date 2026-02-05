import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  DollarSign,
  PlusCircle,
  Mic,
  Send
} from 'lucide-react';
import { generateAIResponse } from '../../services/googleAI';
import ChatHistory from './ChatHistory';
import { cn } from '../../utils/cn';
import TopBar from '../layout/TopBar';

const AIChatContainer = () => {
  // Initial static AI message
  const initialAI = {
    role: 'assistant',
    content: `Halo! I'm Ollie 2.0. 👋\n\nHow can I help you with your move to Australia today? I can assist with:\n• Visa requirements (WHV, SDUWHV)\n• Finding a job in hospitality or farm work\n• Accommodation tips`
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);

  const displayMessages = messages.length === 0 ? [initialAI] : [initialAI, ...messages];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      const response = await generateAIResponse(input, messages);
      const assistantMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (text) => {
    if (isGenerating) return;

    // Send immediately to match expected UX
    const userMessage = { role: 'user', content: text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // We need to call API effectively
    generateAIResponse(text, messages).then(response => {
       setMessages(prev => [...prev, { role: 'assistant', content: response }]);
       setIsGenerating(false);
    }).catch(() => {
       setMessages(prev => [...prev, { role: 'assistant', content: 'Error.' }]);
       setIsGenerating(false);
    });
  };

  // Refactored handleSuggestionClick to reuse logic if possible, but inline is fine for now.

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const SUGGESTIONS = [
    { icon: ShieldCheck, text: 'Cek Syarat WHV', color: 'text-indo-red' },
    { icon: GraduationCap, text: 'Info Kuliah S2', color: 'text-amber-500' },
    { icon: Briefcase, text: 'Cari Kerja Farm', color: 'text-blue-500' },
    { icon: DollarSign, text: 'Biaya Hidup', color: 'text-green-600' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-900 font-sans overflow-hidden pt-16">
      {/* TopBar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden w-full justify-center bg-gray-50 relative">
        <main className="w-full max-w-5xl h-full flex flex-col bg-white shadow-xl shadow-gray-200/60 border-x border-gray-200">

          {/* Ollie Header */}
          <div className="shrink-0 px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100 z-10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 h-12 shadow-sm border border-gray-100"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5JWg3wVK1W01zF04ccC60xKNoj40pEGgog9eUFL8NDDnNsOvJVjiaXGXv8um7-4knjRO4UAj6_kPnol3_f8PD8X716oo58hDDlZe1Le1MwYEJClpYT0B5azlJofpGz9oR8Imbz2IL7WprMSlE8HIVGzLuxj0egKkhFIE-lyreG5q-8R_i26Cu5kWjKA7sIjcszBDqmdqQV0FNgJ-DGDMQ6YV3l_FW0iGnv_zwPKhWaB5nYsK-D0DRQfg-tGO7YkJ0yrvHrnpgKeg3")' }}
                ></div>
                <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white bg-green-500"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900">Ollie 2.0</h1>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-600 font-bold uppercase tracking-wider border border-amber-200">PRO</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClearChat}
              className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-indo-red hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
              title="Clear conversation"
            >
              <RotateCcw className="group-hover:-rotate-180 transition-transform duration-500" size={20} />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6" id="chat-container">
            <div className="flex justify-center mb-2">
              <span className="text-xs font-medium text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <ChatHistory messages={displayMessages} isTyping={isGenerating} />
            <div ref={chatEndRef} />
          </div>

          {/* Bottom Area: Suggestions & Input */}
          <div className="shrink-0 p-4 md:px-8 md:pb-8 bg-white border-t border-gray-100 z-10">
            <div className="max-w-4xl mx-auto flex flex-col gap-3">
              {/* Suggestions */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-gradient">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    disabled={isGenerating}
                    className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm text-sm font-medium text-gray-700 hover:bg-white hover:border-indo-red/30 transition-all"
                  >
                    <suggestion.icon className={suggestion.color} size={18} />
                    {suggestion.text}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="relative flex items-end gap-2 bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-100/50 p-2 focus-within:ring-2 focus-within:ring-indo-red/20 focus-within:border-indo-red transition-all">
                <button className="p-2 text-gray-400 hover:text-indo-red transition-colors rounded-xl hover:bg-gray-50">
                  <PlusCircle size={24} />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 max-h-32 min-h-[44px] py-2.5 bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 resize-none text-base"
                  placeholder="Type your message to Ollie..."
                  rows={1}
                  disabled={isGenerating}
                />
                <button className="p-2 text-gray-400 hover:text-indo-red transition-colors rounded-xl hover:bg-gray-50">
                  <Mic size={24} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className={cn(
                    "p-2 rounded-xl shadow-md shadow-red-200 transition-transform active:scale-95 flex items-center justify-center",
                    !input.trim() || isGenerating ? "bg-gray-300 cursor-not-allowed" : "bg-indo-red text-white hover:bg-red-700"
                  )}
                >
                  <Send size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-center text-xs text-gray-400">Ollie can make mistakes. Please verify important visa information.</p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <ShieldCheck size={14} />
                  <span className="font-medium">Jangan masukkan informasi sensitif (password, data bank, nomor passport)</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIChatContainer;
