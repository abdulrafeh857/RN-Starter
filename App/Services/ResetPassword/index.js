import api from '../api';
import {Feedback} from '@Atoms';

const resetPasswordService = (payload) => {
  return api.post('auth/password/reset/', payload).then((response) => {
    console.log('RESET PASSWORD RESPONSE', response);
    response.status === 200 && Feedback.success(response.data.detail, 'OK');
    return response;
  });
};

export default resetPasswordService;
