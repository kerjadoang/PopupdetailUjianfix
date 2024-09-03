import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
const useSesiKelas = () => {
  const {getUser} = useSelector((state: RootState) => state);
  const [absent, setAbsent] = useState([]);
  const [rating, setRating] = useState([]);
  const [detailAbsent, setDetailAbsent] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState(1);

  const fetchRating = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      await api
        .get(
          `/lms/v1/student-report/class-session/rating?studentId=${getUser?.data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        )
        .then(response => {
          setRating(response?.data?.data);
        });
    } catch (err) {}
  };

  const fetchAbsent = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = JSON.parse(token || '');
      await api
        .get(`/lms/v1/student-report/presence?studentId=${getUser?.data?.id}`, {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        })
        .then(response => {
          setAbsent(response?.data?.data);
        });
    } catch (err) {}
  };

  const fetchAbsentDetail = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = JSON.parse(token || '');
      await api
        .get(
          `/lms/v1/student-report/presence-detail?studentId=${getUser?.data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        )
        .then(response => {
          setDetailAbsent(response?.data?.data);
        });
      // setAttendance(attendanceResponse?.data?.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchAbsent();
    fetchRating();
  }, []);

  useEffect(() => {
    fetchAbsentDetail();
  }, [absent]);

  return {
    absent,
    detailAbsent,
    show,
    setShow,
    type,
    setType,
    rating,
  };
};

export default useSesiKelas;
