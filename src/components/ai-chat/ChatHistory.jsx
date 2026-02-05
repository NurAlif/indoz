import React from 'react';
import { CheckCheck } from 'lucide-react';
import { cn } from '../../utils/cn';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GlossaryTooltip from '../common/GlossaryTooltip';

const wrapWithGlossary = (text) => {
  if (typeof text !== 'string') return text;
  const regex = /(WHV|SDUWHV|88 Days|PR)/g;
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (['WHV', 'SDUWHV', '88 Days', 'PR'].includes(part)) {
      return <GlossaryTooltip key={i} term={part} />;
    }
    return part;
  });
};

const ProcessChildren = ({ children }) => {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return wrapWithGlossary(child);
    }
    return child;
  });
};

const ChatHistory = ({ messages = [], isTyping = false }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex items-end gap-3 max-w-3xl w-full group",
            message.role === 'user' ? "ml-auto justify-end" : "mr-auto"
          )}
        >
          {/* Assistant Avatar (Left) */}
          {message.role === 'assistant' && (
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 shadow-sm border border-gray-200 shrink-0 mb-1"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5JWg3wVK1W01zF04ccC60xKNoj40pEGgog9eUFL8NDDnNsOvJVjiaXGXv8um7-4knjRO4UAj6_kPnol3_f8PD8X716oo58hDDlZe1Le1MwYEJClpYT0B5azlJofpGz9oR8Imbz2IL7WprMSlE8HIVGzLuxj0egKkhFIE-lyreG5q-8R_i26Cu5kWjKA7sIjcszBDqmdqQV0FNgJ-DGDMQ6YV3l_FW0iGnv_zwPKhWaB5nYsK-D0DRQfg-tGO7YkJ0yrvHrnpgKeg3")' }}
            ></div>
          )}

          <div className={cn(
            "flex flex-col gap-1 max-w-[85%] md:max-w-[75%]",
            message.role === 'user' ? "items-end" : "items-start"
          )}>
            {/* Assistant Name Label */}
            {message.role === 'assistant' && (
              <span className="text-[11px] font-bold text-gray-400 ml-1">Ollie</span>
            )}

            {/* Message Bubble */}
            <div
              className={cn(
                "p-5 rounded-2xl shadow-sm text-[15px] leading-relaxed relative prose prose-sm max-w-none",
                message.role === 'user'
                  ? "bg-indo-red text-white rounded-br-none shadow-red-100 prose-invert"
                  : "bg-[#fafafa] text-gray-900 rounded-tl-none border border-gray-100"
              )}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0"><ProcessChildren>{children}</ProcessChildren></p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1"><ProcessChildren>{children}</ProcessChildren></ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1"><ProcessChildren>{children}</ProcessChildren></ol>,
                  li: ({ children }) => <li className=""><ProcessChildren>{children}</ProcessChildren></li>,
                  strong: ({ children }) => <strong className="font-semibold"><ProcessChildren>{children}</ProcessChildren></strong>,
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className={message.role === 'user' ? "text-white underline decoration-white/50" : "text-indo-red hover:underline"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {/* User Metadata (Timestamp & Check) */}
            {message.role === 'user' && (
              <div className="flex items-center gap-1 mr-1">
                <p className="text-gray-300 text-[10px]">{message.timestamp || "Just now"}</p>
                <CheckCheck size={12} className="text-gray-300" />
              </div>
            )}
          </div>

          {/* User Avatar (Right) */}
          {message.role === 'user' && (
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 border-2 border-white shadow-sm shrink-0 mb-6"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDg02g-iHRAkYeq01tlMAmVG-TEf2mAt6eXU-JjJV5XDLEwvg5UxcJDjEZF7Dq483VqPWcbwk5xZTvS06fhzTj3_Ae7nmj6OUn2NLiaxhBN3c95tQwk5z7zHvwL2gudix7VMj4jQ5gxhzV-PiKbS34ps8kr5qh0NMLBXq-PbUNDf5nwr5qLwsCF8yn0BlegMwH8Ijt_k86aLAQ2ugyb4Y0wUJ-AMHCP5nrCpZ2UVqC2ijHy_tesqwp3yDzX4hrVD7UdXU4TmwnsDifd")' }}
            ></div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex items-end gap-3 max-w-3xl mr-auto w-full animate-in fade-in">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 shadow-sm border border-gray-200 shrink-0 mb-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5JWg3wVK1W01zF04ccC60xKNoj40pEGgog9eUFL8NDDnNsOvJVjiaXGXv8um7-4knjRO4UAj6_kPnol3_f8PD8X716oo58hDDlZe1Le1MwYEJClpYT0B5azlJofpGz9oR8Imbz2IL7WprMSlE8HIVGzLuxj0egKkhFIE-lyreG5q-8R_i26Cu5kWjKA7sIjcszBDqmdqQV0FNgJ-DGDMQ6YV3l_FW0iGnv_zwPKhWaB5nYsK-D0DRQfg-tGO7YkJ0yrvHrnpgKeg3")' }}
          ></div>
          <div className="flex flex-col gap-1 items-start">
            <div className="px-4 py-3 bg-[#fafafa] rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHistory;
