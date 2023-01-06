import api from '../api';

const removePaymentMethodService = (id) => {
  return api
    .delete('/stripe/cards/' + id + '/')
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to remove payment method (card) from saved cards but failed *',
        'Response: ',
        error.response,
        'Message: ',
        error.message,
        'Error: ',
        error,
      );
    });
};

export default removePaymentMethodService;
