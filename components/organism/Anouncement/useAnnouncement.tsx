import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAnnouncement} from '@redux';

interface RootState {
  announcement: any;
}

const useAnnouncement = (token: any) => {
  // get state of redux/
  const {announcement} = useSelector((state: RootState) => state);

  // setup dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncement(token));
  }, []);

  return {
    announcement,
  };
};

export default useAnnouncement;
