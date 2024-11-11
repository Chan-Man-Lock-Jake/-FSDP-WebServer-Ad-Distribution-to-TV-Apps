import express from 'express';
import bodyParser from 'body-parser'; // to parse JSON body
import multer from 'multer'; // to handle file uploads
import userRoutes from './routes/userRoutes.js';  // assuming user-related routes
import adminRoutes from './routes/adminRoutes.js';  // assuming admin-related routes
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body and handle file uploads
app.use(bodyParser.json()); // Parse JSON data in requests

// Initialize multer for file handling
const upload = multer({ dest: 'uploads/' }); // temporary folder for uploaded files

// Routes
app.use('/api', userRoutes);  // User routes
app.use('/api/files', adminRoutes);  // Admin routes for creating buckets and uploading files

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
