import {useEffect, useState} from 'react';
import {
  IAnswerPerTryoutQuestion,
  IStartTryoutPerSubjectPayload,
  IStartTryoutPersubjectResponse,
  ISubmitTryoutPayload,
  ITryoutQuestionResponse,
} from './type';
import provider from './provider';
import mediaProvider from '../media/provider';
import {AxiosResponse} from 'axios';
import {dismissLoading, showLoading} from '@constants/functional';

const useStartTryoutPerSubject = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IStartTryoutPersubjectResponse>();
  const [answerData, setAnswerData] =
    useState<IStartTryoutPersubjectResponse>();

  const hitData = async (bodyPayload: IStartTryoutPerSubjectPayload) => {
    setLoading(true);
    setError(undefined);
    try {
      const res: AxiosResponse<IStartTryoutPersubjectResponse> =
        await provider.startTryOutPerSubject(bodyPayload);
      if (bodyPayload.condition === 'start' && !data) {
        setData(res.data);
        return Promise.resolve(res.data);
      }

      if (bodyPayload.condition === 'paused') {
        return Promise.resolve(res.data);
      }

      setAnswerData(res.data);
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
    answerData,
    mutate: hitData,
  };
};

const useGetTryoutQuestion = (
  tryOutHistoryId: any,
  subjectId: any,
  order: any,
) => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ITryoutQuestionResponse>();

  const getData = async () => {
    setError(undefined);
    try {
      showLoading();
      const res: AxiosResponse<ITryoutQuestionResponse> =
        await provider.tryoutPerQuestion(tryOutHistoryId, subjectId, order);
      if (res.data.data?.question?.file_id) {
        const imgRes = await mediaProvider.getImage(
          res.data.data.question?.file_id,
        );
        res.data.data.question.path_url = imgRes?.data?.path_url;
      }
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      return Promise.reject(err);
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (tryOutHistoryId && subjectId && order) {
      // getData();
    }
  }, [order]);

  return {
    error,
    data,
    refetch: getData,
  };
};

const useAnswerPerTryoutQuestion = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const hitData = async (bodyPayload: IAnswerPerTryoutQuestion) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.answerPerTryoutQuestion(bodyPayload);
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
    mutate: hitData,
  };
};

const useGetTryOutSubjectProgress = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const getData = async (id: any) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.getListSubjectProgress(id);
      return Promise.resolve(res?.data?.data);
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
    mutate: getData,
  };
};

const useSubmitTryoutQuestion = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const hitData = async (bodyPayload: ISubmitTryoutPayload) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.submitTryout(bodyPayload);
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
    mutate: hitData,
  };
};

export {
  useStartTryoutPerSubject,
  useGetTryoutQuestion,
  useAnswerPerTryoutQuestion,
  useSubmitTryoutQuestion,
  useGetTryOutSubjectProgress,
};
