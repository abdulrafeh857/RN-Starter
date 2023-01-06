import {GET_BASKET_FAILURE, GET_BASKET_SUCCESS} from '../../Actions/Basket/type';

const initialState = {
  basket: null,
  loadingBasket: true,
};

const Basket = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_BASKET_SUCCESS:
      return {
        ...state,
        basket: payload,
        loadingBasket: false,
      };
    case GET_BASKET_FAILURE:
      return {
        ...state,
        basket: null,
        loadingBasket: true,
      };
    default:
      return state;
  }
};

export default Basket;
