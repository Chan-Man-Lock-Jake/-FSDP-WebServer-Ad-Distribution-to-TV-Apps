import express from 'express';
import { addUserController } from '../controllers/userController.js'; 

const router = express.Router();

// Define route for adding a new user
router.post('/user', addUserController);

export default router;
