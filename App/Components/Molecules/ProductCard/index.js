// Imports
import {Image, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import removeFromBasketService from 'Services/RemoveFromBasket';
import getBasket from '../../../Store/Actions/Basket';
import * as TEXT from '@Atoms/Text';
import {Feedback} from '@Atoms';

// Main functional component
const ProductCard = ({data, navigation}) => {
  const {item} = data;
  const {navigate} = navigation;

  const {basket} = useSelector((state) => state.Basket);
  const dispatch = useDispatch();

  function removeFromBasket({url}) {
    removeFromBasketService(url)
      .then((response) => {
        dispatch(getBasket());
      })
      .catch((err) => {
        console.log(err.config);
        Feedback.error(
          'Oops! An error occurred while removing item from basket',
          'OK',
        );
      });
  }

  // Render Product Card
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (basket?.lines?.length > 0) {
          if (basket?.lines[0]?.product?.partner?.id === item?.partner?.id) {
            navigate('ProductDetails', {
              data: item,
            });
          } else {
            Alert.alert(
              'Warning: ',
              'You must have Products of the same Vendor. Do you want to clear your basket before you continue',
              [
                {text: 'No', onPress: () => {}, style: 'cancel'},
                {
                  text: 'Clear Basket',
                  onPress: () => {
                    basket?.lines.map((line) => {
                      removeFromBasket({url: line?.url});
                    });
                    //  Basket Cleared
                    navigate('ProductDetails', {
                      data: item,
                    });
                  },
                },
              ],
              {cancelable: false},
            );
          }
        } else {
          navigate('ProductDetails', {
            data: item,
          });
        }
      }}
      style={styles.rootViewStyle}>
      <View style={styles.imageContainerStyle}>
        <Image
          source={
            item?.images[0]?.url
              ? {uri: item?.images[0]?.url}
              : require('@Images/no-image-found.png')
          }
          style={styles.imageStyle}
          resizeMode={'cover'}
          resizeMethod={'resize'}
        />
      </View>
      <View style={styles.textContainerStyle}>
        <TEXT.SubHeading numberOfLines={2}>{item.title}</TEXT.SubHeading>

        <View>
          <TEXT.Caption numberOfLines={1}>{item.partner.name}</TEXT.Caption>
          <View style={styles.ratingPriceContainerStyle}>
            {/* <Text style={styles.textCaptionStyle}>{item.rating}</Text> */}
            {/* <Rating
              type="custom"
              ratingCount={5}
              ratingColor={Colors.tertiary}
              ratingBackgroundColor={'#1113'}
              readonly
              startingValue={4.9}
              imageSize={FontSize.caption}
            /> */}
            <TEXT.Price>{item.price}</TEXT.Price>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Export
export default ProductCard;
