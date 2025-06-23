// models/Driver.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  busNumber: { type: String, required: true },

  driverId: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: '123456789' },

  type: {
    type: String,
    enum: ['admin', 'student', 'driver'],
    default: 'driver'
  }
});

// 🔒 Hash password before saving
driverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('Driver', driverSchema);
