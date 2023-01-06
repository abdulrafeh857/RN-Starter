import {GET_USERS_FAILURE, GET_USERS_SUCCESS} from '../../Actions/Users/type';

const initialState = {
  users: null,
  loadingUsers: true,
};

const Users = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loadingUsers: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        users: null,
        loadingUsers: true,
      };
    default:
      return state;
  }
};

export default Users;
