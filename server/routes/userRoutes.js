import express from 'express';
import { addUserController, loginUserController } from '../controllers/userController.js';
import { validateUser } from '../middleware/validateuser.js';

const router = express.Router();

// Define route for adding a new user
router.post('/addUser', addUserController);

// Define route for logging in
router.post('/login', loginUserController);

export default router;
