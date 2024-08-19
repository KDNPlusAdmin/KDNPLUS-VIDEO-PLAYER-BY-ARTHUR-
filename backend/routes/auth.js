/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to register a user
  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      setUser(response.data.user);
      return { success: true, message: 'User registered successfully' };
    } catch (error) {
      console.error('Error registering user', error);
      return { success: false, message: 'Error registering user' };
    }
  };

  // Function to login a user
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      return { success: true, message: 'User logged in successfully' };
    } catch (error) {
      console.error('Error logging in user', error);
      return { success: false, message: 'Error logging in user' };
    }
  };

  // Function to get current user profile
  const getUserProfile = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Error fetching user profile', error);
      return { success: false, message: 'Error fetching user profile' };
    }
  };

  // Function to update user profile
  const updateUserProfile = async (name, email) => {
    try {
      const response = await axios.put('/api/auth/me', { name, email });
      setUser(response.data);
      return { success: true, message: 'User profile updated successfully' };
    } catch (error) {
      console.error('Error updating user profile', error);
      return { success: false, message: 'Error updating user profile' };
    }
  };

  // Function to send a password reset email
  const sendPasswordResetEmail = async (email) => {
    try {
      const response = await axios.post('/api/auth/password-reset/request', { email });
      return { success: true, message: response.data.msg };
    } catch (error) {
      console.error('Error sending reset email', error);
      return { success: false, message: error.response.data.msg || 'Error sending reset email' };
    }
  };

  // Function to reset password
  const resetPassword = async (email, token, newPassword) => {
    try {
      const response = await axios.post('/api/auth/password-reset', { email, token, newPassword });
      return { success: true, message: response.data.msg };
    } catch (error) {
      console.error('Error resetting password', error);
      return { success: false, message: error.response.data.msg || 'Error resetting password' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        error,
        registerUser,
        loginUser,
        getUserProfile,
        updateUserProfile,
        sendPasswordResetEmail,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
