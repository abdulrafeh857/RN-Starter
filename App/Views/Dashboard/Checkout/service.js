// Imports
import {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, batch} from 'react-redux';
import checkoutService from 'Services/Checkout';
import setCheckout from '../../../Store/Actions/Checkout';
import getBasket from '../../../Store/Actions/Basket';
import getOrders from '../../../Store/Actions/Orders';
import getUserAddresses from '../../../Store/Actions/UserAddresses';
import Preferences from 'Config/preferences';
import emitter from 'Utils/Emitter';
import {useFocusEffect} from '@react-navigation/native';
import getPaymentIntentService from 'Services/PaymentIntent';
import getCardsService from 'Services/PaymentMethods';
import getVendorsService from 'Services/Vendors';
import setPaymentMethod from '../../../Store/Actions/PaymentMethod';
import showAlert from '../../../Store/Actions/ShowAlert';
import {useStripe} from '@stripe/stripe-react-native';

const preferences = new Preferences();

// Main functional component
const useService = (props) => {
  const dispatch = useDispatch();

  const {confirmPaymentSheetPayment} = useStripe();

  const {navigation} = props;

  const [oneTimeToken, setOneTimeToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState({});
  const [notes, setNotes] = useState('');
  const [currentAddress, setCurrentAddress] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [fbVisible, setFbVisible] = useState(true);

  const {basket} = useSelector((state) => state.Basket);
  const ssm = useSelector((state) => state.SelectedShippingMethod);
  const {users} = useSelector((state) => state.Users);
  const {vendors} = useSelector((state) => state.Vendors);
  const {userAddresses} = useSelector((state) => state.UserAddresses);
  const {shippingMethod} = useSelector((state) => state.ShippingMethod);
  const {paymentMethod} = useSelector((state) => state.PaymentMethod);

  useEffect(() => {
    emitter.on('ONE_TIME_TOKEN', (data) => {
      setOneTimeToken(data);
    });
  }, []);

  useEffect(() => {
    if (ssm.selectedShippingMethod === 'Delivery') {
      const del = shippingMethod?.filter((sm) => sm.code === 'standard')[0];
      setSelectedShippingMethod(del);
    } else if (ssm.selectedShippingMethod === 'Collection') {
      const col = shippingMethod?.filter((sm) => sm.code === 'collection')[0];
      setSelectedShippingMethod(col);
    }
  }, []);

  useEffect(() => {
    const time = vendors.results.filter((v) => v.id === basket.partner)[0];
    setDeliveryTime(time);
  }, []);

  const updateAddress = () => {
    console.debug('Fetching Address');
    preferences.getSelectedAddress().then((location) => {
      setSelectedAddress(location);
      setCurrentAddress([location]);
    });
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      console.debug('Update Payment Methods.');
      getCardsService()
        .then((response) => {
          setIsLoading(false);
          if (
            response &&
            response.Payment_methods &&
            response.Payment_methods.data.length > 0
          ) {
          } else {
            dispatch(setPaymentMethod(null));
            console.debug('Sending Payment Method To Redux.');
          }
        })
        .catch(() => setIsLoading(false));
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      console.debug('Check if Vendor delivers to address.');
      setIsLoading(true);
      getVendorsService().then((response) => {
        let exists =
          response.results.filter((v) => v.id === basket.partner).length > 0;
        if (!exists) {
          console.debug('Vendor does not deliver in this area.');
          dispatch(
            showAlert({
              type: 'oops',
              autoDismiss: false,
              title: 'Address out of range',
              body:
                'The vendor does not deliver in the selected area, change your delivery address or continue anyway.',
              buttons: [
                {
                  name: 'Okay',
                  onPress: () => dispatch(showAlert(null)),
                },
              ],
            }),
          );
        }
      });
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      updateAddress();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      updateAddress();
    }, [userAddresses]),
  );

  const payAndProceed = async () => {
    let address = {
      location: {
        latitude: selectedAddress.location.latitude,
        longitude: selectedAddress.location.longitude,
      },
      first_name: users?.firstName,
      last_name: users?.lastName,
      line1: selectedAddress.line1,
      line2: selectedAddress.line2,
      line3: '',
      line4: '',
      notes: notes,
      postcode: selectedAddress.postcode,
      state: 'UK',
      title: 'Mr',
      place: selectedAddress.place,
      place_id: selectedAddress.place_id,
    };

    let payload =
      selectedShippingMethod?.code === 'standard'
        ? {
            basket: basket?.url,
            shipping_method_code: selectedShippingMethod.code,
            shipping_address: {
              ...address,
              phone_number: users?.phone,
            },
            billing_address: address,
          }
        : {
            basket: basket?.url,
            shipping_method_code: selectedShippingMethod.code,
          };

    console.debug('Place Order.');
    setIsLoading(true);

    // FOR ONE TIME PAYMENT

    if (oneTimeToken && oneTimeToken?.label) {
      const {error} = await confirmPaymentSheetPayment();
      if (error) {
        dispatch(
          showAlert({
            type: 'error',
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
      } else {
        checkoutService(payload, dispatch)
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            console.debug('Order failed.');
            setIsLoading(false);
          });
      }
    } else {
      // FOR SAVED PAYMENT METHODS
      getPaymentIntentService(
        paymentMethod.id,
        selectedShippingMethod?.code,
        dispatch,
      )
        .then(({status}) => {
          if (status === 'requires_capture') {
            checkoutService(payload, dispatch)
              .then(() => {
                setIsLoading(false);
              })
              .catch(() => {
                console.debug('Order failed.');
                setIsLoading(false);
              });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.debug('Payment failed.');
          console.log(
            'Loading Payment Intent Failed: ',
            error.response || error.message || error,
          );
        });
    }
  };

  useEffect(() => {
    emitter.on('Checkout_Success', (response) => {
      if (response.status === 200) {
        console.debug('Order placed successfully.');
        console.debug('Fetch Basket, Orders, UserAddresses.');
        dispatch(setCheckout(response.data));
        batch(() => {
          dispatch(getBasket());
          dispatch(getOrders());
          dispatch(getUserAddresses());
        });
        setIsLoading(false);
        const {navigate} = navigation;
        console.debug('Navigate to Track Order.');
        navigate('OrderTracking', {
          order: response.data,
          newOrder: true,
        });
      }
    });
  }, []);

  return {
    fbVisible,
    setFbVisible,
    isLoading,
    deliveryTime,
    basket,
    selectedShippingMethod,
    currentAddress,
    selectedAddress,
    paymentMethod,
    oneTimeToken,
    setNotes,
    payAndProceed,
  };
};

// Export
export default useService;
