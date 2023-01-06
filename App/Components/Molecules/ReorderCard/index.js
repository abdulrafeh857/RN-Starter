import {View, Alert} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import {Colors} from 'Theme';
import * as TEXT from '@Atoms/Text';
import {Button} from '@Atoms';
import {TouchableRipple} from 'react-native-paper';
import reOrderService from 'Services/ReOrder';
import getBasket from '../../../Store/Actions/Basket';
import {useDispatch} from 'react-redux';

// TODO: Replace Alert with custom alert
const OrderCard = (props) => {
  const {item} = props;
  let items = item.lines.length;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const reOrder = () => {
    Alert.alert(
      'Confirm Reorder',
      `Are you sure you want to reorder Order# ${item.number}? It will clear all items that are currently in your basket.`,
      [
        {text: 'Cancel', onPress: null, style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            setIsLoading(true);
            reOrderService({
              number: item.number,
            })
              .then((response) => {
                if (response.status === 201) {
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
      {cancelable: false},
    );
  };

  return (
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
      <View style={{}}>
        <View style={styles.orderCard.topContainerStyle}>
          <TEXT.Normal
            myStyle={{
              lineHeight: 20,
              color: Colors.text,
            }}>
            Order#{item?.number}
          </TEXT.Normal>
          <TEXT.Price myStyle={{fontSize: 13, lineHeight: 18}}>
            {item?.totalInTax}
          </TEXT.Price>
        </View>
        {items === 1 ? (
          item?.lines?.map((i) => {
            return (
              <View style={styles.itemViewStyle}>
                <TEXT.Normal myStyle={styles.titleTextStyle}>
                  {'   '}
                  {i?.product?.title}
                </TEXT.Normal>
                <TEXT.Normal myStyle={styles.titleTextStyle}>
                  {'   '}
                </TEXT.Normal>
              </View>
            );
          })
        ) : (
          <View style={styles.itemViewStyle}>
            <TEXT.Normal myStyle={styles.titleTextStyle}>
              {'   '}
              {item.lines[0]?.product?.title}
            </TEXT.Normal>
            <TEXT.Normal
              myStyle={{
                ...styles.titleTextStyle,
                color: Colors.tintGrey,
              }}>
              {'   '}+{items - 1} more items
            </TEXT.Normal>
          </View>
        )}

        <Button
          loading={isLoading}
          text="Reorder"
          loaderColor={Colors.primary}
          style={styles.button.root}
          textStyle={styles.button.text}
          onPress={reOrder}
        />
      </View>
    </TouchableRipple>
  );
};

export default OrderCard;
