/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import provider from '@services/lpt/provider';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface RootState {
  file: any;
}
const useHots = (
  chapterData: any,
  question_service_type_id: any,
  webViewRef: any,
  title: any,
) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HotsScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'HotsScreen'>>();
  const dispatch = useDispatch();
  const [type, setType] = useState(true);
  const [videoChoose, setVideoChoose] = useState<any>();
  const [fileType, setFileType] = useState(false);
  const [listPrincipal, setListPrincipal] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  useEffect(() => {
    handleType();
  }, [chapterData, dispatch]);
  const file = useSelector((state: RootState) => state?.file);
  const string = title;
  const kataTertentu = 'HOTS';
  const fetchData = async item => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const response = await api.get(
      `/lpt/v1/practice/go_practice/question/${
        item ? item?.id : chapterData?.chapter?.id
      }?question_service_type_id=${
        item ? item?.question_service_type_id : question_service_type_id
      }`,
      {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      },
    );
    if (response?.status === 200) {
      const firstID = response?.data?.data[0]?.file_id;
      fetchDataMedia(firstID);
    }
  };
  const fetchDataMedia = async firstID => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const response = await api.get(`media/v1/file/${firstID}`, {
      headers: {
        Authorization: `Bearer ${tokenParse}`,
      },
    });
    if (response?.status === 200) {
      const firstVideo = response?.data?.data;
      setVideoChoose(firstVideo);
      checkFileType(firstVideo?.path_url);
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message,
      });
    }
  };

  useEffect(() => {
    fetchData(selectedItem);
  }, [selectedItem]);

  const fetchDataPrincipal = async () => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const response = await api.get(
      `/lpt/v1/practice/next-hots/${chapterData?.chapter?.id}/${question_service_type_id}`,
      {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      },
    );
    if (response?.status === 200) {
      const data = response?.data?.data;
      const promises = data?.map(async (obj: any) => {
        if (obj?.thumbnail) {
          const imgRes = await api.get(`/media/v1/image/${obj?.thumbnail}`);
          if (imgRes?.status === 200 && imgRes.data?.code === 100) {
            obj.path_url = imgRes?.data?.data?.path_url;
          }
        }
      });
      await Promise.all(promises);
      setListPrincipal(data);
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.message,
      });
    }
  };

  useEffect(() => {
    fetchDataPrincipal();
  }, []);

  const handleType = () => {
    if (string?.includes(kataTertentu)) {
      setType(true);
    } else {
      setType(false);
    }
  };

  const endXP = async () => {
    try {
      await provider.practiceTypeProgress({
        chapter_id: chapterData?.chapter?.id,
        question_service_type_id: route?.params?.question_service_type_id,
        is_done: true,
      });

      navigation.goBack();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
    }
  };
  const checkFileType = url => {
    const extension = url?.split('.').pop().toLowerCase();
    if (extension === 'pptx') {
      setFileType(true);
    } else {
      setFileType(false);
    }
  };
  return {
    file,
    videoChoose,
    type,
    endXP,
    fileType,
    listPrincipal,
    selectedItem,
    setSelectedItem,
  };
};

export default useHots;
