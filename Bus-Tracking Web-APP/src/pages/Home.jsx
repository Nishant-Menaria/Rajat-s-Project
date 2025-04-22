// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to the School Bus Tracker</h1>
        <p className="text-lg text-gray-600 mb-4">
          Track your School bus in real-time and never miss it again! Whether you're a student or a driver, stay connected.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Simply log in to your dashboard to get started.
        </p>
      </header>

      <div className="flex justify-center gap-8">
        <div className="bg-white shadow-xl rounded-lg p-8 text-center w-64">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Track the location of your school bus, get real-time updates, and never be late again.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
          >
            Student Login
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8 text-center w-64">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Driver Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Share your live location, update your route, and ensure your passengers are informed.
          </p>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-md text-lg hover:bg-green-700 transition"
          >
            Driver Login
          </Link>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        <p>Developed By Rajat Menaria And Pratibha Sharma</p>
        <p>&copy; 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
