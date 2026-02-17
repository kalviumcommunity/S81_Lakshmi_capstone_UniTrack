
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import EventCard from './components/EventCard'
import Sidebar from './components/Sidebar'

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
      <Navbar
        name="Lakshmi"
        avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />

      <div className="grid-layout">
        {/* Main Content */}
        <div className="events-container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="cards-grid">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}

export default App
