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
            setError('Network error: Please ensure the backend server is running.');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const decoded = credentialResponse.isMock ? credentialResponse.profileObj : jwtDecode(credentialResponse.credential);
        try {
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: credentialResponse.credential,
                    isLogin: true,
                    // Sending decoded profile for dev without valid GOOGLE_CLIENT_ID on server
                    googleUser: {
                        email: decoded.email,
                        name: decoded.name,
                        sub: decoded.sub,
                        picture: decoded.picture
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
            setError('Network error: Please ensure the backend server is running.');
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
                    {(!import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID === 'your_google_client_id_here') ? (
                        <button
                            type="button"
                            className="auth-btn"
                            style={{ backgroundColor: '#db4437', marginTop: 0 }}
                            onClick={() => handleGoogleSuccess({
                                isMock: true,
                                profileObj: {
                                    email: 'mockuser@gmail.com',
                                    name: 'Mock User',
                                    sub: 'mock_google_id_123',
                                    picture: 'https://i.pravatar.cc/150?u=mockuser'
                                },
                                credential: 'mock_token'
                            })}
                        >
                            Sign In with Google (Dev Mode)
                        </button>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                                setError('Google Sign In failed');
                            }}
                        />
                    )}
                </div>

                <p className="redirect-text">
                    Don't have an account? <Link to="/register">Sign Up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
