import {useMergeState, _handlerFormatBytes} from '@constants/functional';
import provider from '@services/uaa/provider';
import {useEffect} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import {useQueryFetchUser} from '@services/uaa';
interface RootState {
  getUser: any;
}

const useVideoDownload = () => {
  const {getUser} = useSelector((state: RootState) => state);
  const {refetch: refetchUser} = useQueryFetchUser();

  const {download_with_wifi, prefered_video_quality_data} =
    getUser?.data || false;
  const [state, setState] = useMergeState({
    isShowSwipeUp: false,
    selectedQualityVideo: prefered_video_quality_data,
    availableStorage: '0',
    availableStorageInPercent: false,
    totalStorage: '0',
    listQualityVideo: false,
    currentSwitchCondition: download_with_wifi || false,
  });
  const {
    isShowSwipeUp,
    selectedQualityVideo,
    availableStorage,
    availableStorageInPercent,
    totalStorage,
    listQualityVideo,
    currentSwitchCondition,
  }: any = state;

  useEffect(() => {
    _handlerGetMemoryDevice();
    _handlerGetAllPreferedQualityVideo();
  }, []);

  const _handlerGetMemoryDevice = async () => {
    // const availableStorageNumber = await DeviceInfoModule.getFreeDiskStorage();
    // const totalStorageNumber = await DeviceInfoModule.getTotalDiskCapacity();
    // Mendapatkan informasi tentang penyimpanan bebas
    const freeDiskStorageInfo = await RNFS.getFSInfo();
    const availableStorageNumber = freeDiskStorageInfo.freeSpace;
    // Mendapatkan informasi tentang kapasitas penyimpanan total
    const totalStorageNumber = freeDiskStorageInfo.totalSpace;
    const availableStorage = _handlerFormatBytes(
      totalStorageNumber - availableStorageNumber,
    );
    const totalStorage = _handlerFormatBytes(totalStorageNumber);
    const availableStorageInPercent = Math.round(
      (availableStorageNumber / totalStorageNumber) * 100,
    );
    const totalStorageInPercent =
      Math.round(totalStorageNumber / totalStorageNumber) * 100;
    const resultInPercent = totalStorageInPercent - availableStorageInPercent;

    setState({
      availableStorage: availableStorage,
      availableStorageInPercent: `${resultInPercent}%`,
      totalStorage: totalStorage,
    });
  };

  const _handlerSelectedQualityVideo = (data: any) => {
    setState({selectedQualityVideo: data});
  };

  const _handlerGetAllPreferedQualityVideo = async () => {
    try {
      const res = await provider.getAllPrefferedQualityVideo();
      const resDataData = res?.data?.data || false;

      setState({
        listQualityVideo: resDataData,
      });
    } catch (e: any) {
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerOnPressSetPreferedQualityVideo = async () => {
    try {
      await provider.putPrefferedQualityVideo(selectedQualityVideo?.id);

      setState({
        isShowSwipeUp: !isShowSwipeUp,
      });
    } catch (e: any) {
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerShowSwipeUp = () => {
    setState({isShowSwipeUp: !isShowSwipeUp});
  };

  const _handlerHideSwipeUp = () => {
    setState({isShowSwipeUp: false});
  };

  const _handlerSwitchCondition = async (val: any) => {
    setState({currentSwitchCondition: val});

    try {
      await provider.putSetUnsetDownloadWithWifi();
      refetchUser();
      // dispatch(fetchGetUser());
    } catch (e: any) {
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  return {
    isShowSwipeUp,
    listQualityVideo,
    selectedQualityVideo,
    availableStorage,
    totalStorage,
    availableStorageInPercent,
    currentSwitchCondition,
    _handlerOnPressSetPreferedQualityVideo,
    _handlerSelectedQualityVideo,
    _handlerShowSwipeUp,
    _handlerHideSwipeUp,
    _handlerSwitchCondition,
  };
};

export default useVideoDownload;
