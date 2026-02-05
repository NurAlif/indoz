import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contextData, setContextData] = useState(null);

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
      clearContext
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
