import {View, TextInput} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import * as TEXT from '@Atoms/Text';

const CardInput = (props) => {
  const {style, label, placeholder, onChangeText} = props;

  const [text, setText] = useState('');

  return (
    <View style={styles.root}>
      <TEXT.Normal myStyle={styles.label}>{label}</TEXT.Normal>
      <TextInput
        value={text}
        placeholder={placeholder}
        style={{...styles.input, ...style}}
        onChangeText={(text) => {
          onChangeText(text);
          setText(text);
        }}
      />
    </View>
  );
};

export default CardInput;
