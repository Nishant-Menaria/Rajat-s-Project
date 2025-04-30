import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller.js';

// POST route for login
router.post('/login', authController.login);
router.post('/signin',authController.register)

export default router;
