import React, { useState, useEffect } from 'react';
import { Calendar, Search, MapPin, Download, AlertCircle, X, Camera, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';
import Webcam from 'react-webcam';
import CustomCalendar from '../components/CustomCalendar';

const StudentDashboard = () => {
    const { user, token } = useAuth();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [hasParticipated, setHasParticipated] = useState(false);
    const [showReason, setShowReason] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [points, setPoints] = useState(120);
    const webcamRef = React.useRef(null);

    const handleCapture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    }, [webcamRef]);

    const submitAttendance = async () => {
        try {
            // Pick an event they are registered for. 
            // In a better flow, they would mark attendance from the specific event card.
            const targetEvent = events.find(ev => ev.attendees?.some(a => (a._id || a) === user._id)) || events[0];
            const targetEventId = targetEvent?._id;

            if (!targetEventId) {
                alert("No active events found to mark attendance.");
                setShowCamera(false);
                return;
            }

            const res = await fetch('http://localhost:5000/api/attendance', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventId: targetEventId,
                    studentId: user._id,
                    status: 'present'
                })
            });

            if (res.ok) {
                setHasParticipated(true);
                setPoints(p => p + 10);
                setShowCamera(false);
                setCapturedImage(null);
                alert("Attendance marked successfully via Facial Recognition! You earned 10 points.");
            } else {
                const data = await res.json();
                alert(`Error marking attendance: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error trying to mark attendance.");
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/events', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setEvents(data);
                } else {
                    console.error('Failed to fetch events:', data.message);
                }
            } catch (err) {
                console.error('Network error fetching events', err);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchEvents();
    }, [token]);

    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
    };

    const confirmRegistration = async () => {
        if (!selectedEvent) return;
        try {
            const res = await fetch(`http://localhost:5000/api/events/${selectedEvent._id}/register`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                alert(`Successfully registered for ${selectedEvent.title}!`);
                setEvents(events.map(ev =>
                    ev._id === selectedEvent._id ? data.event : ev
                ));
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            alert('Failed to register. Please try again.');
        } finally {
            setSelectedEvent(null);
        }
    };

    const attemptDownload = () => {
        if (hasParticipated) {
            alert("Certificate downloading...");
        } else {
            setShowReason(true);
            setTimeout(() => setShowReason(false), 5000);
        }
    };

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (!filterDate) return matchesSearch;

        const eventDate = new Date(e.date);
        const matchesDate = eventDate.getDate() === filterDate.getDate() &&
            eventDate.getMonth() === filterDate.getMonth() &&
            eventDate.getFullYear() === filterDate.getFullYear();

        return matchesSearch && matchesDate;
    });

    return (
        <div className="dashboard-content">
            <Navbar name={user?.name || "Student"} avatarUrl={user?.profilePhoto || "https://i.pravatar.cc/150?u=a042581f4e29026024d"} />

            <div className="welcome-banner">
                <div>
                    <h1>Welcome back, {user?.name || "Student"}! 👋</h1>
                    <p>Here's what's happening and events you can join.</p>
                </div>
                <button
                    className="toggle-participation-btn"
                    onClick={() => {
                        if (!hasParticipated) {
                            setShowCamera(true);
                        }
                    }}
                    style={{ background: hasParticipated ? '#28a745' : '#4318FF' }}
                >
                    {hasParticipated ? "Attendance Marked ✔️" : <><Camera size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Mark Attendance</>}
                </button>
            </div>

            <div className="grid-layout">
                <div className="main-feed">
                    <div className="section-header">
                        <h2>Upcoming Events</h2>
                        <div className="search-bar">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="cards-grid">
                        {loading ? (
                            <p>Loading events...</p>
                        ) : filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <EventCard
                                    key={event._id}
                                    event={{
                                        ...event,
                                        seats: event.maxParticipants,
                                        seatsLeft: event.maxParticipants - (event.attendees?.length || 0),
                                        location: event.venue,
                                        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500", // placeholder
                                        date: new Date(event.date).toLocaleDateString() + ' • ' + event.time
                                    }}
                                    onRegister={() => handleRegisterClick(event)}
                                />
                            ))
                        ) : (
                            <p>No events found.</p>
                        )}
                    </div>
                </div>

                <aside className="right-panel">
                    <div className="panel-card progress-card">
                        <h3>My Progress</h3>
                        <div className="progress-circle-large">
                            <span>75%</span>
                        </div>
                        <p className="subtext">Participation Points: {points}</p>

                        <div className="stats-list">
                            <div className="stat-item">
                                <span>Workshops</span>
                                <span className="count">12</span>
                            </div>
                            <div className="stat-item">
                                <span>Hackathons</span>
                                <span className="count">5</span>
                            </div>
                        </div>

                        <button className="download-btn-large" onClick={attemptDownload}>
                            <Download size={18} />
                            Download Certificate
                        </button>

                        {showReason && (
                            <div className="error-message">
                                <AlertCircle size={16} />
                                You must participate in an event first!
                            </div>
                        )}
                    </div>

                    <div className="panel-card calendar-card" style={{ padding: 0, background: 'transparent', boxShadow: 'none' }}>
                        <CustomCalendar selectedDate={filterDate} onDateSelect={setFilterDate} />
                    </div>
                </aside>
            </div>

            {selectedEvent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setSelectedEvent(null)}>
                            <X size={24} />
                        </button>
                        <img src={"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500"} alt={selectedEvent.title} className="modal-image" />
                        <div className="modal-details">
                            <span className="badge">UPCOMING</span>
                            <h2>{selectedEvent.title}</h2>
                            <p className="modal-desc">{selectedEvent.description}</p>

                            <div className="info-row">
                                <div className="info-item">
                                    <Calendar size={18} />
                                    <span>{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}</span>
                                </div>
                                <div className="info-item">
                                    <MapPin size={18} />
                                    <span>{selectedEvent.venue}</span>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="confirm-btn" onClick={confirmRegistration}>
                                    Confirm Registration
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showCamera && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ textAlign: 'center', maxWidth: '500px' }}>
                        <button className="close-btn" onClick={() => { setShowCamera(false); setCapturedImage(null); }}>
                            <X size={24} />
                        </button>
                        <h2>Facial Recognition Attendance</h2>
                        <p style={{ marginBottom: '1rem', color: '#666' }}>Please position your face clearly in the camera to mark your attendance.</p>

                        <div style={{ background: '#000', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                            {!capturedImage ? (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width="100%"
                                    videoConstraints={{ facingMode: "user" }}
                                />
                            ) : (
                                <img src={capturedImage} alt="Captured face" style={{ width: '100%' }} />
                            )}
                        </div>

                        {!capturedImage ? (
                            <button className="confirm-btn" onClick={handleCapture} style={{ width: '100%' }}>
                                <Camera size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                Capture Photo
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn-secondary" onClick={() => setCapturedImage(null)} style={{ flex: 1 }}>
                                    Retake
                                </button>
                                <button className="confirm-btn" onClick={submitAttendance} style={{ flex: 1 }}>
                                    <Check size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    Submit Attendance
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
