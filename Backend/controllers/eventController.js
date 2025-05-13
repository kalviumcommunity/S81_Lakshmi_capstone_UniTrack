// controllers/eventController.js
const Event = require('../models/eventModel');

// GET - Fetch all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST - Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newEvent = new Event({ title, description, date }); 
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
};


const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message  });
  }
};


module.exports = { 
  getAllEvents, 
  createEvent,
  updateEvent
 }; 
