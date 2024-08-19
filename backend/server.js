/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
// server.js

// Import dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('./config/awsConfig'); // Import AWS configuration
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize AWS DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

// API Endpoint: Register a new user
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const params = {
        TableName: 'Users',
        Item: {
            userId: uuidv4(),
            email,
            password: hashedPassword,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// API Endpoint: Login a user
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const params = {
        TableName: 'Users',
        Key: {
            email,
        },
    };

    try {
        const data = await dynamoDb.get(params).promise();
        if (!data.Item) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(password, data.Item.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = jwt.sign({ userId: data.Item.userId }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

// API Endpoint: Get user profile
app.get('/api/users/me', authenticateToken, async (req, res) => {
    const params = {
        TableName: 'Users',
        Key: {
            userId: req.user.userId,
        },
    };

    try {
        const data = await dynamoDb.get(params).promise();
        res.send(data.Item);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Error fetching user profile');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
