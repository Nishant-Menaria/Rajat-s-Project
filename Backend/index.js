import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import driverRoutes from './routes/driver.routes.js';
import adminRoutes from './routes/admin.routes.js';
import parentRoutes from "./routes/parent.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // if you're using cookies/auth headers
  }));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/drivers', driverRoutes);
app.use('/admins', adminRoutes);
app.use('/parents',parentRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0',() => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
