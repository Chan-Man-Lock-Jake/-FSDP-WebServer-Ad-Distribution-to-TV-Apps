import { dynamoDB } from './dynamodb.js';
import { s3 } from './s3.js'
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3'

// Create new user
const createUser = async (user) => {
    const params = {
        TableName: 'User',
        Item: {
            UserID: `ACC${Math.floor(1000000 + Math.random() * 9000000)}`, // Generate a 7-digit random UserID
            Name: user.Name,
            UserCtcNo: user.UserCtcNo,
            CompanyName: user.CompanyName,
            Email: user.Email,
            Password: user.Password,
            Role: `Admin`
        },
    };

      try {
        await dynamoDB.send(new PutCommand(params));
        console.log('User added to database successfully.');

        const bucketName = user.CompanyName.toLowerCase().replace(/\s+/g, '-') + '-bucket'; // Convert to lowercase and replace spaces with dashes
        console.log(`Creating S3 bucket: ${bucketName}`);

        // Create bucket
        await s3.send(new CreateBucketCommand({ Bucket: bucketName }));

        // Add folders to the S3 bucket
        const folders = ['interactive/', 'scrolling/', 'video/', 'advertisement/'];
        for (const folder of folders) {
            const folderParams = {
                Bucket: bucketName,
                Key: folder, // S3 folders are created by adding objects with trailing slashes in the key
                Body: '', // Empty body to create a folder
            };
            await s3.send(new PutObjectCommand(folderParams));
            console.log(`Folder "${folder}" created in bucket "${bucketName}".`);
        }

        return { message: 'User added to database and S3 bucket created successfully' };
    } catch (error) {
        console.error('Error creating user or S3 bucket:', error);
        throw new Error('Error adding user and setting up S3 bucket');
    }
};

// User login
const userLogin = async (email, password) => {
    if (!email || !password) {
        throw new Error('Email and Password are required for login.');
    }

    const params = {
        TableName: 'User',
        FilterExpression: 'Email = :email AND Password = :password',
        ExpressionAttributeValues: {
            ':email': email,
            ':password': password,
        },
    };

    try {
        const result = await dynamoDB.send(new ScanCommand(params));

        if (result.Items && result.Items.length > 0) {
            const foundUser = result.Items[0];
            return {
                success: true,
                message: 'Login successful',
                user: {
                    UserID: foundUser.UserID,
                    Name: foundUser.Name,
                    Role: foundUser.Role,
                },
            };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed');
    }
};

export { createUser, userLogin };




