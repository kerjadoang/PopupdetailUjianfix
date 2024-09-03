/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect} from 'react';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';

const useTugas = (subject?: any) => {
  const [tugas, setTugas] = useState([]);
  const fetchTugas = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api
        .get(`/lms/v1/student-report/task?subject=${subject?.id}`, {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        })
        .then(response => {
          setTugas(response?.data?.data);
        });
    } catch (err) {}
  };

  useEffect(() => {
    fetchTugas();
  }, []);

  return {
    tugas,
  };
};

export default useTugas;
