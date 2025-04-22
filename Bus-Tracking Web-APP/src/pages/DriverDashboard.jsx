// pages/DriverDashboard.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";

const DriverDashboard = () => {
  const [location, setLocation] = useState(null);

  const sendLocation = (lat, lng) => {
    axios.post(
      'http://localhost:5000/api/update-location',
      { lat, lng },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  };

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
        sendLocation(latitude, longitude);
      });
    };

    getLocation();
    const interval = setInterval(getLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Driver Dashboard</h2>
      {location ? (
        <p className="text-lg text-gray-700">
          Sharing Location: {location.lat}, {location.lng}
        </p>
      ) : (
        <p className="text-lg text-gray-500">Getting location...</p>
      )}
    </div>
  );
};

export default DriverDashboard;
