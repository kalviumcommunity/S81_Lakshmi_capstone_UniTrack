import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // make sure 'Student' model exists or update accordingly
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // optional: if using event reference
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'present'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
