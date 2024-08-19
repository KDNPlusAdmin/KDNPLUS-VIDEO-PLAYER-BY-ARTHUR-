// src/App.js

/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import AuthProvider from AuthContext.js
import { AuthProvider } from './context/AuthContext';

// Screens imports
// Note: Make sure to create these components in their respective files.
import CreateProfileScreen from './screens/CreateProfileScreen';
import CreateYourAccountScreen from './screens/CreateYourAccountScreen';
import EditAccountScreen from './screens/EditAccountScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import InterestSelectionScreen from './screens/InterestSelectionScreen';
import LoginScreen from './screens/LoginScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import OnboardingScreen1 from './screens/OnboardingScreen1';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';
import PasswordResetScreen from './screens/PasswordResetScreen';
import PaymentScreen from './screens/PaymentScreen';
import SettingsScreen from './screens/SettingsScreen';
import VideoQualitySettingsScreen from './screens/VideoQualitySettingsScreen';
import WhoIsWatchingScreen from './screens/WhoIsWatchingScreen';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
  },
  carouselContainer: {
    height: 300,
  },
  carousel: {
    flexDirection: 'row',
  },
  contentItem: {
    width: 200,
    height: 300,
    marginRight: 20,
  },
  contentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  contentTitle: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  contentButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  contentButton: {
    marginHorizontal: 10,
  },
});

// eslint-disable-next-line react/prop-types
const ContentScreen = ({ navigation }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState([
    // Sample content data
    {
      id: '1',
      title: 'Movie 1',
      poster: 'https://example.com/poster1.jpg',
    },
    {
      id: '2',
      title: 'Movie 2',
      poster: 'https://example.com/poster2.jpg',
    },
    // Add more sample content as needed
  ]);
  const carouselRef = useRef(null);

  const handlePlay = (item) => {
    // Handle play action, navigate to Movie Details screen
    // eslint-disable-next-line react/prop-types
    navigation.navigate('MovieDetails', { item });
  };

  const handleAddToMyList = (item) => {
    // Handle adding to My List
    console.log(`Adding ${item.title} to My List`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.carouselContainer}>
          <FlatList
            data={content}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contentItem}
                onPress={() => handlePlay(item)}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={styles.contentImage}
                />
                <Text style={styles.contentTitle}>{item.title}</Text>
                <View style={styles.contentButtons}>
                  <TouchableOpacity
                    style={styles.contentButton}
                    onPress={() => handleAddToMyList(item)}
                  >
                    <Text style={{ color: '#fff' }}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            horizontal
            pagingEnabled
            ref={carouselRef}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Content" component={ContentScreen} />
          <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
          <Stack.Screen name="CreateAccount" component={CreateYourAccountScreen} />
          <Stack.Screen name="EditAccount" component={EditAccountScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen
            name="InterestSelection"
            component={InterestSelectionScreen}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
          <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
          <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
          <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
          <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="VideoQualitySettings"
            component={VideoQualitySettingsScreen}
          />
          <Stack.Screen name="WhoIsWatching" component={WhoIsWatchingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
