
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'faculty', 'admin'] },
  interests: { type: [String], default: [] },
  points: { type: Number, default: 0 }
});

export default mongoose.model('User', userSchema);