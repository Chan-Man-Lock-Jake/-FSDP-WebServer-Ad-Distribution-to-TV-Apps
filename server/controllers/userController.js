import { createUser, userLogin } from '../models/user.js';

// Create user
const createUserController = async (req, res) => {
    try {
        const newUser = req.body; 
        const response = await createUser(newUser);
        res.status(201).json(response);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
};

// User Login
const userLoginController = async (req, res) => {
    console.log("Request Body:", req.body); // Log request body
    const { Email, Password } = req.body || {};

    if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and Password are required.' });
    }

    try {
        const loginResponse = await userLogin(Email, Password);

        if (loginResponse.success) {
            // Save user info in the session
            req.session.user = {
                UserID: loginResponse.user.UserID,
                Name: loginResponse.user.Name,
                Role: loginResponse.user.Role,
            };

            // Log the session ID
            console.log("Session ID:", req.session.id);

            res.status(200).json({
                success: true,
                message: loginResponse.message,
                user: req.session.user,
                sessionId: req.session.id, // Include session ID in response
            });
        } else {
            res.status(401).json(loginResponse);
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

export { createUserController, userLoginController };
