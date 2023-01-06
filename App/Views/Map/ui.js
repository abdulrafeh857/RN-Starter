// Imports
import {View, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styles from './styles';
import {Colors} from 'Theme';
import * as TEXT from '@Atoms/Text';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {Button, SearchToolbar} from '@Atoms';
import useService from './service';
import utils from './utils';
import {TouchableRipple, IconButton} from 'react-native-paper';

// Main functional component
const Map = (props) => {
  const {
    noGPS,
    onRegionChangeComplete,
    confirmAddress,
    animateToCurrentLocation,
    fromCheckout,
    region,
    address,
    confirmingAddress,
    mapRef,
  } = useService(props);

  let disabled = address === 'Finding location...';

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {/* Map View */}
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          loadingEnabled={true}
          loadingIndicatorColor={Colors.primary}
          onRegionChangeComplete={onRegionChangeComplete}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
        />
        <View style={styles.markerFixed}>
          <LottieView
            loop
            autoPlay={true}
            style={styles.marker}
            source={utils.marker}
          />
        </View>
        {/* Toolbar View */}
        <View style={styles.toolbar.container}>
          <SearchToolbar
            placeholder="Select location"
            editable={false}
            onBackPress={() =>
              noGPS && props.navigation.navigate('SelectLocation')
            }
            onSearchPress={() => {
              console.debug('Navigate to Search Map.');
              props.navigation.navigate('SearchMap', {
                fromCheckout: fromCheckout,
              });
            }}
            {...props}
          />
        </View>

        <TouchableRipple
          onPress={() => animateToCurrentLocation()}
          style={styles.myLocation}>
          <IconButton icon="near-me" color={Colors.text} size={20} />
        </TouchableRipple>
        {/* Bottom View */}
        <View style={styles.bottomContainer}>
          <View style={styles.bottomChild}>
            <TEXT.SubHeading myStyle={{color: 'white'}}>
              {utils.deliveryAddress}
            </TEXT.SubHeading>
            <View style={styles.addressContainer}>
              <TEXT.Caption numberOfLines={3} myStyle={styles.addrText}>
                <Icon name="location" size={14} color="white" /> {address}
              </TEXT.Caption>
            </View>
            <Button
              loaderColor={Colors.primary}
              loading={confirmingAddress}
              disabled={disabled}
              onPress={confirmAddress}
              text={disabled ? 'Finding location...' : 'Confirm Address'}
              style={styles.buttonStyle.container}
              textStyle={styles.buttonStyle.text}
            />
          </View>
        </View>
      </View>
    </>
  );
};

// Export
export default Map;
