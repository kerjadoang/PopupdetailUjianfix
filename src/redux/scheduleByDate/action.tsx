import {
  SCHEDULE_BY_DATE_REQUEST,
  SCHEDULE_BY_DATE_SUCCESS,
  SCHEDULE_BY_DATE_FAILED,
  SCHEDULE_BY_DATE_DESTROY,
  SCHEDULE_BY_DATE_ACTION_TYPES,
} from './type';

import api from '@api';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import axios from 'axios';
import Config from 'react-native-config';
import jwtDecode from 'jwt-decode';
import {isStringContains} from '@constants/functional';
import dayjs from 'dayjs';

const scheduleByDateRequest = () => {
  return {
    type: SCHEDULE_BY_DATE_REQUEST,
  };
};

const scheduleByDateSuccess = (data: any) => {
  return {
    type: SCHEDULE_BY_DATE_SUCCESS,
    payload: {data},
  };
};

const scheduleByDateFailed = (error: any) => {
  return {
    type: SCHEDULE_BY_DATE_FAILED,
    payload: error,
  };
};

export const scheduleByDateDestroy = () => {
  return {
    type: SCHEDULE_BY_DATE_DESTROY,
  };
};

export const fetchScheduleByDate = (date?: string, token?: string) => {
  return async (
    dispatch: Dispatch<SCHEDULE_BY_DATE_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(scheduleByDateRequest());
    let resSchedule = {
      status: 200,
      data: [],
    };
    try {
      const tokenFromStorage = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(tokenFromStorage || '');
      const user = jwtDecode<IBaseJWTUser>(token || tokenParse);
      const isHavePTNPackage = user.services?.some((item: Service) =>
        isStringContains(item.name || '', 'ptn'),
      );

      resSchedule = await getScheduleApi(date!, token || tokenParse, 'general');

      if (resSchedule?.status !== 200) {
        dispatch(scheduleByDateFailed(resSchedule?.data));
        return;
      }

      if (!isHavePTNPackage) {
        dispatch(scheduleByDateSuccess(resSchedule));
        return;
      }

      const resPtnSchedule = await getScheduleApi(
        date!,
        token || tokenParse,
        'ptn',
      );

      if (resPtnSchedule?.status === 200) {
        const ptnData = resPtnSchedule.data || [];
        (resSchedule.data as any[]).push(...ptnData);
      }

      dispatch(scheduleByDateSuccess(resSchedule));
    } catch (err) {
      // dispatch(scheduleByDateFailed(err));
      dispatch(scheduleByDateSuccess(resSchedule));
    }
  };
};

const getScheduleApi = async (
  date: string,
  token: string,
  type: 'ptn' | 'general',
) => {
  const url =
    type === 'ptn'
      ? `${Config.BASEURL}/schedule/v1/ptn/${dayjs(date).format(
          'YYYY-MM-DD',
        )}?types=live_class`
      : `${Config.BASEURL}/schedule/v1/my-schedule/${dayjs(date).format(
          'YYYY-MM-DD',
        )}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // logApi({
  //   nameFunction: 'apiGet',
  //   res: res,
  //   tags: 'getScheduleApi',
  // });
  const data = res?.data || [];

  // using Promise.all() for fetch API paralel
  const promises =
    data?.data?.map(async (obj: any) => {
      if (obj?.creator?.avatar) {
        const imgRes = await api.get(`/media/v1/image/${obj?.creator?.avatar}`);

        if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
          obj.creator.path_url = imgRes?.data?.data?.path_url;
        }
      }
    }) || [];

  await Promise.all(promises);
  return {status: res?.status, ...data};
};
