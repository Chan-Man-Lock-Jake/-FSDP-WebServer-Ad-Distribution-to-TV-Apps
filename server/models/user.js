import { dynamoDB } from './dynamodb.js';
import { s3 } from './s3.js'
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3'

// Create new user
const createUser = async (user) => {
    // Fetch the last UserId
    const fetchParams = {
        TableName: 'User',
        ProjectionExpression: 'UserId',
    };

    try {
        const result = await dynamoDB.send(new ScanCommand(fetchParams));
        let lastUserId = 'U00000'; // Default starting UserId if no users exist

        if (result.Items && result.Items.length > 0) {
            // Sort UserIds in descending order to get the latest
            const sortedUsers = result.Items.sort((a, b) => b.UserId.localeCompare(a.UserId));
            lastUserId = sortedUsers[0].UserId; // Get the last UserId
        }

        // Increment the UserId
        const userIdNumber = parseInt(lastUserId.slice(1), 10) + 1; // Extract numeric part and increment
        const newUserId = `U${String(userIdNumber).padStart(5, '0')}`; // Format back to 'UXXXXX'

        // Define parameters for adding a new user
        const params = {
            TableName: 'User',
            Item: {
                UserId: newUserId, // Use the incremented UserId
                Name: user.Name,
                Email: user.Email,
                Password: user.Password,
                Role: user.Role || 'User', // Default role to 'User' if not provided
                CreatedAt: new Date().toISOString(), // Store the current timestamp
            },
        };

        // Insert the new user into the database
        await dynamoDB.send(new PutCommand(params));
        console.log('User added to database successfully.');

        // Return a success message
        return { message: 'User added successfully', UserId: newUserId };
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Error adding user');
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

            // Check if the user's status is approved
            if (foundUser.Status !== 'Approved') {
                return {
                    success: false,
                    message: 'Your account is not approved yet. Please contact support.',
                };
            }

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

export { createUser, userLogin, createCampaign };




