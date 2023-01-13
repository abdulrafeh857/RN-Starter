import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import utils from './utils';
import styles from './styles';

import { View, Image, ScrollView, Dimensions } from 'react-native';
import { Colors, FontSize, Layout } from 'Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logoutService from 'Services/Logout/index';
import Preferences from 'Config/preferences';
import * as TEXT from '@Atoms/Text';
import { Feedback } from '@Atoms';
import { TouchableRipple } from 'react-native-paper';
import getOrders from '../../Store/Actions/Orders';
import version from '../../../version';

const preferences = new Preferences();

const { height } = Dimensions.get('window');

const moreContent = (more, navigation) => {
  return (
    <TouchableRipple
      onPress={() => {
        if (more.name === 'Privacy policy') {
          navigation.closeDrawer();
          console.debug('Navigate to Privacy policy.');
          navigation.navigate('WebView', utils.Privacy);
        } else if (more.name === 'Terms & Conditions') {
          navigation.closeDrawer();
          console.debug('Navigate to Terms & Conditions.');
          navigation.navigate('WebView', utils.TnCs);
        } else if (more.name === 'About us') {
          navigation.closeDrawer();
          console.debug('Navigate to About us.');
          navigation.navigate('WebView', utils.About);
        } else if (more.name === 'Return Policy') {
          navigation.closeDrawer();
          console.debug('Navigate to Return Policy.');
          navigation.navigate('WebView', utils.Return);
        }
      }}
      style={styles.more.rootViewStyle}>
      <>
        <TEXT.Normal myStyle={styles.more.text}>{more.name}</TEXT.Normal>
      </>
    </TouchableRipple>
  );
};

const screensContent = (screen, navigation) => {
  const [badge, setBadge] = useState(false);

  const { orders } = useSelector(state => state.Orders);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const pending = orders?.results?.filter(
        ({ status }) =>
          status === 'Pending' ||
          status === 'Vendor Confirmed' ||
          status === 'Ready For Delivery' ||
          status === 'Delivery Confirmed' ||
          status === 'Driver Enroute' ||
          status === 'Driver Arrived' ||
          status === 'Driver POB'
      );
      pending?.length > 0 && setBadge(true);
    }, [orders])
  );

  return (
    <TouchableRipple
      onPress={() => {
        if (screen.name === 'Home') {
          navigation.closeDrawer();
          console.debug('Navigate to Home.');
          navigation.navigate('Home');
        } else if (screen.name === 'My Addresses') {
          navigation.closeDrawer();
          console.debug('Navigate to Select Location.');
          navigation.navigate('SelectLocation');
        } else if (screen.name === 'My Orders') {
          navigation.closeDrawer();
          console.debug('Navigate to Orders.');
          navigation.navigate('Orders');
        } else if (screen.name === 'Change Password') {
          navigation.closeDrawer();
          console.debug('Navigate to Change Password.');
          navigation.navigate('ChangePassword');
        } else if (screen.name === 'Payment Method') {
          navigation.closeDrawer();
          console.debug('Navigate to Payment Method.');
          navigation.navigate('PaymentMethod');
        } else if (screen.name === 'My Details') {
          navigation.closeDrawer();
          console.debug('Navigate to My Details.');
          navigation.navigate('MyDetails');
        } else if (screen.name === 'Log Out') {
          console.debug('Logout User.');
          logoutService().then(response => {
            console.log('response', response);
            if (response.status === 200) {
              console.debug('Logout Success.');
              Feedback.success('Logged out successfully.', 'OK');

              preferences.removeToken().then(() => {
                console.debug('Async Storage cleared.');
                dispatch(getOrders()).then(() => {
                  navigation.navigate('Splash');
                });
              });
            }
          });
        } else if (screen.name === 'Delete Account') {
          navigation.closeDrawer();
          console.debug('Navigate to Delete Account.');
          navigation.navigate('DeleteAccount');
        }
      }}
      style={styles.screen.rootViewStyle}>
      <>
        <Icon
          name={screen.icon}
          color={
            screen.name == 'Delete Account' ? Colors.redsoft : Colors.tintGrey
          }
          size={FontSize.title}
        />
        {badge && screen.name === 'My Orders' && <View style={styles.badge} />}
        <TEXT.Normal
          myStyle={{
            fontSize: 13,
            lineHeight: 13,
            marginLeft: '7.5%',
            color: screen.name == 'Delete Account' ? Colors.error : '#111'
          }}>
          {screen.name}
        </TEXT.Normal>
      </>
    </TouchableRipple>
  );
};

const DrawerNavigatorOptions = {
  drawerContentExisting: props => {
    const { navigation, user } = props;
    return (
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={styles.drawer.rootViewContainerStyle}>
        <View style={styles.drawer.rootViewStyle}>
          <View style={styles.drawer.imageContainerStyle}>
            <Image
              source={utils.imageSource}
              resizeMode={'contain'}
              resizeMethod="resize"
              style={styles.drawer.imageStyle}
            />
            <TEXT.Heading myStyle={{ color: 'white' }}>
              {user.firstName + ' ' + user.lastName}
            </TEXT.Heading>
          </View>
        </View>
        {utils.screens.map(item => screensContent(item, navigation))}
        <View style={styles.drawer.moreContentContainerStyle} />
        {utils.more.map(item => moreContent(item, navigation))}
        <>
          <TEXT.Caption myStyle={styles.version}>{version}</TEXT.Caption>
        </>
      </ScrollView>
    );
  },

  drawerContentNew: ({ navigation }) => {
    return (
      <ScrollView style={styles.drawer.rootViewContainerStyle}>
        <View style={styles.drawer.rootViewStyle}>
          <View style={styles.drawer.imageContainerStyle}>
            <Image
              source={utils.imageSource}
              resizeMode={'contain'}
              resizeMethod="resize"
              style={styles.drawer.imageStyle}
            />
            <TEXT.Heading myStyle={{ color: 'white' }}>Welcome!</TEXT.Heading>
            <TEXT.Normal myStyle={{ color: 'white' }}>
              Login to continue...
            </TEXT.Normal>
          </View>
        </View>
        <View
          style={{
            height: height * 0.06,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
          }}>
          <TouchableRipple
            style={{
              height: height * 0.05,
              width: '80%',
              ...Layout.center,
              backgroundColor: Colors.primary,
              borderRadius: 2
            }}
            onPress={() => {
              navigation.closeDrawer();
              console.debug('Navigate to Log In or Signup.');
              navigation.navigate('LoginEmail', { fromDash: true });
            }}>
            <>
              <TEXT.Normal
                myStyle={{ fontSize: 12, lineHeight: 12, color: 'white' }}>
                Log In
              </TEXT.Normal>
            </>
          </TouchableRipple>
        </View>
        <View
          style={{
            height: height * 0.06,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableRipple
            style={{
              height: height * 0.05,
              width: '80%',
              ...Layout.center,
              backgroundColor: Colors.primary,
              borderRadius: 2
            }}
            onPress={() => {
              navigation.closeDrawer();
              console.debug('Navigate to Sign Up.');
              navigation.navigate('Register', { fromDash: true });
            }}>
            <>
              <TEXT.Normal
                myStyle={{ fontSize: 12, lineHeight: 12, color: 'white' }}>
                Sign Up
              </TEXT.Normal>
            </>
          </TouchableRipple>
        </View>

        <View style={styles.drawer.moreContentContainerStyle} />
        {utils.more.map(item => moreContent(item, navigation))}
        <>
          <TEXT.Caption myStyle={styles.version}>{version}</TEXT.Caption>
        </>
      </ScrollView>
    );
  }
};

export default DrawerNavigatorOptions;
