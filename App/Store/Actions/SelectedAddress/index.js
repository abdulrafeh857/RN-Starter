import {
  GET_SELECTED_ADDRESS_FAILURE,
  GET_SELECTED_ADDRESS_SUCCESS,
} from './type';

import getSelectedAddressService from 'Services/SelectedAddress';

const getSelectedAddress = (location, address) => async (dispatch) => {
  try {
    console.debug('Get Selected Address.');
    const response = await getSelectedAddressService(location, address);
    dispatch({
      type: GET_SELECTED_ADDRESS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log('GPS location threw exception', err);
    dispatch({
      type: GET_SELECTED_ADDRESS_FAILURE,
    });
  }
};

export default getSelectedAddress;
