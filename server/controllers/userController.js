import { createUser, userLogin, createCampaign } from '../models/user.js';

// User Login Controller
const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const result = await userLogin(req, email, password);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json(result);
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Create User Controller
const createUserController = async (req, res) => {
    try {
        const user = req.body;
        const response = await createUser(user);
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message, 
        });
    }
};

// Campaign Creation Controller
const createCampaignController = async (req, res) => {
    try {
        const campaign = req.body;
        const response = await createCampaign(campaign, req);
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ message: 'Error creating campaign' });
    }
};

export { createUserController, userLoginController, createCampaignController };
