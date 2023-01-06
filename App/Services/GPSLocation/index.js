import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import GetLocation from 'react-native-get-location';
import {isIos} from 'Platform';
import {Feedback} from '@Atoms';

const getGpsLocationService = () => {
  if (isIos) {
    console.debug('Get GPS location.');
    return GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((_location) => {
        console.debug('Fetched GPS position.');
        return _location;
      })
      .catch((err) => {
        console.log('Failed to fetch GPS position', err);
        Feedback.simple('Please enable the location from app settings.', 'OK');
        return err;
      });
  } else {
    return RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(() => {
        console.debug('Location is enabled.');
        console.debug('Get GPS location.');
        return GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        }).then((_location) => {
          console.debug('Fetched GPS position.');
          return _location;
        });
      })
      .catch((error) => {
        console.debug('GPS position access denied.');
        console.warn(
          'GPS position failed to fetch.',
          error.response || error.message || error,
        );
        return error;
      });
  }
};

export default getGpsLocationService;
