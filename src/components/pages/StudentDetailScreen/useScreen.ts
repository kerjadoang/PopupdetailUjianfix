/* eslint-disable react-hooks/exhaustive-deps */
import {fetchStudentDetail, fetchStudentYearlyAttendance} from '@redux';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';

const useScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {id_student}: any = route.params;
  useEffect(() => {
    dispatch(fetchStudentDetail(id_student));
    dispatch(fetchStudentYearlyAttendance(id_student));
  }, []);

  const {studentDetail, studentYearlyAttendance}: any = useSelector(
    (state: RootState) => state,
  );

  return {studentDetail, studentYearlyAttendance, id_student};
};
export {useScreen};
