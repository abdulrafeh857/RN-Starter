import OrdersFormatter from '../../Utils/Formatter/Orders';
import api from '../api';

const getOrdersService = () => {
  return api
    .get('orders/')
    .then((response) => {
      return OrdersFormatter.getOrders(response.data);
    })
    .catch((error) => {
      console.log('Get Order Error: ', error.response || error.message);
    });
};

const loadMore = (url) => {
  return api.get(url).then((response) => {
    return OrdersFormatter.getOrders(response.data);
  });
};

export {loadMore};

export default getOrdersService;

// Usage:
// import getOrdersService from 'Services/Orders';

// getOrdersService()
//   .then((response) => {
//     console.log('🚀 ~ file: index.js ~ line 13 ~ response', response);
//   })
//   .catch((err) => {
//     console.log(err.message, err.config);
//   });
