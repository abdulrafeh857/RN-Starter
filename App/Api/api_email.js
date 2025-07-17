import axios, { AxiosRequestConfig } from 'axios';
import Async from '@Async';
import Config from 'react-native-config';
const api = axios.create();

api.defaults.baseURL = Config.email_URL;
api.interceptors.request.use(
  async config => {
    let token = await Async.getItem(Async.Item.Token);

    let hasToken = token && token.token && token.expiry;
    if (hasToken && config && config.headers) {
      config.headers.Authorization = 'token ' + token.token;
      config.headers.uid = token?.tenant_uid?.replaceAll('-', '');
    } else if (config && config.headers && token != null) {
      config.headers.uid = token?.tenant_uid?.replaceAll('-', '');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
