// Imports
import useRootHook from '../../Utils/CustomHooks';
import {useEffect, useState, useRef} from 'react';
import Geocoder from 'react-native-geocoding';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import getSelectedAddress from '../../Store/Actions/SelectedAddress';
import getGpsLocationService from 'Services/GPSLocation';
import Preferences from 'Config/preferences';
import {GOOGLE_API_KEY} from '../../../keys';

const preferences = new Preferences();

Geocoder.init(GOOGLE_API_KEY);

// TODO: Get from API
const initialRegion = {
  latitude: 53.410763930308846,
  longitude: -2.1575033850967884,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

const useService = (props) => {
  const noGPS = props.route.params?.noGPS || false;
  const fromCheckout = props.route.params?.fromCheckout || false;
  const fromDash = props.route.params?.fromDash || false;

  const {Address} = useRootHook();

  const mapRef = useRef(null);

  const [region, setRegion] = useState(initialRegion);
  const [confirmingAddress, setConfirmingAddress] = useState(false);
  const [address, setAddress] = useState('Finding location...');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    preferences.getToken().then((token) => setUser(token));
  }, []);

  useEffect(() => {
    animateToCurrentLocation();
  }, []);

  function getAddressFromAPI(location) {
    Geocoder.from(location?.latitude, location?.longitude)
      .then((json) => {
        let addressComponent = '';
        json.results[0].address_components.map((a) => {
          addressComponent += a.long_name + ' ';
        });
        setAddress(addressComponent);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function animateToCurrentLocation() {
    getGpsLocationService().then((_location) => {
      if (
        _location?.message === 'Authorization denied' ||
        _location?.message === 'denied'
      ) {
      } else {
        console.debug('Animate to current location.');
        mapRef.current &&
          mapRef.current.animateToRegion(
            {
              latitude: _location.latitude,
              longitude: _location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            },
            250,
          );
      }
    });
  }

  useEffect(() => {
    const selectedRegion = props.route.params?.region;

    if (selectedRegion) {
      setRegion(selectedRegion);
      mapRef.current &&
        mapRef.current.animateToRegion(
          {
            latitude: selectedRegion.latitude,
            longitude: selectedRegion.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          250,
        );
    }
  }, [props]);

  useEffect(() => {
    if (!Address.isLoading && Address.get) {
      const {location} = Address.get;

      console.debug('Updating map to stored location.');
      mapRef.current &&
        mapRef.current.animateToRegion(
          {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          250,
        );
    } else
      console.debug('No saved location found. Updating map to default region');
  }, [Address.isLoading]);

  function onRegionChangeComplete(reg) {
    console.debug('Region update.');
    reg.latitude && reg.longitude && setRegion(reg);
    getAddressFromAPI(reg);
  }

  function confirmAddress() {
    setConfirmingAddress(true);
    let isInternal = true;
    dispatch(getSelectedAddress(region, isInternal)).then(() => {
      console.debug('noGPS: ', noGPS);
      console.debug('fromCheckout: ', fromCheckout);
      if (!noGPS) {
        console.debug('Navigate to Home.');
        setConfirmingAddress(false);
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          }),
        );
      } else if ((fromCheckout === true || fromDash === true) && user) {
        console.debug('Navigate to Add Address Screen.');
        const navigate = props.navigation.navigate;
        setConfirmingAddress(false);
        navigate('AddAddress', {fromCheckout: fromCheckout});
      } else {
        console.debug('Navigate to Home.');
        setConfirmingAddress(false);
        props.navigation.navigate('Home');
      }
    });
  }

  return {
    onRegionChangeComplete,
    confirmAddress,
    animateToCurrentLocation,
    fromCheckout,
    region,
    address,
    confirmingAddress,
    noGPS,
    mapRef,
  };
};

// Export
export default useService;
