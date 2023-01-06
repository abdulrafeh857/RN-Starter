import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
} from '../../Actions/Products/type';

const initialState = {
  products: null,
  loadingProducts: true,
};

const Products = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        loadingProducts: false,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: null,
        loadingProducts: true,
      };
    default:
      return state;
  }
};

export default Products;
