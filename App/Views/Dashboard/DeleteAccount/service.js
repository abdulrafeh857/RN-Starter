// Imports
import logoutService from 'Services/Logout';
import { useState } from 'react';
import changePasswordService from 'Services/ChangePassword';
import { Feedback } from 'Components/Atoms';
import Preferences from 'Config/preferences';
import { useDispatch, useSelector } from 'react-redux';
import getOrders from 'Store/Actions/Orders';
import deleteAccountService from 'Services/DeleteAccount';

const useService = props => {
  const preferences = new Preferences();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { users } = useSelector(state => state.Users);
  console.log('\n\n\n\n    user DATA', JSON.stringify(users, null, 2));
  const deleteAccount = async() => {
    let id = users && users.id;
    await deleteAccountService(id).then(response => {
      console.log('\n\n\  response deleteAccountService == ', response);
      if (response.status === 200 || response.status === 204) {
        console.debug('Delete Success.');
        Feedback.success('Account Deleted successfully.', 'OK');

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
