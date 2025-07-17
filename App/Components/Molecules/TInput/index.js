import { Colors, FontFamily } from 'Theme';
import { StyleSheet } from 'react-native';
import React from 'react';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { TextInput } from 'react-native-paper';

const TInput = props => {
  const {
    flat,
    style,
    onFocus,
    keyboardType,
    value,
    onPressOut,
    rightIcon,
    onRightPress,
    rightIconColor,
    rightIconSize,
    RightView,
    leftIcon,
    onLeftPress,
    leftIconColor,
    onPressIn,
    editable = true,
    secureTextEntry = false,
    multiline = false,
    placeholder,
    tStyle,
    maxLength,
    LeftView,
    countryVisible,
    countryCode,
    onSelect,

    ...rest
  } = props;

  const { textInputStyle } = useStyles();

  return (
    <TextInput
      numberOfLines={1}
      value={value}
      mode="outlined"
      variant={'medium'}
      selectionColor={Colors.greyText}
      activeOutlineColor={
        editable == false ? Colors.primary + 'cc' : Colors.primary
      }
      label={placeholder}
      placeholder={placeholder}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      multiline={multiline}
      maxLength={maxLength}
      {...rest}
      style={[
        textInputStyle,
        {
          color: editable == false ? Colors.greyText : Colors.text
        },
        tStyle
      ]}
      editable={editable}
      placeholderTextColor={
        editable == false ? Colors.greyText + '55' : Colors.greyText
      }
      left={
        leftIcon ? (
          <TextInput.Icon
            name={leftIcon}
            size={23}
            forceTextInputFocus={false}
            color={leftIconColor ? leftIconColor : Colors.greyText}
            onPress={onLeftPress}
          />
        ) : null
      }
      right={
        rightIcon ? (
          <TextInput.Icon
            onPress={onRightPress}
            name={rightIcon}
            size={rightIconSize ? rightIconSize : 23}
            forceTextInputFocus={false}
            color={rightIconColor ? rightIconColor : Colors.greyText}
          />
        ) : RightView ? (
          <TextInput.Icon
            style={{
              height: 55,
              width: 55
            }}
            forceTextInputFocus={false}
            onPress={onRightPress}
            icon={() => <RightView></RightView>}
          />
        ) : null
      }
    />
  );
};
const useStyles = () =>
  StyleSheet.create({
    textInputStyle: {
      width: responsiveWidth(85),
      marginTop: 20,
      alignSelf: 'center',
      backgroundColor: Colors.light,
      fontFamily: FontFamily.Regular,
      fontSize: 16,
      color: Colors.text,
      paddingRight: 8,
      paddingLeft: 5,
      borderRadius: 5
    }
  });

export default TInput;
