import {_handlerConvertDatePicker, useMergeState} from '@constants/functional';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  fetchDeleteVideo,
  fetchGetAllSessionClass,
  fetchSaveVideo,
  getAllSessionClassDestroy,
} from '@redux';
import dayjs from 'dayjs';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import globalProvider from '@services/global/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import provider from '@services/media/provider';
interface RootState {
  getAllSessionClass: any;
  loading: any;
}
const LIMIT_OFFSET = {
  limit: 10,
  page: 1,
};
const useHistoryAndRecordsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const {getAllSessionClass} = useSelector((state: RootState) => state);
  const SessionClass = getAllSessionClass?.data?.data;
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState([]);
  //modal
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowTypeFilter, setIsShowTypeFilter] = useState(false);
  const [isShowMapelFilter, setIsShowMapelFilter] = useState(false);
  const [isShowDateFilter, setIsShowDateFilter] = useState(false);
  //end modal
  //hooks
  const [selected, setSelected] = useState([]);
  const [pagination, setPagination] = useState(LIMIT_OFFSET);
  //filter
  const [type, setType] = useState<any>([]);
  const [mapel, setMapel] = useState([]);
  const [allMapel, setAllMapel] = useState([]);
  const [mapelName, setMapelName] = useState([]);
  const [date, setDate] = useState('');
  //search
  const [query, setQuery] = useState<string>('');
  const [queryVal, setQueryVal] = useState<string>('');
  const searchInputRef = useRef();
  //date
  const [state, setState] = useMergeState({
    datePickerType: false, // "from" or "until"
    datePickerFrom: false,
    datePickerUntil: false,
  });
  const [time, setTime] = useState({
    from: '',
    until: '',
  });
  const {datePickerFrom, datePickerUntil}: any = state;
  const [valueDatePicker, setValueDatePicker] = useState({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const datePickerConvertFrom = _handlerConvertDatePicker(datePickerFrom);
  const datePickerConvertUntil = _handlerConvertDatePicker(datePickerUntil);
  const [calendar, setCalendar] = useState({
    status: false,
    type: '',
  });
  const resetFilter = () => {
    setSelected([]);
    setMapel([]);
    setMapelName([]);
    setType([]);
    setDate('');
    setTime({from: '', until: ''});
    setState({datePickerFrom: '', datePickerUntil: ''});
  };
  const _handlerSetDatePickerFrom = (text: any) => {
    setState({datePickerFrom: text});
    setTime({...time, from: `${text.year}-${text.month}-${text.date}`});
  };
  const _handlerSetDatePickerUntil = (text: any) => {
    setState({datePickerUntil: text});
    setTime({...time, until: `${text.year}-${text.month}-${text.date}`});
  };
  const _handlerSetDate = () => {
    if (calendar.type === 'from') {
      _handlerSetDatePickerFrom(valueDatePicker);
    } else if (calendar.type === 'until') {
      _handlerSetDatePickerUntil(valueDatePicker);
    }
  };
  //end date
  useEffect(() => {
    if (queryVal.length > 0) {
      searchInputRef.current?.focus?.();
    }
  }, [queryVal]);
  useEffect(() => {
    if (query.length < 1) {
      setQueryVal('');
    }
  }, [query]);
  //end search
  const buttonCategory = [
    {
      id: 1,
      name: 'Semua Tipe',
      value:
        type?.length === 0
          ? null
          : type?.length < 2
          ? type.toString()
          : type?.length < 3
          ? type.length.toString() + ' Tipe'
          : 'Semua Tipe',
      onPress: () => {
        setIsShowTypeFilter(true);
      },
      isSelected: type?.length !== 0 ? true : false,
    },
    {
      id: 2,
      name: 'Semua mapel',
      value:
        mapelName?.length === 0
          ? null
          : mapelName?.length < 2
          ? mapelName.toString()
          : mapelName?.length < allMapel?.length
          ? mapelName.length.toString() + ' mapel'
          : 'Semua mapel',
      onPress: () => {
        setIsShowMapelFilter(true);
      },
      isSelected: mapel?.length !== 0 ? true : false,
    },
    {
      id: 3,
      name: 'Semua Tanggal',
      value:
        date == 'Pilih Tanggal'
          ? time.from + ' - ' + time.until
          : 'Semua Tanggal',
      onPress: () => {
        setIsShowDateFilter(true);
      },
      isSelected: date !== '' && date?.length !== 0 ? true : false,
    },
  ];
  const getDataMapel = async () => {
    const res = await globalProvider.getAllSubject();
    if (res?.status === 200) {
      const mapel = res?.data?.data;
      setAllMapel(mapel);
    }
  };
  useEffect(() => {
    getDataMapel();
  }, []);
  const fetchMoreData = () => {
    const {nextPage, loading} = getAllSessionClass;
    if (nextPage && !loading) {
      setPagination(prevState => ({
        ...prevState,
        page: prevState.page + 1,
      }));
      setIsLoading(false);
    }
  };
  useLayoutEffect(() => {
    setPagination(LIMIT_OFFSET);
  }, [selected, query]);
  //get list session class
  useEffect(() => {
    const isRecord = type.includes('Rekaman');
    const isLiveZoom = type.includes('Langsung (Zoom)');
    const isLiveGmeet = type?.includes('Langsung (Google Meet)');
    const platform = [];
    const tipe = [];
    if (isRecord) {
      tipe.push('record');
      platform.push('record');
    }
    if (isLiveGmeet || isLiveZoom) {
      tipe.push('live');
      if (isLiveGmeet) {
        platform.push('google_meet');
      }
      if (isLiveZoom) {
        platform.push('zoom');
      }
    }
    setIsLoading(true);
    const body = {
      ...pagination,
      name: '',
      orderColumn: '',
      sortType: '',
      status: 'finish,canceled',
      class: '',
      search: queryVal ? queryVal : '',
      subject: mapel ? mapel.toString() : '',
      type: tipe?.toString(),
      platform: platform?.toString(),
      startDate: date === 'Semua Tanggal' ? '' : time.from ? time.from : '',
      endDate: date === 'Semua Tanggal' ? '' : time.until ? time.until : '',
    };
    dispatch(
      fetchGetAllSessionClass(body, () => {
        setIsLoading(false);
      }),
    );
  }, [selected, pagination, queryVal, isFocused]);
  useLayoutEffect(() => {
    return () => {
      dispatch(getAllSessionClassDestroy());
    };
  }, [dispatch]);
  const _handlerGoBack = () => {
    navigation.goBack();
    dispatch(getAllSessionClassDestroy());
  };
  const basePath =
    Platform.OS === 'android'
      ? `${RNFS.DocumentDirectoryPath}`
      : RNFS.TemporaryDirectoryPath;
  let downloadTask = null;
  const onPressDownload = async (item: any) => {
    setListSelected(item);
    try {
      if (item?.media?.media) {
        setReady(true);
        setProgress(0);
        getVideoForLocal(item);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Video Belum Ada',
        });
      }
    } catch (error) {}
  };
  const downloadVideo = async (videoUrl, destinationPath, selected) => {
    const downloadOptions = {
      fromUrl: videoUrl,
      background: true,
      progressDivider: 1,
      toFile: destinationPath,
      begin: () => {},
      progress: res => {
        const progress = (res?.bytesWritten / res?.contentLength) * 100;
        setProgress(Math.round(progress));
      },
    };
    try {
      downloadTask = RNFS.downloadFile(downloadOptions);
      await downloadTask.promise;
      setReady(false);
      accessFilesInFolder(destinationPath, selected?.media?.media);
    } catch (error) {
      setReady(false);
    }
  };
  const getVideoForLocal = async selected => {
    try {
      const res = await provider.getVideoRecording(selected?.media?.media);
      if (res?.code === 100) {
        const videoUrl = res?.data?.path_url;
        if (!videoUrl) {
          setReady(false);
          Toast.show({
            type: 'error',
            text1: 'Video Rekaman Belum Ada',
          });
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
        const destinationPath = `${basePath}/savedFolder_${selected?.media?.media}.mp4`;
        await downloadVideo(videoUrl, destinationPath, selected);
        return destinationPath;
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
      service: 'sesi_kelas',
    };
    await dispatch(fetchSaveVideo(requestBody));
    setReady(false);
    setPagination(() => ({
      limit: 10,
      page: 1,
    }));
    Toast.show({
      type: 'success',
      text1: 'Video Berhasil Download',
    });
  };
  const submitDelete = async (data: any) => {
    try {
      const deviceId = await AsyncStorage.getItem(Keys.deviceId);
      await dispatch(fetchDeleteVideo(data?.media?.media, deviceId));
      const convertedFolderPath = `${basePath}/savedFolder_${data?.media?.media}.mp4`;
      await RNFS.unlink(convertedFolderPath);
      const folderExists = await RNFS.exists(convertedFolderPath);
      if (folderExists) {
        return;
      }
      const convertedPathsKey = `convertedFilePaths_${data?.media?.media}`;
      await AsyncStorage.removeItem(convertedPathsKey);
      Toast.show({
        type: 'success',
        text1: 'Video Berhasil Di Hapus',
      });
      setProgress(0);
      setPagination(() => ({
        limit: 10,
        page: 1,
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return {
    query,
    setQuery,
    queryVal,
    setQueryVal,
    searchInputRef,
    buttonCategory,
    navigation,
    isShowSearch,
    setIsShowSearch,
    isShowDateFilter,
    isShowMapelFilter,
    isShowTypeFilter,
    setIsShowDateFilter,
    setIsShowMapelFilter,
    setIsShowTypeFilter,
    type,
    setType,
    mapel,
    setMapel,
    setMapelName,
    onPressDownload,
    date,
    setDate,
    resetFilter,
    setTime,
    valueDatePicker,
    setValueDatePicker,
    datePickerConvertFrom,
    datePickerConvertUntil,
    datePickerFrom,
    datePickerUntil,
    calendar,
    setCalendar,
    _handlerSetDate,
    time,
    setState,
    selected,
    setSelected,
    allMapel,
    getAllSessionClass,
    fetchMoreData,
    SessionClass,
    _handlerGoBack,
    isLoading,
    ready,
    listSelected,
    submitDelete,
    progress,
  };
};
export default useHistoryAndRecordsScreen;
