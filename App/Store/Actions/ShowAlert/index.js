import {SHOW_ALERT_FAILURE, SHOW_ALERT_SUCCESS} from './type';

const showAlert = (state) => async (dispatch) => {
  try {
    const currentState = state;
    console.debug('Send Alert data to Redux Store.', {alert: state});
    dispatch({
      type: SHOW_ALERT_SUCCESS,
      payload: currentState,
      success: true,
    });
  } catch (err) {
    console.debug('Send Error data to Redux Store.');
    dispatch({
      type: SHOW_ALERT_FAILURE,
      payload: err.response || err.message || err,
      success: false,
    });
  }
};

export default showAlert;
