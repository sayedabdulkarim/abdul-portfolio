import React from 'react';
import './SuggestionButtons.scss';

const SuggestionButtons = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="suggestion-buttons">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="suggestion-btn"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionButtons;