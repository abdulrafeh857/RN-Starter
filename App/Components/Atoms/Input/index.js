import {TextInput} from 'react-native-paper';
import {View} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import * as TEXT from '@Atoms/Text';
import PropTypes from 'prop-types';
import {Colors} from 'Theme';

const propTypes = {
  mode: PropTypes.string,
  value: PropTypes.string,
  leftIcon: PropTypes.any,
  rightIcon: PropTypes.any,
  rightIconClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureEntry: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.any,
  keyboardType: PropTypes.string,
  multiple: PropTypes.bool,
  noError: PropTypes.bool,
  style: PropTypes.object,
};

const defaultProps = {
  mode: 'outlined',
  value: undefined,
  leftIcon: undefined,
  rightIcon: undefined,
  label: '',
  placeholder: '',
  secureEntry: false,
  rightIconClick: () => {},
  onChangeText: () => {},
  disabled: false,
  error: undefined,
  keyboardType: 'default',
  multiple: false,
  noError: false,
  style: null,
};

const Input = (props) => {
  const {
    leftIcon,
    value,
    rightIcon,
    label,
    mode,
    secureEntry,
    onChangeText,
    disabled,
    placeholder,
    error,
    keyboardType,
    rightIconClick,
    multiline,
    noError,
    style,
  } = props;

  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const renderLeft = leftIcon && (
    <TextInput.Icon
      color={focused ? Colors.primary : Colors.tintGrey}
      name={leftIcon}
      size={20}
    />
  );

  const renderRight = rightIcon && (
    <TextInput.Icon
      onPress={() => rightIconClick()}
      color={focused ? Colors.primary : Colors.tintGrey}
      name={rightIcon}
      size={20}
    />
  );

  return (
    <>
      <TextInput
        dense
        label={label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        mode={mode}
        multiline={multiline}
        keyboardType={keyboardType}
        placeholder={placeholder}
        disabled={disabled}
        secureTextEntry={secureEntry}
        left={renderLeft}
        right={renderRight}
        value={value ? value : text}
        style={{...styles.root, ...style}}
        onChangeText={(text) => {
          onChangeText(text);
          setText(text);
        }}
      />
      {!noError && (
        <View style={styles.error}>
          <TEXT.Caption myStyle={styles.text}>{error}</TEXT.Caption>
        </View>
      )}
    </>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
