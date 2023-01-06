import api from '../api';
import VendorsFormatter from '../../Utils/Formatter/Vendors';
import Preferences from 'Config/preferences';

const preferences = new Preferences();

const getVendorsService = () => {
  return preferences.getSelectedAddress().then((address) => {
    if (address) {
      const location = address.location;
      return api
        .get(
          'partners/?lat=' + location.latitude + '&lng=' + location.longitude,
        )
        .then((response) => {
          return VendorsFormatter.getVendors(response.data);
        })
        .catch((error) => {
          console.error('Error getting vendors', error.response);
        });
    }
  });
};

const loadMore = (url) => {
  return preferences.getSelectedAddress().then((address) => {
    if (address) {
      const location = address.location;
      return api
        .get(url + '&lat=' + location.latitude + '&lng=' + location.longitude)
        .then((response) => {
          return VendorsFormatter.getVendors(response.data);
        });
    }
  });
};

export {loadMore};

export default getVendorsService;
