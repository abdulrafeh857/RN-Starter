import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import RepairmanApp from './RepairmanFlow';
import AuthApp from './AuthFlow';
import CustomerApp from './CustomerFlow';

const AppStack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Auth'}>
        <AppStack.Screen name={'Auth'} component={AuthApp} />
        <AppStack.Screen name={'Repairman'} component={RepairmanApp} />
        <AppStack.Screen name={'Customer'} component={CustomerApp} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
