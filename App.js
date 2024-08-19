// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import all screens
import OnboardingScreen1 from './screens/OnboardingScreen1';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';
import HomeScreen from './screens/HomeScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import ContentScreen from './screens/ContentScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import CreateYourAccountScreen from './screens/CreateYourAccountScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import InterestSelectionScreen from './screens/InterestSelectionScreen';
import LoginScreen from './screens/LoginScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import PaymentScreen from './screens/PaymentScreen';
import SettingsScreen from './screens/SettingsScreen';
import VideoQualityScreen from './screens/VideoQualityScreen';
import WhoIsWatchingScreen from './screens/WhoIsWatchingScreen';
import UsersScreen from './screens/UsersScreen'; // Import UsersScreen if needed

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateYourAccount">
        <Stack.Screen name="CreateYourAccount" component={CreateYourAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="InterestSelection" component={InterestSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Content" component={ContentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VideoQuality" component={VideoQualityScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WhoIsWatching" component={WhoIsWatchingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Users" component={UsersScreen} /> {/* Add UsersScreen if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
