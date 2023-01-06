// Imports

import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import utils from './utils';
import useService from './service';
import {Toolbar} from '@Atoms';

// Main functional component
const OrderSummary = (props) => {
  const {} = useService(props);

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewStyle}></ScrollView>
    </View>
  );
};

// Export
export default OrderSummary;
