import session from 'express-session';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBStreamsClient, DescribeStreamCommand, GetShardIteratorCommand, GetRecordsCommand } from "@aws-sdk/client-dynamodb-streams";
import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient, dynamoDbStreamsClient } from './models/dynamodb.js';
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
import { getAllAdCampaign } from './models/adCampaign.js';

dotenv.config();

// Express server
const app = express();
// HTTP server using Express
const server = http.createServer(app);
// WebSocket server using HTTP server
// const wss = new Server({ server });
const wss = new Server( server, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST']
  },
});
// Server PORT
const PORT = 3000;
// Server HOST
const HOST = 'localhost';

// CORS middleware configuration
app.use(cors({
  origin: "http://localhost:5173",           // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow CRUD
  credentials: true,                         // Allow sending cookies or authorization headers
}));

// Middleware to parse JSON requests
app.use(express.json()); 
        
const listenToDynamoDbStreams = async () => {
  try {
    const TABLE_NAME = "AdCampaign";

    // Get the table details to extract the latest stream ARN
    const describeTableCommand = new DescribeTableCommand({ TableName: TABLE_NAME });
    const data = await dynamoDBClient.send(describeTableCommand);
    const streamArn = data.Table.LatestStreamArn;

    // Describe the stream to get its shards
    const describeStreamCommand = new DescribeStreamCommand({
      StreamArn: streamArn,
      Limit: 10,
    });
    const streamData = await dynamoDbStreamsClient.send(describeStreamCommand);
    const shards = streamData.StreamDescription.Shards;

    // For each shard, get a shard iterator and start polling
    for (const shard of shards) {
      const getShardIteratorCommand = new GetShardIteratorCommand({
        StreamArn: streamArn,
        ShardId: shard.ShardId,
        ShardIteratorType: "LATEST",
      });
      const shardIteratorResponse = await dynamoDbStreamsClient.send(getShardIteratorCommand);
      let shardIterator = shardIteratorResponse.ShardIterator;

      if (shardIterator) {
        pollStream(shardIterator, TABLE_NAME);
      }
    }
  } catch (error) {
    console.error(
      `[BACKEND] Error setting up DynamoDB Streams listener for table ${"AdCampaign"}:`,
      error
    );
  }
};

const pollStream = async (shardIterator, tableName) => {
  while (shardIterator) {
    try {
      const getRecordsCommand = new GetRecordsCommand({
        ShardIterator: shardIterator,
        Limit: 100,
      });
      const recordsData = await dynamoDbStreamsClient.send(getRecordsCommand);
      const records = recordsData.Records;

      if (records && records.length > 0) {
        for (const record of records) {
          // Handle INSERT and MODIFY events
          if (record.eventName === "INSERT" || record.eventName === "MODIFY") {
            const updatedItem = unmarshall(record.dynamodb.NewImage);
            console.log("AD ID", updatedItem.CampaignId);

            // Fetch campaign data (replace with your real function)
            let campaignData = await getAllAdCampaign();
            for (let i = 0; i < campaignData.length; i++) {
              if (updatedItem.CampaignId === campaignData[i].CampaignId) {
                console.log(
                  campaignData[i].CampaignId,
                  campaignData[i].Advertisement,
                  campaignData[i].TvGroup
                );
                // Emit ad to all clients in the TV group room
                wss.to(campaignData[i].TvGroup).emit("display_ad", campaignData[i].Advertisement);
              }
            }
          }
          // Optionally, handle "REMOVE" events here
          else if (record.eventName === "REMOVE") {
            // For example, you might need to remove an ad from the display.
          }
        }
      }

      // Update shardIterator for the next poll
      shardIterator = recordsData.NextShardIterator;

      // Wait before polling again (adjust the delay as needed)
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(
        `[BACKEND] Error polling DynamoDB Stream for table ${tableName}:`,
        error
      );
      break; // Exit the polling loop on error
    }
  }
};

(async () => {
  try {
    // Start listening to layout update streams
    await listenToDynamoDbStreams();
    console.log("[LAYOUT] DynamoDB stream listener for layouts initialized.");
  } catch (error) {
    console.error("[LAYOUT] Error initializing DynamoDB stream listener for layouts:", error);
  }
}
)();

// Set up the S3 client
// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   },
// });

// // Function to generate the URL of the uploaded S3 object
// const getS3Url = (s3Key) => {
//   return `https://flowers.co.s3.amazonaws.com/${s3Key}`;  // Adjust if your S3 bucket URL differs
// };

// WebSocket server configuration

wss.on("connection", (ws) => {
    console.log(`User connected: ${ws.id}`);

    // Handle joining room
    ws.on("joinRoom", (room) => {
        ws.join(room);
        console.log(`User ${ws.id} joined room: ${room}`);
    });

    // Handle displaying an ad
    ws.on("display_ad", ({ room, ad }) => {
        wss.to(room).emit("display_ad", ad); // Send ad to all in the room
        console.log("Advertisement pushed!");
    });

    ws.on("force_push_ad", ({ tv, ad }) => {
      console.log(tv, ad);
      wss.to(tv).emit("get_ad", { tv, ad } );
    })

    // socket.emit("force_push_ad", data); // Join room

    // Handle leaving room
    ws.on("leaveRoom", (room) => {
        ws.leave(room);
        console.log(`User ${ws.id} left room: ${room}`);
    });

    ws.on("disconnect", () => {
        console.log(`User disconnected: ${ws.id}`);
    });
});


// wss.on("connection", (ws) => {
//   console.log("New WebSocket connection.");

//   ws.on("joinRoom", (data) => { 
//     ws.join(data);
//     console.log(`Request to join room: ${data}`);
//     console.log(ws);
//   });
// })

// wsserver.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("joinRoom", (data) => {
//     socket.join(data);
//     console.log(`Request to join room: ${data}`);
//     console.log(socket.rooms);
//   });

//   socket.on("leaveRoom", (room) => {
//     socket.leave(room);
//     console.log(`User left room: ${room}`);
//   });

//   socket.on('push_ad', (data) => {
//     console.log("Ad pushed");
//     console.log(`Request to push to room: ${data.room}`)
//     socket.to(data.room).emit('display_ad', data.message);
//   });

//   socket.on('push_clear_ad', () => {
//     console.log("Ad cleared");
//     socket.broadcast.emit('clear_ad');
//   });

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,               // Set to true if using HTTPS
      httpOnly: true,              // Prevent client-side access to cookies
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

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
