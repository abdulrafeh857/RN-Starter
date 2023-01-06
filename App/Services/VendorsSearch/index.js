import api from '../api';
import VendorsFormatter from '../../Utils/Formatter/Vendors';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

const getVendorsSearchService = (search) => {
  return preferences.getSelectedAddress().then((address) => {
    if (address) {
      const location = address.location;
      return api
        .get(
          'partners/?lat=' +
            location.latitude +
            '&lng=' +
            location.longitude +
            '&search=' +
            search,
        )
        .then((response) => {
          return VendorsFormatter.getVendors(response.data);
        })
        .catch((error) => {
          console.error('Error getting Search vendors', error.response);
        });
    }
  });
};

export default getVendorsSearchService;
