/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigation } from '@react-navigation/native'; // Import navigation
import { registerUser } from '../api/authService'; // Import API function

const CreateYourAccountScreen = () => {
  const { setUser } = useContext(AuthContext); // Use AuthContext to access setUser
  const navigation = useNavigation(); // Use navigation
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSignup = async () => {
    // Basic input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }

    if (password.length < 8 || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    } else {
      setPasswordError('');
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    try {
      // Call the registerUser API function
      const response = await registerUser({
        email,
        username,
        password,
        rememberMe,
      });

      // Handle successful registration
      setUser({
        email,
        username,
        rememberMe,
        token: response.token, // Assuming API response includes a token
      });

      // Navigate to the next screen
      navigation.navigate('HomeScreen'); // Replace with the actual screen name
    } catch (error) {
      // Handle error
      Alert.alert('Sign-up Error', 'Failed to create account. Please try again.');
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="envelope" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="person-outline" size={24} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock-outline" size={24} color="#fff" style={styles.icon} />
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            calculatePasswordStrength(text);
          }}
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <View style={styles.passwordStrength}>
          {Array(5).fill(0).map((_, index) => (
            <View key={index} style={[styles.strengthIndicator, passwordStrength > index ? styles.strongIndicator : null]} />
          ))}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock-outline" size={24} color="#fff" style={styles.icon} />
        <TextInput
          style={[styles.input, confirmPasswordError ? styles.inputError : null]}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
      </View>
      <TouchableOpacity style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <View style={[styles.checkbox, rememberMe && styles.checked]} />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember me</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or continue using</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome5 name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <MaterialIcons name="google" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.alreadyHaveAccount}>
        Already have an account? <Text style={styles.loginText}>Log in</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // your styles here...
  passwordStrength: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  strengthIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginRight: 2,
  },
  strongIndicator: {
    backgroundColor: 'green',
  },
});

export default CreateYourAccountScreen;
