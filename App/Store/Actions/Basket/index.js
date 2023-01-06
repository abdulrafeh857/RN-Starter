import {GET_BASKET_FAILURE, GET_BASKET_SUCCESS} from './type';
import getBasketService from 'Services/Basket';

const getBasket = (param) => async (dispatch) => {
  try {
    const formattedResponse = await getBasketService(param);
    dispatch({
      type: GET_BASKET_SUCCESS,
      payload: formattedResponse,
    });
  } catch (err) {
    dispatch({
      type: GET_BASKET_FAILURE,
    });
  }
};

export default getBasket;
