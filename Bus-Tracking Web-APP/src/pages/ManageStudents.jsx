import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]); // Make sure it is an array initially
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  // Fetch the students from the backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);  // Ensure the response data is an array
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async () => {
    if (newStudent.name && newStudent.email) {
      try {
        const response = await axios.post('/api/students', newStudent);
        setStudents([...students, response.data]);
        setNewStudent({ name: '', email: '' });
      } catch (error) {
        console.error('Error adding student:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditStudent = (id) => {
    const student = students.find((student) => student.id === id);
    setNewStudent({ name: student.name, email: student.email });
    setIsEditing(true);
    setEditStudentId(id);
  };

  const handleUpdateStudent = async () => {
    if (newStudent.name && newStudent.email) {
      try {
        const response = await axios.put(`/api/students/${editStudentId}`, newStudent);
        setStudents(
          students.map((student) =>
            student.id === editStudentId ? { ...student, ...response.data } : student
          )
        );
        setNewStudent({ name: '', email: '' });
        setIsEditing(false);
        setEditStudentId(null);
      } catch (error) {
        console.error('Error updating student:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Manage Students</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">{isEditing ? 'Edit Student' : 'Add New Student'}</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={isEditing ? handleUpdateStudent : handleAddStudent}
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Student List</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{student.name}</td>
                  <td className="py-3 px-4 border-b">{student.email}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEditStudent(student.id)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center">No students available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
