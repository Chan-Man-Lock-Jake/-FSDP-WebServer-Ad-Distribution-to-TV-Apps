import { S3Client, CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

// Create S3 Bucket
export const createS3Bucket = async (bucketName) => {
  const params = {
    Bucket: bucketName,
  };
  
  try {
    const data = await s3Client.send(new CreateBucketCommand(params));
    return data; // Return the success response or metadata
  } catch (error) {
    console.error("Error creating bucket", error);
    throw error; // Throw error to handle in the controller
  }
};

// Upload File to S3 Bucket
export const uploadFile = async (bucketName, folderName, fileName, fileContent) => {
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${fileName}`, // Define the folder structure
    Body: fileContent, // The file content (could be buffer or string)
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    return data; // Return success response
  } catch (error) {
    console.error("Error uploading file", error);
    throw error; // Throw error to handle in the controller
  }
};
