import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Loading environment variables from .env
dotenv.config();

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export { s3 };
