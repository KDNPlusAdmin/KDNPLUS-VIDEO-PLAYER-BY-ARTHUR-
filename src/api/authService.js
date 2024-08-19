import axios from 'axios';

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed. Please try again.',
    };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    return {
      success: true,
      message: response.data.message || 'Password reset email sent successfully.',
    };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send password reset email. Please try again.',
    };
  }
};
