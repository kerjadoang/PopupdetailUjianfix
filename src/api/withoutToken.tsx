import axios from 'axios';
import {
  apiBaseConfig,
  apiBaseInterceptorsResponseErr,
  apiBaseInterceptorsResponseRes,
} from './config';

const apiBaseConfigExtend = {...apiBaseConfig, validateStatus: () => true};

const apiWithoutToken = axios.create(apiBaseConfigExtend);

apiWithoutToken.interceptors.response.use(
  apiBaseInterceptorsResponseRes,
  apiBaseInterceptorsResponseErr,
);

export default apiWithoutToken;
