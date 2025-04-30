// controllers/parentController.js
import Parent from '../models/Parent.js';
import Student from '../models/Student.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginParent = async (req, res) => {
  const { email, password } = req.body;
  const parent = await Parent.findOne({ email });
  if (!parent) return res.status(404).json({ error: 'Parent not found' });

  const match = await bcrypt.compare(password, parent.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: parent._id, role: 'parent' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

export const addStudentToParent = async (req, res) => {
  const { parentId } = req.params;
  const { rollNumber } = req.body;

  const student = await Student.findOne({ rollNumber });
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const parent = await Parent.findById(parentId);
  if (!parent.students.includes(student._id)) {
    parent.students.push(student._id);
    await parent.save();
  }

  res.json({ message: 'Student added', parent });
};


export const registerParent = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const existingParent = await Parent.findOne({ email });
      if (existingParent) {
        return res.status(400).json({ error: 'Parent with this email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newParent = new Parent({
        name,
        email,
        password: hashedPassword,
        students: [],
      });
  
      await newParent.save();
  
      res.status(201).json({ message: 'Parent registered successfully' });
    } catch (err) {
      console.error('Parent Registration Error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  export const getParentStudents = async (req, res) => {
    try {
      const parent = await Parent.findById(req.params.id).populate('students');
  
      if (!parent) {
        return res.status(404).json({ message: 'Parent not found' });
      }
  
      res.status(200).json({ students: parent.students });
    } catch (error) {
      console.error('Error fetching parent students:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const removeStudent = async (req, res) => {
    try {
      const { parentId, studentId } = req.params;
  
      // Find the parent
      const parent = await Parent.findById(parentId);
      if (!parent) {
        return res.status(404).json({ message: 'Parent not found' });
      }
  
      // Check if student is linked to parent
      const isLinked = parent.students.includes(studentId);
      if (!isLinked) {
        return res.status(404).json({ message: 'Student not linked to this parent' });
      }
  
      // Remove the student reference from parent's students array
      parent.students = parent.students.filter(
        (id) => id.toString() !== studentId
      );
      await parent.save();
  
      res.status(200).json({ message: 'Student unlinked successfully' });
    } catch (error) {
      console.error('Error unlinking student:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };