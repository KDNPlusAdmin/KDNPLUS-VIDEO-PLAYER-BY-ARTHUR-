/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

const OnboardingScreen3 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleGetStarted = async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Clear any existing error
    setEmailError('');

    try {
      // API call to submit email
      const response = await axios.post(`${API_BASE_URL}/submit-email`, { email });

      // Handle response from the API
      if (response.status === 200) {
        Alert.alert('Success', 'Email submitted successfully!');
        // Navigate to the next screen or home screen
        navigation.navigate('HomeScreen'); // Replace with the actual home screen name
      } else {
        Alert.alert('Error', 'Failed to submit email. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit email. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
        <Image source={require('../assets/closeIcon.png')} style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Watch your favorite shows everywhere</Text>
      <TextInput
        style={[styles.input, emailError && styles.inputError]}
        placeholder="Enter Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (emailError && text !== '') {
            setEmailError('');
          }
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        accessible={true}
        accessibilityLabel="Enter your email"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted} accessible={true} accessibilityLabel="Get Started">
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Navigation to Other Screens */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateProfile')}>
          <Text style={styles.navigationText}>Create Profile</Text>
        </TouchableOpacity>
        {/* Additional navigation options */}
      </View>

      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  navigationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  navigationText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 5,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'red',
  },
});

export default OnboardingScreen3;
