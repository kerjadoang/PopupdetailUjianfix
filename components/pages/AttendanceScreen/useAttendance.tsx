import {useEffect, useState} from 'react';
import {fetchTodayAttendance} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useMergeState} from '@constants/functional';
import Maskot1 from '@assets/svg/maskot_1.svg';
import provider from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

interface RootState {
  getTodayAttendance: any;
  getUser: any;
}

const useAttendance = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [state, setState] = useMergeState({
    isLoading: false,
    popupData: false,
    isShowPopup: false,
  });
  const {isLoading, popupData, isShowPopup} = state;
  const {getTodayAttendance, getUser} = useSelector(
    (state: RootState) => state,
  );
  const {start_time, end_time} = getTodayAttendance?.data;
  const isAttendanceStart = Boolean(!start_time) && Boolean(!end_time);
  const isAttendanceFinish = Boolean(start_time) && Boolean(!end_time);
  const isAttendanceComplete = Boolean(start_time) && Boolean(end_time);
  const isAttendanceFinishOrComplete =
    isAttendanceFinish || isAttendanceComplete;

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

  const userTypeId = getUser?.data?.user_type_id;
  const isUserTeacher = userTypeId == 5;
  let timerId: any;

  useEffect(() => {
    dispatch(fetchTodayAttendance());
  }, [dispatch]);

  const refreshClock = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    if (isFocused) {
      timerId = setInterval(refreshClock, 1000);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [isFocused]);

  const _handlerShowPopUpFinish = () => {
    setState({
      isShowPopup: true,
      popupData: {
        icon: Maskot1,
        title: isUserTeacher ? 'Selesai Presensi Hari Ini' : 'Selesai Belajar',
        description: isUserTeacher
          ? 'Apakah kamu yakin untuk keluar dan\nmenyelesaikan aktivitas presensi\nhari ini?'
          : 'Apakah kamu yakin untuk keluar dan\nmenyelesaikan kegiatan belajar\nhari ini?',
        labelConfirm: 'Selesai',
        labelCancel: 'Batal',
        onPressConfirm: () => {
          setState({isShowPopup: false});
          _handlerPutFinishAttendance();
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
      },
    });
  };

  const _handlerPostStartAttendance = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.postStartAttendance();
      dispatch(fetchTodayAttendance());

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Presensi masuk kelas berhasil dicatat.',
          });
        }, 500);
      }
    } catch (e: any) {
      const errorData = e?.response?.data;

      setState({
        isLoading: false,
      });

      Toast.show({
        type: 'error',
        text1:
          errorData?.message ||
          `Error Code: ${errorData?.code}` ||
          'Internal Server Error',
      });
    }
  };

  const _handlerPutFinishAttendance = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.putFinishAttendance();
      dispatch(fetchTodayAttendance());

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Presensi selesai kelas berhasil dicatat.',
          });
        }, 500);
      }
    } catch (e: any) {
      const errorData = e?.response?.data;

      setState({
        isLoading: false,
      });

      Toast.show({
        type: 'error',
        text1:
          errorData?.message ||
          `Error Code: ${errorData?.code}` ||
          'Internal Server Error',
      });
    }
  };

  const _handlerStartFinishAttendance = () => {
    if (isAttendanceStart) {
      _handlerPostStartAttendance();
    } else if (isAttendanceFinish) {
      _handlerShowPopUpFinish();
    }
  };

  return {
    isLoading,
    navigation,
    isShowPopup,
    popupData,
    isAttendanceComplete,
    getTodayAttendance,
    getUser,
    currentTime,
    isAttendanceFinishOrComplete,
    _handlerStartFinishAttendance,
  };
};

export default useAttendance;
