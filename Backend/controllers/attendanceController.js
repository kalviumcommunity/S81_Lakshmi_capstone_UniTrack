import Attendance from '../models/Attendance.js';
import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import { incrementPoints } from '../utils/gamification.js';

export const markAttendance = async (req, res) => {
    try {
        const { eventId, timestamp } = req.body;
        const studentId = req.user.id;

        // Verify time (QR code validity, e.g., 5 minutes)
        const scanTime = new Date();
        const qrTime = new Date(timestamp);
        const diff = (scanTime - qrTime) / 1000 / 60; // minutes

        if (diff > 10) { // 10 minutes valid
            return res.status(400).json({ message: 'QR Code expired. Please ask faculty to refresh.' });
        }

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check if registered (Optional, maybe allow walk-ins? Assuming registration required)
        const reg = await Registration.findOne({ studentId, eventId });
        if (!reg) {
            return res.status(400).json({ message: 'You are not registered for this event.' });
        }

        // Check if already marked
        const existing = await Attendance.findOne({ studentId, eventId });
        if (existing) {
            return res.status(200).json({ message: 'Already marked present.' });
        }

        const attendance = new Attendance({
            studentId,
            eventId,
            status: 'present',
            date: scanTime
        });

        await attendance.save();

        // Gamification: Add 10 points
        await incrementPoints(studentId, 10);

        res.json({ message: 'Attendance marked successfully! You earned 10 points.' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAttendance = async (req, res) => {
    try {
        const { eventId } = req.params;
        const list = await Attendance.find({ eventId }).populate('studentId', 'name email');
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getStudentAttendance = async (req, res) => {
    try {
        const list = await Attendance.find({ studentId: req.user.id }).populate('eventId');
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
