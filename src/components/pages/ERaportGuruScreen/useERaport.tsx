import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  AcademicYearDestroy,
  AcademicYearOngoingDestroy,
  EraportShareListDestroy,
  storeAcademicYearDestroy,
  storeIssueDateDestroy,
} from '@redux';
import {useDispatch} from 'react-redux';
import {useEraportGuruAssesmentActions} from '../ERaportGuruAssesmentScreen/zustand';
import {usePhaseAction} from './zustand/phase';

const useERaport = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const route = useRoute();
  const {classes_data}: any = route.params;
  const [isLoading, setIsLoading] = useState<boolean>();
  const {resetState: resetPhase} = usePhaseAction();
  const {resetState: resetEraportAssessment} = useEraportGuruAssesmentActions();

  useEffect(() => {
    return () => {
      dispatch(AcademicYearDestroy());
      dispatch(AcademicYearOngoingDestroy());
      dispatch(EraportShareListDestroy());
      dispatch(storeIssueDateDestroy());
      dispatch(storeAcademicYearDestroy());
      resetPhase();
      resetEraportAssessment();
    };
  }, []);

  return {
    classes_data,
    isLoading,
    setIsLoading,
    navigation,
  };
};

export default useERaport;
