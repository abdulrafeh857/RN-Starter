import api from '../api';

const addShippingMethodService = (payload) => {
  return api.post('basket/shipping-methods/', payload).then((response) => {
    return response;
    // return response.data.map((shippingMethod) => {
    //   return ShippingMethodFormatter.addShippingMethod(shippingMethod);
    // });
  });
};

export default addShippingMethodService;

// USAGE:

// import addShippingMethodService from 'Services/AddShippingMethod';

// addShippingMethodService({
//   country: 'http://127.0.0.1:8000/oscarapi/countries/NL/',
//   first_name: 'Henk',
//   last_name: 'Van den Heuvel',
//   line1: 'Roemerlaan 44',
//   line2: '',
//   line3: '',
//   line4: 'Kroekingen',
//   notes: 'Niet STUK MAKEN OK!!!!',
//   phone_number: '+31 26 370 4887',
//   postcode: '7777KK',
//   state: 'Gerendrecht',
//   title: 'Mr',
// })
//   .then((response) => {
//     console.log('🚀 ~ file: index.js ~ line 13 ~ response', response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
