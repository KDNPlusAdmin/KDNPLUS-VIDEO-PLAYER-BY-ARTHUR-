/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const dynamoDb = require('../config/awsconfig');

// Get all users
const getAllUsers = async (req, res) => {
    const params = {
        TableName: 'Users',
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        res.json(data.Items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: 'Users',
        Key: { userId: id },
    };

    try {
        const { Item: user } = await dynamoDb.get(params).promise();
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update user details
const updateUserDetails = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateParams = {
        TableName: 'Users',
        Key: { userId: id },
        UpdateExpression: 'set #name = :name, email = :email',
        ExpressionAttributeNames: {
            '#name': 'name',
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':email': email,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    try {
        const result = await dynamoDb.update(updateParams).promise();
        res.json(result.Attributes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: 'Users',
        Key: { userId: id },
    };

    try {
        await dynamoDb.delete(params).promise();
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserDetails,
    deleteUser,
};
