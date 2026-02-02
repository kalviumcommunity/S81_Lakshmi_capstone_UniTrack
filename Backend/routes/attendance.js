import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const attendance = await Attendance.create(req.body);
  res.json(attendance);
});

router.get('/:eventId', async (req, res) => {
  const list = await Attendance.find({ eventId: req.params.eventId }).populate('studentId');
  res.json(list);
});

export default router;

