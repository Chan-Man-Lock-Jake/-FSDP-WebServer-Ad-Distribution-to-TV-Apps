import express from 'express';
import { 
    createUserController, 
    userLoginController,
    createUserByAdminController
} from '../controllers/userController.js';
import { validateUser } from '../middleware/validateUser.js';
const router = express.Router();

router.post('/signup', createUserController); // User signup route
router.post('/login', userLoginController);  // User login route
router.post('/admin/create-user', createUserByAdminController); // New admin route

export default router;