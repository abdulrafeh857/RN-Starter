import {GET_PAYMENT_METHOD_FAILURE, GET_PAYMENT_METHOD_SUCCESS} from './type';

const setPaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PAYMENT_METHOD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PAYMENT_METHOD_FAILURE,
    });
  }
};

export default setPaymentMethod;
