// Imports
import {Colors, FontSize} from 'Theme';
import {ScrollView, View, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import utils from './utils';
import * as TEXT from '@Atoms/Text';
import {
  CartItem,
  AddressItem,
  BillingDetails,
  ShippingMethodCard,
} from '@Molecules';
import {Input, Toolbar, FloatingButton, Divider} from '@Atoms';
import useService from './service';
import {TouchableRipple} from 'react-native-paper';
import {PaymentMethodButton} from '@Organisms';

const {height, width} = Dimensions.get('window');

// Main functional component
const Checkout = (props) => {
  const {navigation} = props;

  const {
    fbVisible,
    setFbVisible,
    isLoading,
    deliveryTime,
    basket,
    selectedShippingMethod,
    currentAddress,
    selectedAddress,
    oneTimeToken,
    paymentMethod,
    setNotes,
    payAndProceed,
  } = useService(props);

  let surcharge = 0;

  basket?.surcharges?.map((s) => (surcharge += parseFloat(s.incl_tax)));

  function renderCartItem(item) {
    return <CartItem item={item} />;
  }

  function renderAddresses(item) {
    return <AddressItem minimal item={item} />;
  }

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewContainerStyle}>
        <Divider height={4} />
        <ShippingMethodCard
          timing={deliveryTime}
          logo={deliveryTime?.image}
          isStandard={selectedShippingMethod?.code === 'standard'}
        />
        <Divider height={4} />
        {basket?.lines?.map(renderCartItem.bind(this))}
        <BillingDetails
          details={[
            {
              name: 'Subtotal',
              price: basket?.totalExTaxExDiscounts,
            },
            {
              name:
                selectedShippingMethod?.code === 'standard'
                  ? 'Delivery Fee'
                  : 'Collection Fee',
              price: selectedShippingMethod?.price?.inTax,
            },
            {
              name: 'Service Fee',
              price: surcharge?.toFixed(2),
            },
          ]}
          vouchers={basket?.voucherDiscounts}
        />
        <View style={styles.billingSectionContainerStyle}>
          <TEXT.Normal>Total</TEXT.Normal>
          <View style={{flexDirection: 'row'}}>
            <TEXT.Normal myStyle={styles.lineThroughPrice}>
              {basket?.voucherDiscounts &&
                basket?.voucherDiscounts.length > 0 &&
                '£' +
                  (
                    parseFloat(basket?.totalExTaxExDiscounts) +
                    parseFloat(selectedShippingMethod?.price?.inTax) +
                    surcharge
                  ).toFixed(2)}
            </TEXT.Normal>
            <TEXT.Price myStyle={styles.billingSectionText}>
              {(
                parseFloat(basket?.totalExTax) +
                parseFloat(selectedShippingMethod?.price?.inTax) +
                surcharge
              ).toFixed(2)}
            </TEXT.Price>
          </View>
        </View>
        {selectedShippingMethod?.code === 'standard' && (
          <>
            <View style={styles.note.rootViewStyle}>
              <Input
                leftIcon="file-document-edit-outline"
                multiline
                label="Instructions for Rider (optional)"
                noError
                placeholder="Please call when you arrive"
                onChangeText={setNotes}
                style={{width: width - 16}}
              />
            </View>
            <Divider height={4} />
            <View
              style={{
                ...styles.sectionContainerStyle,
                backgroundColor: Colors.foreground,
                marginBottom: 1,
              }}>
              <TEXT.Caption>REQUIRED</TEXT.Caption>
              <TEXT.SubHeading>{utils.sectionShippingString}</TEXT.SubHeading>
            </View>
            {currentAddress?.map(renderAddresses.bind(this))}
            <TouchableRipple
              onPress={() => {
                const {navigate} = navigation;
                console.debug('Navigate to Select Location.');
                navigate('SelectLocation', {
                  fromCheckout: true,
                });
              }}
              style={styles.addAddressButton.rootViewStyle}>
              <>
                <Icon
                  name={'add'}
                  color={Colors.tintGrey}
                  size={FontSize.title}
                />
                <TEXT.Normal myStyle={styles.addAddressButton.textStyle}>
                  Add or change address
                </TEXT.Normal>
              </>
            </TouchableRipple>
          </>
        )}
        <Divider height={4} />
        <View
          style={{
            ...styles.sectionContainerStyle,
            backgroundColor: Colors.foreground,
          }}>
          <TEXT.Caption>REQUIRED</TEXT.Caption>

          <TEXT.SubHeading>{utils.sectionPaymentString}</TEXT.SubHeading>
        </View>
        {paymentMethod && !oneTimeToken && (
          <View style={styles.paymentMethodCard.rootViewStyle}>
            <View style={styles.paymentMethodCard.containerStyle}>
              <View style={styles.paymentMethodCard.leftViewStyle}>
                <Icon
                  name={'credit-card'}
                  color={Colors.primary}
                  size={height * 0.0325}
                />
                <TEXT.Caption
                  myStyle={{
                    color: Colors.primaryDark,
                  }}>
                  {' '}
                  {paymentMethod.card.brand.toUpperCase()}
                  <TEXT.Caption
                    myStyle={{
                      color: Colors.primary,
                    }}>
                    {utils.paymentCardData.number + paymentMethod.card.last4}
                  </TEXT.Caption>
                </TEXT.Caption>
              </View>
            </View>
          </View>
        )}
        {oneTimeToken && (
          <View style={styles.paymentMethodCard.rootViewStyle}>
            <View style={styles.paymentMethodCard.containerStyle}>
              <View style={styles.paymentMethodCard.leftViewStyle}>
                <Icon
                  name={'credit-card'}
                  color={Colors.primary}
                  size={height * 0.0325}
                />
                <TEXT.Normal
                  myStyle={{
                    color: Colors.primaryDark,
                  }}>
                  <TEXT.Caption
                    myStyle={{
                      color: Colors.primary,
                    }}>
                    {'  '}
                    {oneTimeToken.label} (Pay once)
                  </TEXT.Caption>
                </TEXT.Normal>
              </View>
            </View>
          </View>
        )}
        <PaymentMethodButton
          selectedShippingMethod={selectedShippingMethod}
          toggleFB={(value) => setFbVisible(value)}
          {...props}
        />
        <View style={{height: height * 0.1 + 36}} />
      </ScrollView>
      {fbVisible && (
        <FloatingButton
          disabled={
            (selectedAddress === null &&
              selectedShippingMethod?.code === 'standard') ||
            (!paymentMethod && !oneTimeToken)
          }
          loading={isLoading}
          onPress={() => payAndProceed()}
          text={
            selectedAddress === null &&
            selectedShippingMethod?.code === 'standard'
              ? 'Select Shipping Address'
              : !paymentMethod && !oneTimeToken
              ? 'Select Payment Method'
              : 'Place Order'
          }
          price={
            parseFloat(basket?.totalInTax) +
            parseFloat(selectedShippingMethod?.price?.inTax) +
            surcharge
          }
        />
      )}
    </View>
  );
};

// Export
export default Checkout;
