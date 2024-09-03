import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import dayjs from 'dayjs';

const useFormReportAbsenTeacher = (id, type) => {
  const [data, setData] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [value, setValue] = useState(null);
  const [count, setCount] = useState('Diterima');

  const currentDate = dayjs();

  const defaultSelected = {
    date: currentDate.format('M'),
    years: currentDate.year() - 2020,
  };

  const getCurrentYearAndMonth = () => {
    const currentDate = dayjs();
    const currentYear = currentDate.format('YYYY');
    const currentMonth = currentDate.format('MM');
    const formattedDate = `${currentYear}-${currentMonth}`;

    return formattedDate;
  };

  const currentYearAndMonth = getCurrentYearAndMonth();
  const getMonthAndYearName = yearAndMonth => {
    const formattedDate = dayjs(yearAndMonth).locale('id').format('MMMM YYYY');
    return formattedDate;
  };
  const monthAndYearName = getMonthAndYearName(
    newDate ? newDate : currentYearAndMonth,
  );
  const formatToYYYYMM = (month, years) => {
    const formattedMonth = month?.toString().padStart(2, '0');
    const formattedValue = `${years}-${formattedMonth}`;
    return formattedValue;
  };
  const formattedValue = formatToYYYYMM(
    value?.date || currentDate.format('MM'),
    value?.years || currentDate.format('YYYY'),
  );
  const getAllData = async (id, date, newDate, count) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      let body;
      if (type === 'attendance') {
        body = {
          user_id: id,
          date: newDate ? newDate : date,
        };
      } else if (type === 'absent') {
        body = {
          user_id: id,
          approval_status: count,
        };
      }
      const response = await api.post(
        '/lms/v1/attendance/teacher-' + type + '-report',
        body,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getAllData(id, currentYearAndMonth, newDate, count);
  }, [id, currentYearAndMonth, newDate, count]);

  return {
    data,
    currentYearAndMonth,
    newDate,
    setNewDate,
    value,
    setValue,
    monthAndYearName,
    formattedValue,
    count,
    setCount,
    defaultSelected,
  };
};

export default useFormReportAbsenTeacher;
