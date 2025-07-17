import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getServiceDealer } from 'Api';
import parseError from 'Components/Atoms/ParseError';
import { FlashMessage } from 'Components/Molecules';
import moment, { utc } from 'moment-timezone';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { BackHandler, Linking, PermissionsAndroid, Platform } from 'react-native';
import GetLocation from 'react-native-get-location';
import { checkMultiple, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Async from 'Store/Async';
import { ParseError } from 'Components/Atoms';
import { useSelector } from 'react-redux';
import * as geolib from 'geolib';
import email from 'react-native-email';
import sendEmail from 'Api/SendEmail';

const useService = props => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const intervalRef = useRef(null);
  const genId = useSelector(state => state?.GensetId?.data);
  const Location = useSelector(state => state.Location?.data);
  const warnings = useSelector(state => state?.Warnings?.data);
  console.log('\n\n\n warnings in ser loc', warnings);
  const [selectedServiceLocation, setSelectedServiceLocation] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [dataLocation, setDataLocation] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  const [modalMapVisible, setModalMapVisible] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [appleModal, setAppleModal] = useState(false);
  const [longitude, setLongitude] = useState(0);
  const [conEmail, setConEmail] = useState(false);

  const [nearLat, setNearLat] = useState(0);
  const [nearLon, setNearLon] = useState(0);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [name, setName] = useState('');
  const [driName, setDriName] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [serviceLocations, setServiceLocations] = useState([]);
  console.log('\n\n\n\n in service location:::');
  useFocusEffect(
    useCallback(() => {
      console.log('\n\n\n in useFocusEffect');

      const today = moment().format('dddd');
      const time = moment().tz('Europe/London').format('HH:mm'); ////check

      setCurrentDay(today);
      getServiceDealerFun(today, time);
      getUserPermission();
      getUserLocation(); //check
      funCall();
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [nearLat, nearLon])
  );
  useEffect(() => {
    if (nearLat && nearLon && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: nearLat,
          longitude: nearLon,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        },
        1000 // animation duration in milliseconds
      );
    }
  }, [nearLat, nearLon]);

  useEffect(() => {
    curData(Location?.latitude, Location?.longitude);

    intervalRef.current = setInterval(() => {
      curData(Location?.latitude, Location?.longitude);
    }, 60000);
    return () => {
      clearInterval(intervalRef?.current);
    };
  }, []);
  const onBackPress = async () => {
    console.debug('\n\n\n\n HOME BACK');

    // navigation.navigate('QrScan');
    return true;
  };
  const funCall = async () => {
    setName(await Async.getItem(Async.Item.name)); //check
  };

  const checkOnline = time => {
    if (selectedServiceLocation?.opening_hours) {
      if (selectedServiceLocation?.opening_hours.length > 0) {
        let arr = [...selectedServiceLocation?.opening_hours];
        for (let i = 0; i < arr.length; i++) {
          // console.log('\n\n\n\n arr iss',arr
          if (arr[i].label === currentDay) {
            if (parseInt(arr[i].end_time) < parseInt(time)) {
              console.log('\n\n\n\n time is end');
            } else {
            }
          }
        }
      } else {
      }
    }
  };

  const animateToCurrentLocation = useCallback(
    near => {
      console.log('\n\n\n in map ready finctionis ::', near);
      if (mapRef.current) {
        const region = {
          latitude: nearLat,
          longitude: nearLon,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        };
        console.log('\n\n\n\n in animateToRegion map in function ::', region);

        mapRef.current.animateToRegion(region, 10000);
      }
    },
    [nearLat, nearLon]
  );
  const checkNearest = array => {
    if (array?.length > 0) {
      const near = geolib.findNearest({ latitude, longitude }, array);
      console.log('\n\n\n\n\n nearest::', near);
      setNearLat(parseFloat(near.latitude));
      setNearLon(parseFloat(near.longitude));
    }
    // animateToCurrentLocation(near)
  };

  const locData = async (lat, lon) => {
    console.log('\n\n\n inn loc dta::', lat, lon);
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
      }

      const data = await response.json(); // parse the response as JSON
      const currentTimeInNewYork = moment.tz(moment(), data?.address?.country / data?.address?.state).format('HH:mm');
      console.log('Current time in:', data?.address?.country, data?.address?.state, currentTimeInNewYork);

      checkOnline(currentTimeInNewYork);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    ////////////////
    // fetch('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '+&lon=' + lon + '&format=jsonv2')
    //   .then(response => response.json())
    //   .then(result => {
    //     // console.log('\n\n\n  loc data json::', result);
    //     // console.log('\n\n\n  loc data state is::', result?.address);
    //     // currenTime(result.place_id)

    //     const currentTimeInNewYork = moment.tz(moment(), result?.address?.country / result?.address?.state).format('HH:mm');
    //     console.log('Current time in:', result?.address?.country, result?.address?.state, currentTimeInNewYork);

    //     checkOnline(currentTimeInNewYork);
    //   })
    //   .catch(error => console.log('error', error));
  };

  const openDialer = phone => {
    let phoneNumber = phone;
    phoneNumber = `tel:${phoneNumber}`;
    // if (Platform.OS !== 'android') {
    //   phoneNumber = `telprompt:${phoneNumber}`;
    // } else {
    //   phoneNumber = `tel:${phoneNumber}`;
    // }
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
        console.log('\n\n DIALER ERR', err);
      });
  };

  const getUserPermission = async () => {
    if (Platform.OS == 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(permissionResult => {
        getUserLocation();
        console.log('\n\n\n\n permissionResult:::', permissionResult, RESULTS.GRANTED);
        // console.log(
        //   '\n\n\n\n permissionResult',
        //   permissionResult,
        //   RESULTS.GRANTED
        // );
        if (permissionResult !== RESULTS.GRANTED) {
          console.log('failed on both back and forth');
          setModalMapVisible(true);

          // FlashMessage({
          //   message: 'Error',
          //   description: "Can't access location. Please try again later",
          //   type: 'danger'
          // });
        } else {
          checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(statuses => {
            // setTimeout(() => {
            //   getDerviceLocation();
            getUserLocation();
            // }, 500);
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
        setModalMapVisible(true);
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    }
  };
  const getUserLocation = () => {
    console.log('\n\n\n in get UsewrLoacation SL');
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false
      //  timeout: 15000
    })
      .then(location => {
        console.log('\n\n\n\n loccation11 from SL', location);
        // locData(location.latitude, location.longitude);
        setLatitude(location?.latitude);
        setLongitude(location?.longitude);
      })
      .catch(error => {
        // const { code, message } = error;
      });
  };

  const makeModalInVisible = () => {
    let arr = [...serviceLocations];
    arr.forEach(element => {
      element.selected = false;
    });
    setServiceLocations(arr);
    setModalLocationVisible(false);
  };
  const getServiceDealerFun = async (day, time) => {
    console.log('\n\n\n\n day in getServiceDealerFun::', day, time);

    let timee = '';
    let response = await getServiceDealer();

    if (response && response?.status === 200) {
      // console.log('\n\n\n\n serveice Dealers are::', response?.data?.results);
      if (response?.data?.results.length > 0) {
        let arr = [...response?.data?.results];
        let array = [];
        let checkTime = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].location != null) {
            // console.log('\n\n\n\n\n arr[i].location.lat::', arr[i].location);
            array.push({
              latitude: arr[i]?.location?.lat,
              longitude: arr[i]?.location?.lon
            });
            console.log('\n\n\n\n array issss:::', arr[i]);
            if (arr[i].timezone != null) {
              timee = moment().utc().tz(arr[i].timezone).format('HH:mm');
              console.log('\n\n\n\n\n timee is::', arr[i].timezone, timee);
            }
            if (arr[i]?.opening_hours) {
              if (arr[i]?.opening_hours?.length > 0) {
                for (let j = 0; j < arr[i]?.opening_hours?.length; j++) {
                  if (arr[i].opening_hours[j].label === day) {
                    if (parseInt(arr[i].opening_hours[j].end_time) > parseInt(timee)) {
                      // console.log('\n\n\n\n\n opening hours are:: is open', arr[i].opening_hours[j]);
                      arr[i].flag = true;
                      // console.log('\n\n\n\n in if dealers are open', arr);
                    } else {
                      arr[i].flag = false;
                      // console.log('\n\n\n\n in else dealers are open', arr);
                    }
                  }
                }
              }
            }
          }
        }

        let filteredArray = arr.filter(item => item.location != null);
        setServiceLocations(filteredArray);
        checkNearest(array);
      }
    } else {
      let error = parseError(response);
      FlashMessage({
        message: 'Error',
        description: error?.message || 'Something went wrong. Please try again later.',
        type: 'danger'
      });
      console.log('\n\n  ERORR in getServiceDealer == ', response);
    }
  };
  const openAppleMaps = () => {
    const latitude = lat; // Replace with your desired latitude
    const longitude = lon; // Replace with your desired longitude
    // const label = 'Custom Location'; // Replace with your desired label

    const url = `maps://maps.apple.com/?q=${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.error('Apple Maps is not installed on the device');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const navigateToMap = () => {
    setModalLocationVisible(false);
    console.log('\n\n\n lattitudeCur,lonCurr', latitude, longitude);
    const latLng = `${lat},${lon}`; //`${selectedServiceLocation?.lat},${selectedServiceLocation?.lng}`;
    const latLngCurrent = `${latitude},${longitude}`;
    const browser_url = `https://www.google.com/maps/dir/?api=1&origin=${latLngCurrent}&destination=${latLng}&travelmode=driving`;
    let urlAndroid = `https://www.google.com/maps/dir/?api=1&origin=${latLngCurrent}&destination=${latLng}&travelmode=driving`;
    let urlIos = `comgooglemaps://?center=${Location?.latitude},${Location?.longitude}&zoom=14&views=traffic`;

    const url = Platform.select({
      ios: browser_url,
      android: urlAndroid
    });
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          FlashMessage({
            message: 'Error',
            description: 'Cannot find path',
            type: 'danger'
          });
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        FlashMessage({
          message: 'Error',
          description: err,
          type: 'danger'
        });
        console.log('\n\n MAPS OPEN ERR', err);
      });
  };

  const openWaze = () => {
    const latitude = lat; // Replace with your desired latitude
    const longitude = lon; // Replace with your desired longitude

    const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.error('Waze is not installed on the device');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  const curData = async (lat, lon) => {
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
      }

      const data = await response.json(); // parse the response as JSON
      console.log('\n\n\n\n loc data is :::', data);
      setDataLocation(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // fetch('https://nominatim.openstreetmap.org/reverse?lat=' + lat + '+&lon=' + lon + '&format=jsonv2')
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log('\n\n\n\n loc data is :::', result);
    //     setDataLocation(result);
    //   })

    //   .catch(error => console.log('error', error)); //check
  };

  const sendEmails = async (dName, id, feature) => {
    console.log('\n\n\n selecteds;;s feature::', feature);
    console.log('\n\n\n currLocation is:::', dataLocation?.display_name);
    // const content = await richTextRef.current.getContentHtml();
    let additionalData = {};
    let obj = {};
    console.log('\n\n\n warnings in sendEmailService', Object.keys(warnings).length, warnings);
    if (Object.keys(warnings).length > 0) {
      additionalData = Object.entries(warnings?.data)
        .map(([key, value]) => `${key}:${value}`)
        .join('');
    }
    let message = ``;
    if (id?.id === '1') {
      obj = {
        dealer_email: selectedServiceLocation?.email,
        service_dealer: selectedServiceLocation?.station_name,
        driver_name: dName,
        current_address: JSON.stringify(dataLocation?.display_name)
      };
    } else {
      console.log('\n\n\n in email else');
      obj = {
        dealer_email: selectedServiceLocation?.email,
        service_dealer: selectedServiceLocation?.station_name,
        driver_name: dName,
        current_address: JSON.stringify(dataLocation?.display_name),
        features: feature,
        genset_id: genId
      };

      //       message = `<p>Driver ${dName},</p>
      //  <p>Is on its way with genset : ${genId != null ? genId : ''}.</p>
      //  <p>Location of driver is:</p>
      //   <p>${JSON.stringify(dataLocation?.display_name)}</p>

      //   <p>${JSON.stringify(additionalData)}</p>
      //    `;
    }

    console.log('\n\n\n\n   sendEmailService  payLoad ', JSON.stringify(obj, null, 5));

    let res = await sendEmail(obj);
    console.log('\n\n\n\n   sendEmailService   ', res);
    if (res && res?.status === 200) {
      setDriName('');
      toast.show('Email sent successfully');
      FlashMessage({
        message: 'Success',
        description: 'Email sent successfully',
        type: 'success'
      });
    } else {
      setDriName('');

      let error = ParseError(res);
      FlashMessage({
        message: 'Error',
        description: error?.message || 'Something went wrong. Please try again later.',
        type: 'danger'
      });
      console.log('\n\n\n\n   sendEmailService ERROR  ', res?.status);
    }
  };

  return {
    modalVisible,
    setModalVisible,
    openDialer,
    mapRef,
    serviceLocations,
    setServiceLocations,
    selectedServiceLocation,
    setSelectedServiceLocation,
    modalLocationVisible,
    setModalLocationVisible,
    makeModalInVisible,
    navigateToMap,
    locData,
    setLat,
    setLon,
    openAppleMaps,
    appleModal,
    setAppleModal,
    openWaze,
    modalMapVisible,
    setModalMapVisible,
    nearLon,
    nearLat,
    name,
    genId,
    sendEmails,
    flag,
    setFlag,
    driName,
    setDriName,
    dataLocation,
    warnings,
    conEmail,
    setConEmail
  };
};

export default useService;
