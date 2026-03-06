import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const EventList = ({ onProjectQR }) => {
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, regsRes] = await Promise.all([
                    api.get('/events'),
                    user && user.role === 'student' ? api.get('/events/registrations/me') : Promise.resolve({ data: [] })
                ]);

                setEvents(eventsRes.data);
                setRegistrations(regsRes.data.map(r => r.eventId._id || r.eventId));
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleRegister = async (eventId) => {
        try {
            await api.post(`/events/${eventId}/register`);
            // Refresh registrations
            const res = await api.get('/events/registrations/me');
            setRegistrations(res.data.map(r => r.eventId._id || r.eventId));
            alert('Registered successfully!');
        } catch (err) {
            alert('Registration failed: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {events.map(event => {
                const isRegistered = registrations.includes(event._id);
                return (
                    <div key={event._id} className="card">
                        <h3 style={{ color: 'var(--accent)' }}>{event.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                        <p>{event.description}</p>
                        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                            <span>📍 {event.venue}</span> | <span>👤 {event.createdBy?.name || 'Unknown'}</span>
                        </div>
                        {user && user.role === 'student' && (
                            <button
                                style={{ marginTop: '1rem', width: '100%', background: isRegistered ? '#475569' : 'var(--primary)', cursor: isRegistered ? 'default' : 'pointer' }}
                                onClick={() => !isRegistered && handleRegister(event._id)}
                                disabled={isRegistered}
                            >
                                {isRegistered ? 'Registered' : 'Register Now'}
                            </button>
                        )}

                        {user && user.role === 'faculty' && event.createdBy?._id === user.id && (
                            <button
                                style={{ marginTop: '1rem', width: '100%', background: 'var(--secondary)' }}
                                onClick={() => onProjectQR && onProjectQR(event)}
                            >
                                Project Attendance QR
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EventList;
