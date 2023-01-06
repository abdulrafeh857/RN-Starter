// Imports
import {useState, useCallback} from 'react';
import getCardsService from 'Services/PaymentMethods';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import setPaymentMethod from '../../../Store/Actions/PaymentMethod';
import removePaymentMethodService from 'Services/RemovePaymentMethod';
import {Feedback} from '@Atoms';
import Preferences from 'Config/preferences';
const preferences = new Preferences();

// TODO: ADD Pull down to refresh logic
const useService = (props) => {
  const fromCheckout = props.route.params?.fromCheckout || false;

  const dispatch = useDispatch();

  const {paymentMethod} = useSelector((state) => state.PaymentMethod);

  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCards = () => {
    setIsLoading(true);
    getCardsService()
      .then((response) => {
        setCards(response?.Payment_methods?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        Feedback.error(error.message, 'OK');
        console.warn(error.message);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getCards();
    }, []),
  );

  const selectCard = (item) =>
    dispatch(setPaymentMethod(item)).then(() => {
      preferences.setPaymentDefault(false).then(() => {
        if (fromCheckout) {
          props.navigation.navigate('Checkout');
        }
      });
    });

  const onDelete = (item) => {
    console.log('DELETE', item);
    setIsLoading(true);
    removePaymentMethodService(item.id)
      .then((response) => {
        if (response.status === 204) getCards();
        else setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return {
    cards,
    isLoading,
    fromCheckout,
    paymentMethod,
    selectCard,
    onDelete,
  };
};

export default useService;
