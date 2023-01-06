import {GET_PRODUCTS_FAILURE, GET_PRODUCTS_SUCCESS} from './type';
import getProductsService from 'Services/Products';

const getProducts = (param) => async (dispatch) => {
  try {
    const formattedResponse = await getProductsService(param);
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: formattedResponse,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_FAILURE,
    });
  }
};

export default getProducts;
