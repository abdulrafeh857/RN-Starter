import {View} from 'react-native';
import styles from './styles';
import React from 'react';
import * as TEXT from '@Atoms/Text';

const BillingDetails = (props) => {
  const {details, vouchers} = props;

  const renderItem = (item) => (
    <View style={styles.billingSectionContainerStyle}>
      <TEXT.Normal>{item.name}</TEXT.Normal>
      <TEXT.Price>{item.price}</TEXT.Price>
    </View>
  );

  const renderVoucherItem = (item) => (
    <View style={styles.billingSectionContainerStyle}>
      <TEXT.Normal>{item.name}</TEXT.Normal>
      <TEXT.Caption myStyle={styles.voucherPrice}>
        - £{item.amount}
      </TEXT.Caption>
    </View>
  );

  return (
    <View>
      {details.map((d) => {
        return renderItem(d);
      })}
      {vouchers?.map((v) => {
        return renderVoucherItem(v);
      })}
    </View>
  );
};

export default BillingDetails;
