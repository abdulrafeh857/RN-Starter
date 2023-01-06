import {Keyboard} from 'react-native';

import addUserAddressService from 'Services/AddUserAddress';
import {useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import getUserAddresses from '../../../Store/Actions/UserAddresses';
import {Feedback} from '@Atoms';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

const AddAddress = (props) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState({});
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const fromCheckout = props?.route?.params?.fromCheckout || false;

  const dispatch = useDispatch();

  const {users} = useSelector((state) => state.Users);
  const loc = useSelector((state) => state.SelectedAddress.selectedAddress);

  useEffect(() => {
    setLocation(loc);
    let lines = loc.line1.split(',');
    setLine1(lines[0]);
    if (lines.length > 1) {
      lines = lines.slice(1, lines.length);
      let line = '';
      lines.map((l) => (line += l));
      setLine2(line);
    }
  }, []);

  const addAddress = () => {
    console.debug('Adding selected address.');
    Keyboard.dismiss();
    setIsLoading(true);
    addUserAddressService({
      location: {
        latitude: parseFloat(location.location.latitude),
        longitude: parseFloat(location.location.longitude),
      }, // Compulsory
      title: 'Mr',
      nickname: name,
      first_name: users?.firstName,
      last_name: users?.lastName,
      line1: line1 + ' ' + line2, // Compulsory
      phone_number: '',
      postcode: location.postcode,
      notes: '',
      is_default_for_shipping: false,
      is_default_for_billing: false,
      place: line1 + ' ' + line2,
      place_id: location.place_id,
    })
      .then((response) => {
        preferences.setSelectedAddress(response.data);
        dispatch(getUserAddresses()).then(() => {
          setIsLoading(false);
          Feedback.success('Address added successfully', 'OK');
          console.debug('Address Successfully added.');
          if (fromCheckout) {
            console.debug('Navigate to Checkout.');
            props.navigation.navigate('Checkout');
          } else {
            console.debug('Navigate to Home');
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Dashboard'}],
              }),
            );
          }
        });
      })
      .catch((err) => {
        setIsLoading(false);
        console.debug('Address failed to add.');
        if (err.response.status === 406) {
          Feedback.simple('Address already exists.', 'OK');
          console.debug('Address already exists.');
          if (fromCheckout) {
            console.debug('Navigate to Checkout.');
            props.navigation.navigate('Checkout');
          } else {
            console.debug('Navigate to Home.');
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Dashboard'}],
              }),
            );
          }
        }
      });
  };
  return {
    location,
    isLoading,
    setName,
    addAddress,
    line1,
    setLine1,
    line2,
    setLine2,
  };
};

export default AddAddress;
