import {GET_SHIPPING_METHOD_FAILURE, GET_SHIPPING_METHOD_SUCCESS} from './type';
import getShippingMethodService from 'Services/ShippingMethod';

const getShippingMethod = (param) => async (dispatch) => {
  try {
    const formattedResponse = await getShippingMethodService(param);
    dispatch({
      type: GET_SHIPPING_METHOD_SUCCESS,
      payload: formattedResponse,
    });
  } catch (err) {
    dispatch({
      type: GET_SHIPPING_METHOD_FAILURE,
    });
  }
};

export default getShippingMethod;
