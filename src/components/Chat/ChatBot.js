import React, { useState } from 'react';
import ChatModal from './ChatModal';
import { sendMessageToBot } from '../../utils/chatAPI';
import './ChatBot.scss';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Sayed Abdul Karim. Ask me about my projects, experience, or tech stack!",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Toggle chat modal
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending message
  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare conversation history as pairs of [user, assistant] messages
      // Important: We're working with messages BEFORE the new user message was added
      const conversationHistory = [];
      
      // Look for complete user-assistant pairs in the existing messages
      let i = 0;
      while (i < messages.length - 1) {
        // Find a user message followed by an assistant message
        if (messages[i].role === 'user' && messages[i + 1].role === 'assistant') {
          conversationHistory.push([
            messages[i].content,
            messages[i + 1].content
          ]);
          i += 2;
        } else if (messages[i].role === 'assistant') {
          // Skip standalone assistant messages (like the initial greeting)
          i++;
        } else {
          i++;
        }
      }
      
      // Keep only last 2 exchanges for context
      const recentHistory = conversationHistory.slice(-2);
      
      console.log('Current messages:', messages);
      console.log('Sending conversation history:', recentHistory);

      // Call the API utility
      const botResponse = await sendMessageToBot(message, recentHistory);

      // Add bot response
      const botMessage = {
        role: 'assistant',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error but keep trying
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.message}. The API might be loading, please try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`chat-fab ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.19 22 14.34 21.78 15.41 21.37L20.3 22.8C20.66 22.91 21.04 22.78 21.26 22.47C21.48 22.16 21.49 21.76 21.28 21.44L19.18 17.91C20.34 16.34 21 14.46 21 12.5C21 6.98 16.97 2.5 11.5 2.5L12 2Z" 
                  fill="currentColor"/>
            <circle cx="8" cy="12" r="1" fill="white"/>
            <circle cx="12" cy="12" r="1" fill="white"/>
            <circle cx="16" cy="12" r="1" fill="white"/>
          </svg>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <ChatModal
          messages={messages}
          onSendMessage={handleSendMessage}
          onClose={toggleChat}
          isTyping={isTyping}
        />
      )}
    </>
  );
};

export default ChatBot;