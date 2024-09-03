import {TELEGRAM_URL, URL_PATH} from '@constants/url';
import client from './alternate';
import {
  assignValueByDottedString,
  getHeadersFormData,
  getMediaUrl,
  getValueByDottedString,
  abortSignal,
  logApi,
} from './utils';
import {
  ApiDownloadFileProps,
  ApiDownloadFileResProps,
  ApiGetBulkImageProps,
  ApiGetMediaProps,
  ApiGetSingleImageProps,
  ApiProps,
  ApiTelegramSendMessage,
  ApiUploadFormDataProps,
  ApiUploadingStatus,
  IMediaType,
} from './types';
import {blobGet, copyFileToMedia, getMimeType} from './blob';
import apiWithoutToken from './withoutToken';
import {
  AxiosError,
  AxiosInstance,
  AxiosProgressEvent,
  AxiosResponse,
  isAxiosError,
} from 'axios';
import {isText} from '@constants/functional';
import {sendErrorLog, sendLog} from '@services/firebase/firebaseDatabase';

const getAxios: (props: ApiProps) => AxiosInstance = (props: ApiProps) => {
  if (props?.withoutToken) {
    return apiWithoutToken;
  }
  return client;
};

const sendApiLog = (axios: AxiosResponse | AxiosError, props: ApiProps) => {
  const {body, sendLog: log} = props;
  const sendErrorLogProps: IFirebaseDatabaseLog = {
    feature: 'api',
    serviceName: 'general_service',
    type: log?.logType || 'INFO',
  };

  if (log?.logType === 'INFO') {
    return sendLog({
      ...sendErrorLogProps,
      data: body,
      headers: (axios as AxiosResponse).headers,
      url: axios.config?.url,
    });
  }

  sendErrorLog({
    ...sendErrorLogProps,
    logId:
      (axios as AxiosError<IBaseResponseData<any>>).response?.data.log_id || '',
    body: body,
    headers: (axios as AxiosError).config?.headers,
    url: axios.config?.url,
    errorResponse: (axios as AxiosError<any>).response?.data?.toString(),
  });
};

const apiGet: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const resHeaders = props?.resHeaders ?? false;
    const res = await getAxios(props).get(props?.url, {
      ...props.config,
      headers: props?.headers,
      signal: abortSignal(),
    });
    // props.sendLog?.type.some(item => item === 'REQUEST') &&
    //   sendApiLog(res, { ...props, sendLog: { ...props.sendLog, logType: 'INFO' } });
    logApi({
      nameFunction: 'apiGet',
      tags: props?.tags,
      res: res,
    });
    return Promise.resolve(
      fullResponse ? res?.data : resHeaders ? res?.headers : res?.data?.data,
    );
  } catch (e: any) {
    // send api log error to firebase
    props.sendLog?.type.some(item => item === 'ERROR') &&
      sendApiLog(e, {...props, sendLog: {...props.sendLog, logType: 'ERROR'}});
    // callback when network timeout
    if (props.onTimeout && isAxiosError(e)) {
      if (e.code === AxiosError.ERR_CANCELED) {
        props.onTimeout();
      }
    }
    // retry api
    if ((props.retry ?? 0) > 0) {
      return await apiGet({...props, retry: props.retry ? props.retry - 1 : 0});
    }

    logApi({
      nameFunction: 'apiGet',
      tags: props?.tags,
      e: e,
    });
    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return props.fullErrorResponse
      ? Promise.reject(e)
      : Promise.reject(errorData);
  }
};

const apiGetSingleImage = async <
  T = string | IMediaType | IBaseResponseData<IMediaType>,
