import { createAdCampaign, getAllAdCampaign, updateAdCampaign } from "../models/adCampaign.js";

const createAdCampaignController = async (req, res) => {
  try {
    const sanitizedBody = {};
    Object.keys(req.body).forEach((key) => {
      sanitizedBody[key.trim()] = req.body[key];
    });

    // Retrieve the company name and user data from session
    const companyName = sanitizedBody.Company?.trim();
    const user = {
      name: req.session.user.Name,
      company: req.session.user.Company,
    };

    // Create a new ad campaign using the provided details and user info
    const response = await createAdCampaign(req.body, user);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error during AdCampaign creation:", error);
    res.status(500).json({ message: "Login failed while creatig an ad." });
  }
};

const getAllAdCampaignController = async (req, res) => {
  try {
    // Retrieve all ad campaigns from DynamoDB
    const allAdCampaigns = await getAllAdCampaign();

    // Log which ad campaigns are being viewed
    console.log(`User ${req.session?.user?.Name || "Unknown"} is viewing ad campaigns:`);
    allAdCampaigns.forEach((campaign) => {
      console.log(`Campaign ID: ${campaign.CampaignId}, Name: ${campaign.Name}`);
    });

    res.status(200).json({ success: true, data: allAdCampaigns });
  } catch (error) {
    console.error("Error retrieving AdCampaign:", error);
    res.status(500).json({ message: "Login failed while retrieving an ad." });
  }
};

const updateAdCampaignController = async (req, res) => {
  try {
    const { campaignId } = req.params; // Extract campaign ID from URL
    const updatedData = req.body;

    if (!campaignId) {
      return res.status(400).json({ message: "Campaign ID is required" });
    }

    const response = await updateAdCampaign(campaignId, updatedData);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating AdCampaign:", error);
    res.status(500).json({ message: "Error updating AdCampaign" });
  }
};

export { createAdCampaignController, getAllAdCampaignController, updateAdCampaignController };
