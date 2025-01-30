import { dynamoDB } from './dynamodb.js';
import { PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'AdCampaign'; // DynamoDB table

async function createAdCampaign(adCampaignDetails) {
    try {
        const params = {
            TableName: TABLE_NAME,
            Item: {
                CampaignId: `CMP${Math.floor(1000000 + Math.random() * 9000000)}`, // Generate a unique ID for the campaign
                Name:           adCampaignDetails.name,
                Objective:      adCampaignDetails.objective         || '',
                Demographic:    adCampaignDetails.demographic       || '',
                AgeRange:       adCampaignDetails.ageRange          || '',
                Polls:          adCampaignDetails.polls             || '',
                ShareRate:      adCampaignDetails.shareRate         || '',
                InteractionRate:adCampaignDetails.interactionRate   || '',
                Advertisement:  adCampaignDetails.advertisement,
                Date:           adCampaignDetails.date,
                StartTime:      adCampaignDetails.startTime,
                EndTime:        adCampaignDetails.endTime,
                Duration:       adCampaignDetails.duration,
                Interval:       adCampaignDetails.interval,
                CreationDate:   new Date().toISOString(),
                Author:         adCampaignDetails.author,
            }
        };

        await dynamoDB.send(new PutCommand(params));
        return { message: 'New AdCampaign created successfully' };
    } catch (error) {
        console.error('Error creating a new AdCampaign:', error);
        throw new Error('Error creating a new AdCampaign');
    }
}

async function getAllAdCampaign() {
    const params = {
        TableName: TABLE_NAME,
    }
    try {
        const { Items } = await dynamoDB.send(new ScanCommand(params));
        // return Items.map((item) => ({
        //     id:             item.CampaignId,
        //     name:           item.CampaignName,
        //     objective:      item.CampaignObjective,
        //     demographic:    item.CampaignDemographic,
        //     ageRange:       item.CampaignAgeRange,
        //     polls:          item.CampaignPolls,
        //     shareRate:      item.CampaignShareRate,
        //     interactionRate:item.CampaignInteractionRate,
        //     advertisement:  item.CampaignAdvertisement,
        //     date:           item.CampaignDate,
        //     startTime:      item.CampaignStartTime,
        //     duration:       item.CampaignDuration,
        //     interval:       item.CampaignInterval,
        //     creationDate:   item.CampaignCreationDate,
        //     author:         item.CampaignAuthor,
        // }));
        return Items;
    } catch (error) {
        console.error('Error getting all AdCampaign:', error);
        throw new Error('Error getting all AdCampaign');
    }
}

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

const createCampaign = async (campaign, req) => {
    if (!req.session || !req.session.user) {
        throw new Error('User not logged in or session expired');
    }

    const params = {
        TableName: 'AdCampaign',
        Item: {
            CampaignID: `CMP${Math.floor(1000000 + Math.random() * 9000000)}`, // Generate a unique ID for the campaign
            CampaignAud: campaign.CampaignAud,
            PerformanceMetrics: campaign.PerformanceMetrics,
            CampaignStatus: campaign.CampaignStatus,
            CreatedAt: new Date().toISOString(), // Store the current timestamp
            CreatedBy: req.session.user.UserID // Reference the user ID from the session
            // Find a way to store schedule
        },
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        console.log(`Campaign created successfully by user: ${req.session.user.UserID}`);
        return { message: 'Campaign created successfully' };
    } catch (error) {
        console.error('Error creating campaign:', error);
        throw new Error('Error creating campaign');
    }
};

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

export { createAdCampaign, getAllAdCampaign };
