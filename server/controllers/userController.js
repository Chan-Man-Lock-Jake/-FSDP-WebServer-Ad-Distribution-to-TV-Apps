import { createUser, userLogin, createCampaign } from '../models/user.js';

// User Login Controller
const userLoginController = async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and Password are required.' });
    }

    try {
        const loginResponse = await userLogin(Email, Password);

        if (loginResponse.success) {
            req.session.user = {
                UserID: loginResponse.user.UserID,
                Name: loginResponse.user.Name,
                Role: loginResponse.user.Role,
            };
            console.log("Session ID:", req.session.id);

            res.status(200).json({
                success: true,
                message: loginResponse.message,
                user: req.session.user,
                sessionId: req.session.id,
            });
        } else {
            res.status(401).json({ message: loginResponse.message });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed due to a server error.' });
    }
};

// Create User Controller
const createUserController = async (req, res) => {
    try {
        const user = req.body;
        const response = await createUser(user);
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
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
