import React, { useState, useEffect, useCallback } from 'react';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { Text, TouchableOpacity, StatusBar, View, Image, PermissionsAndroid, BackHandler } from 'react-native';
import { styles } from './style';
import { useFocusEffect } from '@react-navigation/native';
const WelcomeScreen = props => {
  useFocusEffect(
    useCallback(() => {
      Permissions();
    }, [])
  );

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position, 'This is Location');
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        const jsonValue = JSON.stringify(currentLocation);
        await AsyncStorage.setItem('location', jsonValue)
          .then(() => {
            console.log(jsonValue, 'location');
          })
          .then(() => {
            console.log('done');
          });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  const Permissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
        Toast.show('Allow Location Permission From Settings');
        BackHandler.exitApp();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />
      <View>
        <View>
          <Image style={styles.Logo} source={require('../../../assets/images/WL.jpg')} />
        </View>
        <View style={styles.containerTxt}>
          <Text style={styles.welcomeTxt}>Welcome</Text>
          <View style={styles.detailstextview}>
            <Text style={styles.detailstext}>{'Welcome to Repairmen - Your reliable partner for expert plumbing, electrical, and carpentry services!'}</Text>
          </View>
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity
            style={styles.buttonMain}
            onPress={() => {
              // _onLogin();
              getLocation();
              props.navigation.navigate('Login');
            }}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMain} onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default WelcomeScreen;
