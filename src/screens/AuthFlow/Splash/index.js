import React, { useState, useEffect } from 'react';
import { Text, StatusBar, View, ImageBackground } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Style';

const Splash = props => {
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('location', jsonValue).then(() => {
        console(jsonValue);
      });
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position);
        const __ = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        await storeData(__);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    let user = await AsyncStorage.getItem('user');

    setTimeout(() => {
      if (user && user?.includes('customer')) {
        props.navigation.navigate('Customer');
      } else if (user && user?.includes('repairman')) {
        props.navigation.navigate('Repairman');
      } else {
        props.navigation.navigate('Welcome');
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />
      <ImageBackground style={styles.ImageBackground} source={require('../../../assets/images/WL.jpg')}></ImageBackground>
      <View style={styles.textview}>
        <Text style={styles.Appname}>{'Repairmen'}</Text>
      </View>
    </View>
  );
};
export default Splash;
