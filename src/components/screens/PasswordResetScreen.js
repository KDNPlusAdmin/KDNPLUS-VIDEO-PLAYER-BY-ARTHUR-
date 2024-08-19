/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios'; // or your preferred HTTP client
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    color: '#fff',
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
});

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSendResetEmail = async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/send-password-reset-email`, { email });
      if (response.status === 200) {
        // Handle successful email sending
        setIsLoading(false);
        Alert.alert(
          'Success',
          'Password reset email sent successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('PasswordResetSuccess'), // Replace with actual screen name
            },
          ],
          { cancelable: false }
        );
      } else {
        setErrorMessage('Failed to send reset email. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        // The request was made, but the server responded with a status code that falls out of the range of 2xx
        setErrorMessage(error.response.data.message || 'Server error. Please try again later.');
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('Error sending reset email');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff', marginBottom: 20 }}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Enter your email address"
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {isLoading ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : (
        <Button title="Send Reset Email" onPress={handleSendResetEmail} color="#ff0000" />
      )}
    </View>
  );
};

export default ForgotPasswordScreen;
