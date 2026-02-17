import { useState } from 'react'
import './App.css'

function App() {
  const [events] = useState([
    {
      id: 1,
      title: "AI & Future Tech Workshop",
      date: "Oct 26, 2024 • 10:00 AM",
      location: "Auditorium B",
      seats: 100,
      seatsLeft: 25,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 2,
      title: "Annual Cultural Fest 2024",
      date: "Nov 15, 2024 • 10:00 AM",
      location: "University Grounds",
      seats: 500,
      seatsLeft: 158,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 3,
      title: "Data Science Hackathon",
      date: "Nov 15, 2024 • 4:00 AM",
      location: "Innovation Hub",
      seats: 30,
      seatsLeft: 5,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500"
    }
  ])

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-title">UniTrack</div>
        <div className="nav-actions">
          <span className="nav-item">Welcome back, Aisha Rahman!</span>
          <span className="nav-icon">🔔</span>
          <div className="avatar" style={{ background: 'url("https://i.pravatar.cc/150?u=a042581f4e29026024d") center/cover' }}></div>
        </div>
      </nav>

      <div className="grid-layout">
        {/* Main Content */}
        <div className="events-container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="cards-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
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
                    <span>{Math.round((event.seatsLeft / event.seats) * 100)}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(event.seatsLeft / event.seats) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn-register">Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
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
      </div>
    </div>
  )
}

export default App
