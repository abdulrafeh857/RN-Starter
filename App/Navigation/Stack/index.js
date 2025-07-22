import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, UIManager } from 'react-native';
import useStyles from './styles';
import {
  SplashScreen,
  QrScanScreen,
  DriverDetailsScreen,
  DeviceDetailsScreen,
  ServiceLocationsScreen
} from '@Views';
import { Colors } from 'Theme';
import { Pusher } from 'Components/Organisms';
import Drawer from '../Drawer';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { headerHidden } = useStyles();

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    // <SafeAreaProvider>
    <NavigationContainer
      onStateChange={() => {
        // Clear any pending animations or transitions
        if (Platform.OS === 'android') {
          requestAnimationFrame(() => {});
        }
      }}>
      <Pusher />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          orientation: 'portrait',
          animation: Platform.OS === 'android' ? 'none' : 'fade',
          animationDuration: Platform.OS === 'android' ? 0 : 250,
          headerShown: false,
          gestureEnabled: false,
          contentStyle: {
            backgroundColor: Colors.foreground
          }
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            ...headerHidden,
            animationEnabled: false
          }}
        />
        <Stack.Screen
          name="QrScan"
          component={QrScanScreen}
          options={{
            ...headerHidden,
            animationEnabled: Platform.OS !== 'android'
          }}
        />
        <Stack.Screen
          name="DriverDetails"
          component={DriverDetailsScreen}
          options={{
            ...headerHidden,
            animationEnabled: Platform.OS !== 'android'
          }}
        />
        <Stack.Screen
          name="DeviceDetails"
          component={DeviceDetailsScreen}
          options={{
            ...headerHidden,
            animationEnabled: Platform.OS !== 'android'
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Drawer}
          options={{
            ...headerHidden,
            animationEnabled: Platform.OS !== 'android'
          }}
        />
        <Stack.Screen
          name="ServiceLocations"
          component={ServiceLocationsScreen}
          options={{
            ...headerHidden,
            animationEnabled: Platform.OS !== 'android'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
};

export default StackNavigator;
