import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  venue: String,
  category: String,
  maxParticipants: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Event', eventSchema);

