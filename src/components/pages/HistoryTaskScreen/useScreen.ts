/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import SearchInput from '@components/atoms/SearchInput';
import api from '@api/index';
import Config from 'react-native-config';

const useScreen = (route: any) => {
  const [search, setSearch] = useState('');
  const [modalMapel, setModalMapel] = useState(false);
  const [list, setList] = useState([]);

  // kebutuhan filter mapel
  const [listMapel, setListMapel] = useState([]);
  const [mapelSelected, setMapelSelected] = useState<number[]>([]);
  const [mapelSelectedTemp, setMapelSelectedTemp] = useState<number[]>([]);

  const [tipeSelected, setTipeSelected] = useState([]);
  const [tipeSelectedTemp, setTipeSelectedTemp] = useState([]);

  const [modalTipe, setModalTipe] = useState(false);

  const fetchList = async () => {
    try {
      const res = await api.post('/lms/v1/teacher/task/home/histories/', {
        search: search,
        limit: 10,
        offset: 0,
        class_id: [],
        rombel_class_school_id: [route?.params?.id?.id],
        subject_id: mapelSelected,
        type: tipeSelected,
        time_start: '',
        time_finish: '',
      });

      if (res?.data?.code === 100) {
        return setList(res?.data?.data?.list);
      }
      return setList([]);
    } catch (err) {
      return;
    }
  };

  const fetchMapel = async () => {
    try {
      const res = await api.get(
        `${Config.BASEURL}/master/v1/list-subject?classId=${route?.params?.id?.id}`,
      );
      if (res?.data?.code === 100) {
        return setListMapel(res?.data?.data);
      }
      return setListMapel([]);
    } catch (err) {
      return;
    }
  };

  const modalMapelValidation = () => {
    setMapelSelectedTemp(mapelSelected);
    setModalMapel(true);
  };

  const modalTipeValidation = () => {
    setTipeSelectedTemp(tipeSelected);
    setModalTipe(true);
  };

  const selectValidation = (a: number) => {
    if (mapelSelectedTemp.includes(a)) {
      setMapelSelectedTemp(mapelSelectedTemp =>
        mapelSelectedTemp.filter(element => element !== a),
      );
    } else {
      setMapelSelectedTemp(mapelSelectedTemp => [...mapelSelectedTemp, a]);
    }
  };

  const selectValidationTipe = (a: string) => {
    if (tipeSelectedTemp.includes(a)) {
      setTipeSelectedTemp(tipeSelectedTemp =>
        tipeSelectedTemp.filter(element => element !== a),
      );
    } else {
      setTipeSelectedTemp(tipeSelectedTemp => [...tipeSelectedTemp, a]);
    }
  };

  const selectAllFilter = () => {
    let data: any[] = [];
    listMapel?.map((item: any) => {
      data.push(item?.id);
    });
    setMapelSelectedTemp(data);
  };

  const terapkanFilter = () => {
    setMapelSelected(mapelSelectedTemp);
    setModalMapel(false);
  };

  const terapkanFilterTipe = () => {
    setTipeSelected(tipeSelectedTemp);
    setModalTipe(false);
  };

  const clearSelected = () => {
    setMapelSelectedTemp([]);
  };

  const clearSelectedTipe = () => {
    setTipeSelectedTemp([]);
  };

  useEffect(() => {
    fetchList();
  }, [search, mapelSelected, tipeSelected]);

  useEffect(() => {
    fetchMapel();
  }, []);

  return {
    list,
    SearchInput,
    search,
    setSearch,
    modalMapel,
    setModalMapel,
    selectAllFilter,
    setMapelSelected,
    mapelSelected,
    terapkanFilter,
    listMapel,
    selectValidation,
    modalMapelValidation,
    modalTipeValidation,
    mapelSelectedTemp,
    setMapelSelectedTemp,
    clearSelected,
    modalTipe,
    setModalTipe,
    selectValidationTipe,
    terapkanFilterTipe,
    clearSelectedTipe,
    tipeSelectedTemp,
    tipeSelected,
  };
};
export {useScreen};
