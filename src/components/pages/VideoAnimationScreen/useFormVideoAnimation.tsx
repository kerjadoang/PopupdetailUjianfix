import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDeleteVideo, fetchImage, fetchSaveVideo, fetchVideo} from '@redux';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import RNFS from 'react-native-fs';
import api from '@api/index';
import provider from '@services/lms/provider';
import {Platform} from 'react-native';
interface RootState {
  video: any;
  saveVideo: any;
  image: any;
}
const useFormVideoAnimation = (chapterData: any, videoRef: any, type: any) => {
  const [downloaded, setDownloaded] = useState(false);
  const [hide, setHide] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [pause, setPause] = useState(true);
  const [modal, setModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoForLocal, setVideoForLocal] = useState('');
  const dispatch = useDispatch();
  const [videoChoose, setVideoChoose] = useState(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [quality, setQuality] = useState(1080);
  const [firstTouch, setFirstTouch] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [dataXP, setDataXP] = useState(null);
  const [endShow, setEndShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadCanceled, setDownloadCanceled] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [countHit, setCountHit] = useState<number>(0);
  const [haveVideoToLoad, setHaveVideoToLoad] = useState<boolean>(false);
  const parseTypeXP = () => {
    if (type?.toLowerCase() === 'ptn') {
      return 'ptn';
    }
    if (type?.toLowerCase() === 'guru') {
      return 'guru';
    }
    return 'learn';
  };
  const parseActivityXP = () => {
    if (parseTypeXP() === 'ptn') {
      return 'rekaman_class_ptn';
    }
    if (parseTypeXP() === 'guru') {
      return 'rekaman_class_guru';
    }
    return 'video_animasi';
  };
  const parseReferenceId = () => {
    if (chapterData?.lc_zoom?.media_id) {
      return chapterData?.lc_zoom?.media_id.toString();
    }
    return chapterData?.id?.toString();
  };
  useEffect(() => {
    retrieveConvertedFilePaths(
      chapterData?.file_id
        ? chapterData?.file_id
        : chapterData?.lc_zoom?.media_id,
    );
    if (!videoForLocal) {
      const fetchData = async () => {
        if (chapterData?.file_id || chapterData?.file) {
          dispatch(fetchVideo(chapterData?.file_id || chapterData?.file));
        } else {
          dispatch(fetchVideo(chapterData?.lc_zoom?.media_id));
        }
      };
      fetchData();
    }
  }, [
    chapterData?.file_id,
    chapterData?.id,
    chapterData?.lc_zoom?.media_id,
    dispatch,
    countHit,
  ]);
  useEffect(() => {
    if (chapterData?.platform === 'record' && chapterData?.media?.media) {
      dispatch(fetchVideo(chapterData?.media?.media));
    } else if (
      chapterData?.platform === 'zoom' &&
      chapterData?.zoom?.media_id
    ) {
      dispatch(fetchVideo(chapterData?.zoom?.media_id));
    }
  }, [chapterData, dispatch, countHit]);
  useEffect(() => {
    if (chapterData?.user?.avatar) {
      dispatch(fetchImage(chapterData?.user?.avatar));
    }
  }, [chapterData?.user?.avatar, dispatch]);
  const video = useSelector((state: RootState) => state?.video?.data?.data);
  const image = useSelector((state: RootState) => state?.image?.data);
  useEffect(() => {
    if (video && video?.filecollection) {
      setVideoChoose(video?.filecollection[2]?.path_url);
      setVideoQuality(video?.filecollection.reverse());
    }
  }, [video, setVideoChoose]);
  const handleResolution = (value: any) => {
    // setVideoChoose(video?.filecollection[value]?.path_url);
    // setResolution(video?.filecollection[value]?.resolution);
    setQuality(value);
  };
  const handleControls = () => {
    if (firstTouch) {
      setFirstTouch(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);
    } else {
      setFirstTouch(true);
      if (!firstTouch) {
        setHide(false);
        setTimeout(() => {
          setHide(true);
        }, 3000);
      }
    }
    if (!hide) {
      setTimeout(() => {
        setHide(!hide);
      }, 3000);
    } else {
      setHide(!hide);
      setTimeout(() => {
        setHide(true);
      }, 3000);
    }
  };
  const startXP = async () => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const requestBody = {
      type: parseTypeXP(),
      activity: parseActivityXP(),
      reference_id: parseReferenceId(),
    };
    const response = await api.post(
      '/uaa/v1/user/start-vid-xp-timer',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      },
    );
    if (response.status === 200) {
      setDataXP(response?.data);
    }
  };
  const endXP = async () => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    const response = await api.get(
      `/uaa/v1/user/end-vid-xp-timer/${dataXP?.data?.id}`,
      {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      },
    );
    if (response?.status === 200) {
    }
  };
  const postClassSessionAccessRecord = async () => {
    try {
      const body = {
        class_session_id: chapterData?.id,
        media: chapterData?.media?.media,
      };
      await provider.postClassSessionAccessRecord(body);
    } catch (_) {}
  };
  const handlePause = () => {
    if (video?.status !== 'finish') {
      setCountHit((prev: number) => prev + 1);
      if (video?.status === 'process') {
        setShowPopUp(true);
      }
      return;
    }
    handleControls();
    setPause(!pause);
    if (pause) {
      startXP();
    }
    postClassSessionAccessRecord();
  };
  const handleSkipForward = () => {
    const newTime = currentTime + 5;
    if (newTime < duration) {
      setCurrentTime(newTime);
      setSliderValue(newTime / duration);
      videoRef?.current?.seek(newTime);
    }
  };
  const handleSkipBackward = () => {
    const newTime = currentTime - 5;
    if (newTime >= 0) {
      setCurrentTime(newTime);
      setSliderValue(newTime / duration);
      videoRef?.current?.seek(newTime);
    }
  };
  const timeStringToInt = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString
      .split(':')
      .map(part => parseInt(part, 10));
    return hours * 3600 + minutes * 60 + seconds;
  };
  const handleSectionTime = (value: any) => {
    const timeInt = timeStringToInt(value);
    const newTime = timeInt;
    if (newTime >= 0) {
      setCurrentTime(newTime);
      setSliderValue(newTime / duration);
      videoRef?.current?.seek(newTime);
    }
  };
  const handleLoad = (meta: any) => {
    setDuration(meta?.duration);
  };
  const handleProgress = useCallback(
    progress => {
      setCurrentTime(progress?.currentTime);
      setSliderValue(progress?.currentTime / duration);
    },
    [duration],
  );
  const handleSpeed = (item: any) => {
    setSpeed(item?.speed);
    videoRef.current?.setNativeProps({speed: item?.speed});
  };
  const handleSliderChange = (value: any) => {
    setSliderValue(value);
    const newTime = value * duration;
    setCurrentTime(newTime);
  };
  const handleEnd = () => {
    endXP();
    setCurrentTime(0);
    setSliderValue(0);
    videoRef?.current?.seek(0);
    setTimeout(() => {
      setPause(true);
    }, 500);
    setEndShow(type === 'soal' ? true : false);
  };
  const handleSlidingComplete = (value: any) => {
    const newTime = value * duration;
    setCurrentTime(newTime);
    videoRef?.current?.seek(newTime);
  };
  const formatTime = (timeInSeconds: any) => {
    const hours = Math?.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math?.floor(timeInSeconds % 60);
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  };
  const getTimeDisplay = () => {
    return `${formatTime(currentTime)} / ${formatTime(duration)}`;
  };
  const handleMute = () => {
    setMuted(!muted);
  };
  const submit = async () => {
    setModal(!modal);
    setProgress(0);
    setReady(true);
    getVideoForLocal(
      chapterData?.file_id
        ? chapterData?.file_id
        : chapterData?.lc_zoom?.media_id,
    );
  };
  const saveVideo = useSelector((state: RootState) => state?.saveVideo);
  let downloadTask = null;
  const cancelDownload = id => {
    RNFS.stopDownload(id);
    setProgress(0);
    setReady(false);
  };
  const basePath =
    Platform.OS === 'android'
      ? `${RNFS.DocumentDirectoryPath}`
      : RNFS.TemporaryDirectoryPath;

  const getVideoForLocal = async id => {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    try {
      const response = await api.get(
        `/media/v1/video/recording/${id}/${'854x480'}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        const videoUrl =
          response?.data?.data?.path_url_mpfour || video.path_url;
        const destinationPath = `${basePath}/savedFolder_${id}.mp4`;
        const folderExists = await RNFS.exists(destinationPath);
        if (folderExists) {
          try {
            await RNFS.unlink(destinationPath);
          } catch (error) {
            setReady(false);
            return;
          }
        }
        const downloadOptions = {
          fromUrl: videoUrl,
          background: true,
          progressDivider: 1,
          toFile: destinationPath,
          begin: () => {},
          progress: (res: {
            bytesWritten: number;
            contentLength: number;
            jobId: SetStateAction<null>;
          }) => {
            const progress = (res?.bytesWritten / res?.contentLength) * 100;
            setProgress(Math.round(progress));
            setJobId(res?.jobId);
          },
        };
        setDownloadCanceled(false);
        downloadTask = RNFS.downloadFile(downloadOptions);
        downloadTask.promise.then(() => {
          if (!downloadCanceled) {
            setDownloadCanceled(false);
            setReady(true);
            accessFilesInFolder(destinationPath, id);
          } else {
            setReady(false);
          }
        });
      } else {
        setReady(false);
      }
    } catch (error) {
      setReady(false);
    }
  };
  const accessFilesInFolder = async (folderPath, id) => {
    const convertedPathsKey = `convertedFilePaths_${id}`;
    await AsyncStorage.setItem(convertedPathsKey, JSON.stringify(folderPath));
    const deviceId = await AsyncStorage.getItem(Keys.deviceId);
    const requestBody = {
      file_id: id,
      device_id: deviceId,
      service: chapterData?.service ? chapterData?.service : 'materi_sekolah',
    };
    await dispatch(fetchSaveVideo(requestBody));
    setDownloaded(true);
    setReady(false);
    if (!snackbar) {
      setSnackbar(!snackbar);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
    }
    retrieveConvertedFilePaths(
      chapterData?.file_id
        ? chapterData?.file_id
        : chapterData?.lc_zoom?.media_id,
    );
  };
  const retrieveConvertedFilePaths = async chapterId => {
    setLoading(true);
    const convertedPathsKey = `convertedFilePaths_${chapterId}`;
    const storedPaths = await AsyncStorage.getItem(convertedPathsKey);
    if (storedPaths) {
      const convertedFilePaths = JSON.parse(storedPaths);
      setVideoForLocal(convertedFilePaths);
      setDownloaded(true);
      setLoading(false);
    }
    setLoading(false);
  };
  const submitDelete = async () => {
    const convertedFolderPath = `${basePath}/savedFolder_${
      chapterData?.file_id
        ? chapterData?.file_id
        : chapterData?.lc_zoom?.media_id
    }.mp4`;
    await RNFS.unlink(convertedFolderPath);
    const folderExists = await RNFS.exists(convertedFolderPath);
    if (folderExists) {
      return;
    }
    const deviceId = await AsyncStorage.getItem(Keys.deviceId);
    const convertedPathsKey = `convertedFilePaths_${
      chapterData?.file_id
        ? chapterData?.file_id
        : chapterData?.lc_zoom?.media_id
    }`;
    await AsyncStorage.removeItem(convertedPathsKey);
    await dispatch(fetchDeleteVideo(saveVideo?.data?.id, deviceId));
    setModal(!modal);
    if (!snackbar) {
      setSnackbar(!snackbar);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
    }
    setDownloaded(false);
    setProgress(0);
  };
  const show = () => {
    setModal(!modal);
  };
  const handleSnackbar = () => {
    setSnackbar(!snackbar);
  };
  const [videoQuality, setVideoQuality] = useState<any>(null);
  const handleFullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };
  return {
    handleFullScreen,
    pause,
    handlePause,
    sliderValue,
    handleSkipForward,
    handleSkipBackward,
    handleLoad,
    handleProgress,
    handleSliderChange,
    handleEnd,
    handleSlidingComplete,
    getTimeDisplay,
    handleMute,
    fullScreen,
    muted,
    hide,
    video,
    handleResolution,
    videoChoose,
    handleSectionTime,
    submit,
    show,
    modal,
    handleSnackbar,
    snackbar,
    downloaded,
    submitDelete,
    image,
    progress,
    ready,
    videoQuality,
    handleSpeed,
    speed,
    handleControls,
    videoForLocal,
    endXP,
    endShow,
    setEndShow,
    loading,
    cancelDownload,
    setDownloadCanceled,
    jobId,
    showPopUp,
    setShowPopUp,
    haveVideoToLoad,
    setHaveVideoToLoad,
    quality,
    setQuality,
  };
};
export default useFormVideoAnimation;
