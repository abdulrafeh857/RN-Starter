import { addDriverData } from 'Api';
import { ParseError } from 'Components/Atoms';
import { FlashMessage } from 'Components/Molecules';
import React, { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import GetLocation from 'react-native-get-location';
import Toast from 'react-native-simple-toast';
import { checkMultiple, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import Async from 'Store/Async';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';
import axios from 'axios';
import { setDriverId } from 'Store/Redux/DriverData';

const useService = props => {
  const [details, setDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [createdTime, setCreatedTime] = useState('');
  const genId = useSelector(state => state?.GensetId?.data);
  const data = props?.route?.params?.data;
  const name = props?.route?.params?.name;
  const phone = props?.route?.params?.phone;

  const [loader, setLoader] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const pusherFlag = useSelector(state => state.PusherFlag?.data);

  const dispatch = useDispatch();

  const getUserPermission = async () => {
    if (Platform.OS == 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(permissionResult => {
        getUserLocation();
        console.log('\n\n\n\n permissionResult::', permissionResult, RESULTS.GRANTED);
        if (permissionResult !== RESULTS.GRANTED) {
          FlashMessage({
            message: 'Error',
            description: 'You need to allow location permission from you phone Settings to use this app',
            type: 'danger'
          });

          console.log('failed on both back and forth');
        } else {
          checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(statuses => {
            console.log('LOCATION_ALWAYS', statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]);
            console.log('LOCATION_WHEN_IN_USE', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
          });
        }
      });
    } else {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      console.log('\n\n\n granted', granted);
      if (granted == 'granted') {
        getUserLocation();
        console.log('You can use the ACCESS_FINE_LOCATION');
      } else {
        setLoader(false);
        FlashMessage({
          message: 'Error',
          description: 'You need to allow location permission from you phone Settings to use this app',
          type: 'danger'
        });
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    }
  };
  const getUserLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000
    })
      .then(location => {
        // setLogIn();
        console.log('\n\n\n\n loccation', location);
        // pusherTrigger(location);
        locData(location.latitude, location.longitude);

        // props.navigation.navigate('Dashboard', { data: data });
      })
      .catch(error => {
        console.log('\n\n\n\n error in get location', error);
        const { code, message } = error;
        // getUserLocation();
        setLoaderBtn(false);

        console.log('\n\n\n getCurrentPosition ERR DevDet', code, message);
        FlashMessage({
          message: 'Error',
          description: "Can't access location. Please turn on GPS and try again ",
          type: 'danger'
        });
      });
  };

  const locData = async (lat, lon) => {
    // var requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   }
    // };

    let url = `https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(lat)}&lon=${parseFloat(lon)}&format=jsonv2`;

    console.log('\n\n\n  url == ', url);
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'DriverHub (harisanwar965@gmail.com)' // Nominatim requires a user agent
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        console.log('\n\n\n\n  error in open ==   ', response);
      }

      const data = await response.json(); // parse the response as JSON
      AddDriverDetService(data);
      setLoader(false);
    } catch (error) {
      FlashMessage({
        message: 'Error',
        description: "Can't access location. Please try again later",
        type: 'danger'
      });
      setLoaderBtn(false);
      console.error('Error fetching data:', error);
    }

    // fetch(url, requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log('\n\n\n\n loc data', result);
    //     AddDriverDetService(result);
    //     setLoader(false);
    //   })
    //   .catch(error => {
    //     console.log('\n\n  error in open ==   ', error);
    //     setLoaderBtn(false);

    //     FlashMessage({
    //       message: 'Error',
    //       description: "Can't access location. Please try again later",
    //       type: 'danger'
    //     });
    //   });
  };
  const AddDriverDetService = async result => {
    let obj = {
      customer: data?.customer?.id,
      name: name,
      start_location: result,
      genset_id: genId,
      phone: phone
    };
    setLoader(true);
    console.log('\n\n\n obj::', obj);
    let res = await addDriverData(obj);
    if (res && res.status === 201) {
      console.log('\n\n\n\n data from add drivere::', res?.data);
      await Async.setItem(Async.Item.driverId, res?.data?.id);
      dispatch(setDriverId(res?.data?.id));

      await Async.setItem(Async.Item.createdTime, res?.data?.created_at);
      await Async.setItem(Async.Item.name, res?.data?.name);
      setLoaderBtn(false);
      setCreatedTime(res?.data?.created_at);
      FlashMessage({
        message: 'Success',
        description: 'Driver logged in successfully',
        type: 'success'
      });
      // Toast.show('Driver added successfully', Toast.LONG);
      dispatch(setIsLoggedIn(true));
      await Async.setItem(Async.Item.IsLoggedIn, true);
      console.log('\n\n\n data to dashboard::', data);
      props.navigation.navigate('Dashboard', { time: res?.data?.created_at });
    } else {
      getUserPermission();
      setLoaderBtn(false);

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

  return {
    details,
    setDetails,
    data,
    getUserLocation,
    loader,
    setLoader,
    // getUserPermission,
    modalVisible,
    setModalVisible,
    locData,
    loaderBtn,
    setLoaderBtn,
    pusherFlag,
    createdTime,
    setCreatedTime,
    genId
  };
};

export default useService;
