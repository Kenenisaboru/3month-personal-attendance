import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns'; // I can't assume date-fns is installed, so I'll use native Date.
// But native date handling is tough. I will just use basic ISO strings.

const Attendance = () => {
    const { user } = useAuth();
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('Present');

    const fetchAttendance = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/attendance?user_id=${user.id}`);
            setAttendance(data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Attendance Log</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Mark Attendance for Today ({new Date().toLocaleDateString()})</h2>
                <div className="flex gap-4">
                    <button
                        onClick={handleCheckIn}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Check Out
                    </button>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {attendance.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.check_in}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.check_out}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
