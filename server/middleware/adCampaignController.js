import { dynamoDBClient } from '../dynamodb.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

export const saveCampaign = async (req, res) => {
  const campaign = req.body;

  try {
    const params = {
      TableName: 'CampaignTable',
      Item: campaign,
    };
    await dynamoDBClient.send(new PutCommand(params));
    res.status(200).json({ message: 'Campaign saved successfully!' });
  } catch (error) {
    console.error('Error saving campaign:', error);
    res.status(500).json({ message: 'Error saving campaign', error });
  }
};
