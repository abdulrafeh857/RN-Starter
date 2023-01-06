// Imports
import {ImageBackground, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-paper';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {Loader} from '@Atoms';
import {Colors} from 'Theme';

const Category = (props) => {
  const {title, image, onPress, loading, color} = props;

  return (
    <View style={{...styles.root, backgroundColor: color}}>
      {loading ? (
        <Loader />
      ) : (
        <ImageBackground
          imageStyle={styles.rootImage}
          style={styles.root1}
          source={image}
          resizeMode="contain"
          resizeMethod="resize">
          <Card style={styles.card} vPad={false} hPad={false} onPress={onPress}>
            <TEXT.SubHeading numberOfLines={1} myStyle={styles.text}>
              {title}
            </TEXT.SubHeading>
          </Card>
        </ImageBackground>
      )}
    </View>
  );
};

Category.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

Category.defaultProps = {
  loading: false,
  title: 'Asian',
  image: '',
  color: Colors.tintGrey,
  onPress: () => {},
};

export default Category;

/*
USAGE:

  <Category 
    title=""
    image={}
    onPress={() => {}}
  />

*/
