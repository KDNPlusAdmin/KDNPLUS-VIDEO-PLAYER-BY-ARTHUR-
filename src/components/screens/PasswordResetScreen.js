import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios'; // or your preferred HTTP client
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleSendResetEmail = async () => {
    try {
      const response = await axios.post('/api/send-password-reset-email', { email });
      // Handle successful email sending
      setErrorMessage('Password reset email sent successfully');
      // Navigate to a success message or password reset screen
      navigation.navigate('PasswordResetSuccess'); // Replace with actual screen name
    } catch (error) {
      setErrorMessage('Error sending reset email');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
      <Button title="Send Reset Email" onPress={handleSendResetEmail} />
    </View>
  );
};

export default ForgotPasswordScreen;
