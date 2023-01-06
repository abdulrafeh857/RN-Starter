// Imports
import {Layout} from 'Theme';
import {ScrollView, Image, View, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {Divider, Button, Toolbar} from '@Atoms';
import useService from './service';
import {
  CartItem,
  BillingDetails,
  ShippingMethodCard,
  VoucherSection,
} from '@Molecules';
import utils from './utils';
import useRootHook from '../../../Utils/CustomHooks';
import SwipeableFlatList from 'react-native-swipeable-list';
import {TouchableRipple} from 'react-native-paper';

const {height} = Dimensions.get('window');

// Main functional component
const Cart = (props) => {
  const {Token} = useRootHook();

  const {
    users,
    basket,
    selectedShippingMethod,
    deliveryTime,
    refreshControl,
    vendorActive,
    onDelete,
    onEdit,
  } = useService(props);

  let surcharge = 0;

  basket?.surcharges?.map((s) => (surcharge += parseFloat(s.incl_tax)));

  function renderCartItem({item}) {
    return <CartItem item={item} {...props} />;
  }

  function renderButtons({item}) {
    return (
      <View style={styles.buttonRoot}>
        <TouchableRipple
          onPress={() => onEdit(item)}
          style={styles.editButtonRoot}>
          <TEXT.Caption myStyle={{color: 'white'}}>EDIT</TEXT.Caption>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => onDelete(item)}
          style={styles.deleteButtonRoot}>
          <TEXT.Caption myStyle={{color: 'white'}}>REMOVE</TEXT.Caption>
        </TouchableRipple>
      </View>
    );
  }

  if (basket?.lines?.length > 0) {
    return (
      <View style={styles.rootViewContainerStyle}>
        <Toolbar {...props} title={utils.ScreenTitle} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          refreshControl={refreshControl}
          contentContainerStyle={styles.rootViewStyle}>
          <View>
            <Divider height={4} />
            <ShippingMethodCard
              timing={deliveryTime}
              logo={deliveryTime?.image}
              isStandard={selectedShippingMethod?.code === 'standard'}
            />
            <Divider height={4} />
            <View style={styles.description.root}>
              <TEXT.Heading>Items</TEXT.Heading>
            </View>
            <SwipeableFlatList
              contentContainerStyle={{flexGrow: 1}}
              renderItem={renderCartItem.bind(this)}
              data={basket?.lines}
              maxSwipeDistance={150}
              renderQuickActions={(item) => renderButtons(item)}
              keyExtractor={(item) => item.index}
            />
            <VoucherSection vouchers={basket?.voucherDiscounts} />

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
          </View>
          <View style={styles.bottomView}>
            <View
              style={{
                ...styles.billingSectionContainerStyle,
                backgroundColor: 'transparent',
              }}>
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
            <Button
              loading={Token.isLoading || !selectedShippingMethod}
              style={{marginVertical: 15}}
              disabled={!vendorActive}
              onPress={() => {
                const {navigate} = props.navigation;
                if (!users) {
                  console.debug('No User found.');
                  console.debug('Navigate to Log In or Signup.');
                  navigate('LoginEmail', {fromDash: false});
                } else {
                  console.debug('User found.');
                  console.debug('Navigate to Checkout.');
                  navigate('Checkout', {});
                }
              }}
              text={!vendorActive ? 'Restaurant Is Closed' : 'GO TO CHECKOUT'}
            />
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.rootViewContainerStyle}>
        <Toolbar {...props} title={utils.ScreenTitle} />
        <ScrollView contentContainerStyle={styles.rootViewStyle}>
          <View style={{height: height * 0.75, ...Layout.center}}>
            <Image
              resizeMode={'contain'}
              resizeMethod="resize"
              source={require('@Images/no-cart.png')}
            />
            <TEXT.Normal
              myStyle={{
                marginTop: 10,
                color: '#1115',
              }}>
              Basket is empty!
            </TEXT.Normal>
          </View>
        </ScrollView>
      </View>
    );
  }
};

// Export
export default Cart;
