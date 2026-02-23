# 🤖 AI-Autocomplete Implementation Guide

## Overview

This document describes the **LLM/AI-autocomplete functionality** implemented in the UniTrack application using **Anthropic's Claude API**. The feature provides intelligent suggestions for event creation fields as users type, enhancing user experience and accelerating event setup.

---

## 📋 Features Implemented

### 1. **Intelligent Title Suggestions**
- Analyzes partial event titles
- Suggests creative, relevant, and professional event titles
- Returns up to 4 suggestions based on context

### 2. **Smart Description Suggestions**
- Completes event descriptions intelligently
- Uses event title as context for relevant suggestions
- Generates engaging, informative 2-4 sentence descriptions

### 3. **Category Auto-Detection**
- Analyzes event title and description
- Suggests the most appropriate category:
  - Academic
  - Sports
  - Cultural
  - Workshop
  - Other

### 4. **Venue Recommendations**
- Suggests appropriate venues based on event type
- Provides campus-relevant location suggestions
- Adapts to category and event type

### 5. **Complete Event Suggestions**
- Generates full event details from minimal input
- Includes:
  - Refined title
  - Enhanced description
  - Suggested category
  - Recommended duration
  - Suggested participant capacity
  - Venue type recommendations

---

## 🏗️ Architecture

### Backend (`Backend/`)

#### **aiService.js** - Core AI Logic
```javascript
export const suggestEventTitle(partial)
export const suggestEventDescription(partial, title)
export const suggestEventCategory(title, description)
export const suggestEventVenue(title, category)
export const suggestCompleteEvent(partialEvent)
```

- Uses **Anthropic Claude 3.5 Sonnet** model
- Implements structured prompting for consistent JSON responses
- Error handling and rate limiting
- Debounced API calls to optimize performance

#### **aiRoutes.js** - Express API Endpoints
```
POST /api/ai/suggest-title
POST /api/ai/suggest-description
POST /api/ai/suggest-category
POST /api/ai/suggest-venue
POST /api/ai/suggest-event
GET /api/ai/health
```

All endpoints return JSON with `suggestions` array and descriptive error messages.

### Frontend (`client/src/`)

#### **AIAutocompleteInput.jsx** - Reusable Input Component
Features:
- Real-time suggestions with 300ms debounce
- Keyboard navigation (Arrow Up/Down, Enter, Escape)
- Click-outside to close suggestions
- Loading state indicators
- Visual feedback for selected suggestions

#### **EventCreationForm.jsx** - Event Creation UI
- Integrated AI-powered form fields
- Multi-step suggestions flow
- Preview and apply AI suggestions
- Full event validation before submission

#### **aiAutocomplete.js** - Client Utility
- API communication layer
- Suggestion formatting and filtering
- Error handling and logging
- Context-aware suggestion fetching

---

## 🚀 Setup & Configuration

### 1. Backend Setup

#### Install Dependencies
```bash
cd Backend
npm install
# The @anthropic-ai/sdk is already in package.json
```

#### Configure Environment
```bash
# Create .env file (or update existing)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
PORT=5000
MONGO_URI=your_mongo_connection_string
```

**Get your API Key:**
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create account or sign in
3. Navigate to API Keys section
4. Generate new API key
5. Add to `.env`

#### Start Server
```bash
npm start        # Production
npm run dev      # Development with nodemon
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev      # Development server (default: localhost:5173)
```

---

## 🎯 Usage Examples

### Example 1: Title Autocomplete
```javascript
import { getEventTitleSuggestions } from './utils/aiAutocomplete';

const suggestions = await getEventTitleSuggestions("Annual");
// Returns: ["Annual Tech Summit 2025", "Annual Leadership Conference", ...]
```

### Example 2: Description Autocomplete
```javascript
import { getEventDescriptionSuggestions } from './utils/aiAutocomplete';

const suggestions = await getEventDescriptionSuggestions(
  "Join us for an interactive session on",
  "AI Workshop"
);
// Returns: ["Join us for an interactive session on AI fundamentals...", ...]
```

### Example 3: Complete Event Suggestion
```javascript
import { getCompleteEventSuggestion } from './utils/aiAutocomplete';

const suggestion = await getCompleteEventSuggestion({
  title: "Python Programming",
  description: "Learn Python basics"
});
// Returns: {
//   title: "Python Programming Bootcamp",
//   description: "Learn Python fundamentals...",
//   category: "workshop",
//   recommendedDuration: "03:00",
//   suggestedMaxParticipants: 50,
//   venueType: "Computer Lab"
// }
```

---

## 📊 API Endpoints Reference

### POST `/api/ai/suggest-title`
**Request:**
```json
{
  "partial": "Annual"
}
```

**Response:**
```json
{
  "suggestions": [
    "Annual Tech Summit 2025",
    "Annual Leadership Conference",
    "Annual Sports Festival",
    "Annual Cultural Fest"
  ]
}
```

### POST `/api/ai/suggest-description`
**Request:**
```json
{
  "partial": "Join us for a workshop on",
  "title": "Web Development Workshop"
}
```

**Response:**
```json
{
  "suggestions": [
    "Join us for a workshop on modern web development...",
    "Join us for a comprehensive workshop on..."
  ]
}
```