>(
  props: ApiGetSingleImageProps,
): Promise<T> => {
  try {
    const imgRes = await apiGet<IMediaType | IBaseResponseData<IMediaType>>({
      ...props,
      url: URL_PATH.get_image(props.imageId),
      fullResponse: props.fullData || props.fullResponse,
    });
    logApi({
      nameFunction: 'apiGetSingleImage',
      tags: props.tags,
      res: props.fullResponse ? imgRes : null,
      body: props.fullResponse ? null : imgRes,
    });
    const resData = props.fullData
      ? (imgRes as IBaseResponseData<IMediaType>).data
      : props.fullResponse
      ? (imgRes as IBaseResponseData<IMediaType>)
      : (imgRes as IMediaType).path_url || '';
    return Promise.resolve<T>(resData as T);
  } catch (e: any) {
    logApi({
      nameFunction: 'apiGetSingleImage',
      tags: props.tags,
      e: e,
    });
    return Promise.resolve('' as T);
    // return Promise.reject(e);
  }
};

const apiGetBulkImage: <T = any[]>(
  props: ApiGetBulkImageProps<T>,
) => Promise<T[]> = async <T>(props: ApiGetBulkImageProps<T>): Promise<T[]> => {
  try {
    if (props.datas?.length === 0) {
      return props.datas;
    }

    //04,18
    const promiseImages: Array<Promise<IMediaType>> = [];
    // mapping promise for get images
    for (const data of props.datas) {
      const imageId = getValueByDottedString(props.dottedString, data);
      if (!imageId) {
        continue;
      }
      promiseImages.push(
        apiGetSingleImage({...props, imageId: imageId, fullData: true}),
      );
    }

    const images = await Promise.all(promiseImages);

    // assign result image to current data
    for (const data of props.datas) {
      const imageId = getValueByDottedString(props.dottedString, data);
      let image: IMediaType = {};
      //find image by ID
      for (const _image of images) {
        if (_image.ID == imageId) {
          image = _image;
          break;
        }
      }

      if (props.newParams) {
        data[props.newParams] = image?.path_url;
        continue;
      }

      assignValueByDottedString(data, props.dottedString, image?.path_url);
    }

    // 04.41
    // for (const data of props.datas) {
    //   const imageId = getValueByDottedString(props.dottedString, data);
    //   if (!imageId) {
    //     continue;
    //   }
    //   const imgUrl = await apiGetSingleImage({
    //     ...props,
    //     imageId: imageId,
    //   });

    //   if (props.newParams) {
    //     data[props.newParams] = imgUrl;
    //     continue;
    //   }
    //   assignValueByDottedString(data, props.dottedString, imgUrl);
    // }

    if (props.tags) {
      logApi({
        nameFunction: 'apiGetBulkImage Result',
        tags: props.tags,
        body: props.datas,
      });
    }

    return Promise.resolve(props.datas);
  } catch (e: any) {
    // logApi({
    //   nameFunction: 'apiGetBulkImage',
    //   tags: props.tags,
    //   e: e,
    // });
    // const errorData = isText(e)
    //   ? e
    //   : e?.response?.data?.message || 'Terjadi Kesalahan';
    //     return props.fullErrorResponse ? Promise.reject(e) : Promise.reject(errorData);
    return Promise.resolve(props.datas);
  }
};

