import express from 'express';

import { getAllEvents, createEvent, updateEvent, registerForEvent, deleteEvent } from '../controllers/eventController.js';


import { getAllEvents, createEvent, updateEvent, registerForEvent } from '../controllers/eventController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// These paths are relative to /api/events
router.get('/', protect, getAllEvents);        // GET /api/events
router.post('/', protect, createEvent);        // POST /api/events
router.put('/:id', protect, updateEvent);      // PUT /api/events/:id
router.delete('/:id', protect, deleteEvent);   // DELETE /api/events/:id
router.post('/:id/register', protect, registerForEvent); // POST /api/events/:id/register

import { getAllEvents, createEvent, updateEvent, deleteEvent, registerForEvent, getMyRegistrations } from '../controllers/eventController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes (or protected if preferred, let's make reading public)
router.get('/', getAllEvents);

// Protected routes
router.post('/', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.post('/:id/register', auth, registerForEvent);
router.get('/registrations/me', auth, getMyRegistrations);


export default router;
