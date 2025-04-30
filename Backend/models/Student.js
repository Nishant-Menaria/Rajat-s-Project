import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name : {
    type : String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busNumber: {
    type: String,
    required: true,
  },
  stop: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
