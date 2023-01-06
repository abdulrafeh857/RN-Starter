// Imports
import {useEffect, useState} from 'react';
import api from 'Services/api';
import {useSelector, useDispatch} from 'react-redux';
import {Feedback} from '@Atoms';
import getUsers from '../../../Store/Actions/Users';

const useService = (props) => {
  const {users} = useSelector((state) => state.Users);

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (users) {
      setEmail(users.email);
      setFirstName(users.firstName);
      setLastName(users.lastName);
      setPhoneNumber(users.phone);
    }
  }, [users]);

  const updateDetails = () => {
    console.debug('Update user details.');
    setIsLoading(true);
    let payload = {
      phone: phoneNumber.length > 0 ? phoneNumber : users.phone,
      first_name: firstName.length > 0 ? firstName : users.firstName,
      last_name: lastName.length > 0 ? lastName : users.lastName,
      email: email.length > 0 ? email : users.email,
    };
    api
      .put('/users/' + users.id + '/', payload)
      .then((response) => {
        if (response.status === 200) {
          console.debug('Update success.');
          setIsLoading(false);
          dispatch(getUsers());
          Feedback.success('User details updated successfully', 'OK');
          props.navigation.navigate('Home');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.debug('Update failed.');
        console.log(err.response);
      });
  };

  return {
    isLoading,
    email,
    setEmail,
    firstName,
    setFirstName,
    phoneNumber,
    setPhoneNumber,
    lastName,
    setLastName,
    updateDetails,
  };
};

export default useService;
