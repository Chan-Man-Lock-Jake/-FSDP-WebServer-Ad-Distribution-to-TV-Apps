import { dynamoDB } from './dynamodb.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'User' // DynamoDB table

// Add user to table
async function addUser(user) {
    const params = {
        TableName: TABLE_NAME,
        Item: user,
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        return {message: "User added successfully"};
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export { addUser }