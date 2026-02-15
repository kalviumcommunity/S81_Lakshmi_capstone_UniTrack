import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    default: 'present'
  },
  date: {
    type: Date,
    default: Date.now
  },
  checkInTime: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate attendance for same student and event on same day (optional logic, but unique compound index helps)
attendanceSchema.index({ studentId: 1, eventId: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
