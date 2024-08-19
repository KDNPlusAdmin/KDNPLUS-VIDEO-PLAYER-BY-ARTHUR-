import axios from 'axios';

const API_URL = 'https://your-api-url.com'; // Replace with your API URL

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (token, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userData.id}`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Add other profile-related API functions similarly
