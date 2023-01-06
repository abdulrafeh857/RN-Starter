import api from '../api';
import {Feedback} from '@Atoms';

const removeUserAddressService = (id) => {
  return api
    .delete('/useraddresses/' + id + '/')
    .then((response) => {
      console.log('Delete user address: ', response);
      response.status === 204 &&
        Feedback.success('Address Removed Successfully.', 'OK');
      return response;
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to remove address from saved addresses but failed *',
        'Response: ',
        error.response,
        'Message: ',
        error.message,
        'Error: ',
        error,
      );
    });
};

export default removeUserAddressService;
