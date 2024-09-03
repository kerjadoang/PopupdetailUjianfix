import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDeleteVideo, fetchSaveVideo, fetchVideo} from '@redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
interface RootState {
  video: any;
  saveVideo: any;
}
const useFormVideoAnimation = (data: any, videoRef: any) => {
  const [downloaded, setDownloaded] = useState(false);
  const [hide, setHide] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [pause, setPause] = useState(true);
  const [modal, setModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [muted, setMuted] = useState(false);
  // const [dataVideo, setDataVideo] = useState(null);
  const dispatch = useDispatch();
  const [videoChoose, setVideoChoose] = useState(null);

  useEffect(() => {
    if (data?.platform === 'record' && data?.media?.media) {
      dispatch(fetchVideo(data?.media?.media));
    } else if (data?.platform === 'zoom' && data?.zoom?.media_id) {
      dispatch(fetchVideo(data?.zoom?.media_id));
    }
  }, [data, dispatch]);

  const video = useSelector((state: RootState) => state?.video?.data);
  useEffect(() => {
    if (video && video?.filecollection) {
      setVideoChoose(video?.filecollection[2]?.path_url);
    }
  }, [video, setVideoChoose]);
  const handleResolution = (value: any) => {
    setVideoChoose(video?.filecollection[value]?.path_url);
  };
  const handlePause = () => {
    setPause(!pause);
    setHide(!hide);
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

  const handleProgress = (progress: any) => {
    setCurrentTime(progress?.currentTime);
    setSliderValue(progress?.currentTime / duration);
  };

  const handleSliderChange = (value: any) => {
    setSliderValue(value);
    const newTime = value * duration;
    setCurrentTime(newTime);
  };
  const handleEnd = () => {
    setCurrentTime(0);
    setSliderValue(0);
    setPause(!pause);
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
    try {
      const deviceId = await AsyncStorage.getItem(Keys.deviceId);
      const requestBody = {
        file_id: chapterData?.file_id,
        device_id: deviceId,
        service: chapterData?.service,
      };
      await dispatch(fetchSaveVideo(requestBody));
      setModal(!modal);
      setSnackbar(!snackbar);
      setDownloaded(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const saveVideo = useSelector((state: RootState) => state?.saveVideo);
  const submitDelete = async () => {
    try {
      await dispatch(fetchDeleteVideo(saveVideo?.data?.id));
      setModal(!modal);
      setSnackbar(!snackbar);
      setDownloaded(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const show = () => {
    setModal(!modal);
  };

  const handleSnackbar = () => {
    setSnackbar(!snackbar);
  };

  return {
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
  };
};

export default useFormVideoAnimation;
