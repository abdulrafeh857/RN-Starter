// Imports
import {useEffect} from 'react';
import useRootHook from '../../Utils/CustomHooks';
import utils from './utils';
import {useDispatch, batch} from 'react-redux';
import getSelectedAddress from '../../Store/Actions/SelectedAddress';
import {CommonActions} from '@react-navigation/native';
import getBasket from '../../Store/Actions/Basket';
import getOrders from '../../Store/Actions/Orders';
import getUserAddresses from '../../Store/Actions/UserAddresses';
import getUsers from '../../Store/Actions/Users';
import Preferences from 'Config/preferences';
import getGpsLocationService from 'Services/GPSLocation';

const preferences = new Preferences();

const preFetchData = (dispatch, Token) => {
  if (Token.get) {
    console.debug('Pre-fetch Basket, Orders, Users, UserAddresses.');
    batch(() => {
      dispatch(getBasket());
      dispatch(getOrders());
      dispatch(getUsers());
      dispatch(getUserAddresses());
    });
  } else {
    console.debug('Pre-fetch Basket.');
    batch(() => {
      dispatch(getBasket());
    });
  }
};

const getGpsLocation = (navigation, dispatch, noGPS, fromCheckout) => {
  getGpsLocationService().then((_location) => {
    if (
      _location?.message === 'Authorization denied' ||
      _location?.message === 'denied'
    ) {
      console.debug('Navigate to Map.');
      preferences.setCurrent(false);

      navigation.navigate('Map', {
        noGPS: noGPS,
        fromCheckout: fromCheckout,
      });
    } else {
      console.debug('Navigate to Home.');
      preferences.setCurrent(true);
      let isInternal = true;

      dispatch(getSelectedAddress(_location, isInternal)).then(() => {
        navigation.dispatch(CommonActions.reset(utils.navigateToHome));
      });
    }
  });
};

const useService = (props) => {
  const fromCheckout = props?.route?.params?.fromCheckout || false;
  const noGPS = props.route.params?.noGPS || false;
  const fromDash = props.route.params?.fromDash || false;

  const {Token} = useRootHook();
  const {navigation} = props;

  const dispatch = useDispatch();

  useEffect(() => {
    !Token.isLoading && preFetchData(dispatch, Token);

    if (!Token.isLoading && !noGPS) {
      setTimeout(() => {
        getGpsLocation(navigation, dispatch, noGPS, fromCheckout);
      }, 1000);
    }
  }, [Token.isLoading]);

  useEffect(() => {
    if (noGPS) {
      setTimeout(() => {
        console.debug('Navigate to Map.');
        navigation.navigate('Map', {
          noGPS: noGPS,
          fromCheckout: fromCheckout,
          fromDash: fromDash,
        });
      }, 1000);
    }
  }, []);

  return;
};

// Export
export default useService;
