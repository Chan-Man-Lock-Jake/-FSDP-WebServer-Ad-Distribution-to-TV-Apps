import { createS3Bucket, createS3Folders, uploadFileToFolder } from '../models/s3.js';
import multer from 'multer'; // Use multer to upload files

// Configure multer to store files in the "uploads" folder temporarily
const upload = multer({ dest: 'uploads/' });

// Controller for creating a bucket and folders
const createBucketController = async (req, res) => {
    const { bucketName } = req.body;
    try {
        // Create bucket
        await createS3Bucket(bucketName);

        // Create folders (Static, Video, etc...)
        await createS3Folders(bucketName);

        res.status(200).json({ message: `Bucket and folders created successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Error creating bucket and folders', error: error.message });
    }
};

// Controller for uploading a file to a specific folder
const uploadFileController = async (req, res) => {
    const { bucketName, folderName } = req.body;
    const file = req.file; // The uploaded file

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const data = await uploadFileToFolder(bucketName, folderName, file); // Upload the file to S3
        res.status(200).json({ message: `File uploaded successfully to ${folderName}`, data });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
};

export { createBucketController, uploadFileController};
