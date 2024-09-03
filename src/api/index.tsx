import axios from 'axios';
import {
  apiBaseInterceptorsResponseErr,
  apiBaseConfig,
  apiBaseInterceptorsRequest,
  apiBaseInterceptorsResponseRes,
} from './config';

const apiBaseConfigExtend = {...apiBaseConfig, validateStatus: () => true};

const api = axios.create(apiBaseConfigExtend);

api.interceptors.request.use(apiBaseInterceptorsRequest);

api.interceptors.response.use(
  apiBaseInterceptorsResponseRes,
  apiBaseInterceptorsResponseErr,
);

export default api;
