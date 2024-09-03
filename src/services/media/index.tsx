import {useState} from 'react';
import {IUploadImageResponse, IUploadImageResponseData} from './type';
import provider from './provider';
import mediaProvider from '../media/provider';
import {AxiosResponse} from 'axios';
import {dismissLoading, showLoading} from '@constants/functional';

const useUploadImage = () => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IUploadImageResponse>();

  const uploadImage = async (body: any) => {
    showLoading();
    setError(undefined);
    try {
      let res = await provider.uploadImage(body);
      setData(res.data);
      return res.data;
    } catch (err: any) {
      setError(err);
    } finally {
      dismissLoading();
    }
  };

  return {
    error,
    data,
    mutate: uploadImage,
  };
};

const useUploadFile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IUploadImageResponse>();

  const uploadFile = async (
    body: any,
    setProgressUpload?: any,
    anotherConfig?: any,
  ) => {
    setLoading(true);
    setError(undefined);
    var config = {};
    if (!anotherConfig) {
      config = {
        onUploadProgress: function (progressEvent: any) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 90) / progressEvent.total,
          );
          if (setProgressUpload) {
            setProgressUpload(percentCompleted + '%');
          }
        },
      };
    } else {
      config = anotherConfig;
    }
    try {
      let res: AxiosResponse<IUploadImageResponse> = await provider.uploadFile(
        body,
        config,
      );
      setData(res.data);
      if (setProgressUpload) {
        setProgressUpload('100%');
      }
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    mutate: uploadFile,
  };
};

const useUploadVideo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IUploadImageResponse>();

  const uploadVideo = async (
    body: any,
    setProgressUpload?: any,
    anotherConfig?: any,
  ) => {
    setLoading(true);
    setError(undefined);
    var config = {};
    if (!anotherConfig) {
      config = {
        onUploadProgress: function (progressEvent: any) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 90) / progressEvent.total,
          );
          if (setProgressUpload) {
            setProgressUpload(percentCompleted + '%');
          }
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      config = anotherConfig;
    }
    try {
      let res = await provider.uploadVideo(body, config);
      setData(res.data);
      if (setProgressUpload) {
        setProgressUpload('100%');
      }
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    mutate: uploadVideo,
  };
};

const useGetFile = (ids?: string[] | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IUploadImageResponseData[]>([]);

  const getImage = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const dataResponse: IUploadImageResponseData[] = [...data];
      const promise = ids?.map(async res => {
        const imgRes = await mediaProvider.getImage(res);
        dataResponse.push(imgRes.data);
      });
      await Promise.all(promise ?? []);
      setData(dataResponse);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getImage,
  };
};

export {useUploadImage, useUploadFile, useGetFile, useUploadVideo};
