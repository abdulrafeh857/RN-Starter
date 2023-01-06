// Imports
import {Colors} from 'Theme';
import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import * as TEXT from '@Atoms/Text';

const CartItem = (props) => {
  const {item} = props;

  let currGroup = '';

  return (
    <View style={styles.root}>
      <View style={styles.cartItemRootContainerStyle}>
        <View style={styles.cartItemLeftContainerStyle}>
          <View style={styles.cartItemQuantityTextContainerStyle}>
            <TEXT.SubHeading
              myStyle={{
                fontSize: 18,
                lineHeight: 20,
                width: '10.5%',
              }}>
              {item?.quantity}x{'   '}
            </TEXT.SubHeading>
            <View>
              <TEXT.SubHeading
                myStyle={{
                  lineHeight: 20,
                }}>
                {item?.product?.title}
              </TEXT.SubHeading>
            </View>
          </View>
          <TEXT.Price
            myStyle={{
              color: Colors.text,
            }}>
            {item?.priceExTax || item?.price_excl_tax}
          </TEXT.Price>
        </View>
      </View>
      {item.modifiers.map((s) => {
        let side = '';
        let grp = '';

        if (currGroup !== s.group) {
          grp = '' + s.group + ':';
          currGroup = s.group;
        }
        side = '  ' + s.name;

        return (
          <View style={styles.sideRootContainerStyle}>
            <View style={styles.sideLeftContainerStyle}>
              {grp.length > 0 && (
                <TEXT.SubHeading
                  myStyle={styles.modifiersContainerStyle.grpTextStyle}>
                  {grp}
                </TEXT.SubHeading>
              )}
              <TEXT.Title
                myStyle={styles.modifiersContainerStyle.sidesTextStyle}>
                {side}
              </TEXT.Title>
            </View>
          </View>
        );
      })}
      <View style={styles.bottomViewStyle} />
    </View>
  );
};

// Export
export default CartItem;
