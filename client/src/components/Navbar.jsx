
import React from 'react';

const Navbar = ({ name, avatarUrl }) => {
    return (
        <nav className="navbar">
            <div className="nav-title">UniTrack</div>
            <div className="nav-actions">
                <span className="nav-item">Welcome back, {name}!🌟</span>
                <span className="nav-icon">🔔</span>
                <div
                    className="avatar"
                    style={{ background: `url("${avatarUrl}") center/cover` }}
                ></div>
            </div>
        </nav>
    );
};

export default Navbar;
