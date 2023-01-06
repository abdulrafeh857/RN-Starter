import {GET_USERS_FAILURE, GET_USERS_SUCCESS} from './type';
import getUsersService from 'Services/Users';

const getUsers = (param) => async (dispatch) => {
  try {
    const formattedResponse = await getUsersService(param);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: formattedResponse,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAILURE,
    });
  }
};

export default getUsers;
