import {useMergeState} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList, RapatVirtualTeacherScreen} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import IconRapatVirtual from '@assets/svg/ic48_rapatvirtual.svg';
import IconGrupDiskusi from '@assets/svg/ic48_Forum_alert.svg';
import Maskot3 from '@assets/svg/maskot_3.svg';
import provider from '@services/lms/provider';
import {useState} from 'react';

const useKomunitas = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'KomunitasScreen'>>();
  const {navigateScreen} = useNavigate();
  const [, setState] = useMergeState({
    isLoading: false,
    isShowPopup: false,
    popupData: false,
    totalUnreadsDiscussionGroup: 0,
  });
  const [dataItem, setDataItem] = useState<any>();
  const [showMoreSwipeUp, setShowMoreSwipeUp] = useState<boolean>();
  const [showConfirmCancel, setShowConfirmCancel] = useState<boolean>(false);

  const _handlerGetGroupInformation = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getDiscusssionGroupInformation();

      if (res?.status === 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
          navigation.navigate('DiscussionGrupMessageScreen');
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e: any) {
      // errorCode 544 = Discussion group not found
      // errorCode 545 = User is not member of this group

      const errorCode = e?.response?.data?.code;
      const isError = errorCode === 544 || errorCode === 545;

      if (isError) {
        setState({
          popupData: {
            icon: Maskot3,
            title: 'Belum Ada Grup',
            description:
              'Hubungi Admin sekolah untuk dapat mengaktifkan fitur Grup Diskusi.',
            labelCancel: 'Kembali',
            onPressCancel: () => {
              setState({isShowPopup: false});
            },
          },
          isLoading: false,
          isShowPopup: true,
        });
      } else {
        setTimeout(() => {
          setState({isLoading: false});
        }, 500);
      }
    }
  };

  const menuItem = [
    {
      id: 1,
      name: 'Rapat Virtual',
      image: <IconRapatVirtual />,
      onPress: () => {
        navigateScreen<RapatVirtualTeacherScreen>('RapatVirtualTeacherScreen', {
          type: 'GURU',
        });
      },
    },
    {
      id: 2,
      name: 'Grup Diskusi',
      image: <IconGrupDiskusi />,
      onPress: () => {
        _handlerGetGroupInformation();
      },
    },
  ];

  return {
    navigation,
    menuItem,
    dataItem,
    setDataItem,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    showConfirmCancel,
    setShowConfirmCancel,
  };
};
export default useKomunitas;
