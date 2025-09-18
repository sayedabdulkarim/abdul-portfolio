import React from 'react';
import './ChatMessage.scss';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        {message.content}
      </div>
      {message.sources && message.sources.length > 0 && (
        <div className="message-sources">
          <small>Based on resume data</small>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;