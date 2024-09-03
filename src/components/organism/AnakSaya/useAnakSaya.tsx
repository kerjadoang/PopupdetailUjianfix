import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetAllChildren, fetchScheduleByDate} from '@redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useCancelConnection} from '@services/uaa';
import dayjs from 'dayjs';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const useAnakSaya = () => {
  // get state of redux/
  const {getAllChildren, scheduleByDate} = useSelector(state => state);
  const navigation: any = useNavigation();
  const {mutate} = useCancelConnection();
  const isFocused = useIsFocused();
  // setup dispatch
  const dispatch = useDispatch();

  const [user, setUser] = useState<any>(null);
  const [isRefetch, setRefetchGetAllChildren] = useState<boolean>(false);

  const [visible, setVisible] = useState<{status: boolean; student_id: string}>(
    {
      status: false,
      student_id: '',
    },
  );
  const [visibleSuccess, setVisibleSuccess] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const onCloseSwipeUp = useCallback(() => {
    setVisible({status: false, student_id: ''});
  }, []);

  const onCloseAlert = useCallback(() => {
    setShow(false);
  }, []);

  const onCancelConnection = () => {
    mutate('orangtua', {student_id: visible.student_id}).then(() => {
      dispatch(fetchGetAllChildren());
      setShow(false);
      setVisible({status: false, student_id: ''});
      Toast.show({
        type: 'success',
        text1: 'Hubungkan anak berhasil dibatalkan',
      });
    });
  };

  const refetchAllChildren = () => {
    setRefetchGetAllChildren(!isRefetch);
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    dispatch(fetchGetAllChildren());
  }, [isFocused, dispatch, isRefetch]);

  useEffect(() => {
    // console.log('getAllChildren', getAllChildren);
    if (getAllChildren?.data?.length > 0) {
      setUser(getAllChildren?.data[0]);
    }
  }, [getAllChildren]);

  useEffect(() => {
    dispatch(
      fetchScheduleByDate(dayjs().format('YYYY-MM-DD'), user?.access_token),
    );
  }, [user]);

  return {
    getAllChildren,
    navigation,
    user,
    setUser,
    scheduleByDate,
    visible,
    visibleSuccess,
    setVisibleSuccess,
    setShow,
    show,
    setVisible,
    onCloseAlert,
    onCloseSwipeUp,
    onCancelConnection,
    dispatch,
    refetchAllChildren,
  };
};

export default useAnakSaya;
