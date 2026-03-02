import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Auth.css'; // Optional: will create this for basic styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleManualLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data, data.token);
                navigate(`/${data.role}`);
            } else {
                setError(data.message || 'Login failed');
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
                    // Sending decoded profile for dev without valid GOOGLE_CLIENT_ID on server
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
                setError(data.message || 'Google Login failed');
            }
        } catch (err) {
            setError('Network error during Google login');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login to UniTrack</h2>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleManualLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-btn">Sign In</button>
                </form>

                <div className="divider">or</div>

                <div className="google-btn-wrapper">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            setError('Google Sign In failed');
                        }}
                    />
                </div>

                <p className="redirect-text">
                    Don't have an account? <Link to="/register">Sign Up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
