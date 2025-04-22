// pages/Login.jsx
import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [userType, setUserType] = useState('student'); // Default: student
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please enter both username and password');
    } else {
      setError('');
      // Proceed with login based on user type (student/driver)
      console.log(`Logging in as ${userType} with ${username} and ${password}`);
      // Redirect or handle successful login
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
      <div className="bg-opacity-50 bg-gray-800 min-h-screen flex items-center justify-center py-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-8">
          <h2 className="text-4xl font-semibold text-center text-gray-800">Login</h2>
          <p className="text-center text-gray-500">Please select your user type and enter your details.</p>

          {error && (
            <div className="bg-red-100 text-red-800 text-sm p-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="relative">
              <label htmlFor="userType" className="block text-gray-700">Select User Type</label>
              <select
                id="userType"
                className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-400 transition-all"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            {/* Username Input (Roll number for student, Driver ID for driver) */}
            <div className="relative">
              <label htmlFor="username" className="block text-gray-700">
                {userType === 'student' ? 'Roll Number' : 'Driver ID'}
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-400 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={userType === 'student' ? 'Enter your roll number' : 'Enter your driver ID'}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-400 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me & Forgot Password Links */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-600">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-indigo-600 text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md text-lg hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
