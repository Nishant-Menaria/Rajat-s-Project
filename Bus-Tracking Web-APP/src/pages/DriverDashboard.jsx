import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [busNumber, setBusNumber] = useState('');
  const navigate = useNavigate();

  // Decode JWT to get driver busNumber
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setBusNumber(decoded.busNumber);
    }
  }, []);

  // Fetch students by bus number
  useEffect(() => {
    const fetchStudents = async () => {
      const storedBusNumber = localStorage.getItem('busNumber');
      setBusNumber(storedBusNumber);
      if (!storedBusNumber) return;

      try {
        const res = await axios.get(`http://localhost:8000/drivers/students/${storedBusNumber}`);
        setStudents(res.data.students);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, []);

  const markAttendance = async (studentId, status) => {
    try {
      await axios.post(`http://localhost:8000/drivers/attendance`, {
        studentId,
        status,
      });
      setAttendance((prev) => ({ ...prev, [studentId]: status }));
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('busNumber');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <p className="mb-4 text-gray-600">
          Bus Number: <strong>{busNumber || 'Loading...'}</strong>
        </p>

        {students.length === 0 ? (
          <p>No students assigned to this bus.</p>
        ) : (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Roll Number</th>
                <th className="p-2 border">Bus Stop</th>
                <th className="p-2 border">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="text-center">
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.rollNumber}</td>
                  <td className="p-2 border">{student.stop}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      className={`px-3 py-1 rounded text-white bg-green-600 ${
                        attendance[student._id] === 'yes' ? 'bg-green-600' : 'bg-gray-400'
                      }`}
                      onClick={() => markAttendance(student._id, 'yes')}
                    >
                      Yes
                    </button>
                    <button
                      className={`px-3 py-1 rounded text-white bg-red-600 ${
                        attendance[student._id] === 'no' ? 'bg-red-600' : 'bg-gray-400'
                      }`}
                      onClick={() => markAttendance(student._id, 'no')}
                    >
                      No
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
