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


