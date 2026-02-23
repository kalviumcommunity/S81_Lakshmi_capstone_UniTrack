import express from 'express';
import {
  suggestEventTitle,
  suggestEventDescription,
  suggestEventCategory,
  suggestEventVenue,
  suggestCompleteEvent,
} from '../services/aiService.js';

const router = express.Router();

/**
 * POST /api/ai/suggest-title
 * Get AI-powered suggestions for event titles
 */
router.post('/suggest-title', async (req, res) => {
  try {
    const { partial } = req.body;

    if (!partial || partial.length < 2) {
      return res.status(400).json({
        message: 'Partial title must be at least 2 characters',
      });
    }

    const suggestions = await suggestEventTitle(partial);
    res.json({ suggestions });
  } catch (error) {
    console.error('Error in suggest-title endpoint:', error);
    res.status(500).json({
      message: 'Failed to generate title suggestions',
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/suggest-description
 * Get AI-powered suggestions for event descriptions
 */
router.post('/suggest-description', async (req, res) => {
  try {
    const { partial, title = '' } = req.body;

    if (!partial || partial.length < 3) {
      return res.status(400).json({
        message: 'Partial description must be at least 3 characters',
      });
    }

    const suggestions = await suggestEventDescription(partial, title);
    res.json({ suggestions });
  } catch (error) {
    console.error('Error in suggest-description endpoint:', error);
    res.status(500).json({
      message: 'Failed to generate description suggestions',
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/suggest-category
 * Get AI-powered category suggestions
 */
router.post('/suggest-category', async (req, res) => {
  try {
    const { title = '', description = '' } = req.body;

    if (!title && !description) {
      return res.status(400).json({
        message: 'Title or description is required',
      });
    }

    const suggestions = await suggestEventCategory(title, description);
    res.json({ suggestions });
  } catch (error) {
    console.error('Error in suggest-category endpoint:', error);
    res.status(500).json({
      message: 'Failed to generate category suggestions',
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/suggest-venue
 * Get AI-powered venue suggestions
 */
router.post('/suggest-venue', async (req, res) => {
  try {
    const { title = '', category = '' } = req.body;

    if (!title && !category) {
      return res.status(400).json({
        message: 'Title or category is required',
      });
    }

    const suggestions = await suggestEventVenue(title, category);
    res.json({ suggestions });
  } catch (error) {
    console.error('Error in suggest-venue endpoint:', error);
    res.status(500).json({
      message: 'Failed to generate venue suggestions',
      error: error.message,
    });
  }
});

/**
 * POST /api/ai/suggest-event
 * Get a complete AI-powered event suggestion
 */
router.post('/suggest-event', async (req, res) => {
  try {
    const suggestion = await suggestCompleteEvent(req.body);

    if (!suggestion) {
      return res.status(400).json({
        message: 'Could not generate event suggestion',
      });
    }

    res.json({ suggestion });
  } catch (error) {
    console.error('Error in suggest-event endpoint:', error);
    res.status(500).json({
      message: 'Failed to generate event suggestion',
      error: error.message,
    });
  }
});

/**
 * GET /api/ai/health
 * Health check endpoint for AI service
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'AI-Autocomplete Service',
    timestamp: new Date().toISOString(),
  });
});

export default router;
