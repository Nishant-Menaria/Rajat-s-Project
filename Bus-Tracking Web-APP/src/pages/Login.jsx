import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both email/ID and password');
      return;
    }

    try {
      const endpoint =
        userType === 'parent'
          ? 'http://localhost:8000/parents/login'
          : 'http://localhost:8000/drivers/login';

      const payload =
        userType === 'parent'
          ? { email: username, password }
          : { driverId: username, password };

      const res = await axios.post(endpoint, payload);

      const { token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);

      if (userType === 'parent') {
        navigate('/parent/dashboard');
      } else {
        navigate('/driver/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* <div>
        <img src="/logo.png" className='w-5' alt="" />
      </div> */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Type */}
          <div>
            <label className="block mb-1 text-gray-700">Select Role</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="parent">Parent</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {/* Email/ID */}
          <div>
            <label className="block mb-1 text-gray-700">
              {userType === 'parent' ? 'Email' : 'Driver ID'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={userType === 'parent' ? 'Enter your email' : 'Enter your Driver ID'}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
