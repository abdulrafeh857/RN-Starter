// Imports
import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import * as TEXT from '@Atoms/Text';

const ShippingMethodCard = (props) => {
  const {isStandard, timing, logo} = props;

  let _timing = timing || {avgTime: '', maxTime: ''};

  let image = isStandard
    ? require('@Images/van.png')
    : require('@Images/basket-main.png');

  let text = isStandard
    ? 'Deliver in ' + _timing?.avgTime + ' - ' + _timing?.maxTime + ' min'
    : 'Collection';

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Image
          resizeMode={'contain'}
          resizeMethod="resize"
          style={styles.icon}
          source={image}
        />
        <TEXT.Normal myStyle={styles.text}>{text}</TEXT.Normal>
      </View>
      <Image
        resizeMode={'contain'}
        resizeMethod="resize"
        style={styles.image}
        source={{
          uri: logo,
        }}
      />
    </View>
  );
};

// Export
export default ShippingMethodCard;
