import {
  useMergeState,
  _handlerGetItem,
  _handlerSetItem,
} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import {fetchRemoveVideoDownload, removeVideoDownloadDestroy} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import Maskot1 from '@assets/svg/maskot_1.svg';
import {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Keys} from '@constants/keys';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSavedVideo = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'SavedVideoScreen'>>();
  const dispatch = useDispatch();
  const [state, setState] = useMergeState({
    isShowPopUp: false,
    popupData: false,
    isShowSnackBar: false,
    snackBarData: false,
    isLoading: false,
    listSavedVideo: false,
  });
  const {
    isShowPopUp,
    popupData,
    isShowSnackBar,
    snackBarData,
    isLoading,
    listSavedVideo,
  }: any = state;
  const {removeVideoDownload} = useSelector((state: any) => state);

  useEffect(() => {
    _handlerOnRefresh();
  }, [dispatch, removeVideoDownload]);

  const _handlerPopUpError = (title: any, description: any) => {
    setState({
      popupData: {
        icon: Maskot1,
        title: title,
        description: description,
        labelConfirm: 'Kembali',
        onPressConfirm: () => {
          dispatch(removeVideoDownloadDestroy());
          setState({isShowPopUp: false});
        },
      },
      isShowPopUp: true,
    });
  };

  const _handlerOnPressCloseSnackBar = () => {
    setState({isShowSnackBar: false});
    dispatch(removeVideoDownloadDestroy());
  };

  const _handlerShowPopUpDelete = (selectedId: any) => {
    setState({
      isShowPopUp: true,
      popupData: {
        icon: Maskot1,
        title: 'Hapus Unduhan Video',
        description:
          'Apakah kamu yakin untuk menghapus unduhan? Video tidak dapat ditonton kembali tanpa koneksi internet.',
        labelConfirm: 'Batal',
        labelCancel: 'Hapus',
        onPressConfirm: () => {
          setState({isShowPopUp: false});
        },
        onPressCancel: () => {
          setState({isShowPopUp: false});
          dispatch(fetchRemoveVideoDownload(selectedId));
        },
      },
    });
  };

  const _handlerPulltoRefresh = () => {
    _handlerOnRefresh();
    setTimeout(() => {
      setState({isLoading: false});
    }, 3000);
  };

  const _handlerOnRefresh = () => {
    if (removeVideoDownload?.data?.id) {
      setState({
        snackBarData: {
          label: 'Unduhan video berhasil dihapus.',
        },
        isShowSnackBar: true,
      });
    }

    if (removeVideoDownload?.error?.code) {
      _handlerPopUpError(
        removeVideoDownload?.error?.message,
        removeVideoDownload?.error?.message?.data?.message || '',
      );
    }

    _handlerGetListSavedVideo();
  };

  const _handlerGetListSavedVideo = async () => {
    setState({isLoading: true});

    const deviceId = await AsyncStorage.getItem(Keys.deviceId);
    const data: any = await _handlerGetItem(Keys.localSavedVideo);
    const dataLocal = JSON.parse(data);

    try {
      const res = await provider.getListSavedVideo(deviceId);
      const resDataData = res?.data?.data || false;

      if (resDataData) {
        const dataArray = resDataData?.map(async (item: any, index: any) => {
          const dataFileId = item?.file_id;
          const dataRes = await providerMedia.getVideoRecording(dataFileId);

          if (dataRes?.code == 100) {
            resDataData[index].path_url = dataRes?.data?.path_url || false;
          }
        });

        await Promise.all(dataArray);
      }

      _handlerSetItem(Keys.localSavedVideo, JSON.stringify(resDataData));

      setTimeout(() => {
        setState({
          isLoading: false,
          listSavedVideo: resDataData || dataLocal,
        });
      }, 500);
    } catch (e: any) {
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
      setTimeout(() => {
        setState({isLoading: false, listSavedVideo: dataLocal});
      }, 500);
    }
  };

  return {
    isLoading,
    navigation,
    isShowPopUp,
    popupData,
    listSavedVideo,
    isShowSnackBar,
    snackBarData,
    _handlerPulltoRefresh,
    _handlerShowPopUpDelete,
    _handlerOnPressCloseSnackBar,
  };
};

export default useSavedVideo;
