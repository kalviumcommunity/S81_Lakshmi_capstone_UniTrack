
import React, { useState } from 'react';
import { Calendar, Search, MapPin, Download, AlertCircle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

const mockEvents = [
    {
        id: 1,
        title: "AI & Future Tech Workshop",
        date: "Oct 26, 2024 • 10:00 AM",
        location: "Auditorium B",
        seats: 100,
        seatsLeft: 25,
        description: "Deep dive into the latest AI trends, focusing heavily on hands-on coding and real-world applications.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 2,
        title: "Annual Cultural Fest 2024",
        date: "Nov 15, 2024 • 10:00 AM",
        location: "University Grounds",
        seats: 500,
        seatsLeft: 158,
        description: "The biggest university event of the year featuring music, dance, and drama performances from various colleges.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 3,
        title: "Data Science Hackathon",
        date: "Nov 15, 2024 • 4:00 AM",
        location: "Innovation Hub",
        seats: 30,
        seatsLeft: 5,
        description: "24-hour hackathon to solve real-world data problems. Prizes worth $5000 up for grabs!",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500"
    }
];

const StudentDashboard = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [hasParticipated, setHasParticipated] = useState(false); // Mock participation state
    const [showReason, setShowReason] = useState(false);

    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
    };

    const attemptDownload = () => {
        if (hasParticipated) {
            alert("Certificate downloading...");
        } else {
            setShowReason(true);
            setTimeout(() => setShowReason(false), 5000);
        }
    };

    return (
        <div className="dashboard-content">
            <Navbar name="Lakshmi" avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

            <div className="welcome-banner">
                <div>
                    <h1>Welcome back, Lakshmi! 👋</h1>
                    <p>Here's what's happening with your projects today.</p>
                </div>
                <button
                    className="toggle-participation-btn"
                    onClick={() => setHasParticipated(!hasParticipated)}
                >
                    {hasParticipated ? "Participated (Mock)" : "Not Participated (Mock)"}
                </button>
            </div>

            <div className="grid-layout">
                <div className="main-feed">
                    <div className="section-header">
                        <h2>Upcoming Events</h2>
                        <div className="search-bar">
                            <Search size={18} />
                            <input type="text" placeholder="Search events..." />
                        </div>
                    </div>

                    <div className="cards-grid">
                        {mockEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onRegister={() => handleRegisterClick(event)}
                            />
                        ))}
                    </div>
                </div>

                <aside className="right-panel">
                    <div className="panel-card progress-card">
                        <h3>My Progress</h3>
                        <div className="progress-circle-large">
                            <span>75%</span>
                        </div>
                        <p className="subtext">Participation Points: 120</p>

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

                    <div className="panel-card calendar-card">
                        <h3>Calendar</h3>
                        <div className="mini-calendar">
                            {/* Simplified calendar mockup */}
                            <div className="calendar-grid">
                                {Array.from({ length: 30 }, (_, i) => (
                                    <div key={i} className={`day ${i === 15 ? 'active' : ''}`}>{i + 1}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setSelectedEvent(null)}>
                            <X size={24} />
                        </button>
                        <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
                        <div className="modal-details">
                            <span className="badge">UPCOMING</span>
                            <h2>{selectedEvent.title}</h2>
                            <p className="modal-desc">{selectedEvent.description}</p>

                            <div className="info-row">
                                <div className="info-item">
                                    <Calendar size={18} />
                                    <span>{selectedEvent.date}</span>
                                </div>
                                <div className="info-item">
                                    <MapPin size={18} />
                                    <span>{selectedEvent.location}</span>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="confirm-btn" onClick={() => {
                                    alert(`Registered for ${selectedEvent.title}!`);
                                    setSelectedEvent(null);
                                }}>Confirm Registration</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
