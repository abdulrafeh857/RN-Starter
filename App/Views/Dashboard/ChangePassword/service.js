// Imports
import {useState} from 'react';
import changePasswordService from 'Services/ChangePassword';

const useService = (props) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const updateDetails = async() => {
    setIsLoading(true);
   await changePasswordService({
      old_password: password,
      new_password1: newPassword,
      new_password2: repeatPassword,
    }).then((response) => {
      console.log('\n\n  updateDetails response', response);
      if (response?.status === 200) {
        setIsLoading(false);
        props.navigation.navigate('Home');
      } else {
        setIsLoading(false);
        setError(response);
      }
    }).catch((error) => {
      setIsLoading(false);
      setError(error);
      console.log('\n\n  updateDetails error', error);
    });
  };

  return {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    repeatPassword,
    setRepeatPassword,
    error,
    isLoading,
    updateDetails,
  };
};

export default useService;
