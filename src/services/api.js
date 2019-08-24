import axios from 'axios';
import {getToken, isAuth} from './auth';

const api = axios.create({
  baseURL: 'http://10.0.3.2:3333',
});

api.interceptors.request.use(async config => {
  if (isAuth()) {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
