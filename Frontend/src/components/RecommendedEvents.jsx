import { useState, useEffect } from 'react';
import api from '../api/axios';

const RecommendedEvents = ({ onRefresh }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchRecs = async () => {
            try {
                const res = await api.get('/recommendations');
                setEvents(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecs();
    }, [onRefresh]);

    if (events.length === 0) return null;

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Recommended For You</h2>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {events.map(event => (
                    <div key={event._id} className="card" style={{ minWidth: '250px', textAlign: 'left' }}>
                        <h4 style={{ color: 'var(--accent)', margin: '0 0 0.5rem 0' }}>{event.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(event.date).toLocaleDateString()}</p>
                        <span style={{
                            fontSize: '0.8rem', background: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px',
                            marginTop: '0.5rem', display: 'inline-block'
                        }}>
                            {event.category}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedEvents;
