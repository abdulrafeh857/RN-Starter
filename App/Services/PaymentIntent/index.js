import api from '../api';
import showAlert from '../../Store/Actions/ShowAlert';

const getPaymentIntentService = (paymentMethod, code, dispatch) => {
  return api
    .get('/checkout/payment/' + '?pm_id=' + paymentMethod + '&code=' + code)
    .then((response) => {
      console.log('Intent Response: ', response);
      if (
        response.status === 200 &&
        response.data?.status &&
        response.data?.client_secret
      ) {
        const {status} = response.data;
        return {status};
      } else if (!response.data?.client_secret && response.data?.message) {
        dispatch(
          showAlert({
            type: 'error',
            autoDismiss: false,
            title: 'Error',
            body: response.data?.message,
            buttons: [
              {
                name: 'Okay',
                onPress: () => dispatch(showAlert(null)),
              },
            ],
          }),
        );
      } else {
        dispatch(
          showAlert({
            type: 'oops',
            autoDismiss: true,
            title: 'Error',
            body:
              'Oops! An error occurred while processing your Payment, please try again.',
            buttons: [
              {
                name: 'Okay',
                onPress: () => dispatch(showAlert(null)),
              },
            ],
          }),
        );
      }
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to checkout basket and place order using One Time Payment but failed to call the PaymentIntent *',
        'Response: ',
        error.response,
        'Message: ',
        error.message,
        'Error: ',
        error,
      );
      if (error?.response?.data?.length > 0) {
        dispatch(
          showAlert({
            type: 'error',
            autoDismiss: false,
            title: 'Error',
            body: error.response.data,
            buttons: [
              {
                name: 'Okay',
                onPress: () => dispatch(showAlert(null)),
              },
            ],
          }),
        );
      } else {
        dispatch(
          showAlert({
            type: 'oops',
            autoDismiss: true,
            title: 'Error',
            body:
              'Oops! An error occurred while processing your Payment, please try again.',
            buttons: [
              {
                name: 'Okay',
                onPress: () => dispatch(showAlert(null)),
              },
            ],
          }),
        );
      }
      return error;
    });
};

export default getPaymentIntentService;
