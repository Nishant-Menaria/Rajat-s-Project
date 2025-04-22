// pages/StudentDashboard.jsx
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import axios from 'axios';

const containerStyle = { width: '100%', height: '100vh' };
const defaultCenter = { lat: 26.9124, lng: 75.7873 }; // Jaipur as default

const StudentDashboard = () => {
  const [busLocation, setBusLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await axios.get('http://localhost:5000/api/bus-location');
      setBusLocation(res.data);
    };
    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={busLocation || defaultCenter} zoom={15}>
      {busLocation && <Marker position={busLocation} />}
    </GoogleMap>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Loading Map...</p>
    </div>
  );
};

export default StudentDashboard;
