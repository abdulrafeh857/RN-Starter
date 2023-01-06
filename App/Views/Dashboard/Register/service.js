// Imports
import {useState} from 'react';
import {Keyboard} from 'react-native';
import registerService from 'Services/Register';
import {Feedback} from '@Atoms';

const useService = (props) => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eye, setEye] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const {fromDash} = props.route.params;

  const [error, setError] = useState(null);

  function registerUser() {
    console.debug('Sign Up User.', email);
    Keyboard.dismiss();
    setIsLoading(true);

    registerService({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      phone: phone,
      password1: password1,
      password2: password2,
    }).then((response) => {
      if (response.status === 201) {
        console.debug('Sign Up Success.');
        setIsLoading(false);
        Feedback.success('Account created successfully!', 'OK');
        const {navigate} = props.navigation;
        console.debug('Continue using email.');
        navigate('LoginEmail', {email: response.data, fromDash: fromDash});
      } else {
        setIsLoading(false);
        setError(response);
      }
    });
  }

  return {
    checked,
    isLoading,
    eye,
    error,
    setEye,
    setChecked,
    setFirstName,
    setLastName,
    setPhone,
    setPassword1,
    setPassword2,
    setEmail,
    registerUser,
  };
};

// Export
export default useService;
