import {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const useFormListMaterial = (chapter_id: number) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ListBabScreen'>>();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [snackDelete, setSnack] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [section, setSection] = useState(false);
  const [show, setShow] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const getData = async (id: string | number) => {
    try {
      const res = await api.get(
        '/lms/v1/teacher/school-material/material/' + id,
      );
      if (res.status === 200) {
        setData(res?.data?.data);
      } else {
        setData([]);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    getData(chapter_id);
  }, [navigation, chapter_id, isFocused]);

  const submit = async (body: number[]) => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const res = await api.post(
        '/lms/v1/teacher/school-material/delete',
        {
          chapter_material_id: body,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (res.status === 200) {
        showAlert();
        Toast.show({
          type: 'success',
          text1: 'Material berhasil dihapus.',
        });
        setAlert(false);
        setSection(false);
        setShow(false);
      } else {
        setAlert(false);
        setSection(false);
        setShow(false);
        Toast.show({
          type: 'error',
          text1: 'Material gagal dihapus.',
        });
      }
      setCheckedItems([]);
      setSection(false);
      setAlert(false);
      getData(chapter_id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const showAlert = () => {
    setAlert(!Alert);
  };

  const showSnack = () => {
    setSnack(!snackDelete);
  };
  return {
    data,
    submit,
    showAlert,
    Alert,
    snackDelete,
    showSnack,
    section,
    setSection,
    show,
    setShow,
    checkedItems,
    setCheckedItems,
  };
};

export default useFormListMaterial;
