
import React from 'react';

const Sidebar = () => {
    return (
        <aside className="sidebar-panel">
            <h3 className="sidebar-title">My Progress</h3>
            <div className="progress-circle"></div>
            <p className="progress-label">Participation Points</p>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#A3AED0' }}>
                    <span>Workshops</span>
                    <span>12</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#A3AED0' }}>
                    <span>Competitions</span>
                    <span>5</span>
                </div>
            </div>

            <button className="btn-download">
                <span>📥</span> Download Certificate
            </button>
        </aside>
    );
};

export default Sidebar;
