import Geocoder from 'react-native-geocoding';
import {Feedback} from '@Atoms';
import Preferences from 'Config/preferences';
import {GOOGLE_API_KEY} from '../../../keys';

const preferences = new Preferences();

Geocoder.init(GOOGLE_API_KEY);

const getSelectedAddressService = (location, isInternal) => {
  if (isInternal) {
    return Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        let address = json.results[0].address_components;
        let formattedAddress = json.results[0].formatted_address;
        let placeId = json.results[0].place_id;

        const _location = {
          place: formattedAddress,
          postcode: address[address.length - 1].long_name,
          place_id: placeId,
          line1: formattedAddress,
          line2: '',
          state: 'UK',
          location: location,
        };
        return preferences.setSelectedAddress(_location).then(() => {
          return _location;
        });
      })
      .catch(() => {
        Feedback.simple(
          'Something went wrong while getting Location, try again.',
          'OK',
        );
        console.debug('Failed to get user address');
        return null;
      });
  } else {
    return preferences.setSelectedAddress(location).then(() => {
      return location;
    });
  }
};

export default getSelectedAddressService;
