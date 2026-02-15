import { useState } from 'react';
import api from '../api/axios';

const CreateEvent = ({ onEventCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        category: 'workshop',
        maxParticipants: 100
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/events', formData);
            setMsg('Event created successfully!');
            setFormData({
                title: '', description: '', date: '', time: '', venue: '', category: 'workshop', maxParticipants: 100
            });
            if (onEventCreated) onEventCreated();
        } catch (err) {
            setMsg('Error creating event');
        }
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>Create New Event</h3>
            {msg && <p style={{ color: msg.includes('Error') ? 'var(--secondary)' : 'var(--accent)' }}>{msg}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
                <input name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: '#334155', color: 'white', border: '1px solid #475569' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        style={{ padding: '0.8rem', borderRadius: '8px', background: '#334155', color: 'white', border: '1px solid #475569' }}
                    >
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="fest">Cultural Fest</option>
                        <option value="tech">Technical</option>
                    </select>
                    <input type="number" name="maxParticipants" placeholder="Max Participants" value={formData.maxParticipants} onChange={handleChange} required />
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
