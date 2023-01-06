// Imports
import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import styles from './styles';
import utils from './utils';
import {useSelector, useDispatch} from 'react-redux';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import * as TEXT from '@Atoms/Text';
import Preferences from 'Config/preferences';
import {Colors} from 'Theme';
import SearchBar from '@Atoms/Searchbar';
import setSelectedShippingMethod from '../../../Store/Actions/SelectedShippingMethod';
import {IconButton, TouchableRipple} from 'react-native-paper';

const preferences = new Preferences();

const Header = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState('Delivery');
  const [address, setAddress] = useState({shortAddress: 'No address found'});
  const [badge, setBadge] = useState(false);

  const {basket} = useSelector((state) => state.Basket);
  const {selectedAddress} = useSelector((state) => state.SelectedAddress);
  const {orders} = useSelector((state) => state.Orders);

  // Filter Ongoing Orders and show badge
  useFocusEffect(
    useCallback(() => {
      const ongoing = orders?.results?.filter(
        ({status}) =>
          status === 'Pending' ||
          status === 'Vendor Confirmed' ||
          status === 'Ready For Delivery' ||
          status === 'Delivery Confirmed' ||
          status === 'Driver Enroute' ||
          status === 'Driver Arrived' ||
          status === 'Driver POB',
      );
      ongoing?.length > 0 && setBadge(true);
    }, [orders]),
  );

  // Update Redux on Update Shipping Method
  useEffect(() => {
    if (selected === 'Delivery') {
      console.debug('Set Standard Shipping Method.');
      setSelected('Delivery');
      dispatch(setSelectedShippingMethod('Delivery'));
    } else if (selected === 'Collection') {
      console.debug('Set Collection Shipping Method.');
      setSelected('Collection');
      dispatch(setSelectedShippingMethod('Collection'));
    }
  }, [selected]);

  // Update Address Logic
  useEffect(() => {
    if (selectedAddress) setAddress(selectedAddress);
    else {
      preferences.getSelectedAddress().then((loc) => {
        if (loc) setAddress(loc);
      });
    }
  }, [selectedAddress]);

  // Render Shipping Methods
  const renderOption = (option) => {
    return (
      <TouchableRipple
        style={styles.option}
        onPress={() => setSelected(option.title)}>
        <>
          {selected === option.title ? (
            <TEXT.Heading myStyle={styles.optionText}>
              {option.title.toUpperCase()}
            </TEXT.Heading>
          ) : (
            <TEXT.Heading
              myStyle={{
                ...styles.optionText,
                color: Colors.tintGrey,
              }}>
              {option.title.toUpperCase()}
            </TEXT.Heading>
          )}
        </>
      </TouchableRipple>
    );
  };

  return (
    <>
      <View style={styles.root}>
        <View style={styles.left}>
          <TouchableRipple
            style={styles.addressContainer}
            onPress={() => {
              console.debug('Navigate to Select Location.');
              props.navigation.navigate('SelectLocation', {fromDash: true});
            }}>
            <View style={styles.address}>
              <TEXT.SubHeading numberOfLines={1}>
                {address.place}
              </TEXT.SubHeading>
              <TEXT.Normal myStyle={styles.arrow} numberOfLines={1}>
                {' '}
                ▼
              </TEXT.Normal>
            </View>
          </TouchableRipple>
          <View style={styles.options}>
            {utils.options.map(renderOption.bind())}
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.rightChild}>
            {basket && basket !== null && basket?.totalExTax !== '0.00' && (
              <TouchableRipple
                onPress={() => {
                  console.debug('Navigate to Basket.');
                  props.navigation.navigate('Cart');
                }}
                style={styles.cartActive}>
                <>
                  <Image
                    resizeMode={'contain'}
                    resizeMethod="resize"
                    style={styles.cart.image}
                    source={require('@Images/basket.png')}
                  />
                  <TEXT.Price myStyle={styles.cart.text}>
                    {basket?.totalInTax}
                  </TEXT.Price>
                </>
              </TouchableRipple>
            )}

            <IconButton
              icon={require('@Images/profile-main.png')}
              color={Colors.primary}
              size={35}
              style={styles.user}
              onPress={() =>
                props.navigation.dispatch(DrawerActions.toggleDrawer())
              }
            />
            {badge && <View style={styles.badge} />}
          </View>
        </View>
      </View>
      <View style={styles.search.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Search', {autoFocus: true})}
          activeOpacity={1}
          style={styles.search.root}
        />
        <SearchBar placeholder="Search Restaurants" />
      </View>
    </>
  );
};

export default Header;
