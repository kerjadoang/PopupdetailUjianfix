import {useEffect, useState} from 'react';
import {ILatestSearchResponse, IPopularSearchResponse} from './type';
import provider from './provider';
import mediaProvider from '../media/provider';
import {AxiosResponse} from 'axios';
import {apiPost} from '@api/wrapping';

const useGetPopularSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IPopularSearchResponse>();

  const getData = async (params?: IBasePaginationFilter) => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IPopularSearchResponse> =
        await provider.getPopularSearch(params);

      const promises = res?.data?.data?.map(async obj => {
        if (obj?.subject?.icon_mobile) {
          const imgRes = await mediaProvider.getImage(obj.subject.icon_mobile);
          obj.subject.path_url = imgRes?.data?.path_url;
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

const useGetLatestSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ILatestSearchResponse>();

  const getData = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<ILatestSearchResponse> =
        await provider.getLatestSearch();
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

const useAllDeleteLatestSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await provider.deleteAllLatestSearch();
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
    mutate: setData,
  };
};

const useDeleteLatestSearchItem = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (latestSearchId: any) => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await provider.deleteLatestSearchItem(latestSearchId);
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
    mutate: setData,
  };
};

const useVotePopularSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (words: any, subject_id: any) => {
    setLoading(true);
    setError(undefined);

    const url = '/search/v1/global/vote-search';
    const bodyPayload = {
      words: words,
      subject_id: subject_id,
    };

    try {
      const res = await apiPost({url: url, body: bodyPayload});
      return Promise.resolve(res);
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
    mutate: setData,
  };
};

export {
  useGetPopularSearch,
  useGetLatestSearch,
  useAllDeleteLatestSearch,
  useDeleteLatestSearchItem,
  useVotePopularSearch,
};
