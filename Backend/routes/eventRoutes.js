const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  updateEvent
} = require('../controllers/eventController');

// GET route to update an event
router.get('/api/events', getAllEvents);

// POST route to update an event
router.post('/api/events', createEvent);

// PUT route to update an event
router.put('/api/events/:id', updateEvent);

module.exports = router;
