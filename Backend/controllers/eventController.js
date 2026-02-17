import Event from '../models/Event.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
    const events = await Event.find().populate('createdBy', 'name email').sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, category, maxParticipants } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      venue,
      category,
      maxParticipants,
      createdBy: req.user.id
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check user ownership or admin
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check user ownership or admin
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import Registration from '../models/Registration.js';

export const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if event exists
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if already registered
    const existingReg = await Registration.findOne({ studentId: userId, eventId: id });
    if (existingReg) {
      return res.status(400).json({ message: 'Already registered' });
    }

    // Check capacity
    const count = await Registration.countDocuments({ eventId: id });
    if (count >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    const reg = new Registration({
      studentId: userId,
      eventId: id
    });

    await reg.save();
    res.json({ message: 'Registered successfully', registration: reg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find({ studentId: req.user.id }).populate('eventId');
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
