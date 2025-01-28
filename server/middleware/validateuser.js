import { dynamoDB } from '../models/dynamodb.js';
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const validateUser = async (req, res, next) => {
    const user = req.body;
    const errors = [];

    // Validate email
    if (!user.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.Email)) {
        errors.push('Email must be a valid email address.');
    }

    // Validate password
    if (!user.Password || typeof user.Password !== 'string' || user.Password.length < 8) {
        errors.push('Password is required and must be at least 8 characters long.');
    }

    // Validate if company name already exists 
    if (user.Company) {
        try {
            const companyParams = {
                TableName: 'User',
                FilterExpression: 'Company = :company',
                ExpressionAttributeValues: {
                    ':company': user.Company,
                },
            };
            const companyResult = await dynamoDB.send(new ScanCommand(companyParams));

            if (companyResult.Items && companyResult.Items.length > 0) {
                errors.push(`Company "${user.Company}" already exists.`);
            }
        } catch (error) {
            console.error('Error checking company existence:', error);
            errors.push('Internal server error while checking company.');
        }
    }

    // Check if UserId already exists
    if (user.UserId) {
        try {
            const userIdParams = {
                TableName: 'User',
                Key: { UserId: user.UserId },
            };
            const userIdResult = await dynamoDB.send(new GetCommand(userIdParams));

            if (userIdResult.Item) {
                errors.push(`UserId "${user.UserId}" already exists.`);
            }
        } catch (error) {
            console.error('Error checking UserId existence:', error);
            errors.push('Internal server error while checking UserId.');
        }
    }

    // Check if contact number exists
    if (user.UserCtcNumber) {
        try {
            const contactParams = {
                TableName: 'User',
                FilterExpression: 'ContactNumber = :contact',
                ExpressionAttributeValues: {
                    ':contact': user.UserCtcNumber,
                },
            };
            const contactResult = await dynamoDB.send(new ScanCommand(contactParams));

            if (contactResult.Items && contactResult.Items.length > 0) {
                errors.push(`Contact number "${user.UserCtcNumber}" already exists.`);
            }
        } catch (error) {
            console.error('Error checking contact number existence:', error);
            errors.push('Internal server error while checking contact number.');
        }
    }

    // Check if email already exists
    try {
        const emailParams = {
            TableName: 'User',
            FilterExpression: 'Email = :email',
            ExpressionAttributeValues: {
                ':email': user.Email,
            },
        };
        const emailResult = await dynamoDB.send(new ScanCommand(emailParams));

        if (emailResult.Items && emailResult.Items.length > 0) {
            errors.push(`Email "${user.Email}" already exists.`);
        }
    } catch (error) {
        console.error('Error checking email existence:', error);
        errors.push('Internal server error while checking email.');
    }

    // If there are errors, respond with a 400 status and error details
    if (errors.length > 0) {
        console.error('Validation errors:', errors);
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next(); 
};

export { validateUser };
