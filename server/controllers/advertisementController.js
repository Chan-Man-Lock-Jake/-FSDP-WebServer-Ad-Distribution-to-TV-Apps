import {uploadFinalizedAd, getFinalizedAd, getAllFinalizedAd} from '../models/advertisement.js';

// Upload finalized advertisement controller
const uploadFinalizedAdController = async (req, res) => {
  try {
    // For testing purposes, you can log the user object.
    console.log("User from session or authentication:", req.user || req.session?.user);
    // Retrieve fileName from the request body.
    const fileName = req.body.fileName?.trim();
    console.log("File Name:", fileName);

    if (!fileName) {
      return res.status(400).json({ message: "Missing required field: fileName" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileContent = req.file.buffer;

    const response = await uploadFinalizedAd(req, fileName, fileContent);
    console.log("Successfully uploaded advertisement");
    res.status(201).json(response);
  } catch (error) {
    console.error("Error uploading advertisement:", error);
    res.status(500).json({
      message: "Error uploading advertisement",
      error: error.message,
    });
  }
};

const getFinalizedAdController = async (req, res) => {
  try {
    // Extract required fields from the query parameters
    const { companyName, userId, fileName } = req.query;
    if (!companyName || !userId || !fileName) {
      return res.status(400).json({
        message: "Missing required fields: companyName, userId, or fileName",
      });
    }

    // Construct a user object to pass to the model function
    const user = {
      Company: companyName,
      UserId: userId,
    };

    // Retrieve the advertisement file stream from S3
    const response = await getFinalizedAd(user, fileName);

    // Determine the Content-Type header based on the file extension
    let contentType = "application/octet-stream";
    if (fileName.match(/\.(jpg|jpeg)$/i)) {
      contentType = "image/jpeg";
    } else if (fileName.match(/\.png$/i)) {
      contentType = "image/png";
    } else if (fileName.match(/\.mp4$/i)) {
      contentType = "video/mp4";
    } else if (fileName.match(/\.mov$/i)) {
      contentType = "video/quicktime";
    } else if (fileName.match(/\.avi$/i)) {
      contentType = "video/x-msvideo";
    } else if (fileName.match(/\.mkv$/i)) {
      contentType = "video/x-matroska";
    } else if (fileName.match(/\.webm$/i)) {
      contentType = "video/webm";
    }

    // Set headers to display the content inline (instead of forcing a download)
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    // Pipe the file stream to the client
    response.fileStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving advertisement:", error.message);
    res.status(500).json({
      message: "Error retrieving advertisement",
      error: error.message,
    });
  }
};


// Retrieve all finalized advertisements
const getAllFinalizedAdController = async (req, res) => {
  if (!req.session.user) {
    console.log(req.session.user);
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }

  if (!req.session.user.Company || !req.session.user.UserId) {
    return res.status(400).json({
      success: false,
      message: "Company and UserId are not included in the session.",
    });
  }

  try {
    const finalizedAds = await getAllFinalizedAd(req.session.user.Company, req.session.user.UserId);
    res.status(200).json({ success: true, data: finalizedAds });
  } catch (error) {
    console.error("Error in getAllFinalizedAdController:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve finalized advertisements.",
    });
  }
};

export { uploadFinalizedAdController, getFinalizedAdController, getAllFinalizedAdController };


