import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';

// Loading environment variables from .env 
dotenv.config();

// Validate that required environment variables are present
if (!process.env.AWS_REGION || !process.env.ACCESS_KEY_ID || !process.env.SECRET_ACCESS_KEY) {
  throw new Error('Missing required AWS environment variables (AWS_REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY)');
}

// Initialize DynamoDB Client
const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

// Handles marshaling and unmarshaling
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);

export { dynamoDB };
