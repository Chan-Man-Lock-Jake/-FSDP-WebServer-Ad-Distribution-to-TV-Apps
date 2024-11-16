import { dynamoDB } from './dynamodb.js';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { s3 } from './s3.js'

// Create new user
const createUser = async (user) => {
    const params = {
        TableName: 'User',
        Item: {
            UserID: `ACC${Math.floor(1000000 + Math.random() * 9000000)}`, // Generate a 7-digit random UserID
            Name: user.Name,
            UserCtcNo: user.UserCtcNo,
            CompanyName: user.CompanyName,
            Email: user.Email,
            Password: user.Password,
            Role: `Admin`
        },
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        return { message: 'User added to database successful' };
    } catch (error) {
        console.error('Error adding user to database:', error);
        throw new Error('Error adding user');
    }
};

// User login
const userLogin = async (email, password) => {
    if (!email || !password) {
        throw new Error('Email and Password are required for login.');
    }

    const params = {
        TableName: 'User',
        FilterExpression: 'Email = :email AND Password = :password',
        ExpressionAttributeValues: {
            ':email': email,
            ':password': password,
        },
    };

    try {
        const result = await dynamoDB.send(new ScanCommand(params));

        if (result.Items && result.Items.length > 0) {
            const foundUser = result.Items[0];
            return {
                success: true,
                message: 'Login successful',
                user: {
                    UserID: foundUser.UserID,
                    Name: foundUser.Name,
                    Role: foundUser.Role,
                },
            };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed');
    }
};

export { createUser, userLogin };




