import Event from '../models/Event.js';
import User from '../models/User.js';

export const getRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Basic AI Recommendation Logic:
        // 1. Filter events where category matches user interests.
        // 2. Prioritize upcoming events.

        let query = {};
        if (user.interests && user.interests.length > 0) {
            query.category = { $in: user.interests };
        }

        const recommendations = await Event.find(query).sort({ date: 1 }).limit(5);
        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateUserInterests = async (req, res) => {
    try {
        const { interests } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { interests },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
