import {uploadFinalizedAd, getFinalizedAd, getAllFinalizedAd} from '../models/advertisement.js';

// Upload finalized advertisement controller
const uploadFinalizedAdController = async (req, res) => {
  try {
    // Sanitize keys in req.body
    const sanitizedBody = {};
    Object.keys(req.body).forEach((key) => {
      sanitizedBody[key.trim()] = req.body[key];
    });

    const companyName = sanitizedBody.companyName?.trim();
    const userId = sanitizedBody.userId?.trim();
    const fileName = sanitizedBody.fileName?.trim();

    console.log("Sanitized Body:", sanitizedBody);

    if (!companyName || !userId || !fileName) {
      return res.status(400).json({ message: "Missing required fields: companyName, userId, or fileName" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = {
      Company: companyName,
      UserId: userId,
    };

    const fileContent = req.file.buffer;

    const response = await uploadFinalizedAd(user, fileName, fileContent);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error uploading advertisement:", error);
    res.status(500).json({ message: "Error uploading advertisement", error: error.message });
  }
};

const getFinalizedAdController = async (req, res) => {
  try {
    const { companyName, userId, fileName } = req.query;

    if (!companyName || !userId || !fileName) {
      return res.status(400).json({ message: "Missing required fields: companyName, userId, or fileName" });
    }

    const user = {
      Company: companyName,
      UserId: userId,
    };

    const response = await getFinalizedAd(user, fileName);

    // Set headers for file download or inline viewing
    res.setHeader("Content-Type", "image/jpeg"); // Adjust for the actual file type
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`); // `inline` to view in Postman

    response.fileStream.pipe(res); // Stream the file to the client
  } catch (error) {
    console.error("Error retrieving advertisement:", error.message);
    res.status(500).json({ message: "Error retrieving advertisement", error: error.message });
  }
};

// Retrieve all finalized advertisements
const getAllFinalizedAdController = async (req, res) => {
  console.log("Session Data:", req.session);

  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }

  console.log("User Session Data:", { Company, UserId });

  if (!Company || !UserId) {
    return res.status(400).json({
      success: false,
      message: "Company and UserId are required in session.",
    });
  }

  try {
    const finalizedAds = await getAllFinalizedAd(Company, UserId);
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


