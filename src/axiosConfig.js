import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://manhhoang-api.herokuapp.com',
});

export default instance;
