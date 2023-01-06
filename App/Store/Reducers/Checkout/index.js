import {CHECKOUT_FAILURE, CHECKOUT_SUCCESS} from '../../Actions/Checkout/type';

const initialState = {
  checkout: null,
  loadingCheckout: true,
};

const Checkout = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        checkout: payload,
        loadingCheckout: false,
      };
    case CHECKOUT_FAILURE:
      return {
        ...state,
        checkout: null,
        loadingCheckout: true,
      };
    default:
      return state;
  }
};

export default Checkout;
