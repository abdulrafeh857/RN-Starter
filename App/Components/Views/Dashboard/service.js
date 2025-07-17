import { FlashMessage } from 'Components/Molecules';
import React, { useCallback, useState, useEffect, useRef } from 'react';

import { Linking, Platform } from 'react-native';
import { BackHandler } from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';
import Async from 'Store/Async';
import { useSendLocInterval } from 'Components/Atoms';
import { setPushFlag } from 'Store/Redux/PushFlag';
import parseError from 'Components/Atoms/ParseError';
import { getDriverData, getDriverDetailsService } from 'Api';
import { setGensetId } from 'Store/Redux/GensetId';
import Toast from 'react-native-simple-toast';
import { setDashboardDetails } from 'Store/Redux/DashboardDetails';
import getDashboardDetailsService from 'Api/GetDashboardDetails';
import { set } from 'react-native-reanimated';
import { getDistance } from 'geolib';
import moment from 'moment';
const useService = props => {
  const dashboardDetailsData = useSelector(state => state?.DashboardDetails?.data);
  const gentStatusUpdate = useSelector(state => state?.GenStatus?.data);
  // console.log('\n\n\n\n gen status::', gentStatusUpdate);
  const Location = useSelector(state => state.Location?.data);
  // const navigation=useNavigation()
  const intervalRef = useRef(null);
  const timeInterval = useRef(null);
  const isFocused = useIsFocused();
  const [currTime, setCurrTime] = useState('');
  const [time, setTime] = useState('');
  const [event, setEvent] = useState('');
  const [eventVal, setEventVal] = useState('');

  const [loader, setLoader] = useState(false);
  const [warnModal, setWarnModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);

  const [locModal, setLocModal] = useState(false);
  const [name, setName] = useState('');
  const [warn, setWarn] = useState('');
  const [address, setAddress] = useState({});
  const [dashboardData, setDashboardData] = useState({});
  const [dataFormated, setDataFormated] = useState({});

  const [array, setArray] = useState([]);
  const [status, setStatus] = useState('Offline');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const IsLoggedIn = useSelector(state => state?.IsLoggedIn?.data);
  const locationData = useSelector(state => state?.Location?.data);
  const genId = useSelector(state => state?.GensetId?.data);
  const warnings = useSelector(state => state?.Warnings?.data);
  const [driLoc, setDriLoc] = useState('');
  // let warn=JSON.parse(warnings?.data)
  const [data, setData] = useState({});

  const formatTimeProg = progress => {
    return `${status}`;
  };

  const openDialer = () => {
    setModalVisible(false);

    let phoneNumber = '+31108208936';
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phoneNumber}`;
    } else {
      phoneNumber = `tel:${phoneNumber}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          FlashMessage({
            message: 'Error',
            description: 'Phone number is not available',
            type: 'danger'
          });
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => {
        FlashMessage({
          message: 'Error',
          description: err,
          type: 'danger'
        });
      });
  };
  let createdTime = '';
  let DriName = '';
  let dashData = {};
  useFocusEffect(
    useCallback(() => {
      try {
        funCall();
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
      } catch (error) {
        console.error('Error in useFocusEffect:', error);
      }
    }, [createdTime, IsLoggedIn, isFocused])
  );
  const funCall = async () => {
    try {
      let batchId = await Async.getItem(Async.Item.batchId);
      if (batchId) {
        dispatch(setGensetId(batchId));
        getWarningData(batchId, true);
        createdTime = await Async.getItem(Async.Item.createdTime);
        DriName = await Async.getItem(Async.Item.name);
        setName(DriName || '');
        setTime(createdTime || '');
        dispatch(setPushFlag(true));
      }
    } catch (error) {
      console.error('Error in funCall:', error);
    }
  };
  // useEffect(() => {
  //   funCall();
  // }, [locationData]);

  const updateDriverLocation = () => {
    // Get the current dashboard data from Redux
    let currentData = { ...dashboardData };

    // Get the existing Location array or initialize it
    let locationArray = currentData?.Location || [];

    // Create an updated Driver Location entry
    let updatedDriverLocation = {
      id: 14,
      name: 'Driver Location',
      description: 'Driver Location',
      value:
        Object.keys(locationData || {}).length > 0
          ? `${parseFloat(locationData?.latitude).toFixed(6)},\n${parseFloat(locationData?.longitude).toFixed(6)}`
          : '--',
      logo: 'https://genmark-web.vercel.app/assets/images/driver-total.png'
    };
    // Check if Driver Location already exists in Location array
    let updatedLocationArray = locationArray.map(item => (item.name === 'Driver Location' ? updatedDriverLocation : item));
    // If Driver Location entry does not exist, add it
    if (!updatedLocationArray.some(item => item.name === 'Driver Location')) {
      updatedLocationArray.push(updatedDriverLocation);
    }
    // Create a new updated object
    let updatedData = {
      ...currentData,
      Location: updatedLocationArray
    };
    // Dispatch the updated data to Redux
    dispatch(setDashboardDetails(updatedData));
    // Update local state
    setDashboardData(updatedData);
  };
  // Call updateDriverLocation whenever locationData changes
  useEffect(() => {
    updateDriverLocation();
  }, [locationData]);
  const getDistanceCall = (start, end) => {
    try {
      if (!start?.lat || !start?.long || !end?.lat || !end?.long) {
        setDriLoc('2');
        return;
      }
      let distance = getDistance(
        { latitude: parseFloat(start.lat), longitude: parseFloat(start.long) },
        { latitude: parseFloat(end.lat), longitude: parseFloat(end.long) }
      );
      console.log('\n\n\n distance iss:::', distance);
      if (distance > 1000) {
        setDriLoc('0');
      } else if (distance < 1000) {
        setDriLoc('1');
      } else {
        setDriLoc('2');
      }
    } catch (error) {
      console.error('Error in getDistanceCall:', error);
      setDriLoc('2');
    }
  };
  useEffect(() => {
    if (isFocused) {
      timeInterval.current = setInterval(() => {
        let currentTime = moment().format('HH:mm:ss');
        // console.log('\n\n\n\n currentTime is::', isFocused, currentTime);
        setCurrTime(currentTime);
      }, 1000);
    } else {
      clearInterval(timeInterval?.current);
      // timeInterval.current = null;
    }
    return () => {
      clearInterval(timeInterval.current);
      // timeInterval.current = null;
    };
  }, [isFocused]);
  useEffect(() => {
    if (IsLoggedIn === false) {
      props.navigation.navigate('QrScan');
    } else {
      // intervalRef.current = setInterval(() => {
      //   getDriverAccount(batchId);
      // }, 60000);
    }
    return () => {
      clearInterval(intervalRef?.current);
    };
  }, [IsLoggedIn]);
  // let warn={}
  useEffect(() => {
    try {
      console.log('\n\n\n in useeee');
      warnCall();
      if (warnings && warnings.data) {
        console.log('event iss::', warnings?.data?.status);
        setEventVal(warnings?.data?.event);
        setEvent(warnings?.data?.indicator || '');
        setWarn(warnings?.data?.status || '');
      }
    } catch (error) {
      console.error('Error in warnings effect:', error);
    }
  }, [warnings]);
  useEffect(() => {
    try {
      if (gentStatusUpdate && Object.keys(gentStatusUpdate).length > 0) {
        setStatus(typeof gentStatusUpdate?.genset_status === 'undefined' ? 'Offline' : gentStatusUpdate?.genset_status);
      }
    } catch (error) {
      console.error('Error in gentStatusUpdate effect:', error);
    }
  }, [gentStatusUpdate]);
  const warnCall = async () => {
    try {
      let batchId = await Async.getItem(Async.Item.batchId);
      if (batchId) {
        dispatch(setGensetId(batchId));
        getWarningData(batchId, false);
      }
    } catch (error) {
      console.error('Error in warnCall:', error);
    }
  };
  const getDriverAccount = async id => {
    let response = await getDriverDetailsService(id);
    if (response && response?.status === 200) {
      if (response?.data?.customer?.status !== 'Active') {
        // setDriverData(response?.data);
        // props.navigation.navigate('DriverDetails', { data: response?.data});
        let error = parseError(response);
        FlashMessage({
          message: 'Error',
          description: 'This company is not active. Please contact company',
          type: 'danger'
        });
        // console.log('\n\n  ERORR in getDriverAccountService == ', response);

        props.navigation.navigate('QrScan');
      }
    } else {
    }
  };
  const onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };
  const getWarningData = async (id, val) => {
    setLoader(val);
    if (id) {
      let response = await getDashboardDetailsService(id);
      if (response && response?.status === 200) {
        setLoader(false);
        console.log('\n\n\n response dashboard:::', response?.data);
        setEvent(response?.data?.genset_info?.indicator);
        setWarn(response?.data?.genset_info?.status);
        setEventVal(response?.data?.genset_info?.event);
        setStatus(response?.data?.genset_info?.genset_status);
        const updatedData = {
          ...response?.data,
          Location: [
            {
              description: 'Genset Location',
              id: 14,
              logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
              name: 'latitude',
              value: parseFloat(response?.data?.Location[0]?.value).toFixed(7) + ',\n' + parseFloat(response?.data?.Location[1]?.value).toFixed(7)
            },
            {
              id: 14,
              name: 'Driver Location',
              description: 'Driver Location',
              value: Object.keys(locationData).length > 0 ? locationData?.latitude + ',\n' + locationData?.longitude : '--',
              logo: 'https://genmark-web.vercel.app/assets/images/person-and-tyre.png'
            }
          ]
        };
        console.log('\n\n\n updatedData', updatedData);
        let result = {};
        Object.keys(updatedData).forEach(category => {
          if (Array.isArray(updatedData[category])) {
            updatedData[category].forEach(item => {
              if (item.description && item.value !== undefined && item.value !== null) {
                result[item.description] = isNaN(item.value) ? item.value : parseFloat(item.value);
              }
            });
          }
        });
        console.log('\n\n\n ::new result:::', result);
        setDataFormated(result);
        // if (warnings) {
        //   let obj = { ...updatedData };
        //   let newobj = { ...warnings?.data };
        //   for (const key in obj) {
        //     if (obj.hasOwnProperty(key) && Array.isArray(obj[key])) {
        //       for (const item of obj[key]) {
        //         if (newobj.hasOwnProperty(item.name)) {
        //           item.value = newobj[item.name];
        //         }
        //       }
        //     }
        //   }
        //   let start = {
        //     lat: parseFloat(response?.data?.Location[0]?.value ? response?.data?.Location[0]?.value : 0),
        //     long: parseFloat(response?.data?.Location[1]?.value?.value ? response?.data?.Location[1]?.value : 0)
        //   };
        //   let end = {
        //     lat: Object.keys(locationData).length == 0 || typeof locationData?.latitude === undefined ? 0 : locationData?.latitude,
        //     long: Object.keys(locationData).length == 0 || typeof locationData?.longitude === undefined ? 0 : locationData?.longitude
        //   };
        //   getDistanceCall(start, end);
        //   obj = {
        //     ...response?.data,
        //     Location: [
        //       {
        //         description: 'Genset Location',
        //         id: 14,
        //         logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
        //         name: 'Genset Location',
        //         value:
        //           Object.keys(warnings).length > 0
        //             ? parseFloat(warnings?.data?.latitude).toFixed(7) + '\n' + parseFloat(warnings?.data?.longitude).toFixed(7)
        //             : '--'
        //       },
        //       {
        //         id: 14,
        //         name: 'Driver Location',
        //         description: 'Driver Location',
        //         value: Object.keys(locationData).length > 0 ? locationData?.latitude + ',\n' + locationData?.longitude : '--',
        //         logo: 'https://genmark-web.vercel.app/assets/images/driver-total.png'
        //       }
        //     ]
        //   };
        //   console.log('\n\n\n new obj::', obj);
        //   dispatch(setDashboardDetails(obj));
        //   setDashboardData(obj);
        // } else {
        dispatch(setDashboardDetails(updatedData));
        console.log('\n\n\n\n\n\n\n\n\n updatedData:::', updatedData);
        setDashboardData(updatedData);
        // }
      } else {
        let error = parseError(response);
        FlashMessage({
          message: 'Error',
          description: error?.message || 'Something went wrong. Please try again later.',
          type: 'danger'
        });
        setLoader(false);
      }
    }
  };
  //running
  // const getWarningData = async (id, val) => {
  //   setLoader(val);
  //   // Get existing data or make API call based on val
  //   let currentData;
  //   if (val && id) {
  //     let response = await getDashboardDetailsService(id);
  //     if (response && response?.status === 200) {
  //       currentData = response?.data;
  //     } else {
  //       let error = parseError(response);
  //       FlashMessage({
  //         message: 'Error',
  //         description: error?.message || 'Something went wrong. Please try again later.',
  //         type: 'danger'
  //       });
  //       setLoader(false);
  //       return;
  //     }
  //   } else {
  //     // Use existing data when val is false
  //     currentData = dashboardData || {}; // Provide default empty object
  //   }
  //   // Ensure Location array exists
  //   const locationArray = currentData?.Location || [];
  //   const locationValue0 = locationArray[0]?.value || '';
  //   const locationValue1 = locationArray[1]?.value || '';
  //   setLoader(false);
  //   const updatedData = {
  //     ...currentData,
  //     Location: [
  //       {
  //         description: 'name,status',
  //         id: 14,
  //         logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
  //         name: 'latitude',
  //         value: `${locationValue0},${locationValue1}`
  //       },
  //       {
  //         id: 14,
  //         name: 'Driver Location',
  //         description: 'Driver Location',
  //         value: Object.keys(locationData || {}).length > 0 ? `${locationData?.latitude},\n${locationData?.longitude}` : '--',
  //         logo: 'https://genmark-web.vercel.app/assets/images/person-and-tyre.png'
  //       }
  //     ]
  //   };
  //   console.log('\n\n\n updatedData', updatedData);
  //   if (warnings) {
  //     console.log('\n\n\n  in warnings session');
  //     let obj = { ...updatedData };
  //     let newobj = { ...(warnings?.data || {}) }; // Provide default empty object
  //     // Safely iterate over object keys
  //     Object.keys(obj || {}).forEach(key => {
  //       if (Array.isArray(obj[key])) {
  //         obj[key].forEach(item => {
  //           if (item && newobj.hasOwnProperty(item.name)) {
  //             item.value = newobj[item.name];
  //           }
  //         });
  //       }
  //     });
  //     let start = {
  //       lat: parseFloat(locationArray[0]?.value || 0),
  //       long: parseFloat(locationArray[1]?.value || 0)
  //     };
  //     let end = {
  //       lat: Object.keys(locationData || {}).length === 0 || typeof locationData?.latitude === 'undefined' ? 0 : parseFloat(locationData?.latitude).toFixed(2),
  //       long: Object.keys(locationData || {}).length === 0 || typeof locationData?.longitude === 'undefined' ? 0 : locationData?.longitude
  //     };
  //     getDistanceCall(start, end);
  //     obj = {
  //       ...currentData,
  //       Location: [
  //         {
  //           description: 'Genset Location',
  //           id: 14,
  //           logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
  //           name: 'Genset Location',
  //           value:
  //             Object.keys(warnings?.data || {}).length > 0
  //               ? `${parseFloat(warnings?.data?.latitude).toFixed(7)}\n${parseFloat(warnings?.data?.longitude).toFixed(7)}`
  //               : '--'
  //         },
  //         {
  //           id: 14,
  //           name: 'Driver Location',
  //           description: 'Driver Location',
  //           value:
  //             Object.keys(locationData || {}).length > 0
  //               ? `${parseFloat(locationData?.latitude).toFixed(6)},\n${parseFloat(locationData?.longitude).toFixed(6)}`
  //               : '--',
  //           logo: 'https://genmark-web.vercel.app/assets/images/driver-total.png'
  //         }
  //       ]
  //     };
  //     console.log('\n\n\n obj::', obj);
  //     // if (Object.keys(gentStatusUpdate).length < 1) {
  //     //   setStatus(typeof obj?.genset_info?.genset_status === 'undefined' ? 'Offline' : obj?.genset_info?.status);
  //     // }
  //     if (Object.keys(warnings).length == 0) {
  //       setEvent(obj?.genset_info?.indicator);
  //       setWarn(obj?.genset_info?.condition);
  //     }
  //     dispatch(setDashboardDetails(obj));
  //     setDashboardData(obj);
  //   } else {
  //     console.log('\n\n\n\n\n  currentData:::', currentData);
  //     setDashboardData(currentData);
  //   }
  // };
  //new
  // const getWarningData = async (id, val) => {
  //   try {
  //     setLoader(val);
  //     let currentData = dashboardData || {}; // Default to existing data
  //     // Only call API if val is true and id is provided
  //     if (val && id) {
  //       const response = await getDashboardDetailsService(id);
  //       if (response?.status === 200) {
  //         currentData = response.data;
  //       } else {
  //         let error = parseError(response);
  //         FlashMessage({
  //           message: 'Error',
  //           description: error?.message || 'Something went wrong. Please try again later.',
  //           type: 'danger'
  //         });
  //         setLoader(false);
  //         return;
  //       }
  //     }

  //     // Ensure Location array exists
  //     const locationArray = currentData?.Location || [];
  //     const locationValue0 = parseFloat(locationArray[0]?.value || 0).toFixed(7);
  //     const locationValue1 = parseFloat(locationArray[1]?.value || 0).toFixed(7);

  //     // Extract driver location safely
  //     const driverLatitude = parseFloat(locationData?.latitude || 0).toFixed(6);
  //     const driverLongitude = parseFloat(locationData?.longitude || 0).toFixed(6);

  //     // Format updated data
  //     const updatedData = {
  //       ...currentData,
  //       Location: [
  //         {
  //           description: 'Genset Location',
  //           id: 14,
  //           logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
  //           name: 'latitude',
  //           value: `${locationValue0},\n${locationValue1}`
  //         },
  //         {
  //           id: 14,
  //           name: 'Driver Location',
  //           description: 'Driver Location',
  //           value: driverLatitude && driverLongitude ? `${driverLatitude},\n${driverLongitude}` : '--',
  //           logo: 'https://genmark-web.vercel.app/assets/images/person-and-tyre.png'
  //         }
  //       ]
  //     };

  //     console.log('\n\n\n Updated Data:', updatedData);

  //     if (warnings) {
  //       console.log('🔹 Processing Warnings...');

  //       let obj = { ...updatedData };
  //       let newWarnings = warnings?.data || {};

  //       // Update object values from warnings
  //       Object.keys(obj || {}).forEach(key => {
  //         if (Array.isArray(obj[key])) {
  //           obj[key].forEach(item => {
  //             if (newWarnings.hasOwnProperty(item.name)) {
  //               item.value = newWarnings[item.name];
  //             }
  //           });
  //         }
  //       });

  //       let start = { lat: parseFloat(locationValue0), long: parseFloat(locationValue1) };
  //       let end = { lat: driverLatitude, long: driverLongitude };

  //       getDistanceCall(start, end);

  //       obj = {
  //         ...currentData,
  //         Location: [
  //           {
  //             description: 'Genset Location',
  //             id: 14,
  //             logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
  //             name: 'Genset Location',
  //             value:
  //               Object.keys(newWarnings).length > 0
  //                 ? `${parseFloat(newWarnings?.latitude || 0).toFixed(7)}\n${parseFloat(newWarnings?.longitude || 0).toFixed(7)}`
  //                 : '--'
  //           },
  //           {
  //             id: 14,
  //             name: 'Driver Location',
  //             description: 'Driver Location',
  //             value: driverLatitude && driverLongitude ? `${driverLatitude},\n${driverLongitude}` : '--',
  //             logo: 'https://genmark-web.vercel.app/assets/images/driver-total.png'
  //           }
  //         ]
  //       };

  //       console.log('🔹 Final Processed Data:', obj);

  //       if (!Object.keys(gentStatusUpdate).length) {
  //         setStatus(obj?.genset_info?.genset_status ?? 'Offline');
  //       }

  //       if (!Object.keys(warnings).length) {
  //         setEvent(obj?.genset_info?.indicator);
  //         setWarn(obj?.genset_info?.condition);
  //       }

  //       dispatch(setDashboardDetails(obj));
  //       setDashboardData(obj);
  //     } else {
  //       console.log('🔹 Using Cached Data:', currentData);
  //       setDashboardData(currentData);
  //     }
  //   } catch (error) {
  //     console.error('🚨 Error in getWarningData:', error);
  //     FlashMessage({
  //       message: 'Error',
  //       description: error?.message || 'An unexpected error occurred.',
  //       type: 'danger'
  //     });
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  const openAppleMaps = item => {
    const url = `maps://maps.apple.com/?q=${item}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  const navigateToMap = address => {
    const latLng = address; //`${selectedServiceLocation?.lat},${selectedServiceLocation?.lng}`;
    const latLngCurrent = `${Location?.latitude},${Location?.longitude}`;
    const browser_url = `https://www.google.com/maps/dir/?api=1&origin=${latLngCurrent}&destination=${latLng}&travelmode=driving`;

    console.log('\n\n\n address:::', latLng, '\n', latLngCurrent);

    let urlAndroid = `https://www.google.com/maps/dir/?api=1&origin=${latLngCurrent}&destination=${latLng}&travelmode=driving`;
    let urlIos = `comgooglemaps://?center=${Location?.latitude},${Location?.longitude}&zoom=14&views=traffic`;
    const url = Platform.select({
      ios: browser_url,
      android: urlAndroid
    });
    console.log('\n\n\n url:::', url);
    Linking.canOpenURL(url)
      .then(supported => {
        console.log('\n\n\n supported:::', supported);
        if (!supported) {
          Linking.openURL(browser_url);

          FlashMessage({
            message: 'Error',
            description: 'not supported',
            type: 'danger'
          });
        } else {
          console.log('\n\n\n\n browser_url', browser_url);
          Linking.openURL(browser_url);
          // return Linking.openURL(url);
        }
      })
      .catch(err => {
        console.log('\n\n\n\n  err', err);
        FlashMessage({
          message: 'Error',
          description: 'not supported',
          type: 'danger'
        });
      });
  };
  const openWaze = item => {
    const url = `https://waze.com/ul?ll=${item}&navigate=yes`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  return {
    status,
    formatTimeProg,
    time,
    modalVisible,
    setModalVisible,
    openDialer,
    data,
    genId,
    createdTime,
    name,
    setName,
    dashData,
    dashboardData,
    setDashboardData,

    loader,
    setLoader,
    array,
    setArray,
    dashboardDetailsData,
    warnings,
    warnModal,
    setWarnModal,
    warn,
    setWarn,
    event,
    driLoc,
    currTime,
    navigateToMap,
    locModal,
    setLocModal,
    openAppleMaps,
    address,
    setAddress,
    openWaze,
    gentStatusUpdate,
    dataFormated,
    eventModal,
    setEventModal,
    eventVal,
    setEventVal
  };
};

