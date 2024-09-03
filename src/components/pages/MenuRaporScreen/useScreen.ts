import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';
import {fetchAcademicYear, fetchAcademicYearOngoing} from '@redux';

const useScreen = () => {
  const dispatch: any = useDispatch();
  const {getClassByDegree, academicYear, getUser, academicYearOngoing} =
    useSelector((state: RootState) => state);
  const navigation = useNavigation();
  const [isHistory, setHistory] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const [year, setYear] = useState({
    id: academicYearOngoing?.data?.data?.id,
    name: academicYearOngoing?.data?.data?.years,
  });

  useEffect(() => {
    if (!academicYearOngoing?.data?.data) {
      return;
    }
    setYear({
      id: academicYearOngoing?.data?.data?.id,
      name: academicYearOngoing?.data?.data?.years,
    });
  }, [academicYearOngoing?.data?.data]);

  useEffect(() => {
    dispatch(fetchAcademicYearOngoing(getUser?.data?.school?.id));
    dispatch(fetchAcademicYear(getUser?.data?.school?.id));
  }, [dispatch, getUser]);
  return {
    getClassByDegree,
    navigation,
    isHistory,
    setHistory,
    swipe,
    setSwipe,
    academicYear,
    year,
    setYear,
  };
};
export {useScreen};
