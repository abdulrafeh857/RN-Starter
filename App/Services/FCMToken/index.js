import api from '../api';
import {Platform} from 'react-native';

const sendFCMTokenService = (payload) => {
  return api
    .post('fcm/devices/', {
      ...payload,
      type: Platform.OS === 'ios' ? 'ios' : 'android',
    })
    .then((response) => {
      if (response.status === 201)
        console.debug('FCM Token Sent successfully.');
      return response.data;
    })
    .catch((error) => {
      if (
        error.response.status === 400 &&
        error.response.data.registration_id
      ) {
        console.debug(
          'FCM Token already exists.',
          error.response.data?.registration_id,
        );
      } else {
        console.debug('FCM Token failed to send.', error.response.data?.detail);
      }
    });
};

export default sendFCMTokenService;
