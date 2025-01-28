import { dynamoDB } from './dynamodb.js';
import { PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'AdCampaign'; // DynamoDB table

// Add ad campaign to table
async function addCampaign(campaign) {
    const params = {
        TableName: TABLE_NAME,
        Item: campaign,
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        return { message: "Ad Campaign added successfully" };
    } catch (error) {
        console.error('Error adding Ad Campaign:', error);
        throw error;
    }
}



// Delete campaign from the table by either CampaignID or CampaignName
async function deleteCampaign({ CampaignID, CampaignName }) {
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
}

export { addCampaign, deleteCampaign };
