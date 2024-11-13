import express from 'express';
import bodyParser from 'body-parser'; 
import multer from 'multer'; 
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors'; 
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
import http from 'http';
import { Server } from 'socket.io';

// Create `__dirname` since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

var HOST = '172.20.10.2' || 'localhost';

app.use(cors());
app.use(bodyParser.json());

// Initialize multer for file handling
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static(path.join(__dirname, '../client')));

// Default route to serve `index.html` directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Routes
app.use('/api', userRoutes); 
app.use('/api/files', adminRoutes);
app.use('/api', userRoutes);  // User routes
app.use('/api/files', adminRoutes);  // Admin routes for creating buckets and uploading files

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://${HOST}:5173`,
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", (data) => {
    socket.leave();
    socket.join(data);
    console.log(`Request to join room: ${data}`);
    console.log(socket.rooms);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on('push_ad', (data) => {
    console.log("Ad pushed");
    console.log(`Request to push to room: ${data.room}`)
    socket.to(data.room).emit('display_ad', data.message);
  });

  socket.on('push_clear_ad', () => {
    console.log("Ad cleared");
    socket.broadcast.emit('clear_ad');
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://${HOST}:${port}`);
});
