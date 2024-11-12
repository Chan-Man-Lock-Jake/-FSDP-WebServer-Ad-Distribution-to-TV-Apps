import express from 'express';
import { addUserController } from '../controllers/userController.js'; 
import { validateUser } from '../middleware/validateuser.js';

const router = express.Router();

// Define route for adding a new user
router.post('/addUser', addUserController);

export default router;
