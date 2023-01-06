import axios from 'axios';
import Preferences from '../Config/preferences';

const _axios = axios.create();
const axiosApiInstance = axios.create();
const production = process.env.NODE_ENV === 'production';

const preferences = new Preferences();

production
  ? (axiosApiInstance.defaults.baseURL = 'https://api.droponline.co.uk/api/')
  : // : (axiosApiInstance.defaults.baseURL = 'http://10.104.45.77:8000/api/');
    (axiosApiInstance.defaults.baseURL = 'https://api.droponline.co.uk/api/');

async function refreshJWTToken(refreshToken, axios) {
  try {
    const {data, status} = await axios.post(
      production
        ? 'https://api.droponline.co.uk/api/token/refresh/'
        : // : 'http://10.104.45.77:8000/api/',
          'https://api.droponline.co.uk/api/token/refresh/',
      {
        refresh: refreshToken,
      },
    );
    if (status === 200) {
      return data.access;
    }
  } catch (err) {
    console.log(err);
  }
}

axiosApiInstance.interceptors.request.use(
  async (config) => {
    let user = await preferences.getToken();

    let userExists =
      user &&
      user.refresh &&
      user.createdAt &&
      user.access &&
      user.refresh.length > 0 &&
      user.access.length > 0;

    if (userExists) {
      config.headers.Authorization = 'Bearer ' + user.access;
      const now = new Date();
      const elapsed = (now - new Date(user.createdAt)) / 1000 / 60;
      if (elapsed > 4) {
        console.log('Token expired, refreshing...');
        let access = await refreshJWTToken(user.refresh, _axios);
        config.headers.Authorization = 'Bearer ' + access;
        user.access = access;
        user.createdAt = new Date();
        await preferences.setToken(user);
      }
    } else {
      config.withCredentials = true;
      config.xsrfCookieName = 'csrftoken';
      config.xsrfHeaderName = 'X-CSRFToken';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosApiInstance;