const apiPost: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const res = await getAxios(props).post(props?.url, props?.body, {
      ...props.config,
      headers: props?.headers,
      signal: abortSignal(),
    });
    // props.sendLog?.type.some(item => item === 'REQUEST') &&
    //   sendApiLog(res, { ...props, sendLog: { ...props.sendLog, logType: 'INFO' } });
    logApi({
      nameFunction: 'apiPost',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });
    return Promise.resolve(fullResponse ? res?.data : res.data.data);
  } catch (e: any) {
    // send api log error to firebase
    props.sendLog?.type.some(item => item === 'ERROR') &&
      sendApiLog(e, {...props, sendLog: {...props.sendLog, logType: 'ERROR'}});
    // callback when network timeout
    if (props.onTimeout && isAxiosError(e)) {
      if (e.code === AxiosError.ERR_CANCELED) {
        props.onTimeout();
      }
    }
    // retry api
    if ((props.retry ?? 0) > 0) {
      return await apiPost({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    logApi({
      nameFunction: 'apiPost',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });
    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return props.fullErrorResponse
      ? Promise.reject(e)
      : Promise.reject(errorData);
  }
};

const apiPut: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const res = await getAxios(props).put(props?.url, props?.body, {
      ...props.config,
      headers: props?.headers,
      signal: abortSignal(),
    });
    // props.sendLog?.type.some(item => item === 'REQUEST') &&
    //   sendApiLog(res, { ...props, sendLog: { ...props.sendLog, logType: 'INFO' } });
    logApi({
      nameFunction: 'apiPut',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });
    return Promise.resolve(fullResponse ? res?.data : res.data.data);
  } catch (e: any) {
    // send api log error to firebase
    props.sendLog?.type.some(item => item === 'ERROR') &&
      sendApiLog(e, {...props, sendLog: {...props.sendLog, logType: 'ERROR'}});
    // callback when network timeout
    if (props.onTimeout && isAxiosError(e)) {
      if (e.code === AxiosError.ERR_CANCELED) {
        props.onTimeout();
      }
    }
    // retry api
    if ((props.retry ?? 0) > 0) {
      return await apiPut({...props, retry: props.retry ? props.retry - 1 : 0});
    }

    logApi({
      nameFunction: 'apiPut',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });
    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return props.fullErrorResponse
      ? Promise.reject(e)
      : Promise.reject(errorData);
  }
};

