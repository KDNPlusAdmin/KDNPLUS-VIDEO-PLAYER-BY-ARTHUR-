/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next'; // Use the FB SDK for React Native
import axios from 'axios';

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#111',
    marginBottom: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    color: '#fff',
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  socialLoginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});

const LoginScreen = () => {
  const { login, facebookLogin, googleLogin } = useContext(AuthContext); // Access AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Initialize Google Sign-In configuration
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your Google client ID
    });
  }, []);

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handleFacebookLogin = async () => {
    const result = await AccessToken.getCurrentAccessToken();
    if (result) {
      try {
        await facebookLogin(result.accessToken);
        Alert.alert('Success', 'Logged in with Facebook!');
      } catch (error) {
        Alert.alert('Error', 'Facebook login failed. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Facebook login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await googleLogin(userInfo.idToken);
      Alert.alert('Success', 'Logged in with Google!');
    } catch (error) {
      Alert.alert('Error', 'Google login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Log In To Your Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#888"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialLoginButton} onPress={handleFacebookLogin}>
          <Image source={require('./facebook-logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton} onPress={handleGoogleSignIn}>
          <Image source={require('./google-logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#fff', marginTop: 10 }}>
        Don't have an account? <Text style={{ color: '#1E90FF' }}>Sign up</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
