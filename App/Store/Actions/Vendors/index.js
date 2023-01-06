import {GET_VENDORS_FAILURE, GET_VENDORS_SUCCESS} from './type';
import getVendorsService from 'Services/Vendors';

const getVendors = (param) => async (dispatch) => {
  try {
    const formattedResponse = await getVendorsService(param);
    dispatch({
      type: GET_VENDORS_SUCCESS,
      payload: formattedResponse,
    });
  } catch (err) {
    dispatch({
      type: GET_VENDORS_FAILURE,
      payload: err,
    });
  }
};

export default getVendors;
