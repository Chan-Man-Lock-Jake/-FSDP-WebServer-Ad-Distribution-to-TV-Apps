import { addUser } from '../models/user.js'

// Add user 
const addUserController = async (req, res) => {
    try {
        const newUser = req.body; 
        const response = await addUser(newUser) // Adding user to DynamoDB table
        res.status(201).json(response);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
};

export { addUserController }