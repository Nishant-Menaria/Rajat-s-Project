import express from 'express';
import {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
  driverLogin,
  getStudents
} from '../controllers/driver.controller.js';

const router = express.Router();

router.get('/students/:busNumber', getStudents);

router.get('/', getAllDrivers);
router.get('/:id', getDriverById);
router.post('/', createDriver);
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);
// routes/driverRoutes.js
// routes/driver.js



router.post('/login', driverLogin);



export default router;
