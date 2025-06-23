import Driver from '../models/Driver.js'
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken'
 import Student from '../models/Student.js';

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching drivers' });
  }
};

export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
};

export const createDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ message: 'Creation failed' });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(driver);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
};

export const driverLogin = async (req, res) => {
  const { driverId, password } = req.body;

  try {
    const driver = await Driver.findOne({ driverId });
    if (!driver) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: driver._id, type: driver.type }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login error' });
  }
}

export const getStudents = async (req, res) => {
  const { busNumber } = req.params;
  try {
    const students = await Student.find({ busNumber });
    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}
