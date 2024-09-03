import {_handlerSetItem, useMergeState} from '@constants/functional';
import {Keys} from '@constants/keys';
import {useNavigation} from '@react-navigation/native';
import {getUserDestroy, loginDestroy, verifyOtpDestroy} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

const useAccountSettingsWidget = (props: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const getAllChildren: any = useSelector(
    (state: RootState) => state.getAllChildren,
  );
  const getUser: any = useSelector((state: RootState) => state.getUser);
  const [state, setState] = useMergeState({
    isShowSwipeUp: false,
  });
  const {isShowSwipeUp} = state;
  const allChildrenData = getAllChildren?.data.filter(
    (item: any) => item?.approval_status == 'approved',
  );

  const initialisationDataStudent = [
    {
      id: 1,
      label: 'Edit Profil',
      onPress: () => {
        navigation.navigate('ProfileEditScreen', {});
      },
    },
    {
      id: 2,
      label: 'Ubah Kata Sandi',
      onPress: () => {
        navigation.navigate('EditPasswordScreen', {});
      },
    },
    {
      id: 3,
      label: 'Unduhan Video',
      onPress: () => {
        navigation.navigate('VideoDownloadScreen', {});
      },
    },
    {
      id: 4,
      label: 'Aktivitas Saya',
      onPress: () => {
        navigation.navigate('MyActivityScreen', {});
      },
    },
    {
      id: 5,
      label: 'Hapus Akun',
      onPress: () => {
        navigation.navigate('RemoveAccountScreen', {});
      },
    },
  ];

  const initialisationDataParent = [
    {
      id: 1,
      label: 'Edit Profil',
      onPress: () => {
        navigation.navigate('ProfileEditScreen', {});
      },
    },
    {
      id: 2,
      label: 'Ubah Kata Sandi',
      onPress: () => {
        navigation.navigate('EditPasswordScreen', {});
      },
    },
    {
      id: 3,
      label: 'Aktivitas Saya',
      onPress: () => {
        navigation.navigate('MyActivityScreen', {});
      },
    },
    {
      id: 4,
      label: 'Pindah Akun',
      onPress: () => {
        setState({isShowSwipeUp: true});
      },
    },
    {
      id: 5,
      label: 'Hapus Akun',
      onPress: () => {
        navigation.navigate('RemoveAccountScreen', {});
      },
    },
  ];

  const initialisationDataTeacher = [
    {
      id: 1,
      label: 'Edit Profil',
      onPress: () => {
        navigation.navigate('ProfileEditScreen', {});
      },
    },
    {
      id: 2,
      label: 'Ubah Kata Sandi',
      onPress: () => {
        navigation.navigate('EditPasswordScreen', {});
      },
    },
    {
      id: 3,
      label: 'Aktivitas Saya',
      onPress: () => {
        navigation.navigate('MyActivityScreen', {});
      },
    },
    {
      id: 4,
      label: 'Hapus Akun',
      onPress: () => {
        navigation.navigate('RemoveAccountScreen', {});
      },
    },
  ];

  const initialisationDataAdmin = [
    {
      id: 1,
      label: 'Edit Profil',
      onPress: () => {
        navigation.navigate('ProfileEditScreen', {});
      },
    },
    {
      id: 2,
      label: 'Ubah Kata Sandi',
      onPress: () => {
        navigation.navigate('EditPasswordScreen', {});
      },
    },
    {
      id: 3,
      label: 'Aktivitas Saya',
      onPress: () => {
        navigation.navigate('MyActivityScreen', {});
      },
    },
    {
      id: 4,
      label: 'Hapus Akun',
      onPress: () => {
        navigation.navigate('RemoveAccountScreen', {});
      },
    },
  ];

  const _handlerCloseSwipeUp = () => {
    setState({isShowSwipeUp: false});
  };

  const _handlerChangeAccount = async (access_token: any) => {
    const token = JSON.stringify(access_token);
    dispatch(loginDestroy());
    dispatch(getUserDestroy());
    dispatch(verifyOtpDestroy());
    _handlerSetItem(Keys.token, token);
    navigation.navigate('BottomTabNavigator');
  };

  /*
    USER_TYPE_ID
    1. Murid >> B2C B2B
    2. Orang Tua >> Ngikut anak
    3. Mentor
    4. Kepsek >> B2B B2G
    5. Guru >> B2B
    6. Admin >> B2B
  */

  const isUserParent = props?.userTypeId == 2;
  const isUserHeadMaster = props?.userTypeId == 4;
  const isUserTeacher = props?.userTypeId == 5;
  const isUserAdmin = props?.userTypeId == 6;

  const initialisationData = isUserParent
    ? initialisationDataParent
    : isUserTeacher || isUserHeadMaster
    ? initialisationDataTeacher
    : isUserAdmin
    ? initialisationDataAdmin
    : initialisationDataStudent;

  if (getUser?.data?.disable_update_profile) {
    initialisationData.splice(1, 1);
  }

  return {
    initialisationData,
    navigation,
    isShowSwipeUp,
    allChildrenData,
    _handlerCloseSwipeUp,
    _handlerChangeAccount,
  };
};

export default useAccountSettingsWidget;
