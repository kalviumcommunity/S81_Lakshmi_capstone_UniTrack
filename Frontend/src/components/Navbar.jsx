import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            background: 'var(--bg-card)',
            alignItems: 'center',
            marginBottom: '2rem'
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                <Link to="/" style={{ color: 'var(--primary)' }}>UniTrack</Link>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span style={{ color: 'var(--text-muted)' }}>{user.name} ({user.role})</span>
                        <button onClick={logout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
