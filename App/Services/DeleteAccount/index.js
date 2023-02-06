
import api from '../api';

const deleteAccountService = async id => {
  let route = 'users/';
  route += id + '/';
  try {
    const response = await api
      .delete(route);
    return response;
  } catch (error) {
    return error;
  }
};

export default deleteAccountService;
