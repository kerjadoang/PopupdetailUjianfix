import {useCallback, useEffect, useState} from 'react';
import provider from '@services/guru/provider';
import {fetchDeleteVideo, fetchSaveVideo, fetchMapel} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useRoute} from '@react-navigation/native';
import {Platform} from 'react-native';
import {AnyAction} from 'redux';

interface RootState {
  video: any;
  saveVideo: any;
}

const useFormRecordClassSession = (_: any, onRefresh: VoidCallBack) => {
  const route = useRoute();
  const {service_type, selected_sub_id, selected_sub_name}: any = route.params;
  const [recordings] = useState(null);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [modal, setModal] = useState(false);

  const [pause, setPause] = useState(false);
  const [resolution] = useState('854x480');
  const [newRecordings, setNewRecordings] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      await provider.getRecordSession(service_type);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [service_type]);
  const {mapel, getUser}: any = useSelector((state: RootState) => state);

  useEffect(() => {
    if (getUser) {
      dispatch(fetchMapel(getUser?.data?.class_id) as unknown as AnyAction);
    }
  }, [dispatch, getUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData, service_type]);

  const showModal = () => {
    setModal(!modal);
  };

  const submit = async (chapterData: any) => {
    try {
      setModal(!modal);
      if (chapterData?.lc_zoom?.media_id) {
        setProgress(0);
        setReady(true);
        getVideoForLocal(chapterData);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Video Rekaman Belum Ada',
        });
      }
    } catch (error) {}
  };

  const basePath =
    Platform.OS === 'android'
      ? `${RNFS.DocumentDirectoryPath}`
      : RNFS.TemporaryDirectoryPath;

  let downloadTask = null;

  const downloadVideo = async (
    videoUrl: any,
    destinationPath: any,
    selected: any,
  ) => {
    const downloadOptions = {
      fromUrl: videoUrl,
      background: true,
      progressDivider: 1,
      toFile: destinationPath,
      begin: () => {},
      progress: (res: any) => {
        const progressRes = (res?.bytesWritten / res?.contentLength) * 100;
        setProgress(Math.round(progressRes));
      },
    };

    try {
      downloadTask = RNFS.downloadFile(downloadOptions);
      await downloadTask.promise;
      setDownloaded(true);
      setReady(false);
      accessFilesInFolder(destinationPath, selected?.lc_zoom?.media_id);
    } catch (error) {
      setReady(false);
    }
  };

  const getVideoForLocal = async (selected: any) => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    try {
      const response = await api.get(
        `/media/v1/video/recording/${selected?.lc_zoom?.media_id}/${resolution}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        const videoUrl = response?.data?.data?.path_url_mpfour;
        if (!videoUrl) {
          setReady(false);
          return;
        }
        const urlExtension = videoUrl.split('.').pop();
        if (urlExtension !== 'mp4') {
          Toast.show({
            type: 'error',
            text1: 'Video Rekaman Belum Ada',
          });
          setReady(false);
          return;
        }
        const destinationPath = `${basePath}/savedFolder_${selected?.lc_zoom?.media_id}.mp4`;
        await downloadVideo(videoUrl, destinationPath, selected);
        return destinationPath;
      }
    } catch (error) {
      setReady(false);
    }
  };

  const accessFilesInFolder = async (folderPath: any, id: any) => {
    setLoading(true);
    const convertedPathsKey = `convertedFilePaths_${id}`;
    await AsyncStorage.setItem(convertedPathsKey, JSON.stringify(folderPath));
    const deviceId = await AsyncStorage.getItem(Keys.deviceId);
    const requestBody = {
      file_id: id,
      device_id: deviceId,
      service: 'guru',
    };
    await dispatch(fetchSaveVideo(requestBody));
    setDownloaded(true);
    setReady(false);
    onRefresh();
    setLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Video Berhasil Download',
    });
  };

  const submitDelete = async (chapterData: any) => {
    const deviceId = await AsyncStorage.getItem(Keys.deviceId);
    await dispatch(fetchDeleteVideo(chapterData?.lc_zoom?.media_id, deviceId));
    const convertedFolderPath = `${basePath}/savedFolder_${chapterData?.lc_zoom?.media_id}.mp4`;
    await RNFS.unlink(convertedFolderPath);
    const convertedPathsKey = `convertedFilePaths_${chapterData?.lc_zoom?.media_id}`;
    await AsyncStorage.removeItem(convertedPathsKey);
    setModal(!modal);
    setDownloaded(false);
    setProgress(0);
    onRefresh();
    Toast.show({
      type: 'success',
      text1: 'Video Berhasil Dihapus',
    });
  };

  return {
    recordings,
    downloaded,
    progress,
    ready,
    modal,
    showModal,
    submit,
    submitDelete,
    pause,
    setPause,
    newRecordings,
    useSelector,
    dispatch,
    mapel,
    selected_sub_id,
    selected_sub_name,
    setNewRecordings,
    loading,
  };
};

export default useFormRecordClassSession;
