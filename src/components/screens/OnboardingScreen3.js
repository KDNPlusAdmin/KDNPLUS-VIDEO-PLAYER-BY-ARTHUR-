/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const OnboardingScreen3 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleGetStarted = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    }
    // Clear any existing error
    setEmailError('');

    // Navigate to the next screen or home screen after validation
    navigation.navigate('HomeScreen'); // Replace with the actual home screen name
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
        <TouchableOpacity onPress={() => navigation.navigate('CreateYourAccount')}>
          <Text style={styles.navigationText}>Create Your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
          <Text style={styles.navigationText}>Edit Your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.navigationText}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InterestSelectionScreen')}>
          <Text style={styles.navigationText}>Interest Selection</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navigationText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails')}>
          <Text style={styles.navigationText}>Movie Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingScreen1')}>
          <Text style={styles.navigationText}>Onboarding Screen 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingScreen2')}>
          <Text style={styles.navigationText}>Onboarding Screen 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingScreen3')}>
          <Text style={styles.navigationText}>Onboarding Screen 3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={styles.navigationText}>Password Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.navigationText}>Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.navigationText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('VideoQualitySettings')}>
          <Text style={styles.navigationText}>Video Quality Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WhoIsWatching')}>
          <Text style={styles.navigationText}>Who Is Watching</Text>
        </TouchableOpacity>
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
