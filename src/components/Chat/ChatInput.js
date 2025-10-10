import React from 'react';
import './ChatInput.scss';

const ChatInput = ({ value, onChange, onSubmit, disabled, placeholder }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="chat-input-form">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder={placeholder}
        className="chat-input"
        autoFocus
      />
      <button 
        type="submit" 
        disabled={disabled || !value.trim()}
        className="send-button"
        aria-label="Send message"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;