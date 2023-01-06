import OrdersFormatter from '../../Utils/Formatter/Orders';
import api from '../api';

const getRecentOrdersService = (id) => {
  return api
    .get('orders/?partner=' + id)
    .then((response) => {
      return OrdersFormatter.getOrders(response.data);
    })
    .catch((error) => {
      console.log('Get Recent Order Error: ', error.response || error.message);
    });
};

export default getRecentOrdersService;
