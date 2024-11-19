import { RepairmanSearch, Profile } from '../../screens';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const CustomerStack = createStackNavigator();
const CustomerApp = () => {
  return (
    <CustomerStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'RepairmanSearch'}>
      <CustomerStack.Screen name={'RepairmanSearch'} component={RepairmanSearch} />
      <CustomerStack.Screen name={'Profile'} component={Profile} />
    </CustomerStack.Navigator>
  );
};
export default CustomerApp;
