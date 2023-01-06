import {
  GET_USER_ADDRESSES_FAILURE,
  GET_USER_ADDRESSES_SUCCESS,
} from '../../Actions/UserAddresses/type';

const initialState = {
  userAddresses: null,
  loadingUserAddresses: true,
};

const UserAddresses = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        userAddresses: payload,
        loadingUserAddresses: false,
      };
    case GET_USER_ADDRESSES_FAILURE:
      return {
        ...state,
        userAddresses: null,
        loadingUserAddresses: true,
      };
    default:
      return state;
  }
};

export default UserAddresses;
