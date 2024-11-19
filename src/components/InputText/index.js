import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const InputText = ({ label, value, onChangeText, placeholder, SecureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = style;
  return (
    <View style={containerStyle}>
      <View style={style.body}>
        <TextInput
          SecureTextEntry={SecureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          label={label}
          onChangeText={onChangeText}
        />
        <Text style={labelStyle}>{label}</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  inputStyle: {
    height: responsiveHeight(7),
    fontSize: 14,
    paddingLeft: 15,
    borderColor: 'black',
    backgroundColor: 'white'
    //width:responsiveWidth(50),
  },
  labelStyle: {
    fontSize: 11,
    paddingRight: 20
  },
  containerStyle: {
    //  borderWidth:responsiveWidth(0.5),
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: responsiveWidth(0.1),
    borderColor: 'black',
    alignSelf: 'center',
    width: responsiveWidth(85),
    borderColor: 'black',
    backgroundColor: 'white',
    marginTop: 10,
    borderWidth: responsiveWidth(0.2)
  }
});

export default InputText;
