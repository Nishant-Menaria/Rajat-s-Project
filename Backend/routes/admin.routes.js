import express from 'express';
const router = express.Router();
import {
    getAllDrivers,
    getAllStudents,
    updateDriver,
    updateStudent,
    addDriver,
    addStudent,
    deleteDriver,
    deleteStudent,
    adminLogin,
    getAdminStats
} from "../controllers/admin.controller.js";

router.post('/login',adminLogin);
router.get('/stats',getAdminStats);
// Student routes
router.get('/students', getAllStudents);
router.post('/students', addStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// Driver routes
router.get('/drivers', getAllDrivers);
router.post('/drivers', addDriver);
router.put('/drivers/:id', updateDriver);
router.delete('/drivers/:id', deleteDriver);

export default router;
