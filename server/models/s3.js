import { S3Client, CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables 
dotenv.config();

// Configure the AWS S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
});

// Create an S3 bucket
const createS3Bucket = async (bucketName) => {
    const createBucketParams = {
        Bucket: bucketName,
    };

    try {
        const data = await s3Client.send(new CreateBucketCommand(createBucketParams));
        console.log(`Bucket created successfully: ${bucketName}`);
        return data;
    } catch (error) {
        console.error('Error creating bucket:', error);
        throw error;
    }
};

// Create folders inside the S3 bucket (automatically invoked after bucket creation)
const createS3Folders = async (bucketName) => {
    const folderNames = ['static', 'video', 'scrolling', 'interactive'];

    try {
        // Create folders by uploading empty objects with folder names
        for (let folder of folderNames) {
            const uploadParams = {
                Bucket: bucketName,
                Key: `${folder}/`,
                Body: '', // Empty body
            };
            await s3Client.send(new PutObjectCommand(uploadParams));
            console.log(`Folder created: ${folder}`);
        }
    } catch (error) {
        console.error('Error creating folders in S3:', error);
        throw error;
    }
};

// Upload a file to a specific folder in the S3 bucket
const uploadFileToFolder = async (bucketName, folderName, file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Key: `${folderName}/${file.filename}`, // Folder path + filename
        Body: fileStream,
        ContentType: file.mimetype,
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        fs.unlinkSync(file.path); // Delete file from server after uploading to S3
        return data;
    } catch (error) {
        console.error('Error uploading file to folder:', error);
        throw error;
    }
};

export { createS3Bucket, createS3Folders, uploadFileToFolder };
