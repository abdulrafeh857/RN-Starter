import {
  GET_SELECTED_ADDRESS_FAILURE,
  GET_SELECTED_ADDRESS_SUCCESS,
} from '../../Actions/SelectedAddress/type';

const initialState = {
  selectedAddress: null,
  loadingSelectedAddress: true,
};

const SelectedAddress = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_SELECTED_ADDRESS_SUCCESS:
      return {
        ...state,
        selectedAddress: payload,
        loadingSelectedAddress: false,
      };
    case GET_SELECTED_ADDRESS_FAILURE:
      return {
        ...state,
        selectedAddress: null,
        loadingSelectedAddress: true,
      };
    default:
      return state;
  }
};

export default SelectedAddress;
