import express from 'express';
import { createUserController, userLoginController } from '../controllers/userController.js';
import { validateUser } from '../middleware/validateUser.js';
const router = express.Router();

router.post('/signup', createUserController); // Correct function name
router.post('/login', userLoginController); // Correct function name
export default router;