const apiDelete: <T = any>(props: ApiProps) => Promise<T> = async (
  props: ApiProps,
) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const res = await getAxios(props).delete(props?.url, {
      data: props?.body,
      headers: props.headers,
      signal: abortSignal(),
    });
    // props.sendLog?.type.some(item => item === 'REQUEST') &&
    //   sendApiLog(res, { ...props, sendLog: { ...props.sendLog, logType: 'INFO' } });
    logApi({
      nameFunction: 'apiDelete',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });
    return Promise.resolve(fullResponse ? res?.data : res.data.data);
  } catch (e: any) {
    // send api log error to firebase
    props.sendLog?.type.some(item => item === 'ERROR') &&
      sendApiLog(e, {...props, sendLog: {...props.sendLog, logType: 'ERROR'}});
    // callback when network timeout
    if (props.onTimeout && isAxiosError(e)) {
      if (e.code === AxiosError.ERR_CANCELED) {
        props.onTimeout();
      }
    }
    // retry api
    if ((props.retry ?? 0) > 0) {
      return await apiDelete({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    logApi({
      nameFunction: 'apiDelete',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });
    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return props.fullErrorResponse
      ? Promise.reject(e)
      : Promise.reject(errorData);
  }
};

const apiGetFile: (
  props: ApiDownloadFileProps,
) => Promise<ApiDownloadFileResProps> = async (props: ApiDownloadFileProps) => {
  try {
    //check if file exists
    // const res = await apiGet({ ...props, fullResponse: true });
    const blobRes = await blobGet(props, props?.url);
    const mimeType = getMimeType(props.fileNameWithExt);
    props.mime = mimeType;
    const resFilePath = await copyFileToMedia(props, blobRes.path());
    logApi({
      nameFunction: 'apiGetFile',
      tags: props?.tags,
      res: resFilePath,
      isDownload: true,
    });
    return Promise.resolve({
      blobResponse: blobRes,
      filePath: resFilePath,
    });
  } catch (e: any) {
    logApi({
      nameFunction: 'apiGetFile',
      tags: props?.tags,
      e: e,
      isDownload: true,
    });
    const errorData = isText(e)
      ? e
      : e?.response?.data?.message || 'Terjadi Kesalahan';
    return props.fullErrorResponse
      ? Promise.reject(e)
      : Promise.reject(errorData);
  }
};

const apiUploadFormData: <T = any>(
  props: ApiUploadFormDataProps,
) => Promise<T> = async (props: ApiUploadFormDataProps) => {
  try {
    const fullResponse = props?.fullResponse ?? false;
    const res = await getAxios(props).post(props?.url, props?.body, {
      headers: getHeadersFormData(),
      signal: abortSignal(),
      onUploadProgress(progressEvent: AxiosProgressEvent) {
        const {loaded, total} = progressEvent;
        let percent = Math.floor((loaded * 100) / (total || 100));
        props.uploadProgress?.(percent);
      },
    });
    // props.sendLog?.type.some(item => item === 'REQUEST') &&
    //   sendApiLog(res, { ...props, sendLog: { ...props.sendLog, logType: 'INFO' } });
    logApi({
      nameFunction: 'apiUploadFormData',
      tags: props?.tags,
      body: props?.body,
      res: res,
    });
    return Promise.resolve(fullResponse ? res?.data : res.data?.data);
  } catch (e: any) {
    // send api log error to firebase
    props.sendLog?.type.some(item => item === 'ERROR') &&
      sendApiLog(e, {...props, sendLog: {...props.sendLog, logType: 'ERROR'}});
    // callback when network timeout
    if (props.onTimeout && isAxiosError(e)) {
      if (e.code === AxiosError.ERR_CANCELED) {
        props.onTimeout();
      }
    }
    logApi({
      nameFunction: 'apiUploadFormData',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });
    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return props.fullErrorResponse
      ? Promise.reject(e)
      : Promise.reject(errorData);
  }
};

const apiUploadingStatus: (
  props: ApiUploadingStatus,
) => Promise<IMediaType> = async (props: ApiUploadingStatus) => {
  try {
    const mediaUrl = getMediaUrl(props.fileId, props.mediaType);

    const resData: IMediaType = await apiGet<IMediaType>({
      ...props,
      url: mediaUrl,
    });

    logApi({
      nameFunction: 'apiUploadingStatus',
      tags: props?.tags,
      body: props?.body,
      res: resData,
    });

    if (props?.customCondition?.(resData) ?? resData?.status === 'process') {
      if (props.progress != 100) {
        const currentProgress = props?.progress || 0;
        props?.callbackProgress?.(currentProgress + 1);
        props.progress = currentProgress + 1;
        return await apiUploadingStatus({
          ...props,
          retry: props.retry ? props.retry - 1 : 3,
        });
      }
      return Promise.resolve(resData);
    }

    props?.callbackProgress?.(100);
    return Promise.resolve(resData);
  } catch (e: any) {
    if ((props.retry ?? 0) > 0) {
      return await apiUploadingStatus({
        ...props,
        retry: props.retry ? props.retry - 1 : 0,
      });
    }

    logApi({
      nameFunction: 'apiUploadingStatus',
      tags: props?.tags,
      body: props?.body,
      e: e,
    });
    const errorData = e?.response?.data?.message || 'Terjadi Kesalahan';
    return props.fullErrorResponse
      ? Promise.reject(e)
      : Promise.reject(errorData);
  }
};

const apiGetMedia = async <T = string | IMediaType>(
  props: ApiGetMediaProps,
): Promise<T> => {
  try {
    let imgRes = await apiGet({
      ...props,
      url: URL_PATH.get_image(props.imageId),
    });

    if (props.fullDataResponse) {
      imgRes = imgRes.data;
    }

    logApi({
      nameFunction: 'apiGetMedia',
      tags: props.tags,
      res: props.fullResponse ? imgRes : null,
      body: props.fullResponse ? null : imgRes,
    });
    return Promise.resolve<T>(
      props.fullResponse ? (imgRes as T) : (imgRes?.path_url as T) || ('' as T),
    );
  } catch (e: any) {
    logApi({
      nameFunction: 'apiGetMedia',
      tags: props.tags,
      e: e,
    });
    // return Promise.resolve('' as T);
    return Promise.reject(e);
  }
};

const apiTelegramSendMessage = (props: ApiTelegramSendMessage) => {
  const telegramPathUrl = URL_PATH.telegram_send_message(props.botId, {
    chatId: props.chatId,
    text: props.text,
  });
  apiPost({
    url: telegramPathUrl,
    config: {baseURL: TELEGRAM_URL, ...props.config},
    ...props,
  });
};

export {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiGetSingleImage,
  apiGetBulkImage,
  apiGetFile,
  apiUploadFormData,
  apiUploadingStatus,
  apiGetMedia,
  apiTelegramSendMessage,
};
