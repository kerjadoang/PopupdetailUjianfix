import axios from 'axios';
import {
  apiBaseConfig,
  apiBaseInterceptorsRequest,
  apiBaseInterceptorsResponseErr,
  apiBaseInterceptorsResponseRes,
} from './config';

const apiBaseConfigExtend = {...apiBaseConfig};

const client = axios.create(apiBaseConfigExtend);

client.interceptors.request.use(apiBaseInterceptorsRequest);

client.interceptors.response.use(
  apiBaseInterceptorsResponseRes,
  apiBaseInterceptorsResponseErr,
);

export default client;
