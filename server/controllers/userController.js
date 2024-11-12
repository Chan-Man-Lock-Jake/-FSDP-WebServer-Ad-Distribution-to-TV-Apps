import { addUser } from '../models/user.js';
import { dynamoDB } from '../models/dynamodb.js';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

// Add user
const addUserController = async (req, res) => {
    try {
        const newUser = req.body;
        const response = await addUser(newUser); // Adding user to DynamoDB table
        res.status(201).json(response);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
};

// User login
const loginUserController = async (req, res) => {
    const { Username, UserPassword } = req.body;

    try {
        const params = {
            TableName: 'User',
            Key: { Username },
        };
        const { Item } = await dynamoDB.send(new GetCommand(params));

        if (Item && Item.UserPassword === UserPassword) {
            res.status(200).json({ success: true, message: 'Login successful!' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

export { addUserController, loginUserController };
