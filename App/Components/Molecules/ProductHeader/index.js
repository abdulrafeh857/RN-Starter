// Imports
import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import StripHtml from 'Utils/Common/StripHtml';
import * as TEXT from '@Atoms/Text';

// Main functional component
const ProductHeaderCard = ({data}) => {
  return (
    <>
      <View style={styles.rootViewStyle}>
        <View style={styles.textRootContainerStyle}>
          <TEXT.Caption>{StripHtml(data?.description)}</TEXT.Caption>
        </View>
      </View>
    </>
  );
};

// Export
export default ProductHeaderCard;
