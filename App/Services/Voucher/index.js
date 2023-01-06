import api from '../api';

const addVoucherService = (payload) => {
  return api
    .post('basket/voucher/', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to add voucher to basket but failed *',
        'Response: ',
        error.response,
        'Message: ',
        error.message,
        'Error: ',
        error,
      );
      return error;
    });
};

export default addVoucherService;
