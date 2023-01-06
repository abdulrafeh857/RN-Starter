import api from '../api';
import UserAddressesFormatter from '../../Utils/Formatter/UserAddresses';

const getUserAddressesService = () => {
  return api.get('useraddresses/').then((response) => {
    return UserAddressesFormatter.getUserAddresses(response.data);
  });
};

const loadMore = (url) => {
  return api.get(url).then((response) => {
    return UserAddressesFormatter.getUserAddresses(response.data);
  });
};

export {loadMore};

export default getUserAddressesService;

// USAGE:
// import getUserAddressesService from 'Services/UserAddresses';

// getUserAddressesService()
//   .then((response) => {
//     console.log('🚀 ~ file: index.js ~ line 13 ~ response', response);
//   })
//   .catch((err) => {
//     console.log(err.message, err.config);
//   });
