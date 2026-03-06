import express from 'express';
import { getAllEvents, createEvent, updateEvent, registerForEvent, deleteEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// These paths are relative to /api/events
router.get('/', protect, getAllEvents);        // GET /api/events
router.post('/', protect, createEvent);        // POST /api/events
router.put('/:id', protect, updateEvent);      // PUT /api/events/:id
router.delete('/:id', protect, deleteEvent);   // DELETE /api/events/:id
router.post('/:id/register', protect, registerForEvent); // POST /api/events/:id/register

export default router;
