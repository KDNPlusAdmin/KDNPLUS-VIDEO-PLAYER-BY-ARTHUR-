import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import ContentScreen from './screens/ContentScreen';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CreateProfileScreen from './screens/CreateProfileScreen';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CreateYourAccountScreen from './screens/CreateAccountScreen';
import EditProfileScreen from './screens/EditAccountScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import InterestSelectionScreen from './screens/InterestSelectionScreen';
import LoginScreen from './screens/LoginScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PasswordResetScreen from './screens/PasswordResetScreen';
import PaymentScreen from './screens/PaymentScreen';
import SettingsScreen from './screens/SettingsScreen';
import VideoQualitySettingsScreen from './screens/VideoQualitySettingsScreen';
import WhoIsWatchingScreen from './screens/WhoIsWatchingScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Add screens here with appropriate options and parameters */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateYourAccount" component={CreateYourAccountScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="InterestSelection" component={InterestSelectionScreen} />
        <Stack.Screen name="ContentScreen" component={ContentScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="VideoQualitySettings" component={VideoQualitySettingsScreen} />
        <Stack.Screen name="WhoIsWatching" component={WhoIsWatchingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
