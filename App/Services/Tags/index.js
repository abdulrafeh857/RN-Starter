import api from '../api';

const getTagsService = () => {
  return api
    .get('tags/')
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Get Tags Error: ', err.response || err.message || err);
      return err;
    });
};

export default getTagsService;
