import api from '../api';
import messaging from '@react-native-firebase/messaging';

const logoutService = () => {
  return api
    .post('logout/')
    .then(response => {
      return messaging()
        .deleteToken()
        .then(res => {
          console.debug('Token deleted.', res);
          return response;
        })
        .catch(err => {
          console.debug('Token delete failed.', err);
          return response;
        });
    })
    .catch(err => {
      console.log(err.message || err);
    });
};

export default logoutService;
