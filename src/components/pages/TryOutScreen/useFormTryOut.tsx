import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const useFormTryOut = () => {
  const [data, setdata] = useState(null);
  const [dataDesc, setdataDesc] = useState<any>(null);
  const [dataType, setdataType] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [popup, setpopup] = useState(false);
  const [show, setShow] = useState(false);
  const [showSwipe, setShowSwipe] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);
  const [multipleType, setMultipleType] = useState([]);

  const getTryOut = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get('/tryout/v1/schedule', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (response.status === 200) {
        setdata(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    getTryOut();
  }, []);

  const getHistory = async (multipleType: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get(
        `/tryout/v1/history?tryoutTypeId=${multipleType?.map(
          (item: any) => item?.id,
        )}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );

      if (response.status === 200) {
        setDataHistory(response?.data?.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal Mengabil Data.',
        });
      }
    } catch (err) {
      return;
    }
  };
  useEffect(() => {
    getHistory(multipleType);
  }, [multipleType]);

  const getTryOutDesc = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get(`/tryout/v1/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (response.status === 200) {
        setdataDesc(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const getTryOutType = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get('/tryout/v1/type', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });

      if (response.status === 200) {
        setdataType(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getTryOutType();
  }, []);

  const submitRegister = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const reqBody = {
        tryout_id: dataDesc?.id,
        tryout_type_id: selectedType?.id,
        tryout_type: selectedType?.description,
      };
      const response = await api.post('/tryout/v1/register', reqBody, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Selamat Berhasil Daftar.',
        });
        setpopup(true);
        getTryOut();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal Daftar.',
        });
        setShow(false);
        setShowSwipe(false);
      }
    } catch (err) {
      return;
    } finally {
      resetSelectedType();
    }
  };

  const resetSelectedType = () => {
    setSelectedType(null);
    setShow(false);
  };

  useEffect(() => {
    getTryOutType();
  }, []);

  const hanldeSelect = (item: any) => {
    setSelectedType(item);
  };

  const handleMultiple = (item: any) => {
    setMultipleType(item);
  };
  return {
    selectedType,
    setSelectedType,
    data,
    getTryOutDesc,
    dataDesc,
    getTryOutType,
    dataType,
    hanldeSelect,
    submitRegister,
    popup,
    setpopup,
    show,
    setShow,
    showSwipe,
    setShowSwipe,
    dataHistory,
    handleMultiple,
    multipleType,
    setMultipleType,
    resetSelectedType,
  };
};

export default useFormTryOut;
