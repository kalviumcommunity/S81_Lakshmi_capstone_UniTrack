import Event from '../models/Event.js';
import { getAllEvents, createEvent, updateEvent } from '../controllers/eventController.js';

jest.mock('../models/Event.js');

describe('eventController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('getAllEvents', () => {
    it('returns events on success', async () => {
      const events = [{ title: 'a' }];
      Event.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(events) });
      await getAllEvents(req, res);
      expect(res.json).toHaveBeenCalledWith(events);
    });

    it('handles errors', async () => {
      const error = new Error('fail');
      Event.find.mockReturnValue({ sort: jest.fn().mockRejectedValue(error) });
      await getAllEvents(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('createEvent', () => {
    it('saves new event and returns 201', async () => {
      const body = { title: 'T' };
      const saved = { _id: '1', title: 'T' };
      req.body = body;
      Event.prototype.save = jest.fn().mockResolvedValue(saved);
      await createEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(saved);
    });

    it('handles save errors', async () => {
      const error = new Error('bad');
      req.body = {};
      Event.prototype.save = jest.fn().mockRejectedValue(error);
      await createEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateEvent', () => {
    it('updates and returns event', async () => {
      const id = '123';
      const updated = { _id: id, title: 'updated' };
      req.params = { id };
      req.body = { title: 'updated' };
      Event.findByIdAndUpdate.mockResolvedValue(updated);
      await updateEvent(req, res);
      expect(res.json).toHaveBeenCalledWith(updated);
    });

    it('returns 404 if not found', async () => {
      req.params = { id: '123' };
      req.body = {};
      Event.findByIdAndUpdate.mockResolvedValue(null);
      await updateEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('handles error during update', async () => {
      const error = new Error('err');
      req.params = { id: '123' };
      req.body = {};
      Event.findByIdAndUpdate.mockRejectedValue(error);
      await updateEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});