// pages/AdminDashboard.jsx
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBus, FaRegChartBar } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 200,
    totalDrivers: 15,
    totalBuses: 10,
  });

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Students Joined',
        data: [30, 40, 50, 60, 70, 80, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Drivers Joined',
        data: [2, 4, 6, 8, 10, 12, 15],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      }
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Admin Dashboard Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Logout
        </Link>
      </header>

      {/* Stats Overview */}
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

      {/* Graph Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student & Driver Growth</h2>
        <Line data={data} />
      </div>

      {/* Manage Students and Drivers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Students</h2>
          <p className="text-gray-600 mb-4">View, edit, or remove students from the database.</p>
          <Link
            to="/admin/students"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Manage Students
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Drivers</h2>
          <p className="text-gray-600 mb-4">View, edit, or remove drivers from the database.</p>
          <Link
            to="/admin/drivers"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Manage Drivers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
