import axios from 'axios';
import { API_ENDPOINT } from './constants';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

class AxiosService {
  constructor() {
    const instance = axios.create({
      baseURL: API_ENDPOINT,
    });
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body, config);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new AxiosService();
