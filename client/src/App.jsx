import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "Event Management",
      icon: "📅",
      desc: "Create, edit, and categorize university events seamlessly."
    },
    {
      title: "Smart Attendance",
      icon: "📱",
      desc: "QR Code and Face Recognition for instant attendance marking."
    },
    {
      title: "Real-time Analytics",
      icon: "📊",
      desc: "Track participation trends and generate automated reports."
    },
    {
      title: "Leaderboard & Rewards",
      icon: "🏆",
      desc: "Gamified participation with points and student rankings."
    }
  ]

  return (
    <div className="app-container">
      <div className="logo-container">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>UniTrack</h1>
      <p className="subtitle">
        The Next-Gen University Event Management & Attendance System
      </p>

      <div className="card">
        <button onClick={() => setActiveFeature((prev) => (prev + 1) % features.length)}>
          Explore Feature: {features[activeFeature].title}
        </button>
        <p style={{ marginTop: '1rem', color: '#ccc' }}>
          {features[activeFeature].desc}
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            style={{
              borderColor: activeFeature === index ? '#646cff' : 'rgba(255, 255, 255, 0.05)',
              transform: activeFeature === index ? 'translateY(-5px)' : 'none'
            }}
            onClick={() => setActiveFeature(index)}
          >
            <span className="feature-icon">{feature.icon}</span>
            <div className="feature-title">{feature.title}</div>
            <div className="feature-desc">{feature.desc}</div>
          </div>
        ))}
      </div>

      <p className="read-the-docs">
        Click on the logos to learn more about the tech stack
      </p>
    </div>
  )
}

export default App
