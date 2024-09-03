import {
  CHECK_ONE_QUESTION_REQUEST,
  CHECK_ONE_QUESTION_SUCCESS,
  CHECK_ONE_QUESTION_FAILED,
  CHECK_ONE_QUESTION_DESTROY,
  CHECK_ONE_QUESTION_ACTION_TYPES,
} from './type';
import {Keys} from '@constants/keys';
import api from '@api';
import mediaProvider from '../../services/media/provider';

import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_PATH} from '@constants/url';
import {dismissLoading, showLoading} from '@constants/functional';

const checkOneQuestionRequest = () => {
  return {
    type: CHECK_ONE_QUESTION_REQUEST,
  };
};

const checkOneQuestionSuccess = (data: any) => {
  return {
    type: CHECK_ONE_QUESTION_SUCCESS,
    payload: {data},
  };
};

const checkOneQuestionFailed = (error: any) => {
  return {
    type: CHECK_ONE_QUESTION_FAILED,
    payload: error,
  };
};

export const checkOneQuestionDestroy = () => {
  return {
    type: CHECK_ONE_QUESTION_DESTROY,
  };
};

export const fetchCheckOneQuestion = (
  question_package_id: any,
  order: any,
  student_exam_id: any,
) => {
  return async (
    dispatch: Dispatch<CHECK_ONE_QUESTION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(checkOneQuestionRequest());
    try {
      showLoading();
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const res = await api.get(
        `${URL_PATH.get_one_question_package(
          question_package_id,
          order,
          student_exam_id,
        )}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (res?.status === 200) {
        if (res?.data?.data?.question?.file_id) {
          let resImage = await mediaProvider.getImage(
            res?.data?.data?.question?.file_id,
          );
          res.data.data.question.path_url = resImage?.data?.path_url;
        }
        dispatch(checkOneQuestionSuccess(res?.data));
      } else {
        dispatch(checkOneQuestionFailed(res?.data));
      }
    } catch (err) {
      dispatch(checkOneQuestionFailed(err));
    } finally {
      dismissLoading();
    }
  };
};
