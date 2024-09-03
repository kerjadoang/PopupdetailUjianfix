import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {useState, useEffect} from 'react';

const useFormLMSReportTeacher = () => {
  const [listClass, setListClass] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const res = await api.get('lms/v1/rombel-user/list-class', {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        });
        const data = res?.data?.data;
        if (res?.status === 200) {
          setListClass(data);
        } else {
        }
      } catch (err) {
        return;
      }
    };
    fetchList();
  }, []);
  return {listClass};
};

export default useFormLMSReportTeacher;
