import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';

const useFormDetailTeacher = data => {
  const [dataTeacher, setDataTeacher] = useState([]);
  const [dataAbsent, setDataAbsent] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [image, setImage] = useState(null);

  const getDetailTeacher = async id => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get(`/lms/v1/rombel-user/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (response.status === 200) {
        const rombelUser = response?.data?.data?.rombel_user;
        const matchingTeacher = rombelUser.find(
          teacher => teacher.id === data?.id,
        );
        setDataTeacher(matchingTeacher);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getDetailTeacher(data?.user_type_id);
  }, [data?.user_type_id]);

  useEffect(() => {
    const userCreatedByAvatar = dataTeacher?.avatar;
    if (userCreatedByAvatar) {
      const fetchUserAvatar = async () => {
        try {
          const res = await api.get(`/media/v1/image/${userCreatedByAvatar}`);
          setImage(res?.data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      };

      fetchUserAvatar();
    }
  }, [dataTeacher?.avatar]);
  const getCountAbsent = async id => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get(
        `/lms/v1/attendance/count-yearly-attendance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        setDataAbsent(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getCountAbsent(data?.id);
  }, [data?.id]);
  const getSchedule = async id => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get(
        `/lms/v1/class-session/?page=1&limit=10&status=unstarted,on_going&teacherId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        setDataSchedule(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getSchedule(data?.id);
  }, [data?.id]);

  return {dataTeacher, dataAbsent, image, dataSchedule};
};

export default useFormDetailTeacher;
