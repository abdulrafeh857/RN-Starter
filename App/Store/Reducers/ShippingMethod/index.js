import {
  GET_SHIPPING_METHOD_FAILURE,
  GET_SHIPPING_METHOD_SUCCESS,
} from '../../Actions/ShippingMethod/type';

const initialState = {
  shippingMethod: null,
  loadingShippingMethod: true,
};

const ShippingMethod = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_SHIPPING_METHOD_SUCCESS:
      return {
        ...state,
        shippingMethod: payload,
        loadingShippingMethod: false,
      };
    case GET_SHIPPING_METHOD_FAILURE:
      return {
        ...state,
        shippingMethod: null,
        loadingShippingMethod: true,
      };
    default:
      return state;
  }
};

export default ShippingMethod;
