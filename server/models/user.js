import { dynamoDB } from './dynamodb.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

// Add user to table
const addUser = async (user) => {
    const params = {
        TableName: 'User', // DynamoDB table name
        Item: {
            UserID: user.userID,  // Add UserID as the partition key
            Name: user.name,
            CompanyNumber: user.companyNumber,
            CompanyName: user.companyName,
            Email: user.email,
            Password: user.password,
            // Add other necessary fields
        },
    };

    try {
        // Save user to DynamoDB
        await dynamoDB.send(new PutCommand(params));
        return { message: 'User added successfully!' };
    } catch (error) {
        console.error('Error adding user to DynamoDB:', error);
        throw new Error('Error adding user');
    }
};


export { addUser }