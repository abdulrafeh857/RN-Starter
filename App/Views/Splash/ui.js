// Imports
import {View, Image} from 'react-native';
import React from 'react';
import {Loader} from '@Atoms';
import styles from './styles';
import useService from './service';
import {isIos} from 'Platform';

const Splash = (props) => {
  useService(props);

  return (
    <View style={styles.root}>
      {isIos ? (
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          source={require('@Images/logo.gif')}
          style={styles.logo}
        />
      ) : (
        <View style={styles.child}>
          <Loader />
        </View>
      )}
    </View>
  );
};

// Export
export default Splash;
