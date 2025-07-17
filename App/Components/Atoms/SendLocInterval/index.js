import React, { useEffect, useRef } from 'react';
import GetLocation from 'react-native-get-location';
import { PusherEvent } from '@pusher/pusher-websocket-react-native';
import { useDispatch, useSelector } from 'react-redux';
import Async from 'Store/Async';
import { setGensetId } from 'Store/Redux/GensetId';
import { setLocation } from 'Store/Redux/Location';
import { setCurLocationData } from 'Store/Redux/CurLocationData';

const useSendLocInterval = props => {
  const IsLoggedIn = useSelector(state => state?.IsLoggedIn?.data);
  const PusherInst = useSelector(state => state?.PusherInstance?.data);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    updateState();
    if (IsLoggedIn === true) {
      getUserLocation();

      intervalRef.current = setInterval(() => {
        getUserLocation();
      }, 180000);
    } else {
      clearInterval(intervalRef?.current);
    }
    return () => {
      clearInterval(intervalRef?.current);
    };
  }, [IsLoggedIn]);
  let genId = '';
  let driverId = '';
  const updateState = async () => {
    const gensetId = await Async.getItem(Async.Item.id);
    const driver_Id = await Async.getItem(Async.Item.driverId);
    driverId = driver_Id;
    genId = gensetId;
    dispatch(setGensetId(gensetId));
  };
  const getUserLocation = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 7000
    })
      .then(async location => {
        console.log('\n\n\n\n loccation in sendINterval', location);
        dispatch(setLocation(location));
        if (location && location?.latitude && location?.longitude && location.latitude != null && location.longitude != null && IsLoggedIn === true) {
          // console.log('\n\n\n in ifffffff!!!!', location);
          // pusherTrigger(location);
          locData(location);
        } else {
          console.log('\n\n\n LOCATION IS NULL OR UNDEFINED === ');
        }
      })
      .catch(error => {
        const { code, message } = error;
        console.log('\n\n\n getCurrentPosition ERR in sendLOC', code, message);
      });
  };
  const locData = async location => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let url = `https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(location.latitude)}&lon=${parseFloat(location.longitude)}&format=jsonv2`;

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
      dispatch(setCurLocationData(data));

      pusherTrigger(data, location);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    /////////////////
    // fetch(
    //   `https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(location.latitude)}&lon=${parseFloat(location.longitude)}&format=jsonv2`,
    //   requestOptions
    // )
    //   .then(response => response.json())
    //   .then(result => {
    //     // console.log('\n\n\n\n loc data', result);
    //     dispatch(setCurLocationData(result));

    //     pusherTrigger(result, location);
    //   })
    //   .catch(error => console.log('error', error));
  };
  const pusherTrigger = async (result, { latitude, longitude }) => {
    if (PusherInst && Object.keys(PusherInst).length > 0) {
      try {
        let channelName = 'private-genset';
        let eventName = 'client-genset-location';
        let eventData = {
          lat: latitude,
          lng: longitude,
          genset_id: genId,
          location: result,
          driver_id: driverId
        };
        await PusherInst.trigger(
          new PusherEvent({
            channelName,
            eventName,
            data: JSON.stringify(eventData)
          })
        );
      } catch (e) {
        console.log('\n\n\n\n ,error in pusherTrigger', e);
      }
    } else {
    }
  };

  return true;
};

export default useSendLocInterval;
