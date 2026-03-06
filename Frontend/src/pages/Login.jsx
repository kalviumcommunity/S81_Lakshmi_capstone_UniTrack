import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/login' : '/register';

        try {
            const url = `http://localhost:5000/api/auth${endpoint}`;
            const res = await axios.post(url, formData);

            if (res.data.token) {
                login(res.data.user, res.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }} className="card fade-in">
            <h2 style={{ marginBottom: '1.5rem' }}>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {!isLogin && (
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.6em 1.2em',
                            marginBottom: '1em',
                            borderRadius: '8px',
                            backgroundColor: '#334155',
                            color: 'white',
                            border: '1px solid #475569'
                        }}
                    >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                    </select>
                )}

                <button type="submit" style={{ width: '100%' }}>
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
            </form>

            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span
                    style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Register' : 'Login'}
                </span>
            </p>
        </div>
    );
};

export default Login;
