import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  getEventTitleSuggestions,
  formatSuggestions,
} from '../utils/aiAutocomplete';
import './AIAutocompleteInput.css';

/**
 * AI-Powered Autocomplete Input Component
 * Provides intelligent suggestions as users type in input fields
 * @param {string} value - Current input value
 * @param {function} onChange - Callback when value changes
 * @param {string} placeholder - Input placeholder text
 * @param {function} getSuggestions - Function to fetch AI suggestions
 * @param {string} fieldType - Type of field (title, description, venue, category)
 * @param {object} context - Additional context for suggestions
 */
const AIAutocompleteInput = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  getSuggestions,
  fieldType = 'text',
  context = {},
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);
  const debounceTimer = useRef(null);

  // Fetch suggestions from AI service
  const fetchSuggestions = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await getSuggestions(inputValue, context);
      setSuggestions(formatSuggestions(results, 5));
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced suggestion fetching
  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        setIsOpen(true);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        setIsOpen(true);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <div className="ai-autocomplete-container" ref={containerRef}>
      <div className="ai-input-wrapper">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value && suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="ai-input-field"
          autoComplete="off"
        />
        <span className="ai-badge">✨ AI</span>
      </div>

      {isLoading && (
        <div className="ai-loading">
          <div className="spinner"></div> Getting suggestions...
        </div>
      )}

      {isOpen && suggestions.length > 0 && !isLoading && (
        <ul className="ai-suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`ai-suggestion-item ${
                index === selectedIndex ? 'selected' : ''
              }`}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <span className="suggestion-icon">💡</span>
              <span className="suggestion-text">{suggestion}</span>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && isOpen && value && suggestions.length === 0 && (
        <div className="ai-no-suggestions">No suggestions available</div>
      )}
    </div>
  );
};

export default AIAutocompleteInput;
