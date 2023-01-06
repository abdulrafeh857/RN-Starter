// Imports
import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import utils from './utils';
import * as TEXT from '@Atoms/Text';

// Main Component
const UnderDevelopment = () => {
  return (
    <View style={styles.rootViewStyle}>
      <View style={styles.imageContainerStyle}>
        <Image
          source={{uri: utils.uri}}
          style={styles.imageStyle}
          resizeMode={'contain'}
          resizeMethod={'resize'}
        />
      </View>
      <TEXT.SubHeading>{utils.text}</TEXT.SubHeading>
    </View>
  );
};

// Export
export default UnderDevelopment;
