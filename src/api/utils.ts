/* eslint-disable no-console */
import {ApiLog, ApiMediaType, GenerateCurlProps} from './types';
import {getToken} from '@hooks/getToken';
import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {URL_PATH} from '@constants/url';
// HOW TO USE getValueByDottedString
// const nestedObject = {
//   ID: 1,
//   created_by: 1,
//   user: {
//     id: 1,
//     username: 'cahyo@gmail.com',
//     email: 'cahyo@gmail.com',
//     gender: 'L',
//     user_type: {
//       id: 1,
//       name: 'Murid',
//       icon_mobile: '64202140b1a4fd6bb6741cb6',
//       description: 'Belajar dengan metode Pintar',
//     },
//   },
//   guru: "Gilang",
// };
// *** SINGLE OBJECT ***
// console.log(
//   getObjectData("guru", nestedObject),
// );
// result : Gilang
// *** NESTED OBJECT ***
// console.log(
// getValueByDottedString("user.user_type.name", nestedObject),
// );
// result : 64202140b1a4fd6bb6741cb6
const getValueByDottedString = (dottedString: string, obj: any) => {
  if (dottedString.indexOf('.') === -1) {
    return obj[dottedString];
  }
  const dottedArray = dottedString.split('.');
  dottedArray.forEach(key => {
    obj = obj[key];
  });
  return obj;
};

const assignValueByDottedString = (
  obj: any,
  dottedString: string,
  value: any,
): void => {
  const keys = dottedString.split('.');
  let currentObj = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!currentObj.hasOwnProperty(key)) {
      currentObj[key] = {};
    }

    currentObj = currentObj[key];
  }

  const lastKey = keys[keys.length - 1];
  currentObj[lastKey] = value;
};

const logApi = (props: ApiLog) => {
  try {
    if (!props.tags) {
      return;
    }

    if (props.e && props.e.constructor.name.toLowerCase() !== 'axioserror') {
      console.log('************** API LOG **************');
      console.log(
        `${props.nameFunction} `,
        props.tags,
        ' error : ',
        JSON.stringify(props.e),
      );
      console.log('************** API LOG **************');
      return;
    }

    if (props.isDownload) {
      console.log('************** API LOG **************');
      console.log(
        `${props.nameFunction}`,
        props.tags,
        'fileDownloaded on :',
        JSON.stringify(props.res),
      );
      console.log('************** API LOG **************');
      return;
    }

    let url = '';
    let statusCode: any = 0;
    let body = JSON.stringify(props.body || '');
    let data = '';
    let isError = props.e ? 'error' : '';

    if (isError) {
      url = props.e?.request?._url || '';
      statusCode = props.e?.response?.status;
      body = props.e?.config?.data || '';
      data = JSON.stringify(props.e?.response?.data) || '';
    } else {
      url = props.res?.request?._url;
      statusCode = props.res?.status;
      data =
        JSON.stringify(props.res?.data?.data) ||
        JSON.stringify(props.res?.data);
    }

    console.log('************** API LOG **************');
    generateCurl({
      res: props.res || props.e,
      nameFunction: props.nameFunction,
      tags: props.tags,
      url,
      isError,
    });

    console.log(
      `${props.nameFunction}`,
      props.tags,
      isError,
      'statusCode :',
      statusCode,
      '\n',
    );

    console.log(
      `${props.nameFunction}`,
      props.tags,
      isError,
      'url :',
      url,
      '\n',
    );
    console.log(
      `${props.nameFunction}`,
      props.tags,
      isError,
      'body :',
      body,
      '\n',
    );

    console.log(
      `${props.nameFunction}`,
      props.tags,
      isError,
      'data :',
      data,
      '\n',
    );
    console.log('************** API LOG **************');
  } catch (error) {
    if (!props.tags) {
      return;
    }
    console.log('ERROR LOG API : ', error);
  }
};

const generateCurl = (props: GenerateCurlProps) => {
  try {
    if (!props.tags) {
      return;
    }

    if (!props.res?.config) {
      console.log(
        'Cant generate curl because props `res` is not an AxiosResponse',
      );
      return;
    }

    const {params, headers, data, method} = props.res?.config;
    let curlCommand = `curl --location "${props.url}"`;

    // Add request method
    curlCommand += ` --request ${method?.toUpperCase?.()}`;

    // Add headers
    for (const [key, value] of Object.entries(headers)) {
      curlCommand += ` --header "${key}: ${value}"`;
    }

    // Add query parameters
    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      curlCommand += ` --data-urlencode "${queryParams}"`;
    }

    // Add request body
    if (data) {
      const requestBody = data;
      curlCommand += ` --data '${requestBody}'`;
    }

    console.log(
      props.nameFunction,
      props.tags,
      props.isError,
      'curl :',
      curlCommand,
    );
  } catch (error) {
    if (!props.tags) {
      return;
    }
    console.log('ERROR GENERATE CURL : ', error);
  }
};

const getHeaders = async (customToken?: string) => {
  const token = customToken || (await getToken()) || '';
  return {
    Authorization: 'Bearer ' + token,
  };
};

const getHeadersFormData = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
};

const getRootPath = () => {
  if (Platform.OS === 'ios') {
    return ReactNativeBlobUtil.fs.dirs.DocumentDir;
  }
  return ReactNativeBlobUtil.fs.dirs.DownloadDir;
};

const getMediaUrl = (mediaId: string, mediaType: ApiMediaType) => {
  if (mediaType === 'file') {
    return URL_PATH.get_file(mediaId);
  }

  return URL_PATH.get_image(mediaId);
};

const axiosTimeout = 30000;
// const axiosTimeout = Config.ENV_MODE === 'production' ? 10000 : 50000;

const blackListUrl = [
  'coachmark',
  'image/',
  'file/',
  'newchat/',
  'call/request',
  'class_session/chat',
];

const abortSignal = (timeoutMs = axiosTimeout) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
};

export {
  assignValueByDottedString,
  getValueByDottedString,
  logApi,
  generateCurl,
  getHeaders,
  getRootPath,
  getHeadersFormData,
  getMediaUrl,
  axiosTimeout,
  blackListUrl,
  abortSignal,
};
