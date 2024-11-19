import { LogIn, CustomerRegistration, RepairmanRegistration, ForgotPassword, WelcomeScreen, Signup, Splash } from '../../screens';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();
const AuthApp = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Splash'}>
      <AuthStack.Screen name={'Splash'} component={Splash} />
      <AuthStack.Screen name={'Welcome'} component={WelcomeScreen} />
      <AuthStack.Screen name={'Signup'} component={Signup} />
      <AuthStack.Screen name={'Login'} component={LogIn} />
      <AuthStack.Screen name={'CustomerR'} component={CustomerRegistration} />
      <AuthStack.Screen name={'RepairmanR'} component={RepairmanRegistration} />
      <AuthStack.Screen name={'ForgotPassword'} component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};
export default AuthApp;
