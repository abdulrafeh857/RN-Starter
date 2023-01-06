import api from '../api';

const getBannersService = () => {
  return api
    .get('banners/')
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Get Banners Error: ', err.response || err.message || err);
      return err;
    });
};

export default getBannersService;
