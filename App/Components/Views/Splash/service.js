import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState, Linking } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';
import Async from 'Store/Async';
import { getDriverData, getDriverDetailsService } from 'Api';
import { setWarnings } from 'Store/Redux/Warnings';
import { setGensetId } from 'Store/Redux/GensetId';
import { setDriverId } from 'Store/Redux/DriverData';
const useService = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const IsLoggedIn = useSelector(state => state.IsLoggedIn?.data);
  console.log('\n\n\n IsLoggedIn splashh', IsLoggedIn);
  let batchId = '';
  let driverId = '';
  useFocusEffect(
    useCallback(() => {
      funCall();
      // checkVersion();
    }, [])
  );
  const checkVersion = async () => {
    try {
      // Get current version from the app store
      const latestVersion = await VersionCheck.getLatestVersion();
      const currentVersion = VersionCheck.getCurrentVersion();

      // Check if the current version is the same as the latest version
      if (latestVersion !== currentVersion) {
        console.log('Versions do not match');
        // Set to false if versions don't match
        setModalVisible(true); // Show the modal to inform the user
      } else {
        console.log('\n\n\n latestVersion', latestVersion, currentVersion);
        console.log('Versions match');
      }
    } catch (error) {
      console.error('Version check failed:', error);
    }
  };
  const funCall = async () => {
    batchId = await Async.getItem(Async.Item.batchId);
    driverId = await Async.getItem(Async.Item.driverId);
    dispatch(setDriverId(await Async.getItem(Async.Item.driverId)));
    setVisible(true);
    setTimeout(() => {
      // getCurrDriver();

      updateState(batchId);
      dispatch(setGensetId(batchId));
    }, 2500);
  };

  // const getCurrDriver = async () => {
  //   let driverId = await Async.getItem(Async.Item.driverId);
  //   let response = await getDriverData(driverId);
  //   console.log('\n\n\n response getCurrDriver::', response);
  //   if (response && response?.status === 200) {
  //     setVisible(false);
  //     if (response?.data?.status === 'Connected') {
  //       props.navigation.navigate('Dashboard');
  //     } else {
  //       props.navigation.navigate('QrScan');
  //     }
  //   } else {
  //     props.navigation.navigate('QrScan');
  //   }
  // };

  const updateState = async batchId => {
    const IsLoggedIn = await Async.getItem(Async.Item.IsLoggedIn);

    dispatch(setIsLoggedIn(IsLoggedIn));
    if (IsLoggedIn === true) {
      getDriverDetail(batchId);
    } else {
      props.navigation.navigate('QrScan');
    }
  };
  const getDriverDetail = async id => {
    let responseDriver = await getDriverData(driverId);
    if (responseDriver && responseDriver?.status === 200) {
      setVisible(false);
      if (responseDriver?.data?.status === 'Connected') {
        let response = await getDriverDetailsService(id);
        if (response && response?.status === 200) {
          if (response?.data?.customer?.status === 'Active') {
            props.navigation.navigate('Dashboard');
          } else {
            props.navigation.navigate('QrScan');
          }
        } else {
          props.navigation.navigate('QrScan');
        }
      } else {
        props.navigation.navigate('QrScan');
      }
    } else {
      props.navigation.navigate('QrScan');
    }
  };

  return {
    visible,
    modalVisible,
    setModalVisible
  };
};

export default useService;
