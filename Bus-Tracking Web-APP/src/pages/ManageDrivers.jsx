import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]); // Make sure it is an array initially
  const [newDriver, setNewDriver] = useState({ name: '', email: '', licenseNumber: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editDriverId, setEditDriverId] = useState(null);

  // Fetch the drivers from the backend
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('/api/drivers');
      setDrivers(response.data); // Ensure the response data is an array
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleAddDriver = async () => {
    if (newDriver.name && newDriver.email && newDriver.licenseNumber) {
      try {
        const response = await axios.post('/api/drivers', newDriver);
        setDrivers([...drivers, response.data]);
        setNewDriver({ name: '', email: '', licenseNumber: '' });
      } catch (error) {
        console.error('Error adding driver:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditDriver = (id) => {
    const driver = drivers.find((driver) => driver.id === id);
    setNewDriver({ name: driver.name, email: driver.email, licenseNumber: driver.licenseNumber });
    setIsEditing(true);
    setEditDriverId(id);
  };

  const handleUpdateDriver = async () => {
    if (newDriver.name && newDriver.email && newDriver.licenseNumber) {
      try {
        const response = await axios.put(`/api/drivers/${editDriverId}`, newDriver);
        setDrivers(
          drivers.map((driver) =>
            driver.id === editDriverId ? { ...driver, ...response.data } : driver
          )
        );
        setNewDriver({ name: '', email: '', licenseNumber: '' });
        setIsEditing(false);
        setEditDriverId(null);
      } catch (error) {
        console.error('Error updating driver:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteDriver = async (id) => {
    try {
      await axios.delete(`/api/drivers/${id}`);
      setDrivers(drivers.filter((driver) => driver.id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Manage Drivers</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">{isEditing ? 'Edit Driver' : 'Add New Driver'}</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newDriver.name}
            onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newDriver.email}
            onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="License Number"
            value={newDriver.licenseNumber}
            onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={isEditing ? handleUpdateDriver : handleAddDriver}
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Driver' : 'Add Driver'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Driver List</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">License Number</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(drivers) && drivers.length > 0 ? (
              drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{driver.name}</td>
                  <td className="py-3 px-4 border-b">{driver.email}</td>
                  <td className="py-3 px-4 border-b">{driver.licenseNumber}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEditDriver(driver.id)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDriver(driver.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center">No drivers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDrivers;
