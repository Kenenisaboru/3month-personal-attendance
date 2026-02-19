import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, Calendar, Clock } from 'lucide-react';
import '../App.css';

const Navbar = () => {
    const { user, signOut } = useAuth();
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="flex items-center">
                    <span className="nav-brand">DevTrack</span>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">
                            <Home size={18} /> Dashboard
                        </Link>
                        <Link to="/attendance" className="nav-link">
                            <Calendar size={18} /> Attendance
                        </Link>
                        <Link to="/activity" className="nav-link">
                            <Clock size={18} /> Activity
                        </Link>
                    </div>
                </div>
                <div className="flex items-center" style={{ gap: '1rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.email}</span>
                    <button onClick={signOut} className="btn btn-logout flex items-center gap-2">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
