import React, { useState, useEffect } from 'react';
import { Send, X, Menu } from 'lucide-react';
import { generateAIResponse } from '../../services/googleAI';
import AIProfile from './AIProfile';
import ChatTabMenu from './ChatTabMenu';
import ChatHistory from './ChatHistory';
import Button from '../common/Button';

const AIChatContainer = () => {
  // Initial static AI message
  const initialAI = {
    role: 'assistant',
    content: `Halo! Saya Ollie, asisten AI yang siap membantu Anda dengan perjalanan Working Holiday Visa (WHV) dan Permanent Residency (PR) ke Australia.

Saya punya pengalaman 5 tahun sebagai WHV di Australia dan sudah melalui proses WHV hingga PR. Ada yang bisa saya bantu hari ini?

Misalnya:
- Anda mau tanya tentang cara apply WHV?
- Bingung cari kerja di Australia?
- Mau tahu tentang 88 days regional work?
- Atau sedang hitung-hitung poin untuk PR?

Silakan tanyakan apa saja! 😊`
  };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTabMenu, setShowTabMenu] = useState(true);

  const handleSuggestionClick = async (query) => {
    if (isGenerating) return;

    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    setShowTabMenu(false);

    try {
      const response = await generateAIResponse(query, messages);
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

  // Always show menu when no user messages
  useEffect(() => {
    if (messages.length === 0) {
      setShowTabMenu(true);
    }
  }, [messages.length]);

  // Combine initial AI message with user messages for display
  const displayMessages = messages.length === 0 ? [initialAI] : [initialAI, ...messages];

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
    setShowTabMenu(true);
  };

  const toggleTabMenu = () => {
    setShowTabMenu((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Section - Fixed */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold text-gray-900">AI Chat</h1>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTabMenu}
                icon={<Menu size={14} />}
                className={!showTabMenu ? 'text-gray-600' : 'text-indo-red bg-indo-red/5'}
                disabled={isGenerating}
              >
                Menu
              </Button>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  icon={<X size={14} />}
                  disabled={isGenerating}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Profile */}
          <AIProfile isCompact={messages.length > 0} />
        </div>
      </div>

      {/* Middle Section - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-2">
          {/* Chat History - Always visible */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <ChatHistory messages={displayMessages} isTyping={isGenerating} />

            {/* Tab Menu - Nested inside chat container, below AI message */}
            {showTabMenu && messages.length === 0 && (
              <div className="border-t border-gray-200">
                <ChatTabMenu onSuggestionClick={handleSuggestionClick} disabled={isGenerating} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Fixed */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Input */}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan..."
              rows={1}
              disabled={isGenerating}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              variant="primary"
              size="sm"
              className="self-end"
            >
              {isGenerating ? (
                '...'
              ) : (
                <>
                  <Send size={14} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatContainer;
