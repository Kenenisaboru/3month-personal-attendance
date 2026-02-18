import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const ActivityLog = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hours, setHours] = useState('');
    const [category, setCategory] = useState('Personal Project');

    const fetchActivities = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/activities?user_id=${user.id}`);
            setActivities(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/activities', {
                user_id: user.id,
                date: new Date().toISOString().split('T')[0],
                title,
                description,
                hours: parseFloat(hours),
                category
            });
            setTitle('');
            setDescription('');
            setHours('');
            fetchActivities();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) fetchActivities();
    }, [user]);

    return (
        <div className="container">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Activity Log</h1>

            <form onSubmit={handleSubmit} className="card mb-8">
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea"
                    />
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1" style={{ flex: 1 }}>
                        <label className="form-label">Hours</label>
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className="form-input"
                            step="0.5"
                            required
                        />
                    </div>
                    <div className="flex-1" style={{ flex: 1 }}>
                        <label className="form-label">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-select"
                        >
                            <option value="Freelance">Freelance</option>
                            <option value="Study">Study</option>
                            <option value="Personal Project">Personal Project</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Activity
                </button>
            </form>

            <div className="grid grid-cols-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="card">
                        <div className="flex justify-between items-center mb-4">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{activity.title}</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activity.date}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{activity.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="badge" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>
                                {activity.category}
                            </span>
                            <span style={{ fontWeight: '500' }}>{activity.hours} hrs</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;
