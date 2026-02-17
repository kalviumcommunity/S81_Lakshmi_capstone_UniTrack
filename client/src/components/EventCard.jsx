
import React from 'react';

const EventCard = ({ event, onRegister }) => {
    const progressPercentage = Math.round((event.seatsLeft / event.seats) * 100);

    return (
        <div className="event-card">
            <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="event-badge">Upcoming</div>
            </div>
            <h3 className="event-title">{event.title}</h3>
            <div className="event-info">
                📅 {event.date}
            </div>
            <div className="event-info">
                📍 {event.location}
            </div>

            <div className="progress-section">
                <div className="seats-text">
                    <span>Seats Left: {event.seatsLeft}/{event.seats}</span>
                    <span>{progressPercentage}%</span>
                </div>
                <div className="progress-bar-bg">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${(event.seatsLeft / event.seats) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="card-actions">
                <button className="btn-register" onClick={onRegister}>Register</button>
            </div>
        </div>
    );
};

export default EventCard;
