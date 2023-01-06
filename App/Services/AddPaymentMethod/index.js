import api from '../api';

const addCardService = (id) => {
  return api
    .post('stripe/cards/', {payment_method: id})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(
        'Error: * User wanted to add a card to account but failed *',
        'Response: ',
        err.response,
        'Message: ',
        err.message,
        'Error: ',
        err,
      );
    });
};

export default addCardService;
