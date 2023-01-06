import {Card as _Card} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import styles from './styles';
import React from 'react';

const Card = (props) => {
  return (
    <_Card
      onPress={props.onPress}
      style={{
        container: styles(props).container,
      }}>
      {props.children}
    </_Card>
  );
};

Card.propTypes = {
  style: PropTypes.object,
  vPad: PropTypes.bool,
  hPad: PropTypes.bool,
  onPress: PropTypes.func,
};

Card.defaultProps = {
  style: {},
  vPad: true,
  hPad: true,
  onPress: () => {
    console.log('Card was pressed');
  },
};

export default Card;

/*
USAGE:

  <Card 
    style={{}}
    vPad
    hPad
    onPress={() => {}}
  />

*/
