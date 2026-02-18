import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Activity Log</h1>

            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Hours</label>
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            step="0.5"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="Freelance">Freelance</option>
                            <option value="Study">Study</option>
                            <option value="Personal Project">Personal Project</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Activity
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
                            <span className="text-sm text-gray-500">{activity.date}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{activity.description}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className={`px-2 py-1 rounded-full ${activity.category === 'Freelance' ? 'bg-purple-100 text-purple-800' :
                                    activity.category === 'Study' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                }`}>
                                {activity.category}
                            </span>
                            <span className="font-medium text-gray-700">{activity.hours} hrs</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;
