import express from 'express';
import dotenv from 'dotenv'; 
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 

// Routes
app.use('/api', userRoutes);
app.use('/api/files', adminRoutes); 

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
