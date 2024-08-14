import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Header from './shared/Header';
import Body from './shared/Body';
import Footer from './shared/Footer';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen1 = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Onboarding2'); // Navigate to the next onboarding screen
  };

  return (
    <View style={styles.container}>
      <Header />
      <Body />
      <Footer numberOfPages={3} />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen1;
