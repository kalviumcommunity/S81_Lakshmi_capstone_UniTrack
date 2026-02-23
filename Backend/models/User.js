import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for events created by the user
userSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'createdBy'
});

// Virtual for attendance history
userSchema.virtual('attendanceHistory', {
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'studentId'
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'faculty', 'admin'] },
  interests: { type: [String], default: [] },
  points: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);
export default User;