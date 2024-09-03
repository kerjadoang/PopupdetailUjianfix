import {fetchExam} from '@redux';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const useExam = (subject?: any, student?: any) => {
  const {exam, getUser}: any = useSelector((state: RootState) => state);
  const isLoading = exam?.loading;
  const examData = exam?.data?.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExam(subject?.id, student?.id ?? getUser?.data?.id));
  }, []);

  return {
    examData,
    isLoading,
  };
};

export {useExam};
