import { dynamoDB } from './dynamodb.js';
import { s3 } from './s3.js';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import bcrypt from 'bcrypt';

const createUser = async (user) => {
    // Validate input fields
    if (!user.Name || !user.Email || !user.Password || !user.Company) {
        throw new Error('Empty fields are not allowed');
    }

    let newUserId;
    let bucketName;

    try {
        // Fetch existing users to determine the last UserId
        const fetchParams = {
            TableName: 'User',
            ProjectionExpression: 'UserId',
        };
        const result = await dynamoDB.send(new ScanCommand(fetchParams));

        let lastUserId = 'U00000';
        if (result.Items && result.Items.length > 0) {
            const sortedUsers = result.Items.sort((a, b) => b.UserId.localeCompare(a.UserId));
            lastUserId = sortedUsers[0].UserId;
        }

        const userIdNumber = parseInt(lastUserId.slice(1), 10) + 1;
        newUserId = `U${String(userIdNumber).padStart(5, '0')}`;

        // Create S3 bucket with company name and UserId
        bucketName = `${user.Company.toLowerCase().replace(/[^a-z0-9-]/g, '-')}-${newUserId.toLowerCase()}`;
        try {
            await s3.send(
                new CreateBucketCommand({
                    Bucket: bucketName,
                })
            );
            console.log(`Bucket ${bucketName} created successfully`);

            // Create folders in the bucket
            const folders = ['finalized-advertisement/', 'draft-advertisement/'];
            for (const folder of folders) {
                await s3.send(
                    new PutObjectCommand({
                        Bucket: bucketName,
                        Key: folder,
                    })
                );
            }
            console.log(`Folders created in bucket ${bucketName}`);
        } catch (s3Error) {
            console.error(`Error creating S3 bucket or folders: ${s3Error.message}`);
            throw new Error(`S3 bucket creation failed: ${s3Error.message}`);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.Password, 10);

        const params = {
            TableName: 'User',
            Item: {
                UserId: newUserId,
                Name: user.Name,
                Email: user.Email,
                Password: hashedPassword,
                Role: user.Role || 'Admin', // Default role is Admin
                Status: 'Approved',
                Company: user.Company,
                CreatedAt: new Date().toISOString(),
            },
        };

        // Insert the user into the database
        await dynamoDB.send(new PutCommand(params));
        console.log('User added successfully');

        // Return success message
        return {
            message: `User with ID: ${newUserId} created successfully. Bucket name: ${bucketName}`,
        };
    } catch (error) {
        console.error('Error adding user or creating bucket:', error);

        // Clean up the S3 bucket if it was created but the database operation failed
        if (bucketName) {
            try {
                await s3.send(
                    new DeleteBucketCommand({
                        Bucket: bucketName,
                    })
                );
                console.log(`Rolled back: Bucket ${bucketName} deleted successfully`);
            } catch (cleanupError) {
                console.error(`Failed to delete bucket during rollback: ${cleanupError.message}`);
            }
        }

        throw new Error(error.message || 'Error adding user or creating bucket');
    }
};

// User login
const userLogin = async (req, email, password) => {
  const params = {
    TableName: "User",
    FilterExpression: "Email = :Email", // Match the attribute case
    ExpressionAttributeValues: {
      ":Email": email,
    },
  };

  try {
    const result = await dynamoDB.send(new ScanCommand(params));

    if (result.Items && result.Items.length > 0) {
      const foundUser = result.Items[0];

      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, foundUser.Password);
      if (!isPasswordValid) {
        return { success: false, message: "Invalid email or password" };
      }

      // Check account status
      if (foundUser.Status !== "Approved") {
        return { success: false, message: "Your account is not approved yet. Please contact support." };
      }

      // Store user data in the session
      req.session.user = {
        UserId: foundUser.UserId,
        Name: foundUser.Name,
        Email: foundUser.Email,
        Role: foundUser.Role,
        Status: foundUser.Status,
        Company: foundUser.Company,
        CreatedAt: foundUser.CreatedAt,
      };


      return {
        success: true,
        message: "Login successful",
        user: {
          UserId: foundUser.UserId,
          Name: foundUser.Name,
          Email: foundUser.Email,
          Role: foundUser.Role,
          Status: foundUser.Status,
          Company: foundUser.Company,
          CreatedAt: foundUser.CreatedAt,
        },
      };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};

export { createUser, userLogin };
