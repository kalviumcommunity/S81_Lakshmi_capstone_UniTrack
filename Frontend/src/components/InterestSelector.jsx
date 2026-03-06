import { useState } from 'react';
import api from '../api/axios';

const InterestSelector = ({ currentInterests, onSave, onClose }) => {
    const [selected, setSelected] = useState(currentInterests || []);
    const options = ['technology', 'art', 'music', 'sports', 'business', 'literature', 'science'];

    const toggleInterest = (interest) => {
        if (selected.includes(interest)) {
            setSelected(selected.filter(i => i !== interest));
        } else {
            setSelected([...selected, interest]);
        }
    };

    const handleSave = async () => {
        try {
            await api.put('/recommendations/interests', { interests: selected });
            onSave(selected);
            onClose();
        } catch (err) {
            alert('Failed to save interests');
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 style={{ marginBottom: '1rem' }}>Your Interests</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Select topics to get personalized event recommendations.</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {options.map(opt => (
                        <span
                            key={opt}
                            onClick={() => toggleInterest(opt)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                border: '1px solid var(--primary)',
                                background: selected.includes(opt) ? 'var(--primary)' : 'transparent',
                                color: 'white',
                                textTransform: 'capitalize'
                            }}
                        >
                            {opt}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleSave} style={{ flex: 1 }}>Save</button>
                    <button onClick={onClose} style={{ flex: 1, background: 'transparent', border: '1px solid #475569' }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default InterestSelector;
