import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LoginButton } from 'react-native-facebook-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    color: '#fff',
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
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Implement login logic here
    console.log('Email:', email, 'Password:', password);
  };

  const handleFacebookLogin = (error, result) => {
    // Implement Facebook login logic
  };

  const handleGoogleSignIn = async () => {
    // Implement Google login logic
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Log In To Your Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
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
      <Button title="Sign in" onPress={handleLogin} style={styles.loginButton} />
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialLoginButton}>
          <Image source={require('./facebook-logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton}>
          <Image source={require('./google-logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#fff', marginTop: 10 }}>Don't have an account? Sign up</Text>
    </View>
  );
};

export default LoginScreen;
