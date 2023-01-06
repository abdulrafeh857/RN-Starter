import api from '../api';

const reOrderService = (payload) => {
  return api
    .post('reorder/', payload)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('ReOrder Error: ', err.message, err.response);
    });
};

export default reOrderService;
