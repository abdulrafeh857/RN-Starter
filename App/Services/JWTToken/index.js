import api from '../api';
import parseLoginError from 'Errors/Login';

const getTokenService = (payload) => {
  return api
    .post('token/', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      let _error = parseLoginError(error);
      return _error;
    });
};

export default getTokenService;
