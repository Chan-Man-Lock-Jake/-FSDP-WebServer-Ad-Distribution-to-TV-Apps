import { dynamoDB } from "./dynamodb.js";
import { PutCommand, ScanCommand, DeleteCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "AdCampaign"; // DynamoDB table

async function createAdCampaign(adCampaignDetails, user) {
  try {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        CampaignId: `CMP${Math.floor(1000000 + Math.random() * 9000000)}`, // Generate a unique ID for the campaign
        Name: adCampaignDetails.name,
        Objective: adCampaignDetails.objective || "",
        Demographic: adCampaignDetails.demographic || "",
        AgeRange: adCampaignDetails.ageRange || "",
        Polls: adCampaignDetails.polls || "",
        ShareRate: adCampaignDetails.shareRate || "",
        InteractionRate: adCampaignDetails.interactionRate || "",
        Advertisement: adCampaignDetails.advertisement,
        Date: adCampaignDetails.date,
        StartTime: adCampaignDetails.startTime,
        EndTime: adCampaignDetails.endTime,
        Duration: adCampaignDetails.duration,
        Interval: adCampaignDetails.interval,
        CreationDate: new Date().toISOString(),
        Author: user.name,
        TvGroup: adCampaignDetails.tvGroup || "",
        Company: user.company,
      },
    };
    await dynamoDB.send(new PutCommand(params));
    return { message: "New AdCampaign created successfully" };
  } catch (error) {
    console.error("Error creating a new AdCampaign:", error);
    throw new Error("Error creating a new AdCampaign");
  }
}

async function getAllAdCampaign() {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const { Items } = await dynamoDB.send(new ScanCommand(params));
    return Items;
  } catch (error) {
    console.error("Error getting all AdCampaign:", error);
    throw new Error("Error getting all AdCampaign");
  }
}

async function updateAdCampaign(campaignId, updatedData) {
  try {
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    // Update the Name field if provided (using ExpressionAttributeNames since Name is a reserved word)
    if (updatedData.Name !== undefined) {
      updateExpressions.push("#N = :name");
      expressionAttributeValues[":name"] = updatedData.Name;
      expressionAttributeNames["#N"] = "Name";
    }

    // Update the Objective field if provided
    if (updatedData.Objective !== undefined) {
      updateExpressions.push("Objective = :objective");
      expressionAttributeValues[":objective"] = updatedData.Objective;
    }

    // Update the TvGroup field if provided
    if (updatedData.TvGroup !== undefined) {
      updateExpressions.push("TvGroup = :tvGroup");
      expressionAttributeValues[":tvGroup"] = updatedData.TvGroup;
    }

    // Update the Demographic field if provided
    if (updatedData.Demographic !== undefined) {
      updateExpressions.push("Demographic = :demographic");
      expressionAttributeValues[":demographic"] = updatedData.Demographic;
    }

    if (updateExpressions.length === 0) {
      throw new Error("No valid fields to update");
    }

    const params = {
      TableName: TABLE_NAME,
      Key: { CampaignId: campaignId },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: "ALL_NEW",
    };

    const response = await dynamoDB.send(new UpdateCommand(params));
    return { message: "AdCampaign updated successfully", updatedCampaign: response.Attributes };
  } catch (error) {
    console.error("Error updating AdCampaign:", error);
    throw new Error("Error updating AdCampaign");
  }
}

export { createAdCampaign, getAllAdCampaign, updateAdCampaign };