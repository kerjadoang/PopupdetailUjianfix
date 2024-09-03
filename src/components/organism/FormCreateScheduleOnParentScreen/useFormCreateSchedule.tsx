import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import apiWithoutToken from '@api/withoutToken';
import Config from 'react-native-config';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {__formatDateTime} from './utils';
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
  const route = useRoute();
  const {params} = route;
  const [isSubmit] = useState<boolean>(false);
  const {token, data}: any = params;
  const navigation: any = useNavigation();
  // get state of redux/
  const [modalVisible, setModalVisible] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [type, setType] = useState(null);
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);

  const [form, setForm] = useState<ISetForm>({
    sub_type: '',
    subject_id: {},
    chapter_id: {},
    time_start: null,
    time_finish: null,
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

  const [valueDatePicker, setValueDatePicker] = useState({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
  });

  const generateDate = () => {
    const currentDate: dayjs.Dayjs = dayjs();

    // set startDate dan endDate berdasarkan tanggal sekarang
    const startDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
    const endDate: dayjs.Dayjs = currentDate.add(1, 'month');

    // buat array tanggal
    const dateArray: string[] = [];
    let dateCursor: dayjs.Dayjs = startDate;

    while (dateCursor <= endDate) {
      // dateArray.push(dateCursor.format('dd, D MMM'));
      dateArray.push(dateCursor.format('YYYY-MM-DD'));
      dateCursor = dateCursor.add(1, 'day');
    }
    return dateArray;
  };

  useEffect(() => {
    getSubject();
  }, []);

  useEffect(() => {
    setUpForm(true);
  }, [startDate]);

  useEffect(() => {
    setUpForm(false);
  }, [endDate]);

  const validateTime = (time: number) => {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  };

  const setUpForm = start => {
    if (start) {
      let date = `${generateDate()[startDate.date]} ${validateTime(
        startDate.hour,
      )}:${validateTime(startDate.minute)}:00`;
      setForm({...form, time_start: date});
    } else {
      let date = `${generateDate()[endDate.date]} ${validateTime(
        endDate.hour,
      )}:${validateTime(endDate.minute)}:00`;
      setForm({...form, time_finish: date});
    }
  };

  useEffect(() => {
    getChapter();
  }, [form.subject_id]);

  const getSubject = async () => {
    try {
      const url = `${Config.BASEURL}/master/v1/list-subject`;
      const res = await apiWithoutToken.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.code === 100) {
        return setSubject(res?.data?.data);
      }
    } catch (err) {}
  };

  const getChapter = async () => {
    try {
      const url = `${Config.BASEURL}/master/v1/chapter-by-subject/${form?.subject_id?.id}`;
      const res = await apiWithoutToken.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.code === 100) {
        return setChapter(res?.data?.data);
      }
    } catch (err) {}
  };

  const submit = async () => {
    let object = {
      sub_type: form.sub_type,
      subject_id: form.subject_id.id,
      chapter_id: form.chapter_id.id,
      time_start: __formatDateTime(form.time_start, true),
      time_finish: __formatDateTime(form.time_end, true),
      notes: '',
    };
    let apiRes = null;
    try {
      apiRes = await apiWithoutToken.post(
        `/schedule/v1/student-schedule?user_id=${data?.user_id}`,
        object,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      Alert.alert('Pastikan kembali koneksi internet Anda');
    } finally {
      if (apiRes.data.code === 100) {
        Toast.show({
          type: 'success',
          text1: 'Jadwal Berhasil Dibuat',
        });
        navigation.navigate('ScheduleScreen', {
          filter: 'semua',
          screen: 'DetailAnakScreen',
          loginAs: 'ORANG-TUA',
          token: token,
          data: data,
        });
      }
    }
  };

  const [isShowSwipeUpDatePickerSent, setIsShowSwipeUpDatePickerSent] =
    useState(false);
  const [isShowSwipeUpDatePickerFinished, setIsShowSwipeUpDatePickerFinished] =
    useState(false);

  const __handleSaveDatePicker = (type: 'SENT' | 'FINISHED') => {
    if (type === 'SENT') {
      setForm({...form, time_start: valueDatePicker});
      setIsShowSwipeUpDatePickerSent(false);
    } else if (type === 'FINISHED') {
      setForm({...form, time_end: valueDatePicker});
      setIsShowSwipeUpDatePickerFinished(false);
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
    isSubmit,
    isShowSwipeUpDatePickerSent,
    setIsShowSwipeUpDatePickerSent,
    isShowSwipeUpDatePickerFinished,
    setIsShowSwipeUpDatePickerFinished,
    valueDatePicker,
    setValueDatePicker,
    __handleSaveDatePicker,
  };
};

export default useFormCreateSchedule;
