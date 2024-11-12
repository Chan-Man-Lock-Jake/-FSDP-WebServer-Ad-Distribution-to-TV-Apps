import { addCampaign } from "../models/AdCampaign.js";

const createCampaignController = async (req, res) => {
    try {
        const newCampaign = req.body; 
        const response = await addCampaign(newCampaign) // Adding campaign details to DynamoDB table
        res.status(201).json(response);
    } catch (error) {
        console.error('Error adding campaign:', error);
        res.status(500).json({ message: 'Error adding campaign' });
    }
};

// Delete campaign from the table by either CampaignID or CampaignName
async function deleteCampaignController({ CampaignID, CampaignName }) {
    const params = {
        TableName: TABLE_NAME,
        Key: {}
    };

    if (CampaignID) {
        params.Key.CampaignID = CampaignID;
    } else if (CampaignName) {
        params.Key.CampaignName = CampaignName;
    }

    try {
        await dynamoDB.send(new DeleteCommand(params));
        return { message: "Ad Campaign deleted successfully" };
    } catch (error) {
        console.error('Error deleting Ad Campaign:', error);
        throw error;
    }
};

export { createCampaignController, deleteCampaignController };

