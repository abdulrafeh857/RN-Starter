// Imports
import {Colors, FontSize} from 'Theme';
import React from 'react';
import {ScrollView, View, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {AddressItem} from '@Molecules';
import useService from './service';
import {Divider, Loader, Toolbar} from '@Atoms';
import closeToBottom from 'Utils/Common/CloseToBottom';
import {TouchableRipple} from 'react-native-paper';
import utils from './utils';

// Main functional component
const SelectLocation = (props) => {
  const {
    fromCheckout,
    fromDash,
    addresses,
    next,
    current,
    onUpdateLocation,
    onCurrentLocation,
    loadMoreAddresses,
    onLongPress,
  } = useService(props);

  function renderLocations({item}) {
    return (
      <AddressItem
        onPress={() => onUpdateLocation(item)}
        onLongPress={() => onLongPress(item)}
        color="#3f3f3f"
        item={item}
      />
    );
  }

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewContainerStyle}
        scrollEventThrottle={1}
        onScroll={({nativeEvent}) => {
          closeToBottom(nativeEvent) && loadMoreAddresses();
        }}>
        <TouchableRipple
          onPress={() => {
            props.navigation.navigate('GPS', {
              fromCheckout: fromCheckout,
              fromDash: fromDash,
              noGPS: true,
            });
          }}
          style={styles.addAddressButton.rootViewStyle}>
          <>
            <Icon name={'add'} color={Colors.primary} size={FontSize.title} />
            <TEXT.Normal myStyle={styles.addAddressButton.textStyle}>
              Add new address
            </TEXT.Normal>
          </>
        </TouchableRipple>

        {!fromCheckout && (
          <TouchableRipple
            onPress={onCurrentLocation}
            style={styles.item.rootView}>
            <View style={styles.item.root}>
              <View style={styles.item.left}>
                <Icon name="location" size={16} color={Colors.primary} />
              </View>
              <View style={styles.item.center}>
                <TEXT.Caption
                  myStyle={{
                    color: Colors.text,
                  }}>
                  Current location
                </TEXT.Caption>
              </View>
              <View style={styles.item.right}>
                <Icon
                  name={current ? 'radio-button-on' : 'radio-button-off'}
                  size={16}
                  color={Colors.primary}
                />
              </View>
            </View>
          </TouchableRipple>
        )}

        {addresses?.length > 0 ? (
          <>
            <FlatList
              contentContainerStyle={{flexGrow: 1}}
              renderItem={renderLocations.bind(this)}
              data={addresses}
              ItemSeparatorComponent={() => <Divider height={1} />}
              keyExtractor={(item) => item.index}
            />
            {next && (
              <View style={{paddingVertical: 10}}>
                <Loader color={Colors.primary} />
              </View>
            )}
          </>
        ) : (
          <View style={styles.noAddrRoot}>
            <Image
              resizeMode={'contain'}
              resizeMethod="resize"
              source={require('@Images/no-orders.png')}
            />
            <TEXT.Normal myStyle={styles.noAddrText}>
              No saved Addresses.
            </TEXT.Normal>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Export
export default SelectLocation;
