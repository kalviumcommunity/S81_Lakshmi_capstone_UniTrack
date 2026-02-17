import React from 'react';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    return (
        <div className="dashboard-content">
            <Navbar name="System Admin" avatarUrl="https://i.pravatar.cc/150?u=admin" />

            <div className="welcome-banner admin-banner">
                <div>
                    <h1>System Admin Dashboard 🛠️</h1>
                    <p>Full system overview and user management.</p>
                </div>
            </div>

            <div className="grid-layout">
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p className="stat-number">2,450</p>
                        <span className="stat-trend positive">+12%</span>
                    </div>
                    <div className="stat-card">
                        <h3>Active Events</h3>
                        <p className="stat-number">45</p>
                        <span className="stat-trend neutral">0%</span>
                    </div>
                    <div className="stat-card">
                        <h3>Avg. Attendance</h3>
                        <p className="stat-number">88%</p>
                        <span className="stat-trend positive">+5%</span>
                    </div>
                </div>

                <div className="main-feed full-width">
                    <div className="section-header">
                        <h2>User Management</h2>
                        <button className="btn-secondary">Export Data</button>
                    </div>

                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>Student</td>
                                <td><span className="tag active">Active</span></td>
                                <td>Edit • Delete</td>
                            </tr>
                            <tr>
                                <td>Prof. Smith</td>
                                <td>Faculty</td>
                                <td><span className="tag active">Active</span></td>
                                <td>Edit • Delete</td>
                            </tr>
                            {/* More user rows */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
