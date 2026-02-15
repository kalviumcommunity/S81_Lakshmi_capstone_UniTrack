import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:eventId', async (req, res) => {
  try {
    const list = await Attendance.find({ eventId: req.params.eventId }).populate('studentId');
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

