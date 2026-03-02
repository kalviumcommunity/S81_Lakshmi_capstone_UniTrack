import User from '../models/User.js';

export const incrementPoints = async (userId, amount) => {
    try {
        await User.findByIdAndUpdate(userId, { $inc: { points: amount } });
    } catch (err) {
        console.error('Error updating points:', err);
    }
};
