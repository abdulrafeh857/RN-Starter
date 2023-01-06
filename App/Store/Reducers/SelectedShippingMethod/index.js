import {SELECTED_SHIPPING_METHOD} from '../../Actions/SelectedShippingMethod/type';

const initialState = {
  selectedShippingMethod: null,
};

const SelectedShippingMethod = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SELECTED_SHIPPING_METHOD:
      return {
        ...state,
        selectedShippingMethod: payload,
      };
    default:
      return state;
  }
};

export default SelectedShippingMethod;
