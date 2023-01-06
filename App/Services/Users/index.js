import api from '../api';
import UsersFormatter from '../../Utils/Formatter/Users';

const getUsersService = () => {
  return api.get('users/me/').then((response) => {
    return UsersFormatter.getUsers(response.data);
  });
};

export default getUsersService;

// USAGE:
// import getUsersService from 'Services/Users';

// getUsersService()
//   .then((response) => {
//     console.log('🚀 ~ file: index.js ~ line 13 ~ response', response);
//   })
//   .catch((err) => {
//     console.log(err.message, err.config);
//   });
