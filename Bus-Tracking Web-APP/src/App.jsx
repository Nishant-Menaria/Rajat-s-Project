import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import for BrowserRouter
import Login from './pages/Login';
import ParentDashboard from './pages/parentDashboard';
import DriverDashboard from './pages/DriverDashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import ManageDrivers from './pages/ManageDrivers';
import ManageStudents from './pages/ManageStudents';
import ErrorPage from './pages/ErrorPage';
import ErrorAuth from './pages/ErrorAuth';
import Register from './pages/ParentSignup';
import AdminLogin from './pages/AdminLogin'
import TrackingStudent from './pages/TrakingStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Protected Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route
          path="/admin/dashboard"
          element={
              <AdminDashboard />
          }
        />
        <Route
          path="/admin/students"
          element={
              <ManageStudents />
          }
        />
        <Route
          path="/admin/drivers"
          element={
              <ManageDrivers />
          }
        />

        {/* Protected Student Route */}
        <Route
          path="/parent/dashboard"
          element={
              <ParentDashboard />
          }
        />

        {/* Protected Driver Route */}
        <Route
          path="/driver/dashboard"
          element={
              <DriverDashboard />
          }
        />
        <Route path='/error' element={<ErrorAuth/>} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/track-student" element={<TrackingStudent />} />
        
      </Routes>
    </Router>
  );
}

export default App;
