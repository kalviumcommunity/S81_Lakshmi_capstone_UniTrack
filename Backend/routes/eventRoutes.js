import express from 'express';
import { getAllEvents, createEvent, updateEvent } from '../controllers/eventController.js';

const router = express.Router();

// These paths are relative to /api/events
router.get('/', getAllEvents);        // GET /api/events
router.post('/', createEvent);        // POST /api/events
router.put('/:id', updateEvent);      // PUT /api/events/:id

export default router;
