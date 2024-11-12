import { S3Client, CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Configure the S3 client with credentials and region
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

// Function to create an S3 bucket
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

// Function to create folders inside the S3 bucket
const createS3Folders = async (bucketName) => {
    const folderNames = ['static', 'video', 'scrolling', 'interactive', 'advertisements'];

    try {
        for (let folder of folderNames) {
            const uploadParams = {
                Bucket: bucketName,
                Key: `${folder}/`, // S3 treats keys ending with '/' as folders
                Body: '',
            };
            await s3Client.send(new PutObjectCommand(uploadParams));
            console.log(`Folder created: ${folder}`);
        }
    } catch (error) {
        console.error('Error creating folders in S3:', error);
        throw error;
    }
};

// Function to upload a file to a specific folder in the S3 bucket
const uploadFileToFolder = async (bucketName, folderName, file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Key: `${folderName}/${file.originalname}`, // Folder path + original filename
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
