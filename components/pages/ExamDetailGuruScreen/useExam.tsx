/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchExamDetail} from '@redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';
import {_handlerConvertAllDate} from '@constants/functional';
import {useRoute} from '@react-navigation/native';
import {URL_PATH} from '@constants/url';
import api from '@api/index';
import {INavigation} from 'type/screen';

const useExam = () => {
  const navigation = useNavigation<INavigation<'ExamDetailGuruScreen'>>();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isCollected, setIsCollected] = useState(true);

  const {exam_id}: any = route.params;
  const [show, setShow] = useState(false);
  const [allStatus, setAllStatus] = useState([]);
  const [endEx, setEndEx] = useState<any>();

  const [toast, setToast] = useState(false);

  const {examDetail}: any = useSelector((state: RootState) => state);
  useEffect(() => {
    dispatch(fetchExamDetail(exam_id));
  }, [isFocused]);

  const formatDate = (start: any, end: any, duration: any) => {
    return `${_handlerConvertAllDate(start, 7, 2, 2)}-${_handlerConvertAllDate(
      end,
      8,
    )} (${duration} Menit)`;
  };
  const detail = examDetail?.data?.data;

  useEffect(() => {
    if (examDetail || detail) {
      const status = detail?.exam_schedule?.student_exam?.map(
        (item: any, _: number) => {
          return item?.status;
        },
      );
      setAllStatus(status);
    }
  }, []);

  const endExam = async () => {
    try {
      const response = await api.get(
        URL_PATH.end_scoring_exam_student(exam_id),
      );
      if (response?.status === 200) {
        setToast(true);
        setEndEx(response?.data);

        setTimeout(() => {
          setToast(false);
          navigation.replace('RiwayatUjianScreen');
        }, 1000);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return {
    exam_id,
    examDetail,
    navigation,
    isCollected,
    setIsCollected,
    show,
    setShow,
    formatDate,
    allStatus,
    endExam,
    toast,
    setToast,
    endEx,
    setEndEx,
  };
};
export {useExam};
