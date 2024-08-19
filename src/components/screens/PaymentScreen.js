/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from './AuthContext'; // Adjust path as needed
import { validateCreditCard } from 'card-validator';
import axios from 'axios'; // Make sure axios is installed and imported

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#222', // Dark background
  },
  paymentMethodSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: 'white',
  },
  paymentMethodText: {
    color: 'white',
    marginRight: 10,
  },
  paypalLogo: {
    width: 30,
    height: 20,
  },
  visaLogo: {
    width: 30,
    height: 20,
  },
  cardDetailsSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  userInfoSection: {
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
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

const PaymentScreen = () => {
  const { user } = useContext(AuthContext); // Access user information from AuthContext
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleSubmit = async () => {
    // Validate form data and submit to backend
    // Example validation
    const cardValidation = validateCreditCard(cardNumber);
    if (!cardValidation.isValid) {
      setCardNumberError('Invalid card number');
      return;
    }

    // Additional validation can be added here
    if (expiryMonth === '' || expiryYear === '') {
      setExpiryDateError('Expiry date is required');
      return;
    }

    if (cvv === '') {
      setCvvError('CVV is required');
      return;
    }

    // Clear errors
    setCardNumberError('');
    setExpiryDateError('');
    setCvvError('');
    setSuccessMessage('');

    setIsLoading(true);

    try {
      // Make API call to submit payment details
      const response = await axios.post(`${API_BASE_URL}/process-payment`, {
        userId: user.id, // Assuming the user context provides a user ID
        paymentMethod,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        firstName,
        lastName,
        billingAddress,
      });

      if (response.status === 200) {
        // Handle successful payment
        setSuccessMessage('Payment processed successfully!');
        // Optionally, navigate to a success screen or update the state as needed
        Alert.alert(
          'Success',
          'Payment processed successfully!',
          [
            {
              text: 'OK',
              onPress: () => console.log('Payment successful'),
            },
          ],
          { cancelable: false }
        );
      } else {
        setCardNumberError('Payment failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setCardNumberError(error.response.data.message || 'Server error. Please try again later.');
      } else if (error.request) {
        // Request was made but no response received
        setCardNumberError('Network error. Please check your connection.');
      } else {
        // Other errors
        setCardNumberError('Error processing payment');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Payment Method Section */}
      <View style={styles.paymentMethodSection}>
        <TouchableOpacity onPress={() => handlePaymentMethodChange('paypal')}>
          <View style={[styles.radioButton, paymentMethod === 'paypal' && styles.radioButtonSelected]} />
          <Text style={styles.paymentMethodText}>PayPal</Text>
          <Image source={require('./paypal-logo.png')} style={styles.paypalLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePaymentMethodChange('visa')}>
          <View style={[styles.radioButton, paymentMethod === 'visa' && styles.radioButtonSelected]} />
          <Text style={styles.paymentMethodText}>Visa</Text>
          <Image source={require('./visa-logo.png')} style={styles.visaLogo} />
        </TouchableOpacity>
      </View>

      {/* Card Details Section */}
      <View style={styles.cardDetailsSection}>
        <TextInput
          style={[styles.input, { borderColor: cardNumberError ? 'red' : 'white' }]}
          placeholder="Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={(text) => {
            setCardNumber(text);
            // Handle card number validation and error
            const cardValidation = validateCreditCard(text);
            setCardNumberError(cardValidation.isValid ? '' : 'Invalid card number');
          }}
        />
        <TextInput
          style={[styles.input, { borderColor: expiryDateError ? 'red' : 'white' }]}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          value={expiryMonth}
          onChangeText={(text) => {
            setExpiryMonth(text);
            // Additional validation for expiry date can be added here
          }}
        />
        <TextInput
          style={[styles.input, { borderColor: expiryDateError ? 'red' : 'white' }]}
          placeholder="YY"
          keyboardType="numeric"
          maxLength={2}
          value={expiryYear}
          onChangeText={(text) => {
            setExpiryYear(text);
            // Additional validation for expiry date can be added here
          }}
        />
        <TextInput
          style={[styles.input, { borderColor: cvvError ? 'red' : 'white' }]}
          placeholder="CVV"
          keyboardType="numeric"
          maxLength={4}
          value={cvv}
          onChangeText={(text) => {
            setCvv(text);
            // Additional validation for CVV can be added here
          }}
        />
      </View>

      {/* User Information Section */}
      <View style={styles.userInfoSection}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Billing Address"
          value={billingAddress}
          onChangeText={setBillingAddress}
        />
      </View>

      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      {cardNumberError || expiryDateError || cvvError ? (
        <Text style={styles.errorText}>
          {cardNumberError || expiryDateError || cvvError}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
