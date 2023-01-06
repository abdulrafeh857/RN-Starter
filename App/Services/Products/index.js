import api from '../api';
import ProductsFormatter from '../../Utils/Formatter/Products';

const getProductsService = (param) => {
  param = param ? param : '';
  return api
    .get('products/' + param)
    .then((response) => {
      return ProductsFormatter.getProducts(response.data);
    })
    .catch((error) => {
      console.log(error.response || error.message || error);
    });
};

export default getProductsService;
