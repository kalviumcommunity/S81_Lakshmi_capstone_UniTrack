import express from 'express';
import { markAttendance, getAttendance, getStudentAttendance } from '../controllers/attendanceController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/mark', auth, markAttendance);
router.get('/event/:eventId', auth, getAttendance); // Faculty view
router.get('/student/me', auth, getStudentAttendance); // Student view

export default router;
