import { createS3Bucket, uploadFile } from "../models/s3Model.js";

// Controller: Create a bucket
export const createBucketController = async (req, res) => {
  const { bucketName } = req.body; // Get bucket name from request body

  try {
    const result = await createS3Bucket(bucketName);
    res.status(200).json({ message: "Bucket created successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error creating bucket", error: error.message });
  }
};

// Controller: Upload a file to the S3 bucket
export const uploadFileController = async (req, res) => {
  const { bucketName, folderName, fileName, fileContent } = req.body; // Get necessary data from request

  try {
    const result = await uploadFile(bucketName, folderName, fileName, fileContent);
    res.status(200).json({ message: "File uploaded successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
};
