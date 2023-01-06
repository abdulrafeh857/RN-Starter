import {SELECTED_SHIPPING_METHOD} from './type';

const setSelectedShippingMethod = (shippingMethod) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_SHIPPING_METHOD,
      payload: shippingMethod,
    });
  } catch (err) {}
};

export default setSelectedShippingMethod;
