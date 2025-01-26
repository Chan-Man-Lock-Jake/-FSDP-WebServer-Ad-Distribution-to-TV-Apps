import { dynamoDB } from './dynamodb.js';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

async function getAllAdInfo() {
  const params = {
    TableName: 'AdInfo',
    ProjectionExpression: '#adID, #title, #description, #status, #type, #editedBy',
    ExpressionAttributeNames: {
      '#adID': 'AdId',          // Map AdID
      '#title': 'Title',        // Map Title
      '#description': 'Description', // Map Description
      '#status': 'Status',      // Map Status (reserved keyword)
      '#type': 'Type',          // Map Type
      '#editedBy': 'EditedBy',  // Map EditedBy
    },
  };

  try {
    const { Items } = await dynamoDB.send(new ScanCommand(params));
    // Map and return formatted data
    return Items.map((item) => ({
      AdId: item.AdId,
      Title: item.Title,
      Description: item.Description,
      Status: item.Status,
      Type: item.Type,
      EditedBy: item.EditedBy,
    }));
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
}

export { getAllAdInfo };
