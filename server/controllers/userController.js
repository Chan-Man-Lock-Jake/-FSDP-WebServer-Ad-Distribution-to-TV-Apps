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
            req.session.user = {
                UserID: loginResponse.user.UserID,
                Name: loginResponse.user.Name,
                Role: loginResponse.user.Role,
            };
            res.status(200).json(loginResponse);
        } else {
            res.status(401).json(loginResponse);
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

export { createUserController, userLoginController, userLogoutController };
