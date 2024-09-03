import {
  GenerateUUID,
  appVersion,
  dismissLoading,
  getTimezoneOffset,
  isStringContains,
} from '@constants/functional';
import {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import dayjs from 'dayjs';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import {axiosTimeout} from './utils';
import {Keys} from '@constants/keys';
import {getToken} from '@hooks/getToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiBaseConfig: CreateAxiosDefaults<any> = {
  // baseURL: 'https://api.kelaspintar.id', // production
  // baseURL: 'https://api.kelaspintar.dev', // production
  baseURL: Config.BASEURL, // config
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
    'Accept-Language': 'id',
    UTC: getTimezoneOffset(),
    Region: dayjs.tz.guess(),
    Platform: Platform.OS,
    Version: appVersion,
  },
  /* other custom settings */
  // validateStatus: () => true,
  timeout: axiosTimeout,
};

const apiBaseInterceptorsRequest = async function (
  config: InternalAxiosRequestConfig<any>,
) {
  // if (!isStringContains(config.url || '', undefined, blackListUrl)) {
  // console.log('cek index wl url ', config.url);
  // showLoading();
  // }

  // if (config.baseURL !== Config.BASEURL && Config.ENV_MODE === 'production') {
  //   config.baseURL = Config.BASEURL;
  // }

  if (!config.headers.Authorization) {
    const token = await getToken();

    if (token) {
      // const tokenParse = JSON.parse(token || '');
      config.headers.Authorization = 'Bearer ' + token;
    }
  }

  // Set header Request-Id with generated UUID
  const requestId = GenerateUUID();
  config.headers['Request-Id'] = requestId;

  // Set header Device-id if url contains key
  if (isStringContains(config.url || '', undefined, ['video'])) {
    const deviceId = await AsyncStorage.getItem(Keys.deviceId);
    config.headers['Device-id'] = deviceId;
  }

  return config;
};

const apiBaseInterceptorsResponseRes = async function (
  response: AxiosResponse<any, any>,
) {
  // dismissLoading();
  return Promise.resolve(response);
};

const apiBaseInterceptorsResponseErr = async function (error: any) {
  dismissLoading();
  // const originalRequest = error.config;
  // if (originalRequest._retry) {
  //   originalRequest._retry = true;
  // }
  // const token = await AsyncStorage.getItem(Keys.token);
  // const tokenParse = JSON.parse(token || '');
  // if (tokenParse === '') {
  //   return;
  // }
  // if (error?.response?.status === 401) {
  //   if (error?.response?.data?.code === 101) {
  //     // kickUser();
  //   }
  // if (error?.response?.data?.code === 102) {
  //   const getURL = `${error?.config?.baseURL}${error?.config?.url}`;
  //   const URLRefreshToken = Config.BASEURL + URL_PATH?.refresh_token;
  //   if (getURL === URLRefreshToken) {
  //     kickUser();
  //   }
  //   const access_token = await validateRefreshToken(client);
  //   axios.defaults.headers.common.Authorization = 'Bearer ' + access_token;
  //   return client(originalRequest);
  // }
  // }
  return Promise.reject(error);
};

export {
  apiBaseConfig,
  apiBaseInterceptorsRequest,
  apiBaseInterceptorsResponseRes,
  apiBaseInterceptorsResponseErr,
};
