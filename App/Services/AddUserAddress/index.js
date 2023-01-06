import api from '../api';

const addUserAddressService = (payload) => {
  return api.post('useraddresses/', payload).then((response) => {
    return response;
  });
};

export default addUserAddressService;

// USAGE:

// import addUserAddressService from 'Services/AddUserAddress';

// addUserAddressService({
//   country: 'http://209.97.143.113:8000/api/countries/GB/',
//   location: {latitude: '', longitude: ''},
//   title: '',
//   first_name: '',
//   last_name: '',
//   line1: '',
//   line2: '',
//   line3: '',
//   line4: '',
//   state: '',
//   postcode: 'LU33EA',
//   phone_number: '',
//   notes: '',
//   is_default_for_shipping: false,
//   is_default_for_billing: false,
//   num_orders_as_shipping_address: null,
//   num_orders_as_billing_address: null,
//   place: '',
//   place_id: '',
//   user: null,
// })
//   .then((response) => {
//     console.log('🚀 ~ file: index.js ~ line 13 ~ response', response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
