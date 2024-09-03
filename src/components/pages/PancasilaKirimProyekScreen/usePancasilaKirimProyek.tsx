import {
  _handlerConvertDatePicker,
  convertDate,
  showErrorToast,
  showSuccessToast,
  useMergeState,
} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {apiPost, apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {useSelector} from 'react-redux';
import {
  handleDisabled,
  parseDateValue,
  useGetDetailProyek,
  useGetListKelas,
  useGetListRombel,
} from './utils';
import {ParamList} from 'type/screen';

interface RootState {
  curriculum: any;
  getMaterialTypes: any;
  getClassByDegree: any;
  getUser: any;
}

interface IDatePicker {
  day: any;
  date: any;
  month: any;
  year: any;
  hour: any;
  minute: any;
}

const usePancasilaKirimProyek = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'PancasilaKirimProyekScreen'>
    >();
  const route = useRoute();
  const {role, project_id, type, data: dataProyek}: any = route?.params;
  const [description, setDescription] = useState<string>();
  const {getUser} = useSelector((state: RootState) => state);
  const degree_id = getUser?.data?.school?.degree_id;
  const isTypeKirim = type === 'kirim';
  const [state, setState] = useMergeState({
    isShowConfirmPopup: false,
  });
  const {listKelas, getListKelas} = useGetListKelas(setState);
  const {listRombel, getListRombel} = useGetListRombel(setState);
  const {detailProyek, getDetailProyek} = useGetDetailProyek(setState);

  //sett dropdown value
  const [isShowTema, setIsShowTema] = useState<boolean>(false);
  const [tema, setTema] = useState<any>({
    title: 'Tema',
    initValue: 'Tema Projek',
    value: 'Tema Projek',
    error: false,
    onPress: () => {
      setIsShowTema(true);
    },
  });
  //materi
  const [isShowMateri, setIsShowMateri] = useState<boolean>(false);
  const [materi, setMateri] = useState<any>({
    title: 'Materi',
    initValue: 'Materi Projek',
    value: 'Materi Projek',
    error: false,
    onPress: () => {
      setIsShowMateri(true);
    },
  });
  //kelas
  const [isShowKelas, setIsShowKelas] = useState<boolean>(false);
  const [kelas, setKelas] = useState<any>({
    title: 'Kelas',
    initValue: 'Pilih Kelas',
    value: 'Pilih Kelas',
    error: false,
    onPress: () => {
      setIsShowKelas(true);
    },
  });
  //rombel
  const [isShowRombel, setIsShowRombel] = useState<boolean>(false);
  const [rombel, setRombel] = useState<any>({
    title: 'Rombel',
    initValue: 'Pilih Rombel',
    value: 'Pilih Rombel',
    error: false,
    onPress: () => {
      setIsShowRombel(true);
    },
  });
  //dateend
  const [isShowDateEnd, setIsShowDateEnd] = useState(false);
  const [valueDateEnd, setValueDateEnd] = useState<IDatePicker>({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
  });
  const [dateEnd, setDateEnd] = useState<any>({
    title: 'Tanggal & Jam Berakhir',
    initValue: 'Pilih Tanggal & Jam Berakhir',
    value: 'Pilih Tanggal & Jam Berakhir',
    error: false,
    onPress: () => {
      setIsShowDateEnd(true);
    },
  });
  //datestart
  const [isShowDateStart, setIsShowDateStart] = useState(false);
  const [valueDateStart, setValueDateStart] = useState<IDatePicker>({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
  });
  const [dateStart, setDateStart] = useState<any>({
    title: 'Tanggal & Jam Mulai',
    initValue: 'Pilih Tanggal & Jam Mulai',
    value: 'Pilih Tanggal & Jam Mulai',
    error: false,
    onPress: () => {
      setIsShowDateStart(true);
    },
  });
  //end set data
  const [dataType, setDataType] = useState([
    tema,
    materi,
    kelas,
    rombel,
    dateStart,
  ]);

  //useffect
  //get init data
  useEffect(() => {
    getDetailProyek(project_id);
    getListKelas(degree_id);
    if (!isTypeKirim) {
      mappingDataProyek();
    }
  }, []);

  const mappingDataProyek = async () => {
    setKelas({
      ...kelas,
      value: dataProyek?.class?.name,
      id: dataProyek?.class?.id,
    });
    await getListRombel(dataProyek?.class_id);
    const resDateStart = parseDateProyek('start');
    const resDateEnd = parseDateProyek('end');

    setValueDateStart(() => resDateStart);
    setDateStart({
      ...dateStart,
      value: parseDateValue(resDateStart),
    });

    setValueDateEnd(() => resDateEnd);
    setDateEnd({
      ...dateEnd,
      value: parseDateValue(resDateEnd),
    });
    setDescription(dataProyek?.description);
  };

  const parseDateProyek = (type: 'start' | 'end') => {
    const date =
      type === 'start'
        ? convertDate(dataProyek?.time_start)
        : convertDate(dataProyek?.time_finish);

    return {
      day: date.get('day'),
      date: date.get('date'),
      month: date.get('month') + 1,
      year: date.get('year'),
      hour: date.get('hour'),
      minute: date.get('minute'),
    } as IDatePicker;
  };

  useEffect(() => {
    if (!isTypeKirim) {
      const currRombel: any = listRombel?.find(
        (item: any) => item?.rombel_class_school_id === dataProyek?.rombel_id,
      );
      setRombel({
        ...rombel,
        value: currRombel?.rombel_class_school_name || rombel.initValue,
        id: currRombel?.rombel_class_school_id || 0,
      });
    }
  }, [listRombel]);

  useEffect(() => {
    setDataType([tema, materi, kelas, rombel, dateStart, dateEnd]);
  }, [
    tema,
    materi,
    kelas,
    rombel,
    dateStart,
    dateEnd,
    valueDateStart,
    valueDateEnd,
  ]);

  useEffect(() => {
    setTema({
      ...tema,
      value: detailProyek?.theme?.name,
    });
    setMateri({
      ...materi,
      value: detailProyek?.title,
    });
    if (!isTypeKirim) {
    }
  }, [detailProyek]);

  const handleDateClose = (type: 'start' | 'end') => {
    if (type === 'start') {
      setDateStart({
        ...dateStart,
        value: parseDateValue(valueDateStart),
      });
      setIsShowDateStart(false);
      return;
    }
    const strDateEnd = _handlerConvertDatePicker(valueDateEnd, 11);
    const strDateStart = _handlerConvertDatePicker(valueDateStart, 11);
    const isBeforeDateStart = dayjs(strDateEnd).isBefore(strDateStart);
    const isSameDateStart = dayjs(strDateEnd).isSame(strDateStart);
    setIsShowDateEnd(false);

    if (isSameDateStart || isBeforeDateStart) {
      setDateEnd({
        ...dateEnd,
        value: dateEnd.initValue,
      });

      const errMessage = isSameDateStart
        ? 'Waktu berakhir tidak boleh sama dengan waktu mulai.'
        : 'Waktu berakhir harus diatas waktu mulai.';

      showErrorToast(errMessage);
      return;
    }

    setDateEnd({
      ...dateEnd,
      value: parseDateValue(valueDateEnd),
    });
  };

  const setIsShowConfirmPopup = (value: boolean) => {
    setState({isShowConfirmPopup: value});
  };

  const onKembaliButtonPress = () => {
    navigation.goBack();
  };

  const onPilihRombel = () => {
    if (kelas.value === kelas.initValue) {
      showErrorToast('Silahkan pilih kelas terlebih dahulu');
      return;
    }

    if (listRombel.length === 0) {
      showErrorToast('Rombel tidak tersedia');
      return;
    }
    rombel.onPress();
  };

  const onCloseSwipeUpKelas = () => {
    setIsShowKelas(false);
    if (!kelas.id) {
      return;
    }
    setRombel({
      ...rombel,
      value: rombel.initValue,
      id: null,
    });
    getListRombel(kelas.id);
  };

  const onKirimButtonPress = () => {
    if (kelas.value === kelas.initValue) {
      showErrorToast('Kelas belum dipilih');
      return;
    }

    if (rombel.value === rombel.initValue) {
      showErrorToast('Rombel belum dipilih');
      return;
    }

    if (dateStart.value === dateStart.initValue) {
      showErrorToast('Tanggal & Jam mulai belum dipilih');
      return;
    }

    if (dateEnd.value === dateEnd.initValue) {
      showErrorToast('Tanggal & Jam berakhir belum dipilih');
      return;
    }

    setIsShowConfirmPopup(true);
  };

  const onPopupKirimButtonPress = async () => {
    try {
      setIsShowConfirmPopup(false);

      const params = {
        project_id: project_id,
        title: detailProyek?.title,
        theme_id: detailProyek?.theme_id,
        phase_id: detailProyek?.phase_id,
        class_id: kelas.id,
        rombel_id: rombel.id,
        time_start: parseDateValue(valueDateStart, 13),
        time_finish: parseDateValue(valueDateEnd, 13),
        description: description || '',
      };

      if (!isTypeKirim) {
        updateProyek();
        return;
      }
      // showLoading();
      await apiPost({
        url: URL_PATH.post_pancasila_kirim_proyek(),
        body: params,
      });

      navigation.pop(2);
      showSuccessToast('Projek Berhasil Dikirim');
    } catch (error: any) {
      showErrorToast(error || 'Terjadi Kesalahan');
    } finally {
      // dismissLoading();
    }
  };

  const updateProyek = async () => {
    try {
      const params = {
        time_start: parseDateValue(valueDateStart, 13),
        time_finish: parseDateValue(valueDateEnd, 13),
        description: description || '',
      };

      // showLoading();
      await apiPut({
        url: URL_PATH.put_pancasila_update_proyek(dataProyek?.id || 0),
        body: params,
      });

      navigation.pop();
      showSuccessToast('Projek Berhasil Disimpan');
    } catch (error: any) {
      showErrorToast(error || 'Terjadi Kesalahan');
    } finally {
      // dismissLoading();
    }
  };

  const {isShowConfirmPopup}: any = state;
  return {
    role,
    project_id,
    type,
    dataType,
    getUser,
    tema,
    isShowTema,
    setTema,
    setIsShowTema,
    materi,
    isShowMateri,
    setMateri,
    setIsShowMateri,
    kelas,
    listKelas,
    isShowKelas,
    setKelas,
    setIsShowKelas,
    rombel,
    listRombel,
    isShowRombel,
    setRombel,
    setIsShowRombel,
    dateStart,
    isShowDateStart,
    setDateStart,
    setIsShowDateStart,
    valueDateStart,
    setValueDateStart,
    dateEnd,
    isShowDateEnd,
    setDateEnd,
    setIsShowDateEnd,
    valueDateEnd,
    setValueDateEnd,
    handleDisabled,
    handleDateClose,
    isShowConfirmPopup,
    setIsShowConfirmPopup,
    onKirimButtonPress,
    onKembaliButtonPress,
    onCloseSwipeUpKelas,
    onPilihRombel,
    onPopupKirimButtonPress,
    description,
    setDescription,
    isTypeKirim,
  };
};
export default usePancasilaKirimProyek;
