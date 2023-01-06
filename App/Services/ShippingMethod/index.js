import api from '../api';
import ShippingMethodFormatter from '../../Utils/Formatter/ShippingMethod';

const getShippingMethodService = () => {
  return api.get('basket/shipping-methods/').then((response) => {
    return response.data.map((shippingMethod) => {
      return ShippingMethodFormatter.getShippingMethod(shippingMethod);
    });
  });
};

export default getShippingMethodService;
