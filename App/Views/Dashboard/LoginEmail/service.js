// Imports
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import getTokenService from 'Services/JWTToken';
import Preferences from 'Config/preferences';
import {useDispatch, batch} from 'react-redux';
import getVendors from '../../../Store/Actions/Vendors';
import getBasket from '../../../Store/Actions/Basket';
import getOrders from '../../../Store/Actions/Orders';
import getUserAddresses from '../../../Store/Actions/UserAddresses';
import getUsers from '../../../Store/Actions/Users';
import sendFCMTokenService from 'Services/FCMToken';
import messaging from '@react-native-firebase/messaging';

const preferences = new Preferences();

// Main functional component
const useService = (props) => {
  const {fromDash} = props.route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [eye, setEye] = useState(true);
  const [checked, setChecked] = useState(false);
  const [storedUser, setStoredUser] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const {email} = props?.route?.params;

  const dispatch = useDispatch();

  function batchAllActions(user) {
    console.debug(
      'Fetch Vendors, Basket, Orders, Users, User Addresses & Shipping Method.',
    );
    batch(() => {
      dispatch(getVendors());
      dispatch(getBasket());
      dispatch(getOrders());
      dispatch(getUsers());
      dispatch(getUserAddresses()).then(() => {
        user ? setIsLoading1(false) : setIsLoading(false);
        const {navigate, pop} = props.navigation;
        if (fromDash) {
          console.debug('Navigate to Home.');
          navigate('Home');
        } else {
          pop();
        }
      });
    });
  }

  function sendToken() {
    messaging()
      .getToken()
      .then((token) => {
        console.debug('FCM Token: ', token);
        sendFCMTokenService({registration_id: token});
      });
  }

  useEffect(() => {
    preferences.getRememberMe().then((data) => {
      setStoredUser(data);
    });
  }, []);

  useEffect(() => {
    if (email !== undefined) setUsername(email);
  }, []);

  function verifyLogin(user) {
    console.debug(
      'Log In User.',
      user ? user.username : email?.toLowerCase() || username.toLowerCase(),
    );

    Keyboard.dismiss();
    user ? setIsLoading1(true) : setIsLoading(true);
    getTokenService({
      username: user
        ? user.username
        : email?.toLowerCase() || username.toLowerCase(),
      password: user ? user.password : password,
    }).then((response) => {
      if (response && response.access && response.refresh) {
        if (checked) {
          preferences.setRememberMe({
            username: email?.toLowerCase() || username.toLowerCase(),
            password: password,
          });
        }
        console.debug('Log In Success.');
        sendToken();
        response.createdAt = new Date();
        preferences.setToken(response);
        batchAllActions(user);
      } else {
        user ? setIsLoading1(false) : setIsLoading(false);
        setError(response);
      }
    });
  }

  return {
    isLoading,
    isLoading1,
    eye,
    error,
    username,
    password,
    checked,
    storedUser,
    fromDash,
    setChecked,
    setEye,
    setUsername,
    setPassword,
    verifyLogin,
  };
};

// Export
export default useService;
