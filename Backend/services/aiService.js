import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generate AI suggestions for event titles
 * @param {string} partial - Partial title text
 * @returns {Promise<Array<string>>} - Array of suggested titles
 */
export const suggestEventTitle = async (partial) => {
  if (!partial || partial.length < 2) {
    return [];
  }

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are an event naming assistant. Given the partial event title: "${partial}"
        
Generate exactly 4 creative and relevant event title completions. Each title should be concise (max 50 chars), professional, and relevant to university/campus events.

Return ONLY the 4 title suggestions as a JSON array, one per line, with no additional text or explanations.
Format: ["title1", "title2", "title3", "title4"]`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return [];
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    const suggestions = JSON.parse(jsonMatch[0]);
    return Array.isArray(suggestions)
      ? suggestions.filter((s) => typeof s === 'string')
      : [];
  } catch (error) {
    console.error('Error generating title suggestions:', error);
    return [];
  }
};

/**
 * Generate AI suggestions for event descriptions
 * @param {string} partial - Partial description text
 * @param {string} title - Event title for context
 * @returns {Promise<Array<string>>} - Array of suggested descriptions
 */
export const suggestEventDescription = async (partial, title = '') => {
  if (!partial || partial.length < 3) {
    return [];
  }

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: `You are an event description assistant. 
Event title: "${title}"
Partial description: "${partial}"

Generate exactly 3 enriched event descriptions based on the partial text. Each description should:
- Be 2-4 sentences long
- Be engaging and informative
- Include what participants will gain
- Maintain a professional tone suitable for university events

Return ONLY the 3 description suggestions as a JSON array with no additional text.
Format: ["description1", "description2", "description3"]`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return [];
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    const suggestions = JSON.parse(jsonMatch[0]);
    return Array.isArray(suggestions)
      ? suggestions.filter((s) => typeof s === 'string')
      : [];
  } catch (error) {
    console.error('Error generating description suggestions:', error);
    return [];
  }
};

/**
 * Suggest event category based on title and description
 * @param {string} title - Event title
 * @param {string} description - Event description
 * @returns {Promise<Array<string>>} - Array of suggested categories
 */
export const suggestEventCategory = async (title = '', description = '') => {
  if (!title && !description) {
    return [];
  }

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: `You are an event categorization assistant.
Event title: "${title}"
Event description: "${description}"

Based on the above information, suggest the most appropriate category for this event.
Choose from: academic, sports, cultural, workshop, other

Return a JSON array with the category and up to 3 alternatives in order of relevance.
Format: ["primary_category", "alternative1", "alternative2"]`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return [];
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    const suggestions = JSON.parse(jsonMatch[0]);
    const validCategories = ['academic', 'sports', 'cultural', 'workshop', 'other'];
    return Array.isArray(suggestions)
      ? suggestions.filter((s) => validCategories.includes(s))
      : [];
  } catch (error) {
    console.error('Error generating category suggestions:', error);
    return [];
  }
};

/**
 * Suggest venue based on event title and category
 * @param {string} title - Event title
 * @param {string} category - Event category
 * @returns {Promise<Array<string>>} - Array of suggested venues
 */
export const suggestEventVenue = async (title = '', category = '') => {
  if (!title && !category) {
    return [];
  }

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are a venue suggestion specialist for university events.
Event title: "${title}"
Event category: "${category}"

Suggest 4 appropriate venue names for this event. These should be typical university campus locations or facility types (e.g., "Auditorium", "Gymnasium", "Conference Hall", etc.).

Return ONLY the 4 venue suggestions as a JSON array.
Format: ["venue1", "venue2", "venue3", "venue4"]`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return [];
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    const suggestions = JSON.parse(jsonMatch[0]);
    return Array.isArray(suggestions)
      ? suggestions.filter((s) => typeof s === 'string')
      : [];
  } catch (error) {
    console.error('Error generating venue suggestions:', error);
    return [];
  }
};

/**
 * Generate a complete event suggestion
 * @param {object} partialEvent - Partial event data
 * @returns {Promise<object|null>} - Complete event suggestion or null
 */
export const suggestCompleteEvent = async (partialEvent = {}) => {
  const { title, description, category } = partialEvent;

  if (!title && !description) {
    return null;
  }

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `You are a comprehensive event planning assistant. 
Given partial event information:
- Title: "${title || 'Not provided'}"
- Description: "${description || 'Not provided'}"
- Category: "${category || 'Not provided'}"

Generate a complete event suggestion with enriched details. Format your response as valid JSON with these fields:
{
  "title": "refined title",
  "description": "enhanced 2-3 sentence description",
  "category": "academic|sports|cultural|workshop|other",
  "recommendedDuration": "HH:mm format, e.g., 02:00",
  "suggestedMaxParticipants": number,
  "venueType": "recommended venue type"
}

Return only valid JSON, no additional text.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return null;
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }

    const suggestion = JSON.parse(jsonMatch[0]);
    return suggestion;
  } catch (error) {
    console.error('Error generating complete event suggestion:', error);
    return null;
  }
};

export default {
  suggestEventTitle,
  suggestEventDescription,
  suggestEventCategory,
  suggestEventVenue,
  suggestCompleteEvent,
};
