import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div className="animate-fade-in" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #4f46e5, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Welcome to UniTrack
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    The ultimate platform for university event management, student attendance, and campus engagement.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/login">
                        <button style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>Get Started</button>
                    </Link>
                    <a href="#features">
                        <button style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', background: 'transparent', border: '1px solid var(--primary)' }}>Learn More</button>
                    </a>
                </div>
            </div>

            <div id="features" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                <div className="card">
                    <h3 style={{ color: 'var(--accent)' }}>Event Management</h3>
                    <p>Seamlessly organize and manage workshops, fests, and seminars with ease.</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--accent)' }}>Smart Attendance</h3>
                    <p>QR code and face recognition support for hassle-free attendance tracking.</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--accent)' }}>Real-time Analytics</h3>
                    <p>Gain insights into participation trends and student engagement.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
