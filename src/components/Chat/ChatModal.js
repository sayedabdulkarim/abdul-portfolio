import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestionButtons from "./SuggestionButtons";
import "./ChatModal.scss";

const ChatModal = ({ messages, onSendMessage, onClose, isTyping }) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const modalRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hide suggestions after first user message
  useEffect(() => {
    const userMessages = messages.filter((m) => m.role === "user");
    if (userMessages.length > 0) {
      setShowSuggestions(false);
    }
  }, [messages]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    onSendMessage(suggestion);
    setShowSuggestions(false);
  };

  // Handle input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  // Sample suggestions
  const suggestions = [
    "Who are you?",
    "What's your favorite project?",
    "Tell me about PennyWise",
    "What tech stack do you use?",
  ];

  return (
    <div className="chat-modal" ref={modalRef}>
      {/* Modal Header */}
      <div className="chat-modal-header">
        <div className="header-content">
          <h3>Abdul's AI</h3>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Initial Message with Warning */}
      <div className="chat-modal-intro">
        <p className="intro-message">
          Hi! I'm Sayed Abdul Karim. Ask me about my projects, experience, or
          tech stack!
        </p>
        <div className="warning-message">
          <span className="warning-icon">⚠️</span>
          <span>
            Fine-tuned on Llama 3.2 1B with a small dataset. Not always
            accurate, just for fun!
          </span>
        </div>
      </div>

      {/* Suggestions */}
      {showSuggestions && messages.length <= 1 && (
        <div className="suggestions-section">
          <p className="suggestions-label">Try asking:</p>
          <SuggestionButtons
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      )}

      {/* Messages Container */}
      <div className="chat-modal-body">
        <div className="messages-container">
          {messages.slice(1).map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-modal-footer">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          disabled={isTyping}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default ChatModal;
