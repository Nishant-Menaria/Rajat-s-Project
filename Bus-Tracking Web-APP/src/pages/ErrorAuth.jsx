// ErrorPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  // Redirect after 3 seconds to the login page or home page
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Or navigate to '/' if you want to go to the homepage
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timeout when component unmounts
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-red-600">Unauthorized Access</h2>
        <p className="mt-4 text-gray-500">You are not authorized to view this page. Redirecting...</p>
      </div>
    </div>
  );
};

export default ErrorPage;