export default useService;
// if (warnings) {
//   const updatedData = {
//     ...dashboardData, // Use existing dashboard data instead of making API call
//     Location: [
//       {
//         description: 'Genset Location',
//         id: 14,
//         logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
//         name: 'Genset Location',
//         value: Object.keys(warnings).length > 0 ? warnings?.data?.latitude + '\n' + warnings?.data?.longitude : '--'
//       },
//       {
//         id: 14,
//         name: 'Driver Location',
//         description: 'Driver Location',
//         value: Object.keys(locationData).length > 0 ? locationData?.latitude + ',\n' + locationData?.longitude : '--',
//         logo: 'https://genmark-web.vercel.app/assets/images/driver-total.png'
//       }
//     ]
//   };

//   // Calculate distance if both locations are available
//   let start = {
//     lat: parseFloat(dashboardData?.Location[0]?.value || 0),
//     long: parseFloat(dashboardData?.Location[1]?.value || 0)
//   };

//   let end = {
//     lat: Object.keys(locationData).length > 0 && locationData?.latitude !== undefined ? locationData?.latitude : 0,
//     long: Object.keys(locationData).length > 0 && locationData?.longitude !== undefined ? locationData?.longitude : 0
//   };

//   getDistanceCall(start, end);

//   dispatch(setDashboardDetails(updatedData));
//   setDashboardData(updatedData);
//   setLoader(false);
//   return;
// }

// // Only make API call if there are no warnings and id exists
// if (id) {
//   console.log('\n\n\n\n\n  id getDashboardDetailsService:: ', id);
//   let response = await getDashboardDetailsService(id);

//   if (response && response?.status === 200) {
//     const updatedData = {
//       ...response?.data,
//       Location: [
//         {
//           description: 'name,status',
//           id: 14,
//           logo: 'https://genmark.blob.core.windows.net/media/features/Location.png',
//           name: 'latitude',
//           value: response?.data?.Location[0]?.value + ',' + response?.data?.Location[1]?.value
//         },
//         {
//           id: 14,
//           name: 'Driver Location',
//           description: 'Driver Location',
//           value: Object.keys(locationData).length > 0 ? locationData?.latitude + ',\n' + locationData?.longitude : '--',
//           logo: 'https://genmark-web.vercel.app/assets/images/person-and-tyre.png'
//         }
//       ]
//     };

//     setDataFormated(updatedData);
//     setDashboardData(response?.data);
//   } else {
//     let error = parseError(response);
//     FlashMessage({
//       message: 'Error',
//       description: error?.message || 'Something went wrong. Please try again later.',
//       type: 'danger'
//     });
//   }
// }

// setLoader(false);
