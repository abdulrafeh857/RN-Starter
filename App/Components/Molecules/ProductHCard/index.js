// Imports
import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import StripHtml from 'Utils/Common/StripHtml';
import * as TEXT from '@Atoms/Text';
import {useSelector, useDispatch} from 'react-redux';
import removeFromBasketService from 'Services/RemoveFromBasket';
import getBasket from '../../../Store/Actions/Basket';
import {TouchableRipple} from 'react-native-paper';
import showAlert from '../../../Store/Actions/ShowAlert';

const ProductHCard = (props) => {
  const {item} = props.item;
  const disabled = props.disabled || false;

  const {basket} = useSelector((state) => state.Basket);

  const dispatch = useDispatch();

  function removeFromBasket({url}) {
    removeFromBasketService(url)
      .then(() => {
        dispatch(getBasket());
      })
      .catch((err) => {
        console.log(err.config);
      });
  }

  const proceed = () => {
    if (basket?.lines?.length > 0) {
      if (basket?.lines[0]?.product?.partner?.id === item?.partner?.id) {
        console.debug('Navigate to product detail.');
        props.navigation.navigate('ProductDetails', {
          data: item,
        });
      } else {
        dispatch(
          showAlert({
            type: 'oops',
            autoDismiss: false,
            title: 'Warning: ',
            body:
              'You must have Products of the same Vendor. Do you want to clear your basket before you continue',
            buttons: [
              {
                name: 'No',
                onPress: () => dispatch(showAlert(null)),
              },
              {
                name: 'CLEAR BASKET',
                onPress: () => {
                  basket?.lines.map((line) => {
                    removeFromBasket({url: line?.url});
                  });
                  console.debug('Basket cleared.');
                  console.debug('Navigate to product detail.');
                  dispatch(showAlert(null));
                  props.navigation.navigate('ProductDetails', {
                    data: item,
                  });
                },
              },
            ],
          }),
        );
      }
    } else {
      console.debug('Navigate to product detail.');
      props.navigation.navigate('ProductDetails', {
        data: item,
      });
    }
  };

  const outOfStockStyle = !item.available
    ? {textDecorationLine: 'line-through'}
    : {
        fontSize: 16,
        lineHeight: 16,
      };

  return (
    <TouchableRipple
      disabled={!item.available || disabled}
      onPress={proceed}
      style={{
        ...styles.rootViewStyle,
        opacity: !item.available || disabled ? 0.7 : 1,
      }}>
      <>
        <View style={styles.leftContainerStyle}>
          <TEXT.Title myStyle={outOfStockStyle} numberOfLines={1}>
            {item?.title}
          </TEXT.Title>
          {item?.description.length > 0 ? (
            <TEXT.Caption
              myStyle={{
                opacity: 0.8,
                lineHeight: 15,
                paddingTop: 2,
                fontSize: 13,
              }}
              numberOfLines={2}>
              {StripHtml(item?.description)}
            </TEXT.Caption>
          ) : (
            <View style={{marginVertical: 1}} />
          )}
          <TEXT.Price myStyle={{paddingTop: 4, fontWeight: 'bold'}}>
            {item?.price.toFixed(2)}
          </TEXT.Price>
        </View>

        {!item.available && (
          <View style={styles.rightContainerStyle}>
            <TEXT.Caption myStyle={styles.text}>Out of Stock</TEXT.Caption>
            {/* <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.imageStyle}
          source={{uri: item.images[0].original}}
        /> */}
          </View>
        )}
      </>
    </TouchableRipple>
  );
};

// Export
export default ProductHCard;
