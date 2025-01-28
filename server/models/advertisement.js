import { s3 } from "./s3.js";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Retrieve all finalized advertisements
const getAllFinalizedAd = async (companyName, userId) => {
  try {
    const bucketName = `${companyName.toLowerCase().replace(/[^a-z0-9-]/g, "-")}-${userId.toLowerCase()}`;
    console.log("Constructed Bucket Name:", bucketName);

    const prefix = "finalized-advertisement/";
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
      })
    );

    if (data.Contents) {
      const files = await Promise.all(
        data.Contents.map(async (item) => {
          const signedUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: bucketName,
              Key: item.Key,
            }),
            { expiresIn: 3600 }
          );
          return {
            fileName: item.Key.replace(prefix, ""),
            url: signedUrl,
          };
        })
      );
      console.log("Fetched Files:", files);
      return files;
    } else {
      console.log("No files found in bucket.");
      return [];
    }
  } catch (error) {
    console.error("Model Error:", error);
    throw new Error(`Failed to retrieve finalized advertisements: ${error.message}`);
  }
};


// Retrieve finalized adveritsement  
const getFinalizedAd = async (user, fileName) => {
  try {
    const bucketName = `${user.Company.toLowerCase().replace(/[^a-z0-9-]/g, "-")}-${user.UserId.toLowerCase()}`;
    const key = `finalized-advertisement/${fileName}`;

    // Retrieve the object from S3
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const data = await s3.send(command);
    const stream = data.Body; // File content as a readable stream

    return {
      message: `Advertisement retrieved successfully: ${fileName}`,
      fileStream: stream,
    };
  } catch (error) {
    console.error("Error retrieving finalized advertisement:", error.message);
    throw new Error(`Error retrieving advertisement: ${error.message}`);
  }
};

// Upload finalized advertisement 
async function uploadFinalizedAd(user, fileName, fileContent) {
  try {
    if (!user || !user.Company || !user.UserId) {
      throw new Error("Invalid user object: Missing Company or UserId");
    }

    if (!fileName) {
      throw new Error("FileName is required");
    }

    if (!fileContent) {
      throw new Error("FileContent is required");
    }

    // Reconstruct the bucket name using the company name and user ID
    const bucketName = `${user.Company.toLowerCase().replace(/[^a-z0-9-]/g, "-")}-${user.UserId.toLowerCase()}`;

    // Verify if the bucket exists
    try {
      await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
      console.log(`Bucket ${bucketName} exists`);
    } catch (error) {
      console.error(`Bucket ${bucketName} not found: ${error.message}`);
      throw new Error(`Bucket ${bucketName} does not exist`);
    }

    // Define the key (file path) for the finalized advertisement folder
    const key = `finalized-advertisement/${fileName}`;

    // Upload the file to the finalized advertisement folder
    const data = await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
      })
    );

    console.log("File uploaded successfully", data);
    return {
      message: `File uploaded to ${bucketName}/finalized-advertisement/${fileName}`,
      data,
    };
  } catch (error) {
    console.error("Error uploading file:", error.message);
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

// Upload advertisement to socket
async function uploadToSocket(TvGroupId, advertisementLink) {
  
};

export { getAllFinalizedAd, getFinalizedAd, uploadFinalizedAd};
