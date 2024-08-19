/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing tokens
import api from '../api'; // Your configured Axios instance or API utility
import { sendPasswordResetEmail as apiSendPasswordResetEmail } from '../api/authService'; // Import API function

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State for user and authentication errors
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle user login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      await AsyncStorage.setItem('token', token); // Store token
      setUser(user);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.msg || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user registration
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      await AsyncStorage.setItem('token', token); // Store token
      setUser(user);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.msg || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    setUser(null);
    setAuthError(null);
    await AsyncStorage.removeItem('token'); // Remove token
  };

  // Function to fetch the currently authenticated user's profile
  const loadUserProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await api.get('/users/me', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(response.data);
        setAuthError(null);
      }
    } catch (error) {
      setAuthError(error.response?.data?.msg || 'Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };

  // Function to check if user is authenticated and fetch their profile
  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      await loadUserProfile();
    }
  };

  // Function to handle password reset email
  const sendPasswordResetEmail = async (email) => {
    return await apiSendPasswordResetEmail(email);
  };

  // Initialize by checking authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Context value to be passed to consuming components
  const contextValue = {
    user,
    authError,
    loading,
    login,
    register,
    logout,
    loadUserProfile,
    sendPasswordResetEmail,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
