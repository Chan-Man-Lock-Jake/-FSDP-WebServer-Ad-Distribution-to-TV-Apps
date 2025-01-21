import express from 'express';
import { createCampaignController, createUserController, userLoginController } from '../controllers/userController.js';
import { validateUser } from '../middleware/validateUser.js';
const router = express.Router();

router.post('/signup', createUserController); // Correct function name
router.post('/login', userLoginController); // Correct function name
router.post('/create-campaign', createCampaignController); // Correct function name
export default router;
