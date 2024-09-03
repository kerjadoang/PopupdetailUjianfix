/* eslint-disable react-hooks/exhaustive-deps */

import api from '@api/index';
import {useState, useEffect} from 'react';
import apiWithoutToken from '@api/withoutToken';
import {useIsFocused} from '@react-navigation/native';
const useSesiKelas = (data: any) => {
  const [absent, setAbsent] = useState([]);
  const [rating, setRating] = useState([]);
  const [detailAbsent, setDetailAbsent] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState(1);
  const isFocus = useIsFocused();

  const fetchRating = async () => {
    apiWithoutToken
      .get(
        `/lms/v1/student-report/class-session/rating?studentId=${data?.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      )
      .then(response => {
        setRating(response?.data?.data);
      });
  };

  const fetchAbsent = async () => {
    api
      .get(`/lms/v1/student-report/presence?studentId=${data?.user_id}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      })
      .then(response => {
        setAbsent(response?.data?.data);
      });
  };

  const fetchAbsentDetail = async () => {
    api
      .get(
        `/lms/v1/student-report/presence-detail?studentId=${data?.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        },
      )
      .then(response => {
        setDetailAbsent(response?.data?.data);
      });
  };

  useEffect(() => {
    fetchAbsent();
    fetchRating();
    fetchAbsentDetail();
  }, [isFocus]);

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
