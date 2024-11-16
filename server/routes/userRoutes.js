import express from 'express';
import { createUserController, userLoginController } from '../controllers/userController.js';
import { validateUser } from '../middleware/validateUser.js';

const router = express.Router();

// Create new user after sign up
router.post('/signup', validateUser, createUserController);

// User login 
router.post('/login', userLoginController);

export default router;
