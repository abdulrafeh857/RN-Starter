import api from '../api';

const deleteVoucherService = (payload) => {
  return api
    .delete('basket/voucher/', {data: payload})
    .then((response) => {
      console.log('🚀 ~ file: index.js ~ line 7 ~ .then ~ response', response);
      return response;
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to delete voucher to basket but failed *',
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

export default deleteVoucherService;
