import express from 'express';
import { createBucketController, uploadFileController } from '../controllers/adContentController.js';
import multer from 'multer';

const router = express.Router();

// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary storage folder

// Route to create a bucket with folders
router.post('/create-bucket', createBucketController);

// Route to upload a file to a specific folder in a bucket
router.post('/upload-file', upload.single('file'), uploadFileController);

export default router;
