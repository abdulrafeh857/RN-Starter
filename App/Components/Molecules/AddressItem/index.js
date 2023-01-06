// Imports
import {Colors} from 'Theme';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {TouchableRipple} from 'react-native-paper';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

// Main functional component
const AddressItem = (props) => {
  const {item, onPress, color, minimal, onLongPress} = props;

  const [address, setAddress] = useState(null);

  let textColor = color ? color : Colors.primaryDark;

  useEffect(() => {
    preferences.getSelectedAddress().then((address) => {
      setAddress(address);
    });
  }, []);

  return (
    <TouchableRipple
      onLongPress={onLongPress && onLongPress}
      onPress={
        minimal
          ? null
          : () => {
              onPress && onPress();
            }
      }
      style={styles.item.rootView}>
      <View style={styles.item.root}>
        <View style={styles.item.left}>
          <Icon name="location-outline" size={16} color={Colors.primary} />
        </View>
        <View style={styles.item.center}>
          <TEXT.Caption
            myStyle={{
              color: textColor,
            }}>
            {item?.place || item?.line1 || item?.address}
            {'  '}
            {item?.nickname && item?.nickname.length > 0 && (
              <TEXT.Heading
                myStyle={{
                  color: textColor,
                  fontSize: 12,
                }}>
                ({item.nickname})
              </TEXT.Heading>
            )}
          </TEXT.Caption>
        </View>
        {!minimal && (
          <View style={styles.item.right}>
            <Icon
              name={
                item?.place_id === address?.place_id ||
                item?.place === address?.place ||
                item?.line1 === address?.line1
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              size={16}
              color={Colors.primary}
            />
          </View>
        )}
      </View>
    </TouchableRipple>
  );
};

// Export
export default AddressItem;
