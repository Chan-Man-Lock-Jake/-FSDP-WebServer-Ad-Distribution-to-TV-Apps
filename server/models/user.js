import { dynamoDB } from './dynamodb.js';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcrypt';


// Create new user
const createUser = async (user) => {
    const fetchParams = {
        TableName: 'User',
        ProjectionExpression: 'UserId',
    };

    try {
        const result = await dynamoDB.send(new ScanCommand(fetchParams));
        let lastUserId = 'U00000';

        if (result.Items && result.Items.length > 0) {
            const sortedUsers = result.Items.sort((a, b) => b.UserId.localeCompare(a.UserId));
            lastUserId = sortedUsers[0].UserId;
        }

        const userIdNumber = parseInt(lastUserId.slice(1), 10) + 1;
        const newUserId = `U${String(userIdNumber).padStart(5, '0')}`;

        const hashedPassword = await bcrypt.hash(user.Password, 10);

        const params = {
            TableName: 'User',
            Item: {
                UserId: newUserId,
                Name: user.Name,
                Email: user.Email,
                Password: hashedPassword,
                Role: 'Admin',
                Status: 'Approved',
                CreatedAt: new Date().toISOString(),
            },
        };

        await dynamoDB.send(new PutCommand(params));
        console.log('User added successfully');
        return { message: 'User created successfully', UserId: newUserId };
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Error adding user');
    }
};

// User login
const userLogin = async (email, password) => {
    const params = {
        TableName: 'User',
        FilterExpression: 'Email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };

    try {
        const result = await dynamoDB.send(new ScanCommand(params));

        if (result.Items && result.Items.length > 0) {
            const foundUser = result.Items[0];

            if (!(await bcrypt.compare(password, foundUser.Password))) {
                return { success: false, message: 'Invalid email or password' };
            }

            if (foundUser.Status !== 'Approved') {
                return { success: false, message: 'Your account is not approved yet. Please contact support.' };
            }

            return {
                success: true,
                message: 'Login successful',
                user: {
                    UserID: foundUser.UserId,
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
