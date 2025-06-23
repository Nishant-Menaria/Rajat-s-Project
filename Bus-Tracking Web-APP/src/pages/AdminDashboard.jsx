// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUsers, FaBus, FaRegChartBar, FaMapMarkedAlt } from "react-icons/fa";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDrivers: 0,
    totalBuses: 0,
  });

  // Fetch real data from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admins/stats", {
          withCredentials: true,
        });
        setStats(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const chartData = {
    labels: ['Students', 'Drivers'],
    datasets: [
      {
        label: 'Total Count',
        data: [stats.totalStudents, stats.totalDrivers],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Student and Driver Count',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-300"
        >
          Logout
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Total Students</h3>
            <p className="text-2xl text-gray-900">{stats.totalStudents}</p>
          </div>
          <FaUsers size={40} className="text-blue-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Total Drivers</h3>
            <p className="text-2xl text-gray-900">{stats.totalDrivers}</p>
          </div>
          <FaBus size={40} className="text-green-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Total Buses</h3>
            <p className="text-2xl text-gray-900">{stats.totalBuses}</p>
          </div>
          <FaRegChartBar size={40} className="text-purple-500" />
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Statistics</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Manage Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Students</h2>
          <p className="text-gray-600 mb-4">View, edit, or remove students from the database.</p>
          <Link
            to="/admin/students"
            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Manage Students
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Drivers</h2>
          <p className="text-gray-600 mb-4">View, edit, or remove drivers from the database.</p>
          <Link
            to="/admin/drivers"
            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Manage Drivers
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Track Buses</h2>
          <p className="text-gray-600 mb-4">Redirects to simulated tracking component.</p>
          <Link
            to="/track-student"
            className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Track Buses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
