import Student from '../models/Student.js';

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    console.log("iside getall student");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students', error: err.message });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student', error: err.message });
  }
};

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, busNumber } = req.body;

    const newStudent = new Student({
      name,
      rollNumber,
      email,
      busNumber
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student created', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
};

// Update student by ID
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student updated', student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
};

// Delete student by ID
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
};
