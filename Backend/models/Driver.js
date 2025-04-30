import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true, // or false if it's optional
    match: [/^[0-9]{10}$/, 'Please fill a valid 10-digit phone number'], // optional validation
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busNumber: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Driver', driverSchema);
