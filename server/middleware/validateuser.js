import { dynamoDB } from '../models/dynamodb.js';
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const validateUser = async (req, res, next) => {
    const user = req.body;
    const errors = [];

    if (!user.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.Email)) {
        errors.push('Email must be a valid email address.');
    }

    if (!user.Password || typeof user.Password !== 'string' || user.Password.length < 8) {
        errors.push('Password is required, must be at least 8 characters long.');
    }

    // Check if company name already exists
    if (user.CompanyName) {
        try {
            const companyNameParams = {
                TableName: 'User',
                FilterExpression: 'CompanyName = :companyName',
                ExpressionAttributeValues: {
                    ':companyName': user.CompanyName,
                },
            };
            const companyNameResult = await dynamoDB.send(new ScanCommand(companyNameParams));

            if (companyNameResult.Items && companyNameResult.Items.length > 0) {
                errors.push(`CompanyName "${user.CompanyName}" already exists.`);
            }
        } catch (error) {
            console.error('Error checking CompanyName existence:', error);
            errors.push('Internal server error while checking CompanyName.');
        }
    }


    // Check if UserID already exists in the database
    if (user.UserID) {
        try {
            const userIdParams = {
                TableName: 'User',
                Key: { UserID: user.UserID },
            };
            const userIdResult = await dynamoDB.send(new GetCommand(userIdParams));

            if (userIdResult.Item) {
                errors.push(`UserID ${user.UserID} already exists.`);
            }
        } catch (error) {
            console.error('Error checking UserID existence:', error);
            errors.push('Internal server error while checking UserID.');
        }
    }

    // Check if UserCtcNumber exists in the database
    try {
        const contactScanParams = {
            TableName: 'User',
            FilterExpression: 'UserCtcNumber = :contact',
            ExpressionAttributeValues: {
                ':contact': user.UserCtcNumber,
            },
        };
        const contactScanResult = await dynamoDB.send(new ScanCommand(contactScanParams));

        if (contactScanResult.Items && contactScanResult.Items.length > 0) {
            errors.push(`Contact number ${user.UserCtcNumber} already exists.`);
        }
    } catch (error) {
        console.error('Error checking contact number existence:', error);
    }

    // Check if Email exists in the database
    try {
        const emailScanParams = {
            TableName: 'User',
            FilterExpression: 'Email = :email',
            ExpressionAttributeValues: {
                ':email': user.Email,
            },
        };
        const emailScanResult = await dynamoDB.send(new ScanCommand(emailScanParams));

        if (emailScanResult.Items && emailScanResult.Items.length > 0) {
            errors.push(`Email ${user.Email} already exists.`);
        }
    } catch (error) {
        console.error('Error checking email existence:', error);
    }

    // Log all errors if any exist
    if (errors.length > 0) {
        console.error('Validation errors:', errors);
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next(); 
};

export { validateUser };
