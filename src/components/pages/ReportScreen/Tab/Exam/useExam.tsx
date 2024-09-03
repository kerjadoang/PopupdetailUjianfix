import {useEffect} from 'react';
import {RootState} from 'src/redux/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMapelExamValue} from '@redux';
const useExam = (subject?: any) => {
  const dispatch = useDispatch();
  const {getMapelExamValue} = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchMapelExamValue(subject.id));
  }, [dispatch]);

  return {
    getMapelExamValue,
  };
};

export default useExam;
