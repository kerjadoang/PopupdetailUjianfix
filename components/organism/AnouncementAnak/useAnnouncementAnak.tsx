import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAnnouncement} from '@redux';
import {useNavigation} from '@react-navigation/native';

interface RootState {
  announcement: any;
}

const useAnnouncementAnak = (token: any) => {
  // get state of redux/
  const navigation: any = useNavigation();
  const {announcement} = useSelector((state: RootState) => state);

  // setup dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncement(token));
  }, [token]);

  const onPress = (id: any) => {
    navigation.navigate('AnnouncementDetailScreen', {
      id: id,
    });
  };

  return {
    announcement,
    onPress,
  };
};

export default useAnnouncementAnak;
