import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { View, Text } from 'react-native';
import DiscoverPlanScreen from './src/screens/DiscoverPlanScreen'; // Adjust the import path as needed

const Stack = createStackNavigator();

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DiscoverPlan">
        <Stack.Screen 
          name="DiscoverPlan" 
          component={DiscoverPlanScreen} 
          options={{ headerShown: false }}
        />
        {/* Add more screens here as your app grows */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}