import api from '../api';

const getRefreshTokenService = (payload) => {
  return api.post('token/refresh/', payload).then((response) => {
    return response.data;
  });
};

export default getRefreshTokenService;
