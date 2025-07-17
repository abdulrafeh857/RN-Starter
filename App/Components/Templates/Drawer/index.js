import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from 'Theme';
import styles from './styles';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import Async from 'Store/Async';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';
import { FlashMessage } from 'Components/Molecules';
import { endSession } from 'Api';
import moment from 'moment';
import { ParseError } from 'Components/Atoms';
import { setWarnings } from 'Store/Redux/Warnings';
import { setDashboardDetails } from 'Store/Redux/DashboardDetails';
import { setGensetId } from 'Store/Redux/GensetId';
import appVersion from '../../../../appversion';

const Drawer = props => {
  const Location = useSelector(state => state.Location?.data);
  const currentLocation = useSelector(state => state?.CurLocationData?.data);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const PusherInst = useSelector(state => state?.PusherInstance?.data);
  const EndDriverService = async result => {
    let id = await Async.getItem(Async.Item.driverId);
    let genId = await Async.getItem(Async.Item.batchId);
    console.log('\n\n\n in endDriverService', genId, id, currentLocation);
    let obj = {
      end_location: currentLocation,
      genset_id: genId
    };
    console.log('\n\n\n id,obj', obj);
    setLoader(true);
    let res = await endSession(id, obj);
    if (res && res.status === 200) {
      dispatch(setIsLoggedIn(false));
      dispatch(setDashboardDetails({}));
      dispatch(setGensetId(''));
      dispatch(setWarnings({}));
      await Async.setItem(Async.Item.IsLoggedIn, false);
      await Async.setItem(Async.Item.name, '');
      await Async.setItem(Async.Item.warningsData, '');
      await Async.setItem(Async.Item.dashData, '');

      // Toast.show('Driver added successfully', Toast.LONG);
      dispatch(setIsLoggedIn(false));
      await Async.setItem(Async.Item.IsLoggedIn, false);
      props.navigation.navigate('Splash');
      setLoader(false);
      FlashMessage({
        message: 'Success',
        description: 'Driver logged out successfully',
        type: 'success'
      });
    } else {
      // dispatch(setIsLoggedIn(false));
      // dispatch(setDashboardDetails({}));
      // dispatch(setGensetId(''));
      // dispatch(setWarnings({}));
      // await Async.setItem(Async.Item.IsLoggedIn, false);
      // await Async.setItem(Async.Item.name, '');
      // await Async.setItem(Async.Item.warningsData, '');
      // await Async.setItem(Async.Item.dashData, '');

      // // Toast.show('Driver added successfully', Toast.LONG);
      // dispatch(setIsLoggedIn(false));
      // await Async.setItem(Async.Item.IsLoggedIn, false);
      // props.navigation.navigate('Splash');
      setLoader(false);
      console.log('\n\n\n\n  addDriverData ERROR ', res);
      let error = ParseError(res);
      FlashMessage({
        message: 'Error',
        description: error?.message || 'Something went wrong. Please try again later',
        type: 'danger'
      });
    }
  };
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Colors.statusBack
        }}></SafeAreaView>
      <View>
        <Image source={require('@Images/logo.png')} style={styles.image} resizeMode={'contain'}></Image>
        <View
          style={{
            width: responsiveWidth(100),
            backgroundColor: Colors.greyTextLight,
            height: responsiveHeight(0.02),
            marginBottom: responsiveHeight(2)
          }}></View>
        <TouchableOpacity
          style={styles.topView}
          activeOpacity={0.75}
          onPress={async () => {
            EndDriverService();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start'
            }}>
            <Icon name={'alert-circle'} size={25} style={{ alignSelf: 'center' }} color={Colors.warning}></Icon>
            <View
              style={{
                flexDirection: 'column'
              }}>
              {loader ? <ActivityIndicator size={'small'} color={Colors.forgot}></ActivityIndicator> : <Text style={styles.email}>Stop Session</Text>}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: responsiveHeight(5),
          alignSelf: 'center'
        }}>
        <Text style={{}}>App Version : {appVersion}</Text>
      </View>
    </>
  );
};

export default Drawer;
