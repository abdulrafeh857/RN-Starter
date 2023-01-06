import {GET_VENDORS_FAILURE, GET_VENDORS_SUCCESS} from '../../Actions/Vendors/type';

const initialState = {
  vendors: null,
  loadingVendors: true,
};

const Vendors = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: payload,
        loadingVendors: false,
      };
    case GET_VENDORS_FAILURE:
      return {
        ...state,
        vendors: null,
        loadingVendors: true,
      };
    default:
      return state;
  }
};

export default Vendors;
