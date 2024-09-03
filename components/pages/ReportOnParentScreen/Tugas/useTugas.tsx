/* eslint-disable react-hooks/exhaustive-deps */

import {useState, useEffect} from 'react';
import apiWithoutToken from '@api/withoutToken';

const useTugas = (subject, data) => {
  const [tugas, setTugas] = useState([]);
  const fetchTugas = () => {
    apiWithoutToken
      .get(`/lms/v1/student-report/task?subject=${subject?.id}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      })
      .then(response => {
        setTugas(response?.data?.data);
      });
  };

  useEffect(() => {
    fetchTugas();
  }, []);

  return {
    tugas,
  };
};

export default useTugas;
