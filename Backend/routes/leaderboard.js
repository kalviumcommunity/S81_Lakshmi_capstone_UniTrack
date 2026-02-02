import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const leaderboard = await Attendance.aggregate([
    { $group: { _id: '$studentId', points: { $sum: 10 } } },
    { $sort: { points: -1 } },
    { $limit: 10 }
  ]);
  res.json(leaderboard);
});

export default router;

