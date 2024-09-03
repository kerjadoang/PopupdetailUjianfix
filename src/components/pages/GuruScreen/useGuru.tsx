import {useEffect} from 'react';
import {
  fetchClassSession,
  fetchClassSessionRekaman,
  fetchImage,
  fetchGetSubjectsByClass,
} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

interface RootState {
  classSession: any;
  classSessionRekaman: any;
  image: any;
  getUser: any;
  getSubjectsByClass: any;
}

const useGuru = () => {
  const classSession = useSelector((state: RootState) => state.classSession);
  const classSessionRekaman = useSelector(
    (state: RootState) => state.classSessionRekaman,
  );
  const image = useSelector((state: RootState) => state.image);
  const getUser = useSelector((state: RootState) => state.getUser);
  const getSubjectsByClass = useSelector(
    (state: RootState) => state.getSubjectsByClass,
  );

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(fetchClassSession('guru'));
    dispatch(fetchClassSessionRekaman('guru'));
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (classSession) {
      dispatch(fetchImage(classSession?.data[0]?.user?.avatar));
    } else if (image?.data?.ID === '000000000000000000000000') {
      dispatch(fetchImage(classSession?.data[0]?.user?.user_type?.icon_mobile));
    }
  }, [classSession, dispatch, image?.data?.ID]);

  useEffect(() => {
    if (getUser) {
      fetchGetSubjectsByClass(getUser?.data?.class_id);
    }
  }, [getUser]);

  return {
    classSession,
    classSessionRekaman,
    image,
    getUser,
    getSubjectsByClass,
  };
};
export default useGuru;
