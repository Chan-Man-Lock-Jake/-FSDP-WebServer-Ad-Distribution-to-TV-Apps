import { dynamoDB } from './dynamodb.js';
import { ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

async function getAllAdInfo(userId) {
  const params = {
    TableName: 'AdInfo',
    ProjectionExpression: '#adID, #title, #description, #status, #type, #editedBy',
    // Filter the results to only include records where EditedBy matches the userId.
    FilterExpression: "#editedBy = :userId",
    ExpressionAttributeNames: {
      '#adID': 'AdId',          // Map AdId
      '#title': 'Title',        // Map Title
      '#description': 'Description', // Map Description
      '#status': 'Status',      // Map Status (reserved keyword)
      '#type': 'Type',          // Map Type
      '#editedBy': 'EditedBy',  // EditedBy contains the UserId
    },
    ExpressionAttributeValues: {
      ":userId": userId,  // Use a consistent key (lowercase 'userId')
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
};

// Helper function to generate a new AdId in the format A00001, A00002, etc.
async function generateNewAdId() {
  // Set up the scan parameters
  const params = {
    TableName: 'AdInfo',
    ProjectionExpression: 'AdId',
  };

  try {
    // Send the scan command to DynamoDB
    const result = await dynamoDB.send(new ScanCommand(params));

    // Default last AdId if none exist yet
    let lastAdId = 'A00000';

    if (result.Items && result.Items.length > 0) {
      // Sort the items in descending order based on AdId using localeCompare
      const sortedAds = result.Items.sort((a, b) => b.AdId.localeCompare(a.AdId));
      lastAdId = sortedAds[0].AdId;
    }

    // Parse the numeric portion of the last AdId, add one, and pad with leading zeros
    const adIdNumber = parseInt(lastAdId.slice(1), 10) + 1;
    return `A${String(adIdNumber).padStart(5, '0')}`;
  } catch (error) {
    console.error("Error generating new AdId:", error);
    throw error;
  }
};

// Main function to upload advertisement info
async function uploadAdInfo(adInfo, currentUserId) {
  try {
    // Generate a new sequential AdId
    const newAdId = await generateNewAdId();

    // Build the parameters for DynamoDB. Use currentUserId for EditedBy.
    const params = {
      TableName: 'AdInfo',
      Item: {
        AdId: newAdId,            // Auto-generated AdId
        Title: adInfo.Title,      // Title of the advertisement
        Description: adInfo.Description, // Description of the advertisement
        Status: "Not Pushed",    // Status (e.g., "finalized", "draft")
        Type: adInfo.Type,        // Type of the ad (if needed)
        EditedBy: currentUserId,  // Use the user ID from session/user data
      },
    };

    await dynamoDB.send(new PutCommand(params));
    // Return a success object or the ad info if needed
    return { success: true, adInfo: params.Item };
  } catch (error) {
    console.error("Error uploading ad info:", error);
    throw error;
  }
};

export { getAllAdInfo, uploadAdInfo };
