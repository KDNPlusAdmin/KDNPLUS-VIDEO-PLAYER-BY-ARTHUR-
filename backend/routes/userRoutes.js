/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUserDetails, deleteUser } = require('../controllers/userController');

// Define routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserDetails);
router.delete('/users/:id', deleteUser);

module.exports = router;
