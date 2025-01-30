import session from 'express-session';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import  userRoutes  from './routes/userRoutes.js';
import  adminRoutes  from './routes/adminRoutes.js';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';
import { getAllFinalizedAd } from './models/advertisement.js';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
const port = process.env.PORT || 3000;


// Update CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow sending cookies or authorization headers
  })
);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevent client-side access to cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);


// Middleware to check if user is logged in
app.get("/session", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "No session data found" });
  }
  res.status(200).json({ success: true, data: req.session.user });
});


// finalised ad
// app.get("/admin/get-all-finalized-ad", (req, res) => {
//   // console.log("Incoming Cookies:", req.headers.cookie); // Log incoming cookies
//   // console.log("Session Data:", req.session); // Log session data
//   console.log(req.session.user);

//   if (!req.session.user) {
//     console.log("Hello");
//     console.log(req.session.user);

//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   const { Company, UserId } = req.session.user;

//   getAllFinalizedAd(Company, UserId)
//     .then((ads) => res.status(200).json({ success: true, data: ads }))
//     .catch((err) => res.status(500).json({ success: false, message: err.message }));
// });


app.use((req, res, next) => {
  console.log("Incoming Cookies:", req.headers.cookie);
  next();
});
;

app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  next();
});


// User route 
app.use('/user', userRoutes);

// Admin route 
app.use('/admin', adminRoutes);

// Create `__dirname` since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var HOST = '' || 'localhost';

app.use(bodyParser.json({ limit: '50mb' })); // Increase JSON size limit for large payloads (50MB example)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded form data


// Serve static files
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use('/uploads', express.static(uploadDir)); // Serve uploaded files

// Multer configuration for file uploads (increase file size limit to 50MB)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Increase file size limit (50MB)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
      cb(null, true); // Allow images and videos only
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

// Function to upload to S3
const uploadAd = async (filePath, mimeType) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const contentType = mimeType || 'application/octet-stream'; // Default to binary stream if unknown

    const s3Key = `advertisement/${path.basename(filePath)}`;  // Upload to the 'advertisement' folder in S3

    const uploadParams = {
      Bucket: 'flowers.co',
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
    };

    // Upload the file to S3
    await s3Client.send(new PutObjectCommand(uploadParams));

    // Delete the local file after uploading to S3
    fs.unlinkSync(filePath);
    console.log(`Uploaded file to S3: ${s3Key}`);
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

// Endpoint to handle image and video uploads
app.post('/upload', upload.array('file'), (req, res) => {
  if (req.files) {
    const files = req.files.map((file) => {
      const filePath = `/uploads/${file.filename}`; // Local path of the uploaded file
      const mimeType = file.mimetype;

      return {
        url: filePath,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      };
    });

    res.json({ files }); // Return the local file path to be used for display
  } else {
    res.status(400).json({ message: 'No files were uploaded.' });
  }
});

// Endpoint to save the canvas image and upload it to S3
app.post("/saveCanvasImage", (req, res) => {
  const { imageDataUrl } = req.body;
  const buffer = Buffer.from(imageDataUrl.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const filePath = path.join(uploadDir, `${uuidv4()}.png`); // Create a unique file path for the image

  // Save the image locally
  fs.writeFile(filePath, buffer, async (err) => {
    if (err) {
      console.error("Error saving screenshot:", err);
      return res.status(500).json({ message: "Failed to save screenshot." });
    }

    // Now upload the saved image to S3
    try {
      const mimeType = 'image/png';  // Set the appropriate MIME type for the canvas image
      await uploadAd(filePath, mimeType); // Upload the file to S3
      res.json({ message: "Screenshot saved successfully and uploaded to S3." });
    } catch (uploadError) {
      console.error("Error uploading to S3:", uploadError);
      res.status(500).json({ message: "Failed to upload to S3." });
    }
  });
});

// Set up the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

// Middleware to handle CORS and parsing JSON data
app.use(cors());

// Function to generate the URL of the uploaded S3 object
const getS3Url = (s3Key) => {
  return `https://flowers.co.s3.amazonaws.com/${s3Key}`;  // Adjust if your S3 bucket URL differs
};

// Endpoint to handle image and video uploads
app.post('/upload', upload.array('file'), (req, res) => {
  if (req.files) {
    const files = req.files.map((file) => {
      const filePath = `/uploads/${file.filename}`; // Local path of the uploaded file
      const mimeType = file.mimetype;

      // Upload to S3
      uploadAd(path.join(uploadDir, file.filename), mimeType).catch((err) => {
        console.error("Error uploading file to S3:", err);
      });

      const s3Key = `advertisement/${file.filename}`;
      const s3Url = getS3Url(s3Key); // Generate the URL for the uploaded image

      return {
        url: s3Url,  // Return the public URL of the file in S3
        type: file.mimetype.startsWith("video") ? "video" : "image",
      };
    });

    res.json({ files }); // Return the URL of the uploaded file to the frontend
  } else {
    res.status(400).json({ message: 'No files were uploaded.' });
  }
});

// Endpoint to retrieve file from S3
app.get('/retrieve-ad/:folder/:fileName', async (req, res) => {
  const { folder, fileName } = req.params;
  const bucketName = 'flowers.co';  // Your S3 bucket name
  const s3Key = `${folder}/${fileName.trim()}`;  // Ensure no extra spaces in the file name

  try {
    // Define the parameters for retrieving the file from S3
    const getObjectParams = {
      Bucket: bucketName,
      Key: s3Key,  // Path inside the bucket
    };

    // Fetch the file from S3
    const data = await s3Client.send(new GetObjectCommand(getObjectParams));

    // Set the correct content type based on file
    res.setHeader('Content-Type', data.ContentType);

    // Pipe the file to the response stream (this sends the file as the response)
    data.Body.pipe(res);
  } catch (error) {
    console.error('Error retrieving file from S3:', error);
    res.status(500).json({ message: 'Error retrieving file from S3' });
  }
});

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
