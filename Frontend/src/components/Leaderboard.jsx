import { useState, useEffect } from 'react';
import api from '../api/axios';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/leaderboard');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🏆 Top Students
            </h3>
            <div style={{ marginTop: '1rem' }}>
                {users.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No data yet.</p>}
                {users.map((u, index) => (
                    <div key={u._id} style={{
                        display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0',
                        borderBottom: '1px solid #334155'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{
                                width: '24px', height: '24px', borderRadius: '50%',
                                background: index < 3 ? 'var(--accent)' : '#475569',
                                color: index < 3 ? 'black' : 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold', fontSize: '0.9rem'
                            }}>
                                {index + 1}
                            </span>
                            <span>{u.name}</span>
                        </div>
                        <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                            {u.points} pts
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
