import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAnnouncement} from '@redux';
import {useNavigation} from '@react-navigation/native';

interface RootState {
  announcement: any;
}

const useAnnouncementWidget = () => {
  // get state of redux/
  const navigation: any = useNavigation();
  const announcement = useSelector((state: RootState) => state.announcement);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncement());
  }, [dispatch]);

  return {
    announcement,
    navigation,
  };
};

export default useAnnouncementWidget;
