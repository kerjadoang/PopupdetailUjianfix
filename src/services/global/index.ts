/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {
  IAllCurriculumResponse,
  IAllRombelClassResponse,
  IAllServicesResponse,
  IListChapterBySubjectResponse,
  IQuestionLevelResponse,
  IQuestionTypeResponse,
} from './type';
import {AxiosResponse} from 'axios';
import provider from './provider';
import mediaProvider from '../media/provider';
import NetInfo from '@react-native-community/netinfo';

const useGetQuestionType = () => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IQuestionTypeResponse>();

  const getData = async () => {
    setError(undefined);
    setLoading(true);
    try {
      const res: AxiosResponse<IQuestionTypeResponse> =
        await provider.getQuestionType();
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (e) {
      setError(e);
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    error,
    data,
    loading,
    refetch: getData,
  };
};

const useGetQuestionLevel = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IQuestionLevelResponse>();

  const getData = async () => {
    setError(undefined);
    setLoading(true);
    try {
      const res: AxiosResponse<IQuestionLevelResponse> =
        await provider.getQuestionLevel();
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (e: any) {
      setError(e);
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    error,
    data,
    loading,
    refetch: getData,
  };
};

const useGetAllCurriculum = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IAllCurriculumResponse>();

  const getData = async (): Promise<IAllCurriculumResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IAllCurriculumResponse> =
        await provider.getAllCurriculumTeacher();

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetAllRombelClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IAllRombelClassResponse>();

  const getData = async (): Promise<IAllRombelClassResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IAllRombelClassResponse> =
        await provider.getAllRombel();

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetChapterListBySubject = (subjectId: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListChapterBySubjectResponse>();

  const getData = async (): Promise<IListChapterBySubjectResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IListChapterBySubjectResponse> =
        await provider.getChapterListBySubject(subjectId);

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) {
      getData();
    }
  }, [subjectId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetAllService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IAllServicesResponse>();

  const getData = async (): Promise<IAllServicesResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IAllServicesResponse> =
        await provider.getAllServices();

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetSubjectByClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IBaseResponseData<IBaseSubject[]>>();

  const getData = async (
    id: any,
    params?: IBasePaginationFilter,
  ): Promise<IBaseResponseData<IBaseSubject[]>> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IBaseResponseData<IBaseSubject[]>> =
        await provider.getSubjectByClass(id, params);

      const promises = res?.data?.data?.map(async obj => {
        if (obj?.icon_mobile) {
          const imgRes = await mediaProvider.getImage(obj.icon_mobile);
          obj.path_url = imgRes?.data?.path_url;
        }
      });

      if (promises) {
        await Promise.all(promises);
      }

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useCheckConnectivity = () => {
  const [isConnected, setIsConnected] = useState<any>(false);
  const [connectionType, setConnectionType] = useState<any>(false);

  const getConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state?.isConnected);
      setConnectionType(state?.type);
    });
  };

  useEffect(() => {
    getConnection();
  }, []);

  return {
    isConnected,
    refetch: getConnection,
    connectionType,
  };
};

export {
  useGetQuestionType,
  useGetQuestionLevel,
  useGetAllCurriculum,
  useGetAllRombelClass,
  useGetChapterListBySubject,
  useGetAllService,
  useGetSubjectByClass,
  useCheckConnectivity,
};
