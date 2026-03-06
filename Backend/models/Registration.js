import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    registrationStatus: {
        type: String,
        enum: ['registered', 'cancelled', 'waitlisted'],
        default: 'registered'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Registration', registrationSchema);
