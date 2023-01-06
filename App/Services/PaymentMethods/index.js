import api from '../api';

const getCardsService = () => {
  return api
    .get('stripe/cards/')
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      console.log('Get Cards Error: ', err.response || err.message || err),
    );
};

export default getCardsService;
