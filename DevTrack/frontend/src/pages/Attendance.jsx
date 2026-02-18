import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Attendance = () => {
    const { user } = useAuth();
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('Present');

    // ... logic same as before ... 
    const fetchAttendance = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/attendance?user_id=${user.id}`);
            setAttendance(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString();
        try {
            await axios.post('http://localhost:5000/api/attendance', {
                user_id: user.id,
                date: today,
                status,
                check_in: time
            });
            fetchAttendance();
        } catch (error) {
            alert(error.response?.data?.message || 'Error checking in');
        }
    };

    const handleCheckOut = async () => {
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString();
        try {
            await axios.post('http://localhost:5000/api/attendance', {
                user_id: user.id,
                date: today,
                check_out: time
            });
            fetchAttendance();
        } catch (error) {
            alert(error.response?.data?.message || 'Error checking out');
        }
    };

    useEffect(() => {
        if (user) fetchAttendance();
    }, [user]);

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Attendance Log</h1>

            <div className="card mb-8">
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Mark Attendance for Today ({new Date().toLocaleDateString()})</h2>
                <div className="flex gap-4">
                    <button
                        onClick={handleCheckIn}
                        className="btn btn-success"
                    >
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        className="btn btn-primary"
                    >
                        Check Out
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>
                                    <span className={`badge ${item.status === 'Present' ? 'badge-present' : 'badge-absent'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>{item.check_in}</td>
                                <td>{item.check_out}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
