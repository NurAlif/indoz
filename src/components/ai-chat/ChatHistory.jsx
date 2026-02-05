import React from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatHistory = ({ messages = [], isTyping = false }) => {
  return (
    <div className="min-h-[300px] max-h-[calc(100vh-280px)] overflow-y-auto space-y-3 p-3">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex gap-2",
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-6 h-6 bg-indo-red rounded-full flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
          )}

          <div
            className={cn(
              "max-w-[85%] rounded-xl px-3 py-2 prose prose-sm max-w-none",
              message.role === 'user'
                ? "bg-indo-red text-white prose-invert"
                : "bg-gray-100 text-gray-900"
            )}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="text-sm mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-sm">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                code: ({ children }) => (
                  <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-indo-red hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 w-6 h-6 bg-oz-gold rounded-full flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-2 justify-start">
          <div className="flex-shrink-0 w-6 h-6 bg-indo-red rounded-full flex items-center justify-center">
            <Bot size={14} className="text-white" />
          </div>
          <div className="bg-gray-100 rounded-xl px-3 py-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
