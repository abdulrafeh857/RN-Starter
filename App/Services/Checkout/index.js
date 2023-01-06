import api from '../api';
import emitter from 'Utils/Emitter';
import showAlert from '../../Store/Actions/ShowAlert';

const checkoutService = (payload, dispatch) => {
  return api
    .post('checkout/', payload)
    .then((CheckoutResponse) => {
      emitter.emit('Checkout_Success', CheckoutResponse);
      return CheckoutResponse;
    })
    .catch((error) => {
      console.error(
        'Error: * User wanted to checkout basket and place order using Saved Payment Method *',
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
            body: error?.response?.data[0],
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
            type: 'error',
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

export default checkoutService;
