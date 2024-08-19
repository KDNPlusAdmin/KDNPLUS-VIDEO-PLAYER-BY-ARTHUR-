import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Header from './shared/Header';
import Body from './shared/Body';
import Footer from './shared/Footer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API calls

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

const OnboardingScreen1 = () => {
  const navigation = useNavigation();
  const [onboardingData, setOnboardingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/onboarding`);
        setOnboardingData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching onboarding data:', error);
        setLoading(false);
      }
    };

    fetchOnboardingData();
  }, []);

  const handleNext = () => {
    navigation.navigate('Onboarding2'); // Navigate to the next onboarding screen
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Body data={onboardingData} />
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
