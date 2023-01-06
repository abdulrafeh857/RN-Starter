import api from '../api';
import BasketFormatter from '../../Utils/Formatter/Basket';

const getBasketService = () => {
  return api
    .get('basket/')
    .then((response) => {
      return BasketFormatter.getBasket(response.data);
    })
    .catch((err) =>
      console.log('Get Basket Error: ', err.response || err.message || err),
    );
};

export default getBasketService;
