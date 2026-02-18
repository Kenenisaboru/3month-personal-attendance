import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { signIn, user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error: signInError } = await signIn(email, password);
            if (signInError) throw signInError;
            // navigate('/'); // Wait for auth state change
        } catch (err) {
            setError(err.message);
        }
    };

    // Auth state listener in App wraps this, but if sign in is successful, the protected route will auto-redirect or allow access?
    // Actually, Login page is public. If user is logged in, they should optionally be redirected.
    // I'll leave the manual navigate but it might race with the auth context update.
    // Better to rely on the effect in App or just navigate.

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
            <div className="card" style={{ width: '100%', maxWidth: '24rem' }}>
                <h2 className="text-center" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Sign in</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            required
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            required
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Sign within
                    </button>
                    {error && <div style={{ color: 'var(--danger-color)', marginTop: '1rem', fontSize: '0.875rem' }}>{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login;
