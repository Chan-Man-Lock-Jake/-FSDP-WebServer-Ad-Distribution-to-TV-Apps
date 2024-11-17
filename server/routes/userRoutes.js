import express from 'express';
import { createCampaignController, createUserController, userLoginController } from '../controllers/userController.js';
import { validateUser } from '../middleware/validateUser.js';

const router = express.Router();

// Create new user after sign up
router.post('/signup', validateUser, createUserController);

// User login 
router.post('/login', userLoginController);

// Create Campaign
router.post('/create-campaign', createCampaignController)

export default router;
