// Imports
import {Colors, FontSize} from 'Theme';
import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {TouchableRipple} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import {View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import api from 'Services/api';
import showAlert from '../../../Store/Actions/ShowAlert';
import {useDispatch, useSelector} from 'react-redux';
import {useStripe} from '@stripe/stripe-react-native';
import {useFocusEffect} from '@react-navigation/native';
import emitter from 'Utils/Emitter';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

// Main functional component
const PaymentMethodButton = (props) => {
  const {navigation, toggleFB, selectedShippingMethod} = props;
  const dispatch = useDispatch();

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const sheetRef = React.useRef(null);

  const [index, setIndex] = useState(0);
  const [paymentSheetLoading, setPaymentSheetLoading] = useState(true);
  const {basket} = useSelector((state) => state.Basket);
  const {vendors} = useSelector((state) => state.Vendors);

  const fetchPaymentSheetParams = async (ssm) => {
    try {
      const response = await api.get(
        '/checkout/payment/' + '?code=' + ssm?.code,
      );

      const {client_secret} = response.data;
      return preferences.getPaymentDefault().then((onetime) => {
        let isOneTime = onetime;

        return {
          client_secret,
          isOneTime,
        };
      });
    } catch (err) {}
  };

  const initializePaymentSheet = async (ssm) => {
    let partnerID = basket?.partner || 0;
    let partner = vendors?.results?.filter((v) => v?.id === partnerID)[0];

    try {
      const {client_secret, isOneTime} = await fetchPaymentSheetParams(ssm);

      const {error, paymentOption} = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        customFlow: true,
        googlePay: true,
        applePay: true,
        merchantCountryCode: 'GB',
        merchantDisplayName: `${partner?.name}`,
        // testEnv: true, // use test environment
      });

      setPaymentSheetLoading(false);
      console.log('Setting Apple Pay as one-time payment');
      isOneTime
        ? emitter.emit('ONE_TIME_TOKEN', paymentOption)
        : emitter.emit('ONE_TIME_TOKEN', null);

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
      }
    } catch (err) {}
  };

  const choosePaymentOption = async () => {
    onClose();

    const {error, paymentOption} = await presentPaymentSheet({
      confirmPayment: false,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }

    emitter.emit('ONE_TIME_TOKEN', paymentOption);
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Init Payment Sheet');
      if (selectedShippingMethod && selectedShippingMethod?.code) {
        initializePaymentSheet(selectedShippingMethod);
      }
    }, [selectedShippingMethod]),
  );

  const onAddCard = () => {
    const {navigate} = navigation;
    console.debug('Navigate to Add Card Details');
    navigate('AddCardDetails', {
      fromCheckout: true,
    });
    onClose();
  };

  const onSelectCard = () => {
    const {navigate} = navigation;
    console.debug('Navigate to Payment Method.');
    navigate('PaymentMethod', {
      fromCheckout: true,
    });
    onClose();
  };

  const renderHeader = () => (
    <View style={styles.header.root}>
      <View style={styles.header.handle}></View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.content.root}>
      <TEXT.SubHeading>Select Payment Flow:</TEXT.SubHeading>
      <Button
        icon="credit-card-outline"
        mode="contained"
        loading={paymentSheetLoading}
        disabled={paymentSheetLoading}
        style={styles.content.button}
        labelStyle={styles.content.text}
        onPress={choosePaymentOption}>
        {paymentSheetLoading ? 'Processing Payment Info' : 'Pay and proceed'}
      </Button>
      <Button
        icon="credit-card-plus-outline"
        mode="contained"
        style={styles.content.button}
        labelStyle={styles.content.text}
        onPress={onAddCard}>
        Add a Card
      </Button>
      <Button
        icon="credit-card-check-outline"
        mode="contained"
        style={styles.content.button}
        labelStyle={styles.content.text}
        onPress={onSelectCard}>
        Select a Card
      </Button>
      <Button
        icon="close"
        mode="text"
        style={styles.content.button}
        onPress={onClose}>
        Close
      </Button>
    </View>
  );

  const onOpen = () => {
    setIndex(1);
    toggleFB(false);
  };

  const onClose = () => {
    sheetRef.current.snapTo(0);
    setIndex(0);
    toggleFB(true);
  };

  return (
    <>
      <TouchableRipple
        onPress={() => {
          sheetRef.current.snapTo(1);
        }}
        style={styles.root}>
        <>
          <Icon name={'add'} color={Colors.tintGrey} size={FontSize.title} />
          <TEXT.Normal myStyle={styles.text}>
            Add or change Payment method
          </TEXT.Normal>
        </>
      </TouchableRipple>
      <BottomSheet
        ref={sheetRef}
        initialSnap={index}
        onOpenStart={onOpen}
        onCloseEnd={onClose}
        snapPoints={[0, 280]}
        enabledInnerScrolling={false}
        renderContent={index === 0 ? null : renderContent}
        renderHeader={index === 0 ? null : renderHeader}
      />
      {index === 1 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.overlay}
        />
      )}
    </>
  );
};

// Export
export default PaymentMethodButton;
