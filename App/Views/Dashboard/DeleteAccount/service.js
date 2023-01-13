// Imports
import logoutService from 'Services/Logout';
import { useState } from 'react';
import changePasswordService from 'Services/ChangePassword';
import { Feedback } from 'Components/Atoms';
import Preferences from 'Config/preferences';
import { useDispatch } from 'react-redux';
import getOrders from 'Store/Actions/Orders';

const useService = props => {
  const preferences = new Preferences();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = () => {
    logoutService().then(response => {
      console.log('response', response);
      if (response.status === 200) {
        console.debug('Logout Success.');
        Feedback.success('Logged out successfully.', 'OK');

        preferences.removeToken().then(() => {
          console.debug('Async Storage cleared.');
          dispatch(getOrders()).then(() => {
            props.navigation.navigate('Splash');
          });
        });
      }
    });
  };

  return {
    password,
    setPassword,
    error,
    isLoading,
    deleteAccount
  };
};

export default useService;
