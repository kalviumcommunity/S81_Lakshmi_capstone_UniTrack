import Event from '../models/Event.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('attendees', 'name email')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
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
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let event = await Event.findById(id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.attendees.map(a => a.toString()).includes(req.user._id.toString())) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    if (event.attendees.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.attendees.push(req.user._id);
    await event.save();

    // Fetch populated event to return to frontend
    event = await Event.findById(id)
      .populate('attendees', 'name email')
      .populate('createdBy', 'name');

    res.status(200).json({ message: 'Successfully registered for the event', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
