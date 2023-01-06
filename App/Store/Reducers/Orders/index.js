import {GET_ORDERS_FAILURE, GET_ORDERS_SUCCESS} from '../../Actions/Orders/type';

const initialState = {
  orders: null,
  loadingOrders: true,
};

const Orders = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
        loadingOrders: false,
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        orders: null,
        loadingOrders: true,
      };
    default:
      return state;
  }
};

export default Orders;
