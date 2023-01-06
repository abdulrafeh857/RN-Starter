import api from '../api';
import {Feedback} from '@Atoms';
import parseChangePasswordError from 'Errors/ChangePassword';

const changePasswordService = (payload) => {
  return api
    .post('auth/password/change/', payload)
    .then((response) => {
      response.status === 200 &&
        Feedback.success('Password updated successfully.', 'OK');
      return response;
    })
    .catch((error) => {
      let _error = parseChangePasswordError(error);
      return _error;
    });
};

export default changePasswordService;
