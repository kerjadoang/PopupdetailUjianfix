import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {IDataAnak} from 'type/data-anak';
import apiWithoutToken from '@api/withoutToken';
import Config from 'react-native-config';
import dayjs from 'dayjs';

const useScheduleWidget = (dataAnak: IDataAnak) => {
  const navigation: any = useNavigation();
  const [schedule, setSchedule] = useState();
  const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'));
  // setup dispatch

  const fetchSchedule = async () => {
    try {
      const res = await apiWithoutToken.get(
        `${Config.BASEURL}/schedule/v1/my-schedule/${today}`,
        {
          headers: {
            Authorization: `Bearer ${dataAnak?.access_token}`,
          },
        },
      );
      if (res?.data?.code === 100) {
        return setSchedule(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [today]);

  const onPress = (id: any) => {
    navigation.navigate('AnnouncementDetailScreen', {
      id: id,
    });
  };

  return {
    schedule,
    onPress,
    setToday,
  };
};

export default useScheduleWidget;
