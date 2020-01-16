import axios from 'axios';
import { API_ENDPOINT } from './constants';

const instance = axios.create({
  baseURL: API_ENDPOINT,
});
// eslint-disable-next-line func-names
instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
