import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    busNumber: '',
    stop: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admins/students');
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async () => {
    const { name, rollNumber, busNumber, stop } = newStudent;
    if (name && rollNumber && busNumber && stop) {
      try {
        const response = await axios.post('http://localhost:8000/admins/students', newStudent);
        setStudents([...students, response.data.data]);
        setNewStudent({ name: '', rollNumber: '', busNumber: '', stop: '' });
      } catch (error) {
        console.error('Error adding student:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditStudent = (id) => {
    const student = students.find((student) => student._id === id);
    setNewStudent({
      name: student.name,
      rollNumber: student.rollNumber,
      busNumber: student.busNumber,
      stop: student.stop,
    });
    setIsEditing(true);
    setEditStudentId(id);
  };

  const handleUpdateStudent = async () => {
    const { name, rollNumber, busNumber, stop } = newStudent;
    if (name && rollNumber && busNumber && stop) {
      try {
        const response = await axios.put(`http://localhost:8000/admins/students/${editStudentId}`, newStudent);
        setStudents(
          students.map((student) =>
            student._id === editStudentId ? { ...student, ...response.data } : student
          )
        );
        setNewStudent({ name: '', rollNumber: '', busNumber: '', stop: '' });
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
      await axios.delete(`http://localhost:8000/admins/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
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
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={newStudent.rollNumber}
            onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Bus Number"
            value={newStudent.busNumber}
            onChange={(e) => setNewStudent({ ...newStudent, busNumber: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Stop"
            value={newStudent.stop}
            onChange={(e) => setNewStudent({ ...newStudent, stop: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={isEditing ? handleUpdateStudent : handleAddStudent}
            className="w-full py-3 mt-4 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
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
              <th className="py-3 px-4 border-b">Roll No</th>
              <th className="py-3 px-4 border-b">Bus No</th>
              <th className="py-3 px-4 border-b">Stop</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{student.name}</td>
                  <td className="py-3 px-4 border-b">{student.rollNumber}</td>
                  <td className="py-3 px-4 border-b">{student.busNumber}</td>
                  <td className="py-3 px-4 border-b">{student.stop}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEditStudent(student._id)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteStudent(student._id)
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center">No students available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;