import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleManualRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data, data.token);
                navigate(`/${data.role}`);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        try {
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                    role, // Pass selected role when registering via Google
                    googleUser: {
                        email: decoded.email,
                        name: decoded.name,
                        sub: decoded.sub
                    }
                }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data, data.token);
                navigate(`/${data.role}`);
            } else {
                setError(data.message || 'Google Sign Up failed');
            }
        } catch (err) {
            setError('Network error during Google sign up');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Register to UniTrack</h2>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleManualRegister}>
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>

                <div className="divider">or continue with</div>

                <div className="google-btn-wrapper">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            setError('Google Sign Up failed');
                        }}
                    />
                </div>

                <p className="redirect-text">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
