import { dynamoDB } from './dynamodb.js';
import { PutCommand, ScanCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'AdCampaign'; // DynamoDB table

async function createAdCampaign(adCampaignDetails, user) {
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
                Author:         user.name,
                TvGroup:        adCampaignDetails.tvGroup           || '',
                Company:        user.company,
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
        return Items;
    } catch (error) {
        console.error('Error getting all AdCampaign:', error);
        throw new Error('Error getting all AdCampaign');
    }
}

export { createAdCampaign, getAllAdCampaign };
