import React from 'react';
import {IconButton, Searchbar} from 'react-native-paper';
import styles from './styles';
import {Colors} from 'Theme';
import {isIos} from 'Platform';
import {SafeAreaView} from 'react-native';

const SearchToolbar = (props) => {
  const {
    placeholder,
    autoFocus,
    onChangeText,
    onSearchPress,
    editable,
    onBackPress,
  } = props;

  let _backOnPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      props.navigation.pop();
    }
  };

  let color = Colors.text;
  let size = isIos ? 21 : 23;
  const leftArrow = isIos ? 'chevron-left' : 'arrow-left';

  return (
    <SafeAreaView style={styles.root}>
      <Searchbar
        autoFocus={autoFocus}
        style={styles.search}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onIconPress={_backOnPress}
        icon={leftArrow}
        editable={editable}
        iconColor={color}
        placeholderTextColor={editable === false && color}
      />
      <IconButton
        icon="magnify"
        color={color}
        size={size}
        style={styles.searchIcon}
        onPress={onSearchPress}
      />
    </SafeAreaView>
  );
};

export default SearchToolbar;

/* 
Usage: 

 <SearchToolbar
  placeholder="Search Restaurants"
  autoFocus={autoFocus}
  editable
  onChangeText={(text) => filterData(text)}
  onSearchPress={() => {}}
  {...props}
/>

*/
