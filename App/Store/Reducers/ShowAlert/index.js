import {SHOW_ALERT_FAILURE, SHOW_ALERT_SUCCESS} from '../../Actions/ShowAlert/type';

const initialState = {
  isLoading: true,
  data: null,
  success: null,
};

const ShowAlert = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SHOW_ALERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
        success: true,
      };
    case SHOW_ALERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: payload,
        success: false,
      };
    default:
      return state;
  }
};

export default ShowAlert;
