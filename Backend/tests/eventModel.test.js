import mongoose from 'mongoose';
import Event from '../models/Event.js';

describe('Event model validation', () => {
  it('is invalid without required fields', () => {
    const e = new Event();
    const err = e.validateSync();
    expect(err.errors.title).toBeDefined();
    expect(err.errors.description).toBeDefined();
    expect(err.errors.date).toBeDefined();
    expect(err.errors.time).toBeDefined();
    expect(err.errors.venue).toBeDefined();
    expect(err.errors.category).toBeDefined();
    expect(err.errors.maxParticipants).toBeDefined();
    expect(err.errors.createdBy).toBeDefined();
  });

  it('defaults status to upcoming and sets createdAt', () => {
    const e = new Event({
      title: 'Test',
      description: 'desc',
      date: new Date(),
      time: '12:00',
      venue: 'Hall',
      category: 'academic',
      maxParticipants: 10,
      createdBy: new mongoose.Types.ObjectId()
    });
    const err = e.validateSync();
    expect(err).toBeUndefined();
    expect(e.status).toBe('upcoming');
    expect(e.createdAt).toBeDefined();
  });

  it('rejects invalid category', () => {
    const e = new Event({
      title: 'Test',
      description: 'desc',
      date: new Date(),
      time: '12:00',
      venue: 'Hall',
      category: 'invalid',
      maxParticipants: 10,
      createdBy: new mongoose.Types.ObjectId()
    });
    const err = e.validateSync();
    expect(err.errors.category).toBeDefined();
  });

  it('enforces minParticipants >=1', () => {
    const e = new Event({
      title: 'Test',
      description: 'desc',
      date: new Date(),
      time: '12:00',
      venue: 'Hall',
      category: 'academic',
      maxParticipants: 0,
      createdBy: new mongoose.Types.ObjectId()
    });
    const err = e.validateSync();
    expect(err.errors.maxParticipants).toBeDefined();
  });

  it('allows valid event', () => {
    const e = new Event({
      title: 'Test',
      description: 'desc',
      date: new Date(),
      time: '12:00',
      venue: 'Hall',
      category: 'sports',
      maxParticipants: 5,
      createdBy: new mongoose.Types.ObjectId()
    });
    const err = e.validateSync();
    expect(err).toBeUndefined();
  });
});