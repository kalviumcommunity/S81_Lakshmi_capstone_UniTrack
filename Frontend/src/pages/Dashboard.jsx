import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EventList from '../components/EventList';
import CreateEvent from '../components/CreateEvent';
import AttendanceQR from '../components/AttendanceQR';
import QRScanner from '../components/QRScanner';
import RecommendedEvents from '../components/RecommendedEvents';
import Leaderboard from '../components/Leaderboard';
import InterestSelector from '../components/InterestSelector';

const Dashboard = () => {
    const { user, login } = useAuth(); // Need login to update user state if interests change
    const [view, setView] = useState('dashboard');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showInterests, setShowInterests] = useState(false);

    if (!user) return <div>Please login first.</div>;

    const handleProjectQR = (event) => {
        setSelectedEvent(event);
        setView('attendanceQR');
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user.name}!</p>
                    {user.role === 'student' && (
                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ background: '#334155', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                                💎 {user.points || 0} Points
                            </span>
                            <button
                                onClick={() => setShowInterests(true)}
                                style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                            >
                                Edit Interests
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    {view !== 'dashboard' && <button onClick={() => setView('dashboard')}>Back to Dashboard</button>}
                </div>
            </div>

            {/* Interest Modal */}
            {showInterests && (
                <InterestSelector
                    currentInterests={user.interests}
                    onClose={() => setShowInterests(false)}
                    onSave={(newInterests) => {
                        // Optimistically update local user state
                        const updatedUser = { ...user, interests: newInterests };
                        login(updatedUser, localStorage.getItem('token'));
                    }}
                />
            )}

            {view === 'createEvent' && (
                <CreateEvent onEventCreated={() => setView('dashboard')} />
            )}

            {view === 'allEvents' && (
                <div className="card-container">
                    <h2 style={{ marginBottom: '1rem' }}>Upcoming Events</h2>
                    <EventList onProjectQR={handleProjectQR} />
                </div>
            )}

            {view === 'attendanceQR' && selectedEvent && (
                <AttendanceQR eventId={selectedEvent._id} eventTitle={selectedEvent.title} />
            )}

            {view === 'scanner' && (
                <QRScanner onScanSuccess={() => { }} />
            )}

            {view === 'dashboard' && (
                <>
                    {/* Recommendations specific to Students */}
                    {user.role === 'student' && <RecommendedEvents />}

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem', alignItems: 'start' }}>

                        {/* Main Actions Column */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {/* Student Actions */}
                            {user.role === 'student' && (
                                <>
                                    <div className="card">
                                        <h3>Browse Events</h3>
                                        <p>Register for workshops and fests.</p>
                                        <button style={{ marginTop: '1rem' }} onClick={() => setView('allEvents')}>Browse Now</button>
                                    </div>
                                    <div className="card">
                                        <h3>Mark Attendance</h3>
                                        <p>Scan QR code present at event.</p>
                                        <button style={{ marginTop: '1rem' }} onClick={() => setView('scanner')}>Scan QR</button>
                                    </div>
                                </>
                            )}

                            {/* Faculty Actions */}
                            {user.role === 'faculty' && (
                                <>
                                    <div className="card">
                                        <h3>Create Event</h3>
                                        <p>Host a new workshop or seminar.</p>
                                        <button style={{ marginTop: '1rem' }} onClick={() => setView('createEvent')}>Create New</button>
                                    </div>
                                    <div className="card">
                                        <h3>Manage Events</h3>
                                        <p>View events and project QR codes.</p>
                                        <button style={{ marginTop: '1rem' }} onClick={() => setView('allEvents')}>View Events</button>
                                    </div>
                                </>
                            )}

                            {/* Admin Actions */}
                            {user.role === 'admin' && (
                                <>
                                    <div className="card">
                                        <h3>Manage Events</h3>
                                        <p>Oversee all university events.</p>
                                        <button style={{ marginTop: '1rem' }} onClick={() => setView('allEvents')}>Manage</button>
                                    </div>
                                    <div className="card">
                                        <h3>Create Event</h3>
                                        <p>Admin can also create events.</p>
                                        <button style={{ marginTop: '1rem' }} onClick={() => setView('createEvent')}>Create</button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar Column (Leaderboard) */}
                        <div>
                            <Leaderboard />
                        </div>

                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
