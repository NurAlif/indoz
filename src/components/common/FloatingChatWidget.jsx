import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { generateAIResponse } from '../../services/googleAI';
import ChatHistory from '../ai-chat/ChatHistory';
import { cn } from '../../utils/cn';
import { useChat } from '../../context/ChatContext';

const FloatingChatWidget = () => {
  const { isOpen, setIsOpen, contextData, clearContext } = useChat();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial Ollie greeting
  const initialAI = {
    role: 'assistant',
    content: `Halo! I'm Ollie. 👋\n\nButuh bantuan seputar WHV, kerjaan, atau hidup di Australia? Tanya aku di sini!`
  };

  const displayMessages = messages.length === 0 ? [initialAI] : [initialAI, ...messages];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages, isGenerating]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userText = input;
    const userMessage = {
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      // If context exists, prepend it to the prompt sent to AI (but not shown in chat history as user message)
      let promptToSend = userText;
      if (contextData) {
        const contextContent = typeof contextData.content === 'string'
          ? contextData.content
          : JSON.stringify(contextData.content); // Fallback for objects/arrays

        promptToSend = `Context: ${contextData.title}\nDetail: ${contextContent}\n\nUser Question: ${userText}`;
      }

      // We pass the full history including initial message context if needed,
      // but generateAIResponse usually takes just the user input and history array.
      // Let's pass the current messages + the new user message context.
      const historyForAI = [...messages, userMessage];

      const response = await generateAIResponse(promptToSend, historyForAI);
      const assistantMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Maaf, ada gangguan koneksi. Coba lagi nanti ya!'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {/* Chat Window */}
      <div
        className={cn(
          "bg-white w-[350px] max-w-[90vw] h-[500px] max-h-[80vh] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10 pointer-events-none hidden"
        )}
      >
        {/* Header */}
        <div className="bg-indo-red px-4 py-3 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
               <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 border border-white/20"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5JWg3wVK1W01zF04ccC60xKNoj40pEGgog9eUFL8NDDnNsOvJVjiaXGXv8um7-4knjRO4UAj6_kPnol3_f8PD8X716oo58hDDlZe1Le1MwYEJClpYT0B5azlJofpGz9oR8Imbz2IL7WprMSlE8HIVGzLuxj0egKkhFIE-lyreG5q-8R_i26Cu5kWjKA7sIjcszBDqmdqQV0FNgJ-DGDMQ6YV3l_FW0iGnv_zwPKhWaB5nYsK-D0DRQfg-tGO7YkJ0yrvHrnpgKeg3")' }}
                ></div>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-indo-red bg-green-400"></span>
            </div>
            <div>
              <h3 className="font-bold text-sm">Ollie Assistant</h3>
              <p className="text-[10px] text-white/80">Online • Reply Instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
           {/* Reuse ChatHistory but we might need to style the container to ensure it fits */}
           <div className="text-sm">
             <ChatHistory messages={displayMessages} isTyping={isGenerating} />
           </div>
           <div ref={chatEndRef} />
        </div>

        {/* Context Banner */}
        {contextData && (
          <div className="bg-blue-50 px-4 py-2 border-t border-blue-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-blue-500 text-xs font-bold uppercase tracking-wider shrink-0">Topic:</span>
              <span className="text-sm text-blue-800 font-medium truncate">{contextData.title}</span>
            </div>
            <button
              onClick={clearContext}
              className="p-1 hover:bg-blue-100 rounded-full text-blue-400 hover:text-blue-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100 shrink-0">
          <div className="relative flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={contextData ? `Tanyakan tentang ${contextData.title}...` : "Tanya Ollie..."}
              className="flex-1 bg-gray-100 text-gray-900 placeholder:text-gray-500 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indo-red/20 transition-all"
              disabled={isGenerating}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className={cn(
                "p-2.5 rounded-full text-white transition-all shadow-md shrink-0",
                !input.trim() || isGenerating
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indo-red hover:bg-red-700 hover:scale-105 active:scale-95"
              )}
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">Powered by IndOz AI</p>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indo-red/20 z-50",
          isOpen ? "bg-gray-200 text-gray-600 rotate-90" : "bg-indo-red text-white hover:bg-red-700"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default FloatingChatWidget;
