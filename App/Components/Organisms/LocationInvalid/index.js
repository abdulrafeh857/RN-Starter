// Imports
import {View} from 'react-native';
import React from 'react';
import {ProductHeader} from '@Molecules';
import styles from './styles';
import {Button} from '@Atoms';
import utils from './utils';

// Main functional component
const LocationInvalid = (props) => {
  const onChangeLocation = () => {
    props.navigation.navigate('SelectLocation');
  };

  return (
    <View style={styles.rootViewStyle}>
      <ProductHeader data={utils.description} />
      <View style={styles.dividerStyle} />
      <Button
        style={styles.buttonStyle}
        textStyle={styles.buttonText}
        loading={false}
        onPress={onChangeLocation}
        text={utils.button}
      />
    </View>
  );
};

// Export
export default LocationInvalid;
