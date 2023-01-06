import {GET_USER_ADDRESSES_FAILURE, GET_USER_ADDRESSES_SUCCESS} from './type';
import getUserAddressesService from 'Services/UserAddresses';

const getUserAddresses = (param) => async (dispatch) => {
  try {
    const formattedResponse = await getUserAddressesService(param);
    dispatch({
      type: GET_USER_ADDRESSES_SUCCESS,
      payload: formattedResponse,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ADDRESSES_FAILURE,
    });
  }
};

export default getUserAddresses;
