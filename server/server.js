import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';  // Assuming userRoutes has the necessary route handlers

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow all origins (or configure it for specific ones)
app.use(express.json());

// Use userRoutes directly
app.use('/api/user', userRoutes); // All routes defined in userRoutes will be prefixed with '/api/user'

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
