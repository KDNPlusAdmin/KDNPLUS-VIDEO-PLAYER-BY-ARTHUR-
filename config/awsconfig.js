/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
// config/awsconfig.js
require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = AWS;
