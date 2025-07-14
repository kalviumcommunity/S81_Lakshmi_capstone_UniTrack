export const getAllEvents = (req, res) => {
  res.json({ message: 'All events fetched successfully' });
};

export const createEvent = (req, res) => {
  const newEvent = req.body;
  res.status(201).json({ message: 'Event created successfully', event: newEvent });
};

export const updateEvent = (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;
  res.json({ message: `Event ${id} updated successfully`, updatedEvent });
};
