import express from 'express';
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
