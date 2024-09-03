import {useCallback, useEffect, useState} from 'react';
import api from '@api/index';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {getToken} from '@hooks/getToken';
require('dayjs/locale/en');

interface IDateTimePicker {
  date: any;
  hour: any;
  minute: any;
}

interface ISetForm {
  sub_type: string;
  subject_id: object;
  chapter_id: object;
  time_start: string;
  time_finish: string;
  notes: string;
}

const useFormCreateSchedule = () => {
  const navigation: any = useNavigation();
  // get state of redux/
  const [modalVisible, setModalVisible] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [type, setType] = useState(null);
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);

  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getToken();
        setToken(data);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchToken();
  }, []);

  const [form, setForm] = useState<ISetForm>({
    sub_type: '',
    subject_id: {},
    chapter_id: {},
    time_start: '',
    time_finish: '',
    notes: '',
  });
  const [startDate, setStarDate] = useState<IDateTimePicker>({
    date: 0,
    hour: 1,
    minute: 1,
  });
  const [endDate, setEndDate] = useState<IDateTimePicker>({
    date: 0,
    hour: 1,
    minute: 1,
  });
  const generateDate = () => {
    const currentDate: dayjs.Dayjs = dayjs();

    // set startDate dan endDate berdasarkan tanggal sekarang
    const genStartDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
    const genEndDate: dayjs.Dayjs = currentDate.add(1, 'month');

    // buat array tanggal
    const dateArray: string[] = [];
    let dateCursor: dayjs.Dayjs = genStartDate;

    while (dateCursor <= genEndDate) {
      // dateArray.push(dateCursor.format('dd, D MMM'));
      dateArray.push(dateCursor.format('YYYY-MM-DD'));
      dateCursor = dateCursor.add(1, 'day');
    }
    return dateArray;
  };

  const setUpForm = useCallback(
    (start: boolean) => {
      if (start) {
        let date = `${generateDate()[startDate.date]} ${validateTime(
          startDate.hour,
        )}:${validateTime(startDate.minute)}:00`;
        setForm(prev => ({...prev, time_start: date}));
      } else {
        let date = `${generateDate()[endDate.date]} ${validateTime(
          endDate.hour,
        )}:${validateTime(endDate.minute)}:00`;
        setForm(prev => ({...prev, time_finish: date}));
      }
    },
    [
      endDate.date,
      endDate.hour,
      endDate.minute,
      startDate.date,
      startDate.hour,
      startDate.minute,
    ],
  );

  const getChapter = useCallback(async () => {
    let apiRes = null;
    try {
      apiRes = await api.get(
        `/master/v1/chapter-by-subject/${form?.subject_id?.id}`,
      );
    } catch (err) {
      setChapter([]);
    } finally {
      setChapter(apiRes?.data?.data);
    }
  }, [form?.subject_id?.id]);

  const getSubject = useCallback(async () => {
    let apiRes = null;
    try {
      apiRes = await api.get('/master/v1/list-subject');
    } catch (err) {
      setSubject([]);
    } finally {
      setSubject(apiRes?.data?.data);
    }
  }, []);

  useEffect(() => {
    getSubject();
  }, [getSubject]);

  useEffect(() => {
    setUpForm(true);
  }, [startDate, setUpForm]);

  useEffect(() => {
    setUpForm(false);
  }, [endDate, setUpForm]);

  const validateTime = (time: number) => {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  };

  useEffect(() => {
    getChapter();
  }, [form.subject_id, getChapter]);

  const submit = async () => {
    let object = {
      sub_type: form.sub_type,
      subject_id: form.subject_id.id,
      chapter_id: form.chapter_id.id,
      time_start: form.time_start,
      time_finish: form.time_finish,
      notes: '',
    };
    let apiRes = null;
    try {
      apiRes = await api.post('/schedule/v1/student-schedule/', object);
    } catch (err) {
      Alert.alert('Pastikan kembali koneksi internet Anda');
    } finally {
      if (apiRes?.data.code === 100) {
        navigation.navigate('ScheduleScreen', {
          filter: 'semua',
          screen: 'FormCreateSchedule',
          loginAs: 'MURID',
          token: token,
          data: {},
        });
      }
    }
  };

  return {
    modalVisible,
    setModalVisible,
    popUp,
    setPopUp,
    type,
    setType,
    startDate,
    setStarDate,
    endDate,
    setEndDate,
    form,
    setForm,
    subject,
    chapter,
    setChapter,
    generateDate,
    submit,
    navigation,
  };
};

export default useFormCreateSchedule;
