import { retrieveAllFilesFromFolder } from '../models/s3.js';
import { dynamoDB } from '../models/dynamodb.js';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

const retrieveAllFilesS3Controller = async (req,res) => {
    const { bucketName, folderName } = req.body;

    try {
        const result = await retrieveAllFilesFromFolder(bucketName, folderName);
    } catch (error) {
        res.status(500).send('Error retrieving files from s3');
    }
};

export { retrieveAllFilesS3Controller };
