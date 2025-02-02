import { getAllAdInfo, uploadAdInfo } from "../models/adInfo.js";

// Retrieve advertisment info 
const getAllAdInfoController = async (req, res) => {
  try {
    // Retrieve the user from the session and extract the user id.
    const user = req.session.user;
    const userId = user.UserId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user session found." });
    }

    const adInfo = await getAllAdInfo(userId);
    res.status(200).json(adInfo);
  } catch (error) {
    console.error("Error getting ad info:", error);
    res.status(500).json({ message: "Error getting ad info" });
  }
};

// Upload advertisement info 
const uploadAdInfoController = async (req, res) => {
  try {
    // Extract ad information from the request body
    const { Title, Description, Status, Type } = req.body;

    // Validate required fields (here, only Title is required; adjust as needed)
    if (!Title) {
      return res.status(400).json({ message: "Missing required ad information: Title is required" });
    }

    // Retrieve the current user's ID from the session or auth middleware
    // For example, if your authentication middleware sets req.user:
    const user = req.session.user
    const currentUserId = user.UserId || "Unknown";

    // Build the ad info object (AdId will be generated in the model)
    const adInfo = {
      Title,
      Description,
      Status,
      Type,
    };

    const result = await uploadAdInfo(adInfo, currentUserId);

    res.status(200).json({
      message: "Ad info uploaded successfully",
      result,
    });
  } catch (error) {
    console.error("Error uploading ad info:", error);
    res.status(500).json({ message: "Error uploading ad info", error: error.message });
  }
};

export { getAllAdInfoController, uploadAdInfoController };