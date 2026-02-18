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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Days Present</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalPresent} Days</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Hours Worked</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalHours} Hours</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Recent Activity</h3>
                    <p className="text-gray-600 mt-2 text-sm">
                        {activities.length > 0 ? activities[0].title : 'No recent activity'}
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Overview</h2>
                <div className="h-64">
                    <Bar options={{ responsive: true, maintainAspectRatio: false }} data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
