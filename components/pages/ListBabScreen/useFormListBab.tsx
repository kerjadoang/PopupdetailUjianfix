import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const useFormListBab = (subject_id: number) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ListBabScreen'>>();
  const [data, setData] = useState([]);
  const [snackDelete, setSnack] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alert_2, setAlert_2] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newNameSubject, setNewNameSubject] = useState('');
  const [show, setShow] = useState(false);
  const [section, setSection] = useState(false);
  const getData = async (id: any) => {
    try {
      // const token = await AsyncStorage.getItem(Keys.token);
      // const tokenParse = await JSON.parse(token || '');
      const res = await api.get('/lms/v1/teacher/chapter/' + id, {
        // headers: {
        //   Authorization: `Bearer ${tokenParse.access_token}`,
        // },
      });
      if (res.status === 200) {
        setData(res?.data?.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(subject_id);
    });

    return unsubscribe;
  }, [navigation, subject_id]);
  const submit = async (body: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.post(
        '/lms/v1/teacher/chapter/delete/choice',
        {
          chapter_id: body,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenParse.access_token}`,
          },
        },
      );
      if (res.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Berhasil Hapus Bab.',
        });
        setAlert(false);
        setSection(false);
        setShow(false);
        getData(subject_id);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal Hapus Bab.',
        });
        setAlert(false);
        setSection(false);
        getData(subject_id);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const submitChange = async (body: any) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const reqBody = {
        name: body,
      };
      const res = await api.put(
        `/lms/v1/teacher/subject/${subject_id}`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${tokenParse.access_token}`,
          },
        },
      );
      if (res.status === 200) {
        setNewNameSubject(res?.data?.data?.name);
        setShowEdit(false);
        Toast.show({
          type: 'success',
          text1: 'Materi berhasil diganti.',
        });
        setShow(false);
        getData(subject_id);
      } else {
        setShowEdit(false);
        Toast.show({
          type: 'error',
          text1: 'Materi Gagal diganti.',
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const submitDelete = async id => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.delete(`/lms/v1/teacher/subject/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse.access_token}`,
        },
      });
      if (res.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Bab berhasil diHapus.',
        });
        navigation.goBack();
        getData(subject_id);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Bab Gagal diHapus.',
        });
        setAlert(false);
        setSection(false);
        getData(subject_id);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const showAlert = () => {
    setAlert(!alert);
  };

  const showSnack = () => {
    setSnack(!snackDelete);
  };
  return {
    data,
    showEdit,
    setShowEdit,
    submit,
    showAlert,
    alert,
    snackDelete,
    showSnack,
    submitChange,
    newNameSubject,
    show,
    setShow,
    alert_2,
    setAlert_2,
    submitDelete,
    section,
    setSection,
  };
};

export default useFormListBab;
