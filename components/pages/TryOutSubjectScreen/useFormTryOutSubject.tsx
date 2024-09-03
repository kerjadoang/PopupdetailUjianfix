import api from '@api/index';
import {apiPost} from '@api/wrapping';
import {dismissLoading, showLoading} from '@constants/functional';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useFormTryOutSubject = (id: any, register_id: any) => {
  const [data, setData] = useState([]);
  const [tryoutHistoryId, setTryoutHistoryId] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState(null);
  const isFocused = useIsFocused();

  const postStartTryOut = async (tryout_id: any, register_id: any) => {
    const body: any = {
      tryout_id: tryout_id,
      register_id: register_id,
    };
    try {
      await apiPost({
        url: '/tryout/v1/start',
        body: body,
      });

      getTryOutSubject(tryout_id);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Tidak Dapat Memuat Data',
      });
    }
  };

  const getTryOutSubject = async (id: any) => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');

    try {
      showLoading();
      const response = await api.get(
        `/tryout/v1/list-subject-progress/${id}?module=`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        const data = response?.data?.data;
        const dataArray = Object.entries(data)
          .map(([key, value]) => {
            if (key === 'tryout_user_history_id') {
              return null;
            }
            return {
              category: key,
              ...value,
            };
          })
          .filter(item => item !== null);
        setTryoutHistoryId(response?.data?.data?.tryout_user_history_id);
        await Promise.all(
          dataArray.map(async obj => {
            await Promise.all(
              (obj.subject ?? []).map(async obj_2 => {
                if (obj_2.icon_mobile) {
                  const imgRes = await api.get(
                    `/media/v1/image/${obj_2.icon_mobile}`,
                  );
                  if (imgRes.status === 200 && imgRes.data?.code === 100) {
                    obj_2.path_url = imgRes.data?.data?.path_url;
                  }
                }
              }),
            );
          }),
        );

        setData(dataArray);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Tidak Dapat Memuat Data',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Tidak Dapat Memuat Data',
      });
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    postStartTryOut(id, register_id);
  }, [isFocused, id, register_id]);

  return {data, selectedItem, setSelectedItem, tryoutHistoryId};
};

export default useFormTryOutSubject;
