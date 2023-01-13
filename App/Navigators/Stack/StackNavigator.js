import React from 'react';
import {StatusBar} from 'react-native';

// Import Stack Navigator
import {createStackNavigator} from '@react-navigation/stack';
import options from './StackNavigatorOptions';

// Import styles
import styles from './styles';

// Import Screens
import SplashScreen from 'Views/Splash';
import GPSScreen from 'Views/GPS';
import SearchMapScreen from 'Views/SearchMap';
import MapScreen from 'Views/Map';
import VendorDetailsScreen from 'Views/Dashboard/VendorDetails';
import ProductDetailsScreen from 'Views/Dashboard/ProductDetails';
import CartScreen from 'Views/Dashboard/Cart';
import SignUpLoginScreen from 'Views/Dashboard/SignupLogin';
import RegisterScreen from 'Views/Dashboard/Register';
import CheckoutScreen from 'Views/Dashboard/Checkout';
import AddAddressScreen from 'Views/Dashboard/AddAddress';
import AddCardDetailsScreen from 'Views/Dashboard/AddCardDetails';
import OrderTrackingScreen from 'Views/Dashboard/OrderTracking';
import SelectLocationScreen from 'Views/Dashboard/SelectLocation';
import LoginEmailScreen from 'Views/Dashboard/LoginEmail';
import PaymentMethodScreen from 'Views/Dashboard/PaymentMethod';
import MyDetailsScreen from 'Views/Dashboard/MyDetails';
import VendorInfoScreen from 'Views/Dashboard/VendorInfo';
import DrawerNavigator from 'Navigators/Drawer/DrawerNavigator';
import SearchScreen from 'Views/Dashboard/Search';
import OrdersScreen from 'Views/Dashboard/Orders';
import WebViewScreen from 'Views/Dashboard/WebView';
import ChangePasswordScreen from 'Views/Dashboard/ChangePassword';
import DeleteAccountScreen from 'Views/Dashboard/DeleteAccount';
import ForgotPasswordScreen from 'Views/Dashboard/ForgotPassword';

// Declare a Stack of Screens/Components
const Stack = createStackNavigator();

// Define the Stack of Screens/Components
const StackNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor={styles.statusBar} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="GPS"
          component={GPSScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="SearchMap"
          component={SearchMapScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocationScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="VendorDetails"
          component={VendorDetailsScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="SignupLogin"
          component={SignUpLoginScreen}
          options={styles.dynamicTitle}
        />
        <Stack.Screen
          name="LoginEmail"
          component={LoginEmailScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddressScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="AddCardDetails"
          component={AddCardDetailsScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="OrderTracking"
          component={OrderTrackingScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethodScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="MyDetails"
          component={MyDetailsScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccountScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="VendorInfo"
          component={VendorInfoScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigator}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={styles.headerHidden}
        />
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={styles.headerHidden}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
