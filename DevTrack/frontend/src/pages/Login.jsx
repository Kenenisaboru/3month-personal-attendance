import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signIn, signUp, user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { error: signInError } = await signIn(email, password);
            if (signInError) throw signInError;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);
        setLoading(true);
        try {
            const { error: signUpError } = await signUp(email, password, name);
            if (signUpError) throw signUpError;
            setSuccessMsg('✅ Account created! You can now sign in.');
            setMode('signin');
            setPassword('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                background: 'white',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}>
                {/* Logo / Title */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px', height: '60px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '1rem',
                        margin: '0 auto 1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.75rem'
                    }}>📊</div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1a1a2e', margin: 0 }}>DevTrack</h1>
                    <p style={{ color: '#6b7280', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>Your 3-Month Progress Tracker</p>
                </div>

                {/* Tab Switcher */}
                <div style={{
                    display: 'flex',
                    background: '#f3f4f6',
                    borderRadius: '0.75rem',
                    padding: '4px',
                    marginBottom: '1.75rem'
                }}>
                    <button
                        onClick={() => { setMode('signin'); setError(null); setSuccessMsg(null); }}
                        style={{
                            flex: 1, padding: '0.6rem',
                            borderRadius: '0.6rem', border: 'none',
                            cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            background: mode === 'signin' ? 'white' : 'transparent',
                            color: mode === 'signin' ? '#4f46e5' : '#6b7280',
                            boxShadow: mode === 'signin' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                        }}
                    >Sign In</button>
                    <button
                        onClick={() => { setMode('signup'); setError(null); setSuccessMsg(null); }}
                        style={{
                            flex: 1, padding: '0.6rem',
                            borderRadius: '0.6rem', border: 'none',
                            cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            background: mode === 'signup' ? 'white' : 'transparent',
                            color: mode === 'signup' ? '#4f46e5' : '#6b7280',
                            boxShadow: mode === 'signup' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                        }}
                    >Create Account</button>
                </div>

                {/* Success Message */}
                {successMsg && (
                    <div style={{
                        background: '#d1fae5', color: '#065f46',
                        borderRadius: '0.5rem', padding: '0.75rem 1rem',
                        marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '500'
                    }}>{successMsg}</div>
                )}

                {/* SIGN IN FORM */}
                {mode === 'signin' && (
                    <form onSubmit={handleSignIn}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: '#374151' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.65rem 0.9rem',
                                    border: '1.5px solid #e5e7eb', borderRadius: '0.6rem',
                                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#4f46e5'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: '#374151' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.65rem 0.9rem',
                                    border: '1.5px solid #e5e7eb', borderRadius: '0.6rem',
                                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#4f46e5'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                        {error && (
                            <div style={{ background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                                ⚠️ {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '0.75rem',
                                background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: 'white', border: 'none', borderRadius: '0.75rem',
                                fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In →'}
                        </button>
                        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                            No account?{' '}
                            <span onClick={() => setMode('signup')} style={{ color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }}>
                                Create one free
                            </span>
                        </p>
                    </form>
                )}

                {/* SIGN UP FORM */}
                {mode === 'signup' && (
                    <form onSubmit={handleSignUp}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: '#374151' }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.65rem 0.9rem',
                                    border: '1.5px solid #e5e7eb', borderRadius: '0.6rem',
                                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#4f46e5'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: '#374151' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.65rem 0.9rem',
                                    border: '1.5px solid #e5e7eb', borderRadius: '0.6rem',
                                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#4f46e5'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: '#374151' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="Min. 6 characters"
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.65rem 0.9rem',
                                    border: '1.5px solid #e5e7eb', borderRadius: '0.6rem',
                                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={e => e.target.style.borderColor = '#4f46e5'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>
                        {error && (
                            <div style={{ background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                                ⚠️ {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '0.75rem',
                                background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #10b981, #059669)',
                                color: 'white', border: 'none', borderRadius: '0.75rem',
                                fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                        >
                            {loading ? 'Creating account...' : 'Create My Account →'}
                        </button>
                        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                            Already have an account?{' '}
                            <span onClick={() => setMode('signin')} style={{ color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }}>
                                Sign in
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
