// routes/parentRoutes.js
import express from 'express';
import { loginParent, addStudentToParent, registerParent , getParentStudents, removeStudent } from '../controllers/parent.controller.js'


const router = express.Router();

router.post('/login', loginParent);
router.post('/:parentId/add-student', addStudentToParent);
router.post('/register',registerParent);
router.get('/:id', getParentStudents);
router.delete('/:parentId/:studentId',removeStudent);

export default router;
