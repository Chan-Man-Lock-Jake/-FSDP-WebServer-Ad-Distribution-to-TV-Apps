import express from 'express';
import bodyParser from 'body-parser'; // to parse JSON body
import multer from 'multer'; // to handle file uploads
import userRoutes from './routes/userRoutes.js';  // assuming user-related routes
import adminRoutes from './routes/adminRoutes.js';  // assuming admin-related routes
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON body and handle file uploads
app.use(bodyParser.json()); // Parse JSON data in requests

// Initialize multer for file handling
const upload = multer({ dest: 'uploads/' }); // temporary folder for uploaded files

// Routes
app.use('/api', userRoutes);  // User routes
app.use('/api/files', adminRoutes);  // Admin routes for creating buckets and uploading files

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    console.log(data);
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('push_ad', (data) => {
    console.log("Ad pushed");
    socket.broadcast.emit('display_ad', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
