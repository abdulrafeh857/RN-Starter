// Imports
import {
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from 'Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const {height, width} = Dimensions.get('screen');

// Main functional component
const Searchbar = (props) => {
  // State
  props.placeholder ? props.placeholder : '-Search-';

  const color = Colors.tintGrey ? Colors.tintGrey : '#bbb';

  return (
    <KeyboardAvoidingView style={styles.rootViewStyle} behavior={'position'}>
      <View
        style={{
          ...styles.searchBarContainerStyle,
          width: width,
          borderColor: color,
          zIndex: -5,
        }}>
        <View
          style={{
            borderColor: color,
            ...styles.iconContainerStyle,
          }}>
          <Icon name="search-outline" size={height * 0.033} color={color} />
        </View>
        <TextInput
          editable={false}
          placeholder={props.placeholder}
          placeholderTextColor={color}
          style={{
            ...styles.textInputStyle,
            borderColor: color,
          }}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...styles.backButtonContainerStyle,
            borderColor: color,
          }}></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Export
export default Searchbar;
