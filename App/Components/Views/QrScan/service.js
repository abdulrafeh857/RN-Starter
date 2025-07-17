import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getDriverDetailsService } from 'Api';
import parseError from 'Components/Atoms/ParseError';
import { FlashMessage } from 'Components/Molecules';
import Async from 'Store/Async';
import { setDashboardDetails } from 'Store/Redux/DashboardDetails';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BackHandler, PermissionsAndroid, Platform } from 'react-native';
import { checkMultiple, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import { setLocation } from 'Store/Redux/Location';

const useService = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const intervalRef = useRef(null);
  // const [scanFlag,setScanFlag]=useState(false)
  const [sflag, setSFlag] = useState(false);

  const [flag, setFlag] = useState(false);
  const [driverData, setDriverData] = useState({});
  const [loader, setLoader] = useState(false);
  const [scanFlag, setScanFlag] = useState(false);
  const [modalMapVisible, setModalMapVisible] = useState(false);
  const [modalPermission, setModalPermission] = useState(false);
  const [driverPermission, setDriverPermission] = useState(false);

  const [modalCamVisible, setModalCamVisible] = useState(false);

  let batchId = '';
  useFocusEffect(
    useCallback(() => {
      console.log('\n\n\n in useService');
      getUserPermission();
      funCall();
    }, [isFocused])
  );
  const funCall = async () => {
    batchId = await Async.getItem(Async.Item.batchId);
    // setTimeout(() => {
    //   getUserPermission();
    //   // getDriverDetail(batchId);
    // }, 7000);
    // getUserPermission();

    intervalRef.current = setInterval(() => {
      getUserLocation();
    }, 60000);
    return () => {
      clearInterval(intervalRef?.current);
    };
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
  const onBackPress = () => {
    console.debug('\n\n\n\n HOME BACK');
    BackHandler.exitApp();
    return true;
  };
  const getDriverDetail = async id => {
    let response = await getDriverDetailsService(id);
    console.log('\n\n =-=-=-=-= -=-= -==- =- =-=-= -=- =- =-= -=-response getDriverDetail == ', response?.data);

    if (response && response?.status === 200) {
      if (response?.data?.customer?.status === 'Active') {
        console.log('\n\n  Driver Active == ', response?.data?.customer?.status);
        setLoader(false);

        props.navigation.navigate('Dashboard');

        setLoader(false);
      } else {
        let error = parseError(response);
        FlashMessage({
          message: 'Error',
          description: `This company is not active, please contact Genmark`,
          type: 'danger'
        });
        console.log('\n\n  ERORR in getDriverDetail == ', response);
        setLoader(false);
      }
    }
  };

  const getDriverAccount = async id => {
    setLoader(true);

    let response = await getDriverDetailsService(id);

    if (response && response?.status === 200) {
      if (response?.data?.customer?.status === 'Active') {
        console.log('\n\n  Driver Active == ', response?.data?.customer?.status);
        if (response?.data?.driver !== null && response?.data?.driver != undefined && response?.data?.driver != '' && response?.data?.driver != 0) {
          setDriverData(response?.data);
          console.log('\n\n\n\n data from add drivere in iff');
          console.log('\n\n\n\n data from add drivere in iff::::', response?.data?.driver);
          setDriverPermission(true);
        } else {
          console.log('\n\n\n\n data from add drivere in else::');
          setDriverData(response?.data);
          dispatch(setDashboardDetails(response?.data));
          await Async.setItem(Async.Item.dashData, response?.data);
          console.log('\n\n\n\n data from add drivere::', response?.data?.driver);
          props.navigation.navigate('DriverDetails', { data: response?.data });
        }

        setLoader(false);
      } else {
        let error = parseError(response);
        FlashMessage({
          message: 'Error',
          description: 'This company is not active. Please contact Genmark',
          type: 'danger'
        });
        console.log('\n\n  ERORR in getDriverAccountService QRR== ', response);
        setLoader(false);
      }
    } else {
      let error = parseError(response);
      FlashMessage({
        message: 'Error',
        description: error?.message || 'Something went wrong. Please try again later.',
        type: 'danger'
      });
      console.log('\n\n  ERORR in getDriverAccountService QR 2nd else== ', response);
      setLoader(false);
    }
  };
  const setID = async id => {
    console.log('\n\n\n\n id::::', id);
    await Async.setItem(Async.Item.id, id);
  };
  const getUserPermission = async () => {
    if (Platform.OS == 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(permissionResult => {
        getUserLocation();
        console.log('\n\n\n\n permissionResult::', permissionResult, RESULTS.GRANTED);
        if (permissionResult !== RESULTS.GRANTED) {
          setModalPermission(true);
          // setTimeout(() => {
          //   setModalPermission(false);
          // }, 7000);
          // setTimeout(() => {
          //   setModalMapVisible(true);
          // }, 8000);
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
        setModalPermission(true);
        setTimeout(() => {
          setModalPermission(false);
        }, 3000);
        setTimeout(() => {
          setModalMapVisible(true);
        }, 8000);
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    }
  };

  const getUserLocation = () => {
    console.log('\n\n\n in get UsewrLoacation SL');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000
    })
      .then(location => {
        console.log('\n\n\n\n location in getUserLocation::', location);
        dispatch(setLocation(location));
      })
      .catch(error => {
        const { code, message } = error;
        // FlashMessage({
        //   message: 'Error',
        //   description: message || "Can't access location. Please try again later",
        //   type: 'danger'
        // });
        console.log('\n\n\n getCurrentPosition ERR 22222', code, message);
      });
  };

  return {
    flag,
    setFlag,
    loader,
    setLoader,
    getDriverAccount,
    setID,
    scanFlag,
    setScanFlag,
    modalMapVisible,
    modalCamVisible,
    setModalCamVisible,
    modalPermission,
    driverPermission,
    setDriverPermission,
    driverData,
    getUserPermission,
    setModalMapVisible,
    setModalPermission
  };
};

export default useService;
