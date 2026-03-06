import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { X, CheckCircle, XCircle, Clock } from 'lucide-react';

const FacultyDashboard = () => {
    const { user, token } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [attendanceData, setAttendanceData] = useState({}); // { studentId: 'present' | 'absent' | 'late' }

    const [newEvent, setNewEvent] = useState({
        title: '', description: '', date: '', time: '', venue: '', category: 'academic', maxParticipants: 50
    });

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

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...newEvent, createdBy: user._id })
            });
            const data = await res.json();
            if (res.ok) {
                setEvents([data, ...events]);
                setShowCreateModal(false);
                setNewEvent({ title: '', description: '', date: '', time: '', venue: '', category: 'academic', maxParticipants: 50 });
                alert("Event created successfully!");
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            alert('Failed to create event.');
        }
    };

    return (
        <div className="dashboard-content">
            <Navbar name={user?.name || "Professor"} avatarUrl={user?.profilePhoto || "https://i.pravatar.cc/150?u=faculty"} />

            <div className="welcome-banner faculty-banner">
                <div>
                    <h1>Faculty Dashboard 📚</h1>
                    <p>Manage your events and track student attendance.</p>
                </div>
                <button className="create-event-btn" onClick={() => setShowCreateModal(true)}>
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

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '500px' }}>
                        <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                            <X size={24} />
                        </button>
                        <h2>Create New Event</h2>
                        <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '1rem' }}>
                            <div className="input-group">
                                <label>Title</label>
                                <input type="text" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} required />
                            </div>
                            <div className="input-group">
                                <label>Description</label>
                                <textarea rows="3" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>Date</label>
                                    <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} required />
                                </div>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>Time</label>
                                    <input type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Venue</label>
                                <input type="text" value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })} required />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>Category</label>
                                    <select value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
                                        <option value="academic">Academic</option>
                                        <option value="sports">Sports</option>
                                        <option value="cultural">Cultural</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>Max Seats</label>
                                    <input type="number" min="1" value={newEvent.maxParticipants} onChange={e => setNewEvent({ ...newEvent, maxParticipants: Number(e.target.value) })} required />
                                </div>
                            </div>
                            <button type="submit" className="confirm-btn">Create Event</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyDashboard;
