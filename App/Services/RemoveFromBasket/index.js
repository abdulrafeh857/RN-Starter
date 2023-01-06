import api from '../api';

const removeFromBasketService = (url) => {
  return api
    .delete(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to remove product from basket but failed *',
        'Response: ',
        error.response,
        'Message: ',
        error.message,
        'Error: ',
        error,
      );
    });
};

export default removeFromBasketService;