### POST `/api/ai/suggest-category`
**Request:**
```json
{
  "title": "Basketball Tournament",
  "description": "Annual inter-college sports event"
}
```

**Response:**
```json
{
  "suggestions": ["sports", "cultural", "academic"]
}
```

### POST `/api/ai/suggest-venue`
**Request:**
```json
{
  "title": "Basketball Tournament",
  "category": "sports"
}
```

**Response:**
```json
{
  "suggestions": [
    "Sports Complex",
    "Basketball Court",
    "Gymnasium",
    "Athletic Field"
  ]
}
```

### POST `/api/ai/suggest-event`
**Request:**
```json
{
  "title": "Tech Summit",
  "description": "Annual gathering of tech enthusiasts"
}
```

**Response:**
```json
{
  "suggestion": {
    "title": "Annual Tech Summit 2025",
    "description": "Join us for the annual gathering of tech enthusiasts...",
    "category": "academic",
    "recommendedDuration": "02:30",
    "suggestedMaxParticipants": 200,
    "venueType": "Auditorium"
  }
}
```

### GET `/api/ai/health`
**Response:**
```json
{
  "status": "OK",
  "service": "AI-Autocomplete Service",
  "timestamp": "2025-02-23T10:30:00.000Z"
}
```

---

## 🎨 UI Components

### AIAutocompleteInput Component
```jsx
<AIAutocompleteInput
  value={eventTitle}
  onChange={(e) => setEventTitle(e.target.value)}
  placeholder="Start typing event title..."
  getSuggestions={getEventTitleSuggestions}
  fieldType="title"
  context={{ category: selectedCategory }}
/>
```

**Props:**
- `value` (string): Current input value
- `onChange` (function): Callback when value changes
- `placeholder` (string): Input placeholder text
- `getSuggestions` (function): Async function to fetch suggestions
- `fieldType` (string): Type of field for tracking
- `context` (object): Additional context for suggestions

**Features:**
- ⌨️ Keyboard navigation
- 🎯 Click to select
- ⏳ Loading indicator
- 🎨 Smooth animations
- 📱 Responsive design

---

## 🧪 Testing

### To test AI endpoints manually:

```bash
# Suggest titles
curl -X POST http://localhost:5000/api/ai/suggest-title \
  -H "Content-Type: application/json" \
  -d '{"partial": "Annual"}'

# Check service health
curl http://localhost:5000/api/ai/health
```

### Frontend Component Testing
```javascript
// Test in browser console
import { getEventTitleSuggestions } from './utils/aiAutocomplete';

getEventTitleSuggestions("Workshop").then(suggestions => {
  console.log("Suggestions:", suggestions);
});
```

---

## ⚡ Performance Optimization

### 1. **Debouncing**
- 300ms delay prevents excessive API calls
- Configurable via component constants

### 2. **Smart Caching**
- Results cached in component state
- Network requests minimized

### 3. **Error Recovery**
- Graceful fallbacks on API failure
- User never blocked by suggestions

### 4. **Rate Limiting**
- API key rate limits observed
- Backoff strategies implemented

---

## 🔐 Security Considerations

### API Key Management
- Store `ANTHROPIC_API_KEY` in `.env` only
- Never commit `.env` to version control
- Rotate keys if compromised

### Input Validation
- Backend validates input length (min 2-3 chars)
- JSON parsing with error handling
- XSS prevention through React escaping

### CORS Configuration
- Restrict frontend origin in production
- Configure `CORS_ORIGIN` in `.env`

---

## 📈 Model Information

**Model Used:** Claude 3.5 Sonnet (`claude-3-5-sonnet-20241022`)

**Why this model?**
- Superior reasoning for structured suggestions
- Fast response times (ideal for real-time autocomplete)
- Cost-effective for high-volume requests
- Excellent JSON output formatting

**Max Tokens:** 300-500 per request (varies by endpoint)

---

## 🐛 Troubleshooting

### Issue: "Failed to generate suggestions"
**Solution:**
1. Verify `ANTHROPIC_API_KEY` is set in `.env`
2. Check API key is valid on Anthropic console
3. Ensure input meets minimum length requirement (2-3 chars)

### Issue: Suggestions show but are low quality
**Solution:**
1. Provide more context (full title helps description suggestions)
2. Check model temperature in `aiService.js`
3. Review Claude API documentation for prompt improvements

### Issue: CORS errors in browser
**Solution:**
1. Verify backend is running on correct port (5000)
2. Check frontend API_BASE_URL matches backend URL
3. Update CORS configuration in `server.js`

---

## 📚 Future Enhancements

1. **User Feedback Loop**
   - Track which suggestions users accept
   - Fine-tune model behavior based on feedback

2. **Multi-Language Support**
   - Suggestions in different languages
   - Language detection from event context

3. **Advanced Caching**
   - Redis integration for faster repeated suggestions
   - Suggestion history per user

4. **Analytics**
   - Track suggestion acceptance rates
   - Monitor API usage and costs
   - Identify popular event patterns

5. **Fine-tuning**
   - Custom model training on university event data
   - Domain-specific suggestion improvements

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review GitHub issues
3. Contact development team

---

**Last Updated:** February 23, 2025  
**Status:** ✅ Production Ready  
**Model Version:** Claude 3.5 Sonnet
