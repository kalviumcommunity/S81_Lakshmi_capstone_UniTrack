import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get Leaderboard (Students sorted by points)
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
    const leaderboard = await User.find({ role: 'student' })
      .sort({ points: -1 })
      .limit(10)
      .select('name points');

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
