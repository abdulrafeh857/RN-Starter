import {View,Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import React from 'react';
import {Card} from '@Molecules';
import {Loader} from '@Atoms';
import * as TEXT from '@Atoms/Text';
import {useSelector} from 'react-redux';

const FloatingButton = (props) => {
  const {loading, text, disabled, onPress, price} = props;

  const {basket} = useSelector((state) => state.Basket);

  return (
    <Card
      onPress={disabled || loading ? null : onPress}
      style={styles(props).card}>
      {loading ? (
        <Loader size={25} />
      ) : (
        <>
          <TEXT.SubHeading myStyle={styles(props).text}>{text}</TEXT.SubHeading>
          <View style={styles(props).right}>
            <TEXT.Price myStyle={styles(props).price}>
              {price.toFixed(2)}
            </TEXT.Price>
            <View style={styles(props).badge}>
              <Text style={styles(props).badgeText}>
                {basket?.lines?.length}
              </Text>
            </View>
          </View>
        </>
      )}
    </Card>
  );
};

FloatingButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  priceStyle: PropTypes.object,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  style: PropTypes.object,
  onPress: PropTypes.func,
  price: PropTypes.number,
};

FloatingButton.defaultProps = {
  loading: false,
  text: 'Press me',
  textStyle: {},
  priceStyle: {},
  disabled: false,
  icon: require('@Images/basket.png'),
  style: {},
  price: 20.0,
  onPress: () => {
    console.log('Floating Button was pressed');
  },
};

export default FloatingButton;

/*
USAGE:

  <FloatingButton
    loading
    text="Hello World"
    textStyle={{}}
    upperCase
    disabled
    onLongPress
    primary
    accent
    raised
    icon={''}
    iconSet={'MaterialIcons'}
    style={{}}
    onPress={() => {}}
  />

*/
