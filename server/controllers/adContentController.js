import { createS3Bucket, createS3Folders, uploadFileToFolder } from '../models/s3.js';
import multer from 'multer'; // Multer middleware for handling file uploads

const upload = multer({ dest: 'uploads/' }); // Temporary directory to store uploaded files

// Controller to create a bucket and folders within it
const createBucketController = async (req, res) => {
    const { bucketName } = req.body;

    if (!bucketName) {
        return res.status(400).json({ message: "Bucket name is required" });
    }

    try {
        console.log(`Creating bucket: ${bucketName}`); // Log the bucket name for debugging
        await createS3Bucket(bucketName); // Step to create the bucket
        await createS3Folders(bucketName); // Step to create folders

        res.status(200).json({ message: `Bucket and folders created successfully.` });
    } catch (error) {
        console.error('Error creating bucket and folders:', error);
        res.status(500).json({ message: 'Error creating bucket and folders', error: error.message });
    }
};

// Controller to upload a file to a specific folder
const uploadFileController = async (req, res) => {
    const { bucketName, folderName } = req.body;
    const file = req.file;

    if (!bucketName || !folderName) {
        return res.status(400).json({ message: "Bucket name and folder name are required" });
    }

    try {
        console.log(`Uploading file: ${file.filename} to ${folderName} in bucket: ${bucketName}`);
        const data = await uploadFileToFolder(bucketName, folderName, file); // Upload the file to S3
        res.status(200).json({ message: `File uploaded successfully to ${folderName}`, data });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
};

export { createBucketController, uploadFileController, upload };
