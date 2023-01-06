// Imports
import {useState} from 'react';
import {Feedback} from '@Atoms';
import addCardService from 'Services/AddPaymentMethod';
import showAlert from '../../../Store/Actions/ShowAlert';
import {useDispatch} from 'react-redux';
import {useStripe} from '@stripe/stripe-react-native';

const useService = (props) => {
  const fromCheckout = props.route.params?.fromCheckout || false;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(undefined);

  const [cardValid, setCardValid] = useState(false);

  const {createPaymentMethod} = useStripe();

  const sendCardToAPI = (pm_id) => {
    addCardService(pm_id)
      .then((response) => {
        console.log('Success', response);
        if (response.status === 201) {
          if (fromCheckout) {
            props.navigation.navigate('PaymentMethod', {fromCheckout});
          } else {
            props.navigation.pop();
          }
        } else if (response.status === 200 && response?.data?.message) {
          dispatch(
            showAlert({
              type: 'error',
              autoDismiss: false,
              title:
                'Code: "' +
                (response?.data?.decline_code
                  ? response?.data?.decline_code
                  : response?.data?.code) +
                '"',
              body: response?.data?.message,
              buttons: [
                {
                  name: 'Okay',
                  onPress: () => dispatch(showAlert(null)),
                },
              ],
            }),
          );
        }
        setIsLoading(false);
      })
      .catch((err) => {
        Feedback.error('Something went wrong while adding your card.', 'OK');
        setIsLoading(false);
      });
  };

  const onAddCard = async () => {
    // Gather the customer's billing information (e.g., email)
    const billingDetails = {
      // email: 'email@stripe.com',
      // phone: '+48888000888',
      // addressCity: 'Houston',
      // addressCountry: 'US',
      // addressLine1: '1459  Circle Drive',
      // addressLine2: 'Texas',
      // addressPostalCode: '77063',
    };

    setIsLoading(true);

    let {paymentMethod, error} = await createPaymentMethod({
      type: 'Card',
      billingDetails,
    });

    if (error) {
      dispatch(
        showAlert({
          type: 'error',
          autoDismiss: false,
          title: error.code,
          body: error.message,
          buttons: [
            {
              name: 'Okay',
              onPress: () => dispatch(showAlert(null)),
            },
          ],
        }),
      );
      setIsLoading(false);
      return;
    }

    if (!paymentMethod) {
      setIsLoading(false);
      return;
    }

    console.debug('Payment Method created:.', paymentMethod);

    sendCardToAPI(paymentMethod.id);
  };

  return {
    fromCheckout,
    isLoading,
    cardValid,
    onAddCard,
    setCardValid,
  };
};

// Export
export default useService;
