import express from 'express';

import Attendance from '../models/Attendance.js';
import { protect } from '../middleware/authMiddleware.js';

import { markAttendance, getAttendance, getStudentAttendance } from '../controllers/attendanceController.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { eventId, studentId, status } = req.body;

    // Check if attendance already exists for this student and event
    const attendance = await Attendance.findOneAndUpdate(
      { eventId, studentId },
      { status, date: Date.now(), checkInTime: Date.now() },
      { new: true, upsert: true } // upsert creates a new document if one doesn't exist
    );

    res.status(200).json(attendance); // 200 OK because it could be an update or create
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:eventId', protect, async (req, res) => {
  try {
    const list = await Attendance.find({ eventId: req.params.eventId }).populate('studentId', 'name email');
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/mark', auth, markAttendance);
router.get('/event/:eventId', auth, getAttendance); // Faculty view
router.get('/student/me', auth, getStudentAttendance); // Student view


export default router;
