import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { X, CheckCircle, XCircle, Clock } from 'lucide-react';

const FacultyDashboard = () => {
    const { user, token } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendanceData, setAttendanceData] = useState({}); // { studentId: 'present' | 'absent' | 'late' }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/events', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    // Filter events created by this faculty
                    const myEvents = data.filter(e => e.createdBy && e.createdBy._id === user._id);
                    setEvents(myEvents);
                } else {
                    console.error('Failed to fetch events:', data.message);
                }
            } catch (err) {
                console.error('Network error fetching events', err);
            } finally {
                setLoading(false);
            }
        };

        if (token && user) fetchEvents();
    }, [token, user]);

    const openManageAttendance = async (event) => {
        setSelectedEvent(event);
        setAttendanceData({});
        // Fetch existing attendance for this event
        try {
            const res = await fetch(`http://localhost:5000/api/attendance/${event._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                const map = {};
                data.forEach(record => {
                    map[record.studentId._id] = record.status;
                });
                setAttendanceData(map);
            }
        } catch (err) {
            console.error('Failed to fetch attendance', err);
        }
    };

    const markAttendance = async (studentId, status) => {
        try {
            const res = await fetch('http://localhost:5000/api/attendance', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventId: selectedEvent._id,
                    studentId,
                    status
                })
            });
            if (res.ok) {
                setAttendanceData(prev => ({ ...prev, [studentId]: status }));
            } else {
                const data = await res.json();
                alert(`Error marking attendance: ${data.message}`);
            }
        } catch (err) {
            console.error('Error marking attendance', err);
        }
    };

    return (
        <div className="dashboard-content">
            <Navbar name={user?.name || "Professor"} avatarUrl="https://i.pravatar.cc/150?u=faculty" />

            <div className="welcome-banner faculty-banner">
                <div>
                    <h1>Faculty Dashboard 📚</h1>
                    <p>Manage your events and track student attendance.</p>
                </div>
                <button className="create-event-btn" onClick={() => alert("Create Event Flow - Coming Next!")}>
                    + Create New Event
                </button>
            </div>

            <div className="grid-layout">
                <div className="main-feed">
                    <div className="section-header">
                        <h2>My Events</h2>
                    </div>

                    {loading ? (
                        <p>Loading your events...</p>
                    ) : events.length > 0 ? (
                        <div className="cards-grid">
                            {events.map(event => (
                                <div key={event._id} className="event-card">
                                    <div className="event-image" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=500)` }}>
                                        <div className="event-badge">{event.status || 'upcoming'}</div>
                                    </div>
                                    <h3 className="event-title">{event.title}</h3>
                                    <div className="event-info">📅 {new Date(event.date).toLocaleDateString()}</div>
                                    <div className="event-info">👥 {event.attendees?.length || 0} Registrations</div>
                                    <div className="card-actions">
                                        <button className="btn-secondary" onClick={() => openManageAttendance(event)}>
                                            Manage Attendance
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No active events created yet.</p>
                        </div>
                    )}
                </div>

                <aside className="right-panel">
                    <div className="panel-card">
                        <h3>Quick Actions</h3>
                        <ul className="action-list">
                            <li>📊 View Reports</li>
                            <li>📢 Send Notifications</li>
                        </ul>
                    </div>
                </aside>
            </div>

            {selectedEvent && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '600px', width: '90%' }}>
                        <button className="close-btn" onClick={() => setSelectedEvent(null)}>
                            <X size={24} />
                        </button>
                        <div className="modal-details">
                            <h2>Attendance: {selectedEvent.title}</h2>
                            <p style={{ marginBottom: '1rem', color: '#666' }}>
                                Mark attendance for registered students below.
                            </p>

                            {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {selectedEvent.attendees.map(student => (
                                        <li key={student._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
                                            <div>
                                                <strong>{student.name}</strong> <br />
                                                <small style={{ color: '#888' }}>{student.email}</small>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    style={{
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #ddd',
                                                        background: attendanceData[student._id] === 'present' ? '#e6ffe6' : '#fff',
                                                        color: '#28a745',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    onClick={() => markAttendance(student._id, 'present')}
                                                >
                                                    <CheckCircle size={16} /> Present
                                                </button>
                                                <button
                                                    style={{
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #ddd',
                                                        background: attendanceData[student._id] === 'absent' ? '#ffe6e6' : '#fff',
                                                        color: '#dc3545',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    onClick={() => markAttendance(student._id, 'absent')}
                                                >
                                                    <XCircle size={16} /> Absent
                                                </button>
                                                <button
                                                    style={{
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #ddd',
                                                        background: attendanceData[student._id] === 'late' ? '#fff0ca' : '#fff',
                                                        color: '#d39e00',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    onClick={() => markAttendance(student._id, 'late')}
                                                >
                                                    <Clock size={16} /> Late
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#888', fontStyle: 'italic' }}>No students registered yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyDashboard;
