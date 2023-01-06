// Imports
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Preferences from 'Config/preferences';
import getSelectedAddress from '../../../Store/Actions/SelectedAddress';
import getUserAddresses from '../../../Store/Actions/UserAddresses';
import removeUserAddressService from 'Services/RemoveUserAddress';
import {loadMore} from 'Services/UserAddresses';
import showAlert from '../../../Store/Actions/ShowAlert';

const preferences = new Preferences();

// Main functional component
const SelectLocation = (props) => {
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(false);

  const {userAddresses} = useSelector((state) => state.UserAddresses);
  const [addresses, setAddresses] = useState(userAddresses?.results);
  const [next, setNext] = useState(userAddresses?.next);

  const onLongPress = (item) => {
    dispatch(
      showAlert({
        title: 'Delete Address',
        body: 'Do you want to delete this address?',
        buttons: [
          {
            name: 'Cancel',
            onPress: () => dispatch(showAlert(null)),
          },
          {
            name: 'DELETE',
            onPress: () => onRemoveLocation(item),
          },
        ],
      }),
    );
  };

  useEffect(() => {
    preferences.getCurrent().then((current) => setCurrent(current));
  }, []);

  useEffect(() => {
    setAddresses(userAddresses?.results);
  }, [userAddresses]);

  const fromCheckout = props?.route?.params?.fromCheckout;
  const fromDash = props?.route?.params?.fromDash;

  const loadMoreAddresses = () => {
    console.debug('Loading more addresses.');
    if (next) {
      loadMore(next).then((response) => {
        setAddresses(addresses.concat(response.results));
        setNext(response.next);
      });
    } else {
      console.debug('End of data');
    }
  };

  const onUpdateLocation = (item) => {
    setCurrent(false);
    preferences.setCurrent(false);

    console.debug(
      'Location Selected.',
      item?.place || item?.line1 || item?.address,
    );

    let isInternal = false;
    dispatch(getSelectedAddress(item, isInternal)).then(() =>
      props.navigation.pop(),
    );
  };

  const onCurrentLocation = () => {
    setCurrent(true);
    preferences.setCurrent(true);

    props.navigation.navigate('GPS', {
      fromCheckout: fromCheckout,
      fromDash: fromDash,
      noGPS: false,
    });
  };

  const onRemoveLocation = (item) => {
    console.debug(
      'Location Remove. ',
      item?.place || item?.line1 || item?.address,
    );
    removeUserAddressService(item.id).then(() => {
      console.debug('Location Removed.');
      dispatch(getUserAddresses()).then(() => {
        dispatch(showAlert(null));
      });
    });
  };

  return {
    fromCheckout,
    fromDash,
    addresses,
    next,
    current,
    setCurrent,
    onUpdateLocation,
    onCurrentLocation,
    loadMoreAddresses,
    onLongPress,
  };
};

// Export
export default SelectLocation;
