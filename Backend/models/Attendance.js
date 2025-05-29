import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  status: { type: String, enum: ['present', 'absent'], default: 'present' },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Attendance', attendanceSchema);



