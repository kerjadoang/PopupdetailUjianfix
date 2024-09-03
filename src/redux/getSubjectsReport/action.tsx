import {
  GET_SUBJECTS_REPORT_ACTION_TYPES,
  GET_SUBJECTS_REPORT_DESTROY,
  GET_SUBJECTS_REPORT_FAILED,
  GET_SUBJECTS_REPORT_REQUEST,
  GET_SUBJECTS_REPORT_SUCCESS,
} from './type';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';

const getSubjectsReportRequest = () => {
  return {
    type: GET_SUBJECTS_REPORT_REQUEST,
  };
};

const getSubjectsReportSuccess = (data: any) => {
  return {
    type: GET_SUBJECTS_REPORT_SUCCESS,
    payload: data,
  };
};

const getSubjectsReportFailed = (error: any) => {
  return {
    type: GET_SUBJECTS_REPORT_FAILED,
    payload: error,
  };
};

export const getSubjectsHistoryDestroy = () => {
  return {
    type: GET_SUBJECTS_REPORT_DESTROY,
  };
};

export const fetchGetSubjectsReport = (subject_id: number): any => {
  return async (
    dispatch: Dispatch<GET_SUBJECTS_REPORT_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(getSubjectsReportRequest());
    // let token  = AsyncStorage.getItem('token');
    try {
      // will be replace if login success implements
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.get(`/soal/v1/history/${subject_id.toString()}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (res?.status === 200) {
        dispatch(getSubjectsReportSuccess(res?.data));
      } else {
        dispatch(getSubjectsReportFailed(res?.data));
      }
    } catch (err) {
      dispatch(getSubjectsReportFailed(err));
    }
  };
};
