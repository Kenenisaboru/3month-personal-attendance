import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../App.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { user } = useAuth();
    const [attendance, setAttendance] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/api/attendance?user_id=${user.id}`).then(res => setAttendance(res.data));
            axios.get(`http://localhost:5000/api/activities?user_id=${user.id}`).then(res => setActivities(res.data));
        }
    }, [user]);

    const totalPresent = attendance.filter(a => a.status === 'Present').length;
    const totalHours = activities.reduce((acc, curr) => acc + Number(curr.hours), 0);

    const chartData = {
        labels: ['Present Days', 'Total Activities'],
        datasets: [
            {
                label: 'Count',
                data: [totalPresent, activities.length],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="container">
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard</h1>

            <div className="grid grid-cols-3 mb-8">
                <div className="card blue">
                    <h3 className="card-title">Total Days Present</h3>
                    <p className="card-value">{totalPresent} Days</p>
                </div>
                <div className="card green">
                    <h3 className="card-title">Total Hours Worked</h3>
                    <p className="card-value">{totalHours} Hours</p>
                </div>
                <div className="card purple">
                    <h3 className="card-title">Recent Activity</h3>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        {activities.length > 0 ? activities[0].title : 'No recent activity'}
                    </p>
                </div>
            </div>

            <div className="card">
                <h2 className="text-xl font-bold mb-4">Overview</h2>
                <div style={{ height: '300px' }}>
                    <Bar options={{ responsive: true, maintainAspectRatio: false }} data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
