import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set up DynamoDB client 
const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

// Wrap the DynamoDB client with the DocumentClient for easier usage with JSON data
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

export { dynamoDB };
