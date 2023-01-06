// Imports
import {FlatList, View, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styles from './styles';
import {Colors} from 'Theme';
import * as TEXT from '@Atoms/Text';
import useService from './service';
import {SearchToolbar, Loader} from '@Atoms';
import {TouchableRipple} from 'react-native-paper';

// Main functional component
const SearchMap = (props) => {
  const {locations, isLoading, confirmAddress, searchLocation} = useService(
    props,
  );

  function renderLocation({item}) {
    return (
      <TouchableRipple
        onPress={() => {
          Keyboard.dismiss();
          confirmAddress(item);
        }}
        activeOpacity={0.9}
        style={styles.itemContainer}>
        <>
          <View style={styles.iconContainer}>
            <Icon
              name={'location-sharp'}
              size={styles.iconSize}
              color={Colors.text}
            />
          </View>
          <View style={styles.itemBodyContainer}>
            <TEXT.Caption myStyle={styles.text}>{item.address}</TEXT.Caption>
          </View>
        </>
      </TouchableRipple>
    );
  }

  return (
    <>
      <View style={styles.rootViewStyle}>
        <SearchToolbar
          placeholder="Select location"
          autoFocus={true}
          onChangeText={(text) => searchLocation(text)}
          {...props}
        />

        {isLoading && (
          <View style={{top: 20}}>
            <Loader color={Colors.primary} />
          </View>
        )}

        <FlatList
          keyboardShouldPersistTaps={'handled'}
          style={styles.listContainerStyle}
          renderItem={renderLocation.bind()}
          data={locations}
          keyExtractor={(item) => item.key}
        />
      </View>
    </>
  );
};

// Export
export default SearchMap;
