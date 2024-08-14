/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen2 = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleGetStarted = () => {
    if (email.trim() === '') {
      alert('Please enter a valid email address');
    } else {
      // Navigate to the next onboarding screen
      navigation.navigate('OnboardingScreen3'); // Replace with the actual screen name
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
        <Image
    source={require('./assets/closeIcon.png')}
    style={styles.closeIcon}
    resizeMode="contain" // Optional: adjust how the image scales
    accessible={true} // Optional: improve accessibility
    accessibilityLabel="Close" // Optional: for screen readers
/>

      </TouchableOpacity>
      <Text style={styles.title}>Enjoy the freedom to cancel anytime</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </KeyboardAvoidingView>
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
    zIndex: 1,
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
    marginBottom: 30,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
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

export default OnboardingScreen2;
