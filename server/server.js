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
import cors from 'cors';

// Create `__dirname` since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

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
