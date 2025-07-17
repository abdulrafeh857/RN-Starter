import { useEffect, useState } from 'react';
import pusherConfig from './pusher.json';
import { Pusher } from '@pusher/pusher-websocket-react-native';
import Config from 'react-native-config';
import { setPusherInstance } from 'Store/Redux/PusherInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setWarnings } from 'Store/Redux/Warnings';
import { setPusherFlag } from 'Store/Redux/PusherFlag';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';
import Async from 'Store/Async';
import { set } from 'react-native-reanimated';
import { setDashboardDetails } from 'Store/Redux/DashboardDetails';
import { setGensetId } from 'Store/Redux/GensetId';
import { FlashMessage } from 'Components/Molecules';
import { setGenStatus } from 'Store/Redux/GenStatus';

const PusherService = () => {
  const genId = useSelector(state => state?.GensetId?.data);
  const driver_Id = useSelector(state => state?.DriverId?.data);
  console.log('\n\n\n  driver_Id in pusher service iss:::::  ===  ', driver_Id);
  const dashboardData = useSelector(state => state?.DashboardDetails?.data);
  const pusher = Pusher.getInstance();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [capID, setCapID] = useState('');
  const [driverId, setDriverId] = useState('');
  const setState = async () => {
    // if (driver_Id == null || driver_Id == '' || driver_Id == 0) {
    //   setFlag(!flag);
    // } else if (driver_Id != null || driver_Id != '' || driver_Id != 0) {
    //   driverId = driver_Id;
    // }
  };
  useEffect(() => {
    if (driver_Id != null || typeof driver_Id != 'undefined' || driver_Id != '') {
      setDriverId(driver_Id);
    } else {
      console.log('\n\n\n in else of driver id');
      setDriverId(driverId);
    }
    if (genId != null || typeof genId != 'undefined' || genId != '') {
      setCapID(genId);
    } else {
      console.log('\n\n\n in else of gen id');
      setDriverId(driverId);
    }
    onConnect();
    // let obj = { ...dashboardData };
    // Object.entries(obj).forEach(([category, items]) => {
    //   if (Array.isArray(items)) {
    //     const itemIndex = items.findIndex(item => item.description === 'Fuel');
    //     if (itemIndex !== -1) {
    //       console.log(`\nFound "Speed" in category: ${category}`);
    //       obj[category][itemIndex].name = 'Low';
    //       dispatch(setDashboardDetails({ ...obj }));
    //     }
    //   }
    // });
    return () => onReturn();
  }, [driver_Id, genId]);
  useEffect(() => {
    setState();
  }, [flag]);
  const setGenId = async () => {
    // capID = await Async.getItem(Async.Item.batchId);
    // if (ids == null || ids == '' || ids == 0) {
    //   intervalRef.current = setInterval(async () => {
    //     ids = await Async.getItem(Async.Item.batchId);
    //     capID = await Async.getItem(Async.Item.batchId);
    //     if (ids != null) {
    //       capID = await Async.getItem(Async.Item.batchId);
    //       clearInterval(intervalRef?.current);
    //     }
    //   }, 5000);
    // } else if (ids != null || ids != '' || ids != 0) {
    //   capID = ids;
    // } else {
    // }
  };
  const update = async () => {
    await pusher.disconnect();
    await pusher.unsubscribe({
      channelName: 'private-genset'
    });
    //////////////After
    dispatch(setIsLoggedIn(false));
    dispatch(setDashboardDetails({}));
    dispatch(setGensetId(''));
    dispatch(setWarnings({}));
    await Async.setItem(Async.Item.IsLoggedIn, false);
    await Async.setItem(Async.Item.name, '');
    // await Async.setItem(Async.Item.warningsData, '');
    await Async.setItem(Async.Item.dashData, '');
    FlashMessage({
      message: 'Success',
      description: 'New Driver logged in',
      type: 'success'
    });
    // Toast.show('Driver added successfully', Toast.LONG);
    // props.navigation.navigate('Splash');
  };
  const logout = async () => {
    await pusher.disconnect();
    await pusher.unsubscribe({
      channelName: 'private-genset'
    });
    //////////////After
    dispatch(setIsLoggedIn(false));
    dispatch(setDashboardDetails({}));
    dispatch(setGensetId(''));
    dispatch(setWarnings({}));
    await Async.setItem(Async.Item.IsLoggedIn, false);
    await Async.setItem(Async.Item.name, '');
    // await Async.setItem(Async.Item.warningsData, '');
    await Async.setItem(Async.Item.dashData, '');
    FlashMessage({
      message: 'Danger',
      description: 'You have been logged out by the admin.',
      type: 'success'
    });
    // Toast.show('Driver added successfully', Toast.LONG);
    // props.navigation.navigate('Splash');
  };
  const onConnect = async () => {
    dispatch(setPusherInstance(pusher));
    try {
      await pusher.init({
        authEndpoint: Config.BASE_URL + 'api/authenticate-pusher/',
        apiKey: pusherConfig.key,
        cluster: pusherConfig.cluster,
        onConnectionStateChange,
        onSubscriptionError: error => {
          console.log('\n\n\n error init onSubscriptionError == ', error);
        },
        onSubscriptionSucceeded: success => {
          dispatch(setPusherFlag(true));
        },
        onEvent: async event => {
          console.log('\n\n\n  event warning iss:::::  ===  ', event);
          if (event?.eventName === 'private-' + genId + '-warning') {
            let eventData = JSON.parse(event?.data);
            console.log('\n\n\n event from pusher warning::  ===  ', eventData);
            // await Async.setItem(Async.Item.warningsData, eventData);
            dispatch(setWarnings(eventData));
          } else if (event?.eventName === 'private-' + genId + '-status') {
            let eventData = JSON.parse(event?.data);
            console.log('\n\n\n event from pusher status::  ===  ', eventData?.data);
            dispatch(setGenStatus(eventData?.data));
            if (eventData?.data?.status === 401) {
              update();
            }
          } else if (event?.eventName === 'private-' + driver_Id + '-logout') {
            let eventData = JSON.parse(event?.data);
            console.log('\n\n\n event from pusher logout::  ===  ', eventData?.data);

            if (eventData?.data?.status === 401 || eventData?.data?.status === 404 || eventData?.data?.status === 204) {
              logout();
            }
          } else if (event?.eventName === 'private-' + driver_Id + '-status') {
            let eventData = JSON.parse(event?.data);
            console.log('\n\n\n event from pusher status::  ===  ', eventData?.data);
            if (eventData?.data?.status === 401) {
              update();
            }
          }
        }
      });

      await pusher.connect();
      await pusher.subscribe({
        channelName: 'private-genset'
      });
    } catch (e) {
      console.log('\n\n\n error in pusher init == ', e);
    }
  };

  const onConnectionStateChange = (currentState, previousState) => {
    console.log(`Connection: ${currentState}`);
  };
  const onReturn = async () => {
    await pusher.disconnect();
    await pusher.unsubscribe({
      channelName: 'private-genset'
    });
  };
};

export default PusherService;
