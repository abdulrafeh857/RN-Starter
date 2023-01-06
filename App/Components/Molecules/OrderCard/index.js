import {Button as _Button} from 'react-native-material-ui';
import {View} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import {Colors} from 'Theme';
import * as TEXT from '@Atoms/Text';
import {Divider, Button} from '@Atoms';
import {TouchableRipple} from 'react-native-paper';
import reOrderService from 'Services/ReOrder';
import getBasket from '../../../Store/Actions/Basket';
import {useDispatch} from 'react-redux';
import showAlert from '../../../Store/Actions/ShowAlert';

const OrderCard = (props) => {
  const {item, pending} = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const reOrder = () => {
    dispatch(
      showAlert({
        title: 'Confirm Reorder',
        body: `Are you sure you want to reorder Order# ${item.number}? It will clear all items that are currently in your basket.`,
        buttons: [
          {
            name: 'Cancel',
            onPress: () => dispatch(showAlert(null)),
          },
          {
            name: 'Confirm',
            onPress: () => {
              setIsLoading(true);
              reOrderService({
                number: item.number,
              })
                .then((response) => {
                  if (response.status === 201) {
                    dispatch(showAlert(null));
                    dispatch(getBasket()).then(() => {
                      props.navigation.navigate('Cart');
                      setIsLoading(false);
                    });
                  }
                })
                .catch((error) => {
                  console.log(
                    '🚀 ~ file: index.js ~ line 26 ~ reOrder ~ error',
                    error,
                  );
                  setIsLoading(false);
                });
            },
          },
        ],
      }),
    );
  };

  return (
    <>
      <Divider />
      <TouchableRipple
        activeOpacity={0.6}
        onPress={() => {
          const {navigate} = props.navigation;
          console.debug('Navigate to Track Order.');
          navigate('OrderTracking', {
            order: item,
          });
        }}
        style={styles.orderCard.cardRootContainerStyle}>
        <>
          <View style={styles.orderCard.topContainerStyle}>
            <View style={styles.orderCard.titlePriceViewStyle}>
              <TEXT.SubHeading>
                {item.partner.name}
                <TEXT.Caption
                  myStyle={{
                    lineHeight: 20,
                  }}>
                  {' '}
                  (Order#{item?.number})
                </TEXT.Caption>
              </TEXT.SubHeading>
              <TEXT.Caption
                myStyle={{
                  color: Colors.text,
                  textDecorationLine: 'underline',
                }}>
                {item?.status}
              </TEXT.Caption>
            </View>
          </View>
          {item?.lines?.map((i) => {
            return (
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 2,
                  paddingLeft: 22,
                  paddingRight: 12,
                }}>
                <TEXT.Normal
                  myStyle={{
                    fontSize: 13,
                    lineHeight: 13,
                    color: Colors.primary,
                    width: '80%',
                  }}>
                  {i?.quantity}x
                  <TEXT.Normal
                    myStyle={{
                      fontSize: 12,
                      lineHeight: 12,
                    }}>
                    {'   '}
                    {i?.product?.title}
                  </TEXT.Normal>
                </TEXT.Normal>
                <TEXT.Price
                  myStyle={{
                    fontSize: 13,
                    lineHeight: 13,
                    color: Colors.text,
                  }}>
                  {i?.priceInTax}
                </TEXT.Price>
              </View>
            );
          })}
          <View
            style={{
              ...styles.orderCard.bottomContainerStyle,
              paddingTop: 3,
            }}>
            <View style={styles.orderCard.bottomRootViewStyle}>
              <TEXT.Normal>
                {item.shippingCode === 'collection'
                  ? 'Total'
                  : 'Total (incl Delivery)'}
              </TEXT.Normal>
              <TEXT.Price>{item?.totalInTax}</TEXT.Price>
            </View>
          </View>
          {!pending ? (
            <View style={styles.orderCard.bottomRootViewStyle}>
              <TEXT.Caption>Want the same order again?</TEXT.Caption>
              <Button
                loading={isLoading}
                text="Reorder"
                loaderColor={Colors.primary}
                style={styles.button.root}
                textStyle={styles.button.text}
                onPress={reOrder}
              />
            </View>
          ) : (
            <View style={{height: 12}} />
          )}
        </>
      </TouchableRipple>
    </>
  );
};

export default OrderCard;
