import {GET_ORDERS_FAILURE, GET_ORDERS_SUCCESS} from './type';
import getOrdersService from 'Services/Orders';

const getOrders = (param) => async (dispatch) => {
  try {
    const formattedResponse = await getOrdersService(param);
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: formattedResponse,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAILURE,
    });
  }
};

export default getOrders;
