import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContentScreen from './ContentScreen';
import MovieDetailsScreen from './MovieDetailsScreen';
import VideoQualitySettingsScreen from './VideoQualitySettingsScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Content" component={ContentScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="VideoQualitySettings" component={VideoQualitySettingsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
