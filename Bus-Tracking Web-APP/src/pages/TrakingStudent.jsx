// pages/TrackingStudent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrackingStudent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa] p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Live Bus Tracking</h2>
          <p className="text-gray-500 text-sm">Simulating the current location of the school bus...</p>
        </div>

        {/* Simulated Map Section (Video styled as a map view) */}
        <div className="relative overflow-hidden rounded-md border border-gray-300 shadow-md">
          <video
            src="/Tracking.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[450px] object-cover pointer-events-none"
            style={{ borderRadius: '0.5rem' }}
          />
          <div className="absolute top-4 left-4 bg-white px-4 py-2 text-sm font-medium rounded-md shadow text-gray-700">
            Bus #14 | Route 5A
          </div>
          <div className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 text-xs rounded-full shadow animate-pulse">
            On the way
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingStudent;
