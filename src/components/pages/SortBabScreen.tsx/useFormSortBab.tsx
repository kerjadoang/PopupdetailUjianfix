import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
const useFormSortbab = (dataList: any) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'SortBabScreen'>>();
  const [data, setData] = useState(dataList);
  const submit = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const dataKPReg = data?.filter((item: any) => !item?.chapter?.editable);
      const body = data
        ?.filter((item: any) => item?.chapter?.editable)
        ?.map((item: any, index: number) => ({
          id: item?.chapter?.id,
          order: (dataKPReg?.length || 0) + index + 1,
        }))
        ?.filter((item: any) => item?.order > 0);

      const res = await api.put('/lms/v1/teacher/chapter/order/choose', body, {
        headers: {
          Authorization: `Bearer ${tokenParse.access_token}`,
        },
      });
      if (res.status === 200) {
        setData(res?.data?.data);
        navigation.goBack();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return {data, submit, setData};
};

export default useFormSortbab;
