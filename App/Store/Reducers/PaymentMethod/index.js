import {
  GET_PAYMENT_METHOD_FAILURE,
  GET_PAYMENT_METHOD_SUCCESS,
} from '../../Actions/PaymentMethod/type';

const initialState = {
  paymentMethod: null,
  paymentExists: false,
};

const PaymentMethod = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        paymentMethod: payload,
        paymentExists: true,
      };
    case GET_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        paymentMethod: null,
      };
    default:
      return state;
  }
};

export default PaymentMethod;
