import express from 'express';
import { createCampaignController, createUserController, userLoginController } from '../controllers/userController.js';
import { validateUser } from '../middleware/validateUser.js';
const router = express.Router();

router.post('/signup', createUserController); // User signup route
router.post('/login', userLoginController);  // User login route
router.post('/create-campaign', createCampaignController); 
export default router;

