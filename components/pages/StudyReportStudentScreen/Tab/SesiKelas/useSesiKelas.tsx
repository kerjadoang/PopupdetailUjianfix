import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const useSesiKelas = (subject?: any, student?: any) => {
  const {getUser}: any = useSelector((state: RootState) => state);
  const [rating, setRating] = useState<any>([]);
  const [absent, setAbsent] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [attendance, setAttendance] = useState<any>([]);
  const [detailAttendance, setDetailAttendance] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState(1);

  //fetching data
  const fetchDataAttendance = async () => {
    setIsLoading(true);
    try {
      const [attendanceResponse, detailAttendanceResponse] = await Promise.all([
        api.get(URL_PATH.get_presensi_class_session(subject?.id, student?.id)),
        api.get(
          URL_PATH.get_presensi_class_session_detail(subject?.id, student?.id),
        ),
      ]);

      if (attendanceResponse.status === 200) {
        setAttendance(attendanceResponse?.data?.data);
      }

      if (detailAttendanceResponse.status === 200) {
        setDetailAttendance(detailAttendanceResponse?.data?.data);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const fetchDataAbsent = async () => {
    setIsLoading(true);
    try {
      const [absentResponse] = await Promise.all([
        api.get(URL_PATH.get_absent_class_session(subject?.id, student?.id)),
      ]);

      if (absentResponse.status === 200) {
        setAbsent(absentResponse?.data?.data);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const fetchRating = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(
        URL_PATH.get_student_report_class_session_rating(
          student?.id ?? getUser?.data?.id,
        ),
      );
      if (res?.status === 200) {
        setRating(res?.data?.data);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetchDataAbsent();
    fetchRating();
    fetchDataAttendance();
  }, []);

  return {
    rating,
    detailAttendance,
    setShow,
    setType,
    show,
    type,
    attendance,
    absent,
    isLoading,
  };
};

export {useSesiKelas};
