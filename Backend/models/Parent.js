// models/Parent.js
import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
   name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

export default mongoose.model('Parent', parentSchema);
