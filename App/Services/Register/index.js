import api from '../api';
import parseSignUpError from 'Errors/SignUp';

const registerService = (payload) => {
  return api
    .post('register/', payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      let _error = parseSignUpError(error);
      return _error;
    });
};

export default registerService;
