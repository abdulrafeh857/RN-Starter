import { useFocusEffect } from '@react-navigation/native';
import { getDriverDetailsService } from 'Api';
import { useSendLocInterval } from 'Components/Atoms';
import parseError from 'Components/Atoms/ParseError';
import { FlashMessage } from 'Components/Molecules';
import React, { useCallback, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import Async from 'Store/Async';
import { setGensetId } from 'Store/Redux/GensetId';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';

const useService = props => {
  const dispatch = useDispatch();
  const {} = useSendLocInterval();
  const [modalVisible, setModalVisible] = useState(false);

  const [driverName, setDriverName] = useState('');
  const [phone, setPhone] = useState('');

  const [loaderBtn, setLoaderBtn] = useState(true);
  const [loader, setLoader] = useState(false);

  const [driverData, setDriverData] = useState({});

  const [companyName, setCompanyName] = useState('Genmark');
  const data = props?.route?.params?.data;
  console.log('\n\n\n data from QR', data);
  // let str = "'genset_id': ";

  // let batchId = data
  //   .split(str)
  //   .pop()
  //   .split(',' || '}')[0]
  //   .replace('}', '')
  //   .replaceAll("'", '');

  // console.log('\n\n\n\n batch id', batchId);
  // useFocusEffect(
  //   useCallback(() => {

  //     // dispatch(setGensetId(batchId));

  //   }, [data])
  // );

  const getDriverAccount = async id => {
    setLoader(true);

    let response = await getDriverDetailsService(id);

    if (response && response?.status === 200) {
      setDriverData(response?.data);
      setLoaderBtn(false);
      setLoader(false);
    } else {
      let error = parseError(response);
      FlashMessage({
        message: 'Error',
        description: 'Something went wrong. Please try again later.',
        type: 'danger'
      });
      console.log('\n\n  ERORR in getDriverAccountService == ', response);
      setLoader(false);
    }
  };
  const getUserPermission = async () => {
    if (Platform.OS == 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(permissionResult => {
        // console.log(
        //   '\n\n\n\n permissionResult',
        //   permissionResult,
        //   RESULTS.GRANTED
        // );
        if (permissionResult !== RESULTS.GRANTED) {
          console.log('failed on both back and forth');
          FlashMessage({
            message: 'Error',
            description: "Can't access location. Please try again later",
            type: 'danger'
          });
        } else {
          checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(statuses => {
            // // setTimeout(() => {
            // //   getDerviceLocation();
            // getUserLocation();
            // // }, 500);
            console.log('LOCATION_ALWAYS', statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]);
            console.log('LOCATION_WHEN_IN_USE', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
          });
        }
      });
    } else {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      console.log('\n\n\n granted', granted);
      if (granted == 'granted') {
        // getUserLocation();
        props.navigation.navigate('DeviceDetails', {
          data: data,
          name: driverName
        });
        console.log('You can use the ACCESS_FINE_LOCATION');
      } else {
        setLoader(false);

        setModalVisible(true);
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    }
  };

  return {
    driverName,
    setDriverName,
    companyName,
    setCompanyName,
    data,
    driverData,
    setDriverData,
    loaderBtn,
    setLoaderBtn,
    modalVisible,
    setModalVisible,
    getUserPermission,
    phone,
    setPhone
  };
};

export default useService;
