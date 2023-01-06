import {Button as _Button} from 'react-native-material-ui';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import React from 'react';
import {Loader} from '@Atoms';

const Button = (props) => {
  return (
    <_Button
      upperCase={props.upperCase}
      disabled={props.loading ? true : props.disabled}
      onPress={props.loading || props.disabled ? () => {} : props.onPress}
      text={props.loading ? '' : props.text}
      raised={props.raised}
      onLongPress={props.loading ? () => {} : props.onLongPress}
      icon={props.loading ? <Loader color={props.loaderColor} /> : props.icon}
      iconSet={props.iconSet}
      primary={props.primary}
      accent={props.accent}
      style={{
        container: styles(props).container,
        text: styles(props).text,
      }}
    />
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  upperCase: PropTypes.bool,
  disabled: PropTypes.bool,
  onLongPress: PropTypes.func,
  primary: PropTypes.bool,
  accent: PropTypes.bool,
  raised: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconSet: PropTypes.string,
  style: PropTypes.shape({
    container: PropTypes.object,
    text: Text.propTypes.style,
  }),
  onPress: PropTypes.func,
};

Button.defaultProps = {
  loading: false,
  text: 'Press me',
  textStyle: {},
  upperCase: true,
  disabled: false,
  onLongPress: null,
  primary: false,
  accent: false,
  raised: true,
  icon: null,
  iconSet: null,
  style: {},
  onPress: () => {
    console.log('Button was pressed');
  },
};

export default Button;

/*
USAGE:

  <Button
    loading
    text="Hello World"
    textStyle={{}}
    upperCase
    disabled
    onLongPress
    primary
    accent
    raised
    icon={''}
    iconSet={'MaterialIcons'}
    style={{}}
    onPress={() => {}}
  />

*/
