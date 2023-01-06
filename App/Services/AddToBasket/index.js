import api from '../api';
import AddToBasketFormatter from '../../Utils/Formatter/AddToBasket';

const addToBasketService = (payload) => {
  return api
    .post('basket/add-product/', payload)
    .then((response) => {
      return AddToBasketFormatter.addToBasket(response.data);
    })
    .catch((err) => {
      console.error(
        'Error: * User wanted to add product to basket *',
        'Response: ',
        err.response,
        'Message: ',
        err.message,
        'Error: ',
        err,
      );
    });
};

export default addToBasketService;
