import {
  useMergeState,
  showLoading,
  dismissLoading,
} from '@constants/functional';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useCancelConnection, useGetOrangTua} from '@services/uaa';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetAllChildren, fetchPackageDetail, fetchReward} from '@redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {logout} from './utils';

interface RootState {
  packageDetail: any;
  getUser: any;
}

const useProfile = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {mutate} = useCancelConnection();
  const getUser = useSelector((state: RootState) => state.getUser);
  const packageDetail = useSelector((state: RootState) => state.packageDetail);
  const userTypeId = getUser?.data?.user_type_id;
  const user_type_id = userTypeId;
  const [state] = useMergeState({
    isShowPopup: false,
    popupData: false,
  });
  const {isShowPopup, popupData} = state;
  const [show, setShow] = useState<boolean>(false);
  const {data, refetch}: any = useGetOrangTua({});
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleSuccess, setVisibleSuccess] = useState<boolean>(false);
  const focused = useIsFocused();
  const [showLogoutPopup, setShowLogoutPopup] = useState<boolean>(false);

  useEffect(() => {
    if (focused) {
      dispatch(fetchPackageDetail());
      if (user_type_id == 1) {
        dispatch(fetchReward());
        refetch();
      } else if (user_type_id == 2) {
        dispatch(fetchGetAllChildren());
      }
    }
  }, [dispatch, focused, refetch, user_type_id]);

  const onCloseSwipeUp = useCallback(() => {
    setVisible(false);
  }, []);

  const onCloseAlert = useCallback(() => {
    setShow(false);
  }, []);

  const onCancelConnection = () => {
    mutate('anak', {parent_id: data?.data?.user_id}).then(() => {
      refetch();
      setShow(false);
      setVisible(false);
      setVisibleSuccess(true);
      Toast.show({
        type: 'success',
        text1: 'Hubungkan akun berhasil dibatalkan',
      });
    });
  };

  const _handlerLogout = async () => {
    setShowLogoutPopup(false);
    showLoading();
    await logout();
    dismissLoading();
    navigation.replace('Autentikasi', {});
    // setState({
    //   popupData: {
    //     icon: Maskot1,
    //     title: 'Keluar Aplikasi',
    //     description: 'Apakah kamu yakin untuk keluar dari akun Kelas Pintar?',
    //     labelConfirm: 'Batal',
    //     labelCancel: 'Keluar',
    //     onPressConfirm: () => {
    //       setState({isShowPopup: false});
    //     },
    //     onPressCancel: async () => {
    //       showLoading();
    //       await logout();
    //       dismissLoading();
    //       navigation.replace('Autentikasi', {});
    //       setState({isShowPopup: false});
    //     },
    //   },
    //   isShowPopup: true,
    // });
  };

  return {
    isShowPopup,
    popupData,
    userTypeId,
    data,
    visible,
    show,
    packageDetail,
    setShow,
    setVisible,
    onCloseSwipeUp,
    onCloseAlert,
    onCancelConnection,
    _handlerLogout,
    setVisibleSuccess,
    visibleSuccess,
    showLogoutPopup,
    setShowLogoutPopup,
  };
};

export default useProfile;
