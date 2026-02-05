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
