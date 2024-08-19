import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    color: '#fff',
    backgroundColor: '#1c1c1c',
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
  const [message, setMessage] = useState('');
  const { sendPasswordResetEmail } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSendResetEmail = async () => {
    const result = await sendPasswordResetEmail(email);
    setMessage(result.message);
    if (result.success) {
      setTimeout(() => {
        navigation.navigate('Login'); // Replace with the actual screen name
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff', fontSize: 24, marginBottom: 20 }}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Text style={message.includes('successfully') ? styles.successText : styles.errorText}>
        {message}
      </Text>
      <Button title="Send Reset Email" onPress={handleSendResetEmail} color="red" />
    </View>
  );
};

export default ForgotPasswordScreen;
