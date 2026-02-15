import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await Attendance.aggregate([
      { $group: { _id: '$studentId', points: { $sum: 10 } } },
      { $sort: { points: -1 } },
      { $limit: 10 }
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

