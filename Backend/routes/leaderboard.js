import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get Leaderboard (Students sorted by points)
router.get('/', async (req, res) => {
  try {
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
