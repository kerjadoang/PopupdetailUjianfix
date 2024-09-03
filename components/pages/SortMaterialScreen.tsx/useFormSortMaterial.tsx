import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
const useFormSortMaterial = (dataList: any, id: number) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'SortMaterialScreen'>>();
  const [data, setData] = useState(dataList);
  const submit = async () => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');

    const content = data
      .map((item: any, index: number) => ({
        id: item?.id,
        order: index + 1,
      }))
      .filter((item: any) => item?.order > 0);

    const body = {
      chapter_id: id,
      contents: content.map((item: any) => ({
        id: item.id,
        orders: item.order,
      })),
    };
    try {
      const res = await api.put(
        '/lms/v1/teacher/school-material/edit-orders',
        body,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
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

export default useFormSortMaterial;
