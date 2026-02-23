import React, { useState } from 'react';
import AIAutocompleteInput from './AIAutocompleteInput';
import {
  getEventTitleSuggestions,
  getEventDescriptionSuggestions,
  getEventCategorySuggestions,
  getVenueSuggestions,
  getCompleteEventSuggestion,
} from '../utils/aiAutocomplete';
import './EventCreationForm.css';

/**
 * Event Creation Form with AI-Powered Autocomplete
 * Provides intelligent suggestions for all event fields
 */
const EventCreationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: 'academic',
    maxParticipants: '',
  });

  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setActiveField(field);
  };

  // Request AI suggestions for complete event
  const handleGetAISuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const suggestion = await getCompleteEventSuggestion({
        title: formData.title,
        description: formData.description,
        category: formData.category,
      });

      if (suggestion) {
        setAiSuggestions(suggestion);
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Apply AI suggestions to form
  const handleApplySuggestions = () => {
    if (aiSuggestions) {
      setFormData((prev) => ({
        ...prev,
        title: aiSuggestions.title || prev.title,
        description: aiSuggestions.description || prev.description,
        category: aiSuggestions.category || prev.category,
        venue: aiSuggestions.venueType || prev.venue,
        maxParticipants:
          aiSuggestions.suggestedMaxParticipants || prev.maxParticipants,
      }));
      setAiSuggestions(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.venue ||
      !formData.maxParticipants
    ) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="event-creation-container">
      <div className="form-header">
        <h2>✨ Create New Event (AI-Powered)</h2>
        <p>Get intelligent suggestions as you fill in event details</p>
      </div>

      <form onSubmit={handleSubmit} className="event-form">
        {/* Title Field */}
        <div className="form-group">
          <label>Event Title *</label>
          <AIAutocompleteInput
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., Annual Tech Summit, Leadership Workshop..."
            getSuggestions={getEventTitleSuggestions}
            fieldType="title"
            context={{ category: formData.category }}
          />
          <p className="field-hint">
            Start typing to get AI-powered title suggestions
          </p>
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label>Description *</label>
          <AIAutocompleteInput
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your event... (Get AI suggestions as you type)"
            getSuggestions={(partial) =>
              getEventDescriptionSuggestions(partial, formData.title)
            }
            fieldType="description"
            context={{ title: formData.title }}
          />
          <p className="field-hint">
            Describe the event to get intelligent completion suggestions
          </p>
        </div>

        {/* Category Field */}
        <div className="form-group">
          <label>Category *</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="form-input"
          >
            <option value="academic">Academic</option>
            <option value="sports">Sports</option>
            <option value="cultural">Cultural</option>
            <option value="workshop">Workshop</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Venue Field */}
        <div className="form-group">
          <label>Venue *</label>
          <AIAutocompleteInput
            value={formData.venue}
            onChange={(e) => handleInputChange('venue', e.target.value)}
            placeholder="Where will this event take place?"
            getSuggestions={(partial) =>
              getVenueSuggestions(formData.title, formData.category)
            }
            fieldType="venue"
            context={{
              title: formData.title,
              category: formData.category,
            }}
          />
          <p className="field-hint">
            AI suggests appropriate venues based on event type
          </p>
        </div>

        {/* Date & Time */}
        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Max Participants */}
        <div className="form-group">
          <label>Max Participants *</label>
          <input
            type="number"
            min="1"
            value={formData.maxParticipants}
            onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
            placeholder="Enter maximum number of participants"
            className="form-input"
            required
          />
        </div>

        {/* AI Suggestions Section */}
        {!aiSuggestions && (
          <div className="ai-suggestion-prompt">
            <button
              type="button"
              onClick={handleGetAISuggestions}
              disabled={isLoadingSuggestions || !formData.title}
              className="btn-ai-suggest"
            >
              {isLoadingSuggestions ? '⏳ Getting AI suggestions...' : '✨ Get AI Suggestions'}
            </button>
            <p>
              Let Claude AI help complete your event details based on what
              you've entered
            </p>
          </div>
        )}

        {aiSuggestions && (
          <div className="ai-suggestions-display">
            <h3>🤖 AI-Generated Suggestions</h3>
            <div className="suggestions-preview">
              {aiSuggestions.title && (
                <div className="suggestion-item">
                  <strong>Title:</strong> {aiSuggestions.title}
                </div>
              )}
              {aiSuggestions.description && (
                <div className="suggestion-item">
                  <strong>Description:</strong> {aiSuggestions.description}
                </div>
              )}
              {aiSuggestions.category && (
                <div className="suggestion-item">
                  <strong>Category:</strong> {aiSuggestions.category}
                </div>
              )}
              {aiSuggestions.venueType && (
                <div className="suggestion-item">
                  <strong>Venue Type:</strong> {aiSuggestions.venueType}
                </div>
              )}
              {aiSuggestions.suggestedMaxParticipants && (
                <div className="suggestion-item">
                  <strong>Suggested Capacity:</strong>{' '}
                  {aiSuggestions.suggestedMaxParticipants} participants
                </div>
              )}
            </div>
            <div className="suggestion-actions">
              <button
                type="button"
                onClick={handleApplySuggestions}
                className="btn-apply-suggestions"
              >
                ✓ Apply Suggestions
              </button>
              <button
                type="button"
                onClick={() => setAiSuggestions(null)}
                className="btn-dismiss-suggestions"
              >
                ✕ Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Event
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreationForm;
