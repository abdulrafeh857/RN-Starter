import AsyncStorage from '@react-native-community/async-storage';
import {Component} from 'react';

const tokenData = 'TOKEN_DATA';
const selectedAddressData = 'ADDRESS_DATA';
const rememberMeData = 'REMEMBER_ME_DATA';
const currentData = 'CURRENT_DATA';
const notificationData = 'NOTIFICATION_DATA';
const paymentDefaultData = 'PAYMENT_DEFAULT_DATA';

export default class Preferences extends Component {
  /* ---------------------------------- TOKEN --------------------------------- */

  async setToken(data) {
    const hasAccess = 'string' === typeof data.access;
    const hasRefresh = 'string' === typeof data.refresh;
    const hasCreatedAt = 'object' === typeof data.createdAt;

    if (data && hasAccess && hasRefresh && hasCreatedAt) {
      try {
        await AsyncStorage.setItem(tokenData, JSON.stringify(data));
        console.debug('Token data saved!');
      } catch (error) {
        console.log('Error: ', error.message);
      }
    } else {
      console.log('Invalid Token data: ', data);
    }
  }

  async getToken() {
    try {
      const data = await AsyncStorage.getItem(tokenData);
      return JSON.parse(data);
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  async removeToken() {
    try {
      const data = await AsyncStorage.removeItem(tokenData);
      return data;
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  /* ---------------------------------- SELECTED ADDRESS --------------------------------- */

  async setSelectedAddress(data) {
    try {
      await AsyncStorage.setItem(selectedAddressData, JSON.stringify(data));
      console.debug('Selected Address data saved!');
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }

  async getSelectedAddress() {
    try {
      const data = await AsyncStorage.getItem(selectedAddressData);
      return JSON.parse(data);
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  async removeSelectedAddress() {
    try {
      const data = await AsyncStorage.removeItem(selectedAddressData);
      return data;
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  /* ---------------------------------- REMEMBER ME --------------------------------- */

  async setRememberMe(data) {
    try {
      await AsyncStorage.setItem(rememberMeData, JSON.stringify(data));
      console.debug('Remember Me data saved!');
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }

  async getRememberMe() {
    try {
      const data = await AsyncStorage.getItem(rememberMeData);
      return JSON.parse(data);
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  async removeRememberMe() {
    try {
      const data = await AsyncStorage.removeItem(rememberMeData);
      return data;
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  /* ---------------------------------- Current Selected --------------------------------- */

  async setCurrent(data) {
    try {
      await AsyncStorage.setItem(currentData, JSON.stringify(data));
      console.debug('Current data saved!');
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }

  async getCurrent() {
    try {
      const data = await AsyncStorage.getItem(currentData);
      return JSON.parse(data);
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  async removeCurrent() {
    try {
      const data = await AsyncStorage.removeItem(currentData);
      return data;
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  /* ---------------------------------- Notification --------------------------------- */

  async setNotification(data) {
    try {
      await AsyncStorage.setItem(notificationData, JSON.stringify(data));
      console.debug('Notification data saved!');
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }

  async getNotification() {
    try {
      const data = await AsyncStorage.getItem(notificationData);
      return JSON.parse(data);
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  async removeNotification() {
    try {
      const data = await AsyncStorage.removeItem(notificationData);
      return data;
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  /* ---------------------------------- PaymentDefault --------------------------------- */

  async setPaymentDefault(data) {
    try {
      await AsyncStorage.setItem(paymentDefaultData, JSON.stringify(data));
      console.debug('PaymentDefault data saved!');
    } catch (error) {
      console.log('Error: ', error.message);
    }
  }

  async getPaymentDefault() {
    try {
      const data = await AsyncStorage.getItem(paymentDefaultData);
      return JSON.parse(data);
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }

  async removePaymentDefault() {
    try {
      const data = await AsyncStorage.removeItem(paymentDefaultData);
      return data;
    } catch (error) {
      console.log('Error: ' + error);
      return null;
    }
  }
}
