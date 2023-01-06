// Imports
import {View, StatusBar} from 'react-native';
import React from 'react';
import styles from './styles';
import {Loader} from '@Atoms';
import * as TEXT from '@Atoms/Text';
import useService from './service';
import {Colors} from 'Theme';
import utils from './utils';

// Main functional component
const GPS = (props) => {
  useService(props);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View testID="gps.root" style={styles.root}>
        <View style={styles.child}>
          <Loader color={Colors.primary} />
          <TEXT.Caption myStyle={styles.text}>
            {utils.gettingLocation}
          </TEXT.Caption>
        </View>
      </View>
    </>
  );
};

// Export
export default GPS;
