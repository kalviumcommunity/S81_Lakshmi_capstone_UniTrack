/**
 * AI-Autocomplete Utility
 * Provides LLM-powered suggestions for event descriptions and titles
 * Uses Claude API via a backend endpoint for intelligent completions
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Get AI suggestions for event title
 * @param {string} partialTitle - Partial or starting title text
 * @returns {Promise<Array<string>>} - Array of suggested titles
 */
export const getEventTitleSuggestions = async (partialTitle) => {
  if (!partialTitle || partialTitle.length < 2) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/suggest-title`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ partial: partialTitle }),
    });

    if (!response.ok) {
      console.error('AI title suggestion failed:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Error fetching title suggestions:', error);
    return [];
  }
};

/**
 * Get AI suggestions for event description
 * @param {string} partialDescription - Partial or starting description text
 * @param {string} eventTitle - Title of the event for context
 * @returns {Promise<Array<string>>} - Array of suggested descriptions
 */
export const getEventDescriptionSuggestions = async (
  partialDescription,
  eventTitle = ''
) => {
  if (!partialDescription || partialDescription.length < 3) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/suggest-description`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partial: partialDescription,
        title: eventTitle,
      }),
    });

    if (!response.ok) {
      console.error('AI description suggestion failed:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Error fetching description suggestions:', error);
    return [];
  }
};

/**
 * Get AI category suggestions based on event title/description
 * @param {string} eventTitle - Title of the event
 * @param {string} eventDescription - Description of the event
 * @returns {Promise<Array<string>>} - Array of suggested categories
 */
export const getEventCategorySuggestions = async (
  eventTitle = '',
  eventDescription = ''
) => {
  if (!eventTitle && !eventDescription) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/suggest-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: eventTitle,
        description: eventDescription,
      }),
    });

    if (!response.ok) {
      console.error('AI category suggestion failed:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Error fetching category suggestions:', error);
    return [];
  }
};

/**
 * Get AI suggestions for event venue based on title/category
 * @param {string} eventTitle - Title of the event
 * @param {string} category - Category of the event
 * @returns {Promise<Array<string>>} - Array of suggested venues
 */
export const getVenueSuggestions = async (eventTitle = '', category = '') => {
  if (!eventTitle && !category) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/suggest-venue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: eventTitle,
        category: category,
      }),
    });

    if (!response.ok) {
      console.error('AI venue suggestion failed:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Error fetching venue suggestions:', error);
    return [];
  }
};

/**
 * Get AI-powered complete event suggestion
 * Provides a full event structure recommendation
 * @param {object} partialEvent - Partial event object with some fields
 * @returns {Promise<object>} - Suggested complete event object
 */
export const getCompleteEventSuggestion = async (partialEvent = {}) => {
  if (!partialEvent.title && !partialEvent.description) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/suggest-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partialEvent),
    });

    if (!response.ok) {
      console.error('AI event suggestion failed:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data.suggestion || null;
  } catch (error) {
    console.error('Error fetching complete event suggestion:', error);
    return null;
  }
};

/**
 * Format suggestions for display in UI
 * @param {Array<string>} suggestions - Raw suggestions from API
 * @param {number} limit - Max number to return
 * @returns {Array<string>} - Formatted suggestions
 */
export const formatSuggestions = (suggestions = [], limit = 5) => {
  return suggestions
    .filter((s) => s && s.trim().length > 0)
    .slice(0, limit)
    .map((s) => s.trim());
};
