import {
  DIAGNOTIC_RESULT_PROFESSION_ACTION_TYPES,
  DIAGNOTIC_RESULT_PROFESSION_DESTROY,
  DIAGNOTIC_RESULT_MAJORS_ACTION_TYPES,
  DIAGNOTIC_RESULT_MAJORS_DESTROY,
  DIAGNOTIC_RESULT_MAJORS_SUCCESS,
  DIAGNOTIC_RESULT_PROFESSION,
  DIAGNOTIC_RESULT_MAJORS,
  DIAGNOTIC_RESULT_PROFESSION_SUCCESS,
} from './type';

import {Dispatch} from 'redux';

const diagnoticResult = () => {
  return {
    type: DIAGNOTIC_RESULT_PROFESSION,
  };
};

export const diagnoticResultDestroy = () => {
  return {
    type: DIAGNOTIC_RESULT_PROFESSION_DESTROY,
  };
};

const diagnoticResultSuccess = (data: any) => {
  return {
    type: DIAGNOTIC_RESULT_PROFESSION_SUCCESS,
    payload: data,
  };
};

export const setDiagnoticProfession = (payload: any): any => {
  return async (
    dispatch: Dispatch<DIAGNOTIC_RESULT_PROFESSION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(diagnoticResultSuccess(payload));
  };
};
export const getDiagnoticProfession = (): any => {
  return async (
    dispatch: Dispatch<DIAGNOTIC_RESULT_PROFESSION_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(diagnoticResult());
  };
};

const diagnoticResultMajorsSuccess = (data: any) => {
  return {
    type: DIAGNOTIC_RESULT_MAJORS_SUCCESS,
    payload: data,
  };
};

export const diagnoticResultMajorsDestroy = () => {
  return {
    type: DIAGNOTIC_RESULT_MAJORS_DESTROY,
  };
};

const diagnoticResultMajors = () => {
  return {
    type: DIAGNOTIC_RESULT_MAJORS,
  };
};

export const setDiagnoticMajors = (payload?: any): any => {
  return async (
    dispatch: Dispatch<DIAGNOTIC_RESULT_MAJORS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(diagnoticResultMajorsSuccess(payload));
  };
};

export const getDiagnoticMajors = (): any => {
  return async (
    dispatch: Dispatch<DIAGNOTIC_RESULT_MAJORS_ACTION_TYPES>,
  ): Promise<void> => {
    dispatch(diagnoticResultMajors());
  };
};
