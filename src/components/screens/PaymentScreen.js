import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { validateCreditCard } from 'card-validator';

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
});

const PaymentScreen = () => {
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

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleSubmit = () => {
    // Validate form data and submit to backend
  };

  return (
    <View style={styles.container}>
      {/* Payment Method Section */}
      <View style={styles.paymentMethodSection}>
        {/* ... */}
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
          }}
        />
        {/* Other input fields for MM, YY, CVV/CVC with validation and error handling */}
      </View>

      {/* User Information Section */}
      <View style={styles.userInfoSection}>
        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        <TextInput style={styles.input} placeholder="Billing Address" value={billingAddress} onChangeText={setBillingAddress} />
      </View>

      <Button title="Next" style={styles.nextButton} onPress={handleSubmit} />
    </View>
  );
};

export default PaymentScreen;
