import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const ParentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newRollNumber, setNewRollNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let parentId = '';

  if (token) {
    const decoded = jwtDecode(token);
    parentId = decoded.id;
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/parents/${parentId}`);
        setStudents(response.data.students);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, [parentId]);

  const handleAddStudent = async () => {
    try {
      await axios.post(`http://localhost:8000/parents/${parentId}/add-student`, {
        rollNumber: newRollNumber,
      });
      setNewRollNumber('');
      window.location.reload();
    } catch (err) {
      setError('Failed to add student');
      console.error(err);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8000/parents/${parentId}/${studentId}`);
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (err) {
      console.error('Failed to delete student', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const teachers = [
    { name: "Mrs. Asha Verma", subject: "Mathematics", email: "asha.verma@school.edu", phone: "9876543210" },
    { name: "Mr. Ravi Sharma", subject: "Science", email: "ravi.sharma@school.edu", phone: "9123456789" },
    { name: "Ms. Neha Gupta", subject: "English", email: "neha.gupta@school.edu", phone: "9988776655" },
  ];

  const busStaff = [
    { role: "Bus Driver", name: "Mr. Suresh Kumar", phone: "9876512345" },
    { role: "Conductor", name: "Mr. Ajay Singh", phone: "9123459876" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

        <h2 className="text-3xl font-semibold mb-4">Parent Dashboard</h2>

        {/* Add Student */}
        <div className="flex mb-4 gap-4">
          <input
            type="text"
            className="border p-2 flex-1 rounded"
            placeholder="Enter Student Roll Number"
            value={newRollNumber}
            onChange={(e) => setNewRollNumber(e.target.value)}
          />
          <button
            onClick={handleAddStudent}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Student List */}
        <h3 className="text-xl font-medium mb-2">Your Students</h3>
        <ul className="space-y-3 mb-8">
          {students.length > 0 ? (
            students.map((student) => (
              <li key={student._id} className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm">
                <div>
                  <p><strong>Name:</strong> {student.name}</p>
                  <p><strong>Roll No:</strong> {student.rollNumber}</p>
                </div>
                <div className="space-x-3">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => navigate('/track-student')}
                  >
                    Track
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleRemoveStudent(student._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No students linked yet.</p>
          )}
        </ul>

        {/* Contact Teachers */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Contact Teachers</h3>
          <ul className="space-y-4">
            {teachers.map((teacher, index) => (
              <li key={index} className="bg-yellow-100 p-4 rounded-lg shadow">
                <p><strong>Name:</strong> {teacher.name}</p>
                <p><strong>Subject:</strong> {teacher.subject}</p>
                <p><strong>Email:</strong> {teacher.email}</p>
                <p><strong>Phone:</strong> {teacher.phone}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Bus Staff */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Contact Bus Staff</h3>
          <ul className="space-y-4">
            {busStaff.map((staff, index) => (
              <li key={index} className="bg-green-100 p-4 rounded-lg shadow">
                <p><strong>Role:</strong> {staff.role}</p>
                <p><strong>Name:</strong> {staff.name}</p>
                <p><strong>Phone:</strong> {staff.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
