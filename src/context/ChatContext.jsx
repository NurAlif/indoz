import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contextData, setContextData] = useState(null);
  const [isAIChatPage, setIsAIChatPage] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

  const openChatWithContext = (data) => {
    setContextData(data);
    setIsOpen(true);
  };

  const clearContext = () => {
    setContextData(null);
  };

  return (
    <ChatContext.Provider value={{
      isOpen,
      setIsOpen,
      contextData,
      setContextData,
      toggleChat,
      openChatWithContext,
      clearContext,
      isAIChatPage,
      setIsAIChatPage
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const useAIChatPage = () => {
  const { isAIChatPage, setIsAIChatPage } = useChat();

  React.useEffect(() => {
    setIsAIChatPage(true);
    return () => setIsAIChatPage(false);
  }, [setIsAIChatPage]);
};
