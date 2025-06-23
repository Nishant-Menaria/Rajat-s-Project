import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: '', phone: '', licenseNumber: '', busNumber: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editDriverId, setEditDriverId] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admins/drivers');
      setDrivers(response.data.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleAddDriver = async () => {
    const { name, phone, licenseNumber, busNumber } = newDriver;
    if (name && phone && licenseNumber && busNumber) {
      try {
        const response = await axios.post('http://localhost:8000/admins/drivers', newDriver);
        alert(`Driver added successfully!\nDriver ID: ${response.data.driverId}\nDefault Password: 123456789`);
        setDrivers([...drivers, response.data]);
        setNewDriver({ name: '', phone: '', licenseNumber: '', busNumber: '' });
      } catch (error) {
        console.error('Error adding driver:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditDriver = (id) => {
    const driver = drivers.find((driver) => driver._id === id);
    setNewDriver({
      name: driver.name,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      busNumber: driver.busNumber,
    });
    setIsEditing(true);
    setEditDriverId(id);
  };

  const handleUpdateDriver = async () => {
    const { name, phone, licenseNumber, busNumber } = newDriver;
    if (name && phone && licenseNumber && busNumber) {
      try {
        const response = await axios.put(`http://localhost:8000/admins/drivers/${editDriverId}`, newDriver);
        setDrivers(
          drivers.map((driver) =>
            driver._id === editDriverId ? { ...driver, ...response.data } : driver
          )
        );
        setNewDriver({ name: '', phone: '', licenseNumber: '', busNumber: '' });
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
      await axios.delete(`http://localhost:8000/admins/drivers/${id}`);
      setDrivers(drivers.filter((driver) => driver._id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Manage Drivers</h1>

      {/* Add/Edit Driver Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          {isEditing ? 'Edit Driver' : 'Add New Driver'}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newDriver.name}
            onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newDriver.phone}
            onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="License Number"
            value={newDriver.licenseNumber}
            onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Bus Number"
            value={newDriver.busNumber}
            onChange={(e) => setNewDriver({ ...newDriver, busNumber: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={isEditing ? handleUpdateDriver : handleAddDriver}
            className="w-full py-3 mt-4 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-700"
          >
            {isEditing ? 'Update Driver' : 'Add Driver'}
          </button>
        </div>
      </div>

      {/* Driver List Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Driver List</h2>
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Driver ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">License Number</th>
              <th className="py-3 px-4 border-b">Bus Number</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(drivers) && drivers.length > 0 ? (
              drivers.map((driver) => (
                <tr key={driver._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{driver.driverId || 'N/A'}</td>
                  <td className="py-3 px-4 border-b">{driver.name}</td>
                  <td className="py-3 px-4 border-b">{driver.phone}</td>
                  <td className="py-3 px-4 border-b">{driver.licenseNumber}</td>
                  <td className="py-3 px-4 border-b">{driver.busNumber}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEditDriver(driver._id)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDriver(driver._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center">No drivers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDrivers;
