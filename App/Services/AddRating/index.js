import api from '../api';

const addRatingService = (url, rating) => {
  return api
    .post(url, {score: rating})
    .then((response) => {
      console.log('Add Rating Response: ', response);
      return response.status;
    })
    .catch((err) => {
      console.error(
        'Error: * User wanted to give rating to a restaurant but failed *',
        'Response: ',
        err.response,
        'Message: ',
        err.message,
        'Error: ',
        err,
      );
    });
};

export default addRatingService;
