// Imports
import {CommonActions} from '@react-navigation/native';
import {useEffect} from 'react';
import utils from './utils';
import getRefreshTokenService from 'Services/RefreshJWTToken';
import SplashScreen from 'react-native-splash-screen';
import getBasket from '../../Store/Actions/Basket';
import getOrders from '../../Store/Actions/Orders';
import getUserAddresses from '../../Store/Actions/UserAddresses';
import getUsers from '../../Store/Actions/Users';
import {useDispatch, batch} from 'react-redux';
import useRootHook from '../../Utils/CustomHooks';
import {isIos} from 'Platform';
import messaging from '@react-native-firebase/messaging';

const production = process.env.NODE_ENV === 'production';

const preFetchData = (dispatch) => {
  console.debug('Pre-fetch Basket, Orders, Users, UserAddresses.');
  batch(() => {
    dispatch(getBasket());
    dispatch(getOrders());
    dispatch(getUsers());
    dispatch(getUserAddresses());
  });
};

const refreshToken = (Token) => {
  getRefreshTokenService({refresh: Token.get.refresh})
    .then((response) => {
      const _ = Token.get;
      _.access = response.access;
      _.createdAt = new Date();
      Token.set(_);
      console.debug('Token Refreshed.');
    })
    .catch((error) => {
      if (error?.response?.data?.code === 'token_not_valid') {
        console.debug('Refresh Token has failed.');
        messaging().deleteToken();
        console.debug('Delete FCM Token.');
        console.debug('Log out user.');
        Token.reset();
        console.debug('Log out Success.');
      }
    });
};

const useService = ({navigation}) => {
  const {Token} = useRootHook();

  const dispatch = useDispatch();

  useEffect(() => {
    !production && console.clear();

    Token.get && !Token.isLoading && refreshToken(Token);

    preFetchData(dispatch);

    setTimeout(function () {
      SplashScreen.hide();
      console.debug('Navigate to GPS.');
      if (isIos) {
        setTimeout(function () {
          navigation.dispatch(CommonActions.reset(utils.navigateToGPS));
        }, 2000);
      } else {
        navigation.dispatch(CommonActions.reset(utils.navigateToGPS));
      }
    }, 2500);
  }, [Token.isLoading]);

  return;
};

// Export
export default useService;
