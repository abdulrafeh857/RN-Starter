import {CHECKOUT_FAILURE, CHECKOUT_SUCCESS} from './type';

const setCheckout = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: CHECKOUT_SUCCESS,
      payload: payload,
    });
  } catch (err) {
    dispatch({
      type: CHECKOUT_FAILURE,
    });
  }
};

export default setCheckout;
