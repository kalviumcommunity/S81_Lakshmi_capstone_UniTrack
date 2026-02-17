import React from 'react';
import Navbar from '../components/Navbar';

const FacultyDashboard = () => {
    return (
        <div className="dashboard-content">
            <Navbar name="Professor Smith" avatarUrl="https://i.pravatar.cc/150?u=faculty" />

            <div className="welcome-banner faculty-banner">
                <div>
                    <h1>Faculty Dashboard 📚</h1>
                    <p>Manage your events and track student attendance.</p>
                </div>
                <button className="create-event-btn">
                    + Create New Event
                </button>
            </div>

            <div className="grid-layout">
                <div className="main-feed">
                    <div className="section-header">
                        <h2>My Events</h2>
                    </div>

                    <div className="empty-state">
                        <p>No active events created yet.</p>
                        <button className="btn-secondary">View Past Events</button>
                    </div>
                </div>

                <aside className="right-panel">
                    <div className="panel-card">
                        <h3>Quick Actions</h3>
                        <ul className="action-list">
                            <li>📄 Mark Attendance</li>
                            <li>📊 View Reports</li>
                            <li>📢 Send Notifications</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default FacultyDashboard;
