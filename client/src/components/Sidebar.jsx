import React from 'react';
import { LayoutDashboard, Users, Calendar, Award, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { name: 'Student Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
        { name: 'Faculty Dashboard', path: '/faculty', icon: <Users size={20} /> },
        { name: 'Admin Dashboard', path: '/admin', icon: <Calendar size={20} /> },
    ];

    return (
        <aside className="sidebar-container">
            <div className="sidebar-logo">
                <h2 style={{ color: '#4318FF' }}>UniTrack</h2>
            </div>

            <div className="nav-links">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>

            <div className="sidebar-footer">
                <div className="sidebar-card">
                    <div className="progress-circle-mini">85%</div>
                    <p className="card-text">Profile Complete</p>
                </div>
                <button className="logout-btn">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
