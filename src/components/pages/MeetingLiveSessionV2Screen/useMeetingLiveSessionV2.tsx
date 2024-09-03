import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PhoneIcon from '@assets/svg/ic24_phone.svg';
import ChatIcon from '@assets/svg/ic24_chat.svg';
import AttachmentIcon from '@assets/svg/ic24_attachment.svg';
import Colors from '@constants/colors';
import {useCountup} from '@hooks/useCountup';
import {AxiosResponse} from 'axios';
import {
  ICheckRequestCallResponse,
  ISendRequestCallResponse,
} from '@services/guru/type';
import provider from '@services/guru/provider';
import providerLms from '@services/lms/provider';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import SadRobot from '@assets/svg/maskot_12.svg';
import ChevronDown from '@assets/svg/ic16_chevron_down_white.svg';
import VolumeIcon from '@assets/svg/ic24_volume_on_white.svg';
import VolumeMuteIcon from '@assets/svg/ic24_volume_off_white.svg';
import systemSetting from 'react-native-system-setting';
import {CallStatusStateType, StatusType, ZoomIframeType} from './types';
import {
  _handlerCameraPermission,
  _handlerGalleryPermission,
  dismissLoading,
  requestMicrophonePermission,
  showErrorToast,
  showLoading,
  useMergeState,
  limitImageInMb,
  handlerImageFileValidation,
  rdxDispatch,
} from '@constants/functional';
import {styles} from './styles';

import IconCameraBlue from '@assets/svg/ic_camera_blue.svg';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiUploadFormData,
  apiUploadingStatus,
} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {clearWebviewAudio, detectEndMeetingIJS, zoomIframeUrl} from './utils';
import {Header} from '@components/atoms';
import {getToken} from '@hooks/getToken';
import {fetchClassSessionDetail} from '@redux';
import {ParamList} from 'type/screen';
import WebView from 'react-native-webview';
// status call zoom
// 0 = ga di apa2in | initial,
// 1 = approved,
// 2 = rejected,
// 3 = closed,
// 4 = waiting approveal

export const useMeetingLiveSessionV2 = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'MeetingLiveSessionScreen'>>();
  const webViewRef = useRef<WebView>(null);
  const route: any = useRoute();
  const {card_id, type} = route?.params || false;
  const [zoomUrl, setZoomUrl] = useState<string>('');
  const [callStatus, setCallStatus] = useState<CallStatusStateType>({
    selected: {},
    status: [
      {
        id: '0',
        call_request: 0,
        label: 'initial',
        title: '',
      },
      {
        id: '1',
        call_request: 1,
        label: 'approved',
        title: 'Sesi panggilan dengan Guru sedang berlangsung.',
        actionLabel: '',
      },
      {
        id: '2',
        call_request: 2,
        label: 'rejected',
        title: 'Maaf, permintaan panggilan ditolak oleh Guru.',
        actionLabel: 'Tutup',
        onActionLabel: () => setShowToast(false),
      },
      {
        id: '3',
        call_request: 3,
        label: 'closed',
        title: '',
        actionLabel: '',
      },
      {
        id: '4',
        call_request: 4,
        label: 'pending',
        title: 'Menunggu Guru membuka mikrofon',
        actionLabel: 'Batal',
        onActionLabel: async () => {
          await cancellRequestCall();
          setUserUUID('');
          setShowToast(false);
        },
      },
    ],
  });

  const [showToast, setShowToast] = useState<boolean>(false);
  const [zoomLoaded, setZoomLoaded] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [userUUID, setUserUUID] = useState<string>('');
  const [dataXP, setDataXP] = useState<any>();
  const [volumeDevice, setVolumeDevice] = useState<number>(0.4);

  const isApproved = callStatus?.selected?.label === 'approved';
  const isRejected = callStatus?.selected?.label === 'rejected';
  const {getUser}: any = useSelector((state: RootState) => state);
  const joinLiveClassSession = useSelector(
    (state: RootState) => state.joinLiveClassSession,
  );
  const classDetail = useSelector(
    (state: RootState) => state.classSessionDetail,
  ).data;

  const {minutes, seconds, hours} = useCountup(!isApproved);
  const {classData} = joinLiveClassSession;
  const isPTN = type?.toLowerCase() === 'ptn';

  const parseServiceType = () => {
    if (type?.toLowerCase() === 'ptn') {
      return 'ptn';
    }
    if (type?.toLowerCase() === 'guru') {
      return 'guru';
    }
    return 'LMS';
  };

  const parseActivityXP = () => {
    if (parseServiceType() === 'ptn') {
      return 'live_class_ptn';
    }

    if (parseServiceType() === 'guru') {
      return 'live_class_guru';
    }
    return 'live_class_lms';
  };

  const parseReferenceId = () => {
    if (!card_id) {
      return;
    }
    return card_id.toString();
  };

  const [state, setState] = useMergeState({
    isLoading: false,
    popupData: false,
    isShowPopup: false,
    isShowSwipeUpAttachment: false,
    isShowToastAttachment: false,
  });

  const {
    isLoading,
    popupData,
    isShowPopup,
    isShowSwipeUpAttachment,
    isShowToastAttachment,
  }: any = state;

  const initialisationSwipeUpAttachment = [
    {
      icon: <IconCameraBlue style={{marginRight: 12}} width={24} height={24} />,
      label: 'Ambil dari Kamera',
      onPress: () => {
        setState({isShowSwipeUpAttachment: false});

        setTimeout(() => {
          _handlerOpenCamera();
        }, 500);
      },
    },
    {
      icon: (
        <IconGalleryBlue style={{marginRight: 12}} width={24} height={24} />
      ),
      label: 'Ambil dari Galeri',
      onPress: () => {
        setState({isShowSwipeUpAttachment: false});

        setTimeout(() => {
          _handlerOpenGallery();
        }, 500);
      },
    },
  ];

  const _handlerOpenCamera = async () => {
    const permit = await _handlerCameraPermission();

    if (!permit) {
      return;
    }

    const result: any = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
    });

    if (result.didCancel) {
      return;
    }

    validateFile(result);
  };

  const _handlerOpenGallery = async () => {
    try {
      const permit = await _handlerGalleryPermission();

      if (!permit) {
        return;
      }

      const result: any = await launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
      });

      if (result.didCancel) {
        return;
      }

      validateFile(result);
    } catch (e) {}
  };

  const validateFile = (result: any) => {
    const resultHandler = handlerImageFileValidation(result);
    // console.log('cek result handler ', resultHandler);
    if (resultHandler === 'Format Not Valid') {
      setState({
        popupData: {
          title: 'Peringatan!',
          description: 'Extensi file harus jpg, jpeg, atau png!',
          labelConfirm: 'Mengerti',
          onPressConfirm: () => {
            setState({isShowPopup: false});
          },
        },
        isShowPopup: true,
      });
      return;
    }

    if (resultHandler === 'Higher Than Max Limit') {
      setState({
        popupData: {
          title: 'Peringatan!',
          description: `Ukuran maksimal foto ${limitImageInMb}mb!`,
          labelConfirm: 'Mengerti',
          onPressConfirm: () => {
            setState({isShowPopup: false});
          },
        },
        isShowPopup: true,
      });
      return;
    }

    _handlerUploadAttachment(result?.assets);
  };

  const _handlerUploadAttachment = async (
    asset: ImagePickerResponse['assets'],
  ) => {
    try {
      setState({isLoading: true});

      const formData = new FormData();
      formData.append('attachment', {
        name: asset?.[0]?.fileName,
        type: asset?.[0]?.type,
        uri:
          Platform.OS === 'android'
            ? asset?.[0]?.uri
            : asset?.[0]?.uri?.replace('file://', ''),
      });
      formData.append('type', 'meeting live session');
      formData.append('sub_type', 'attachment');
      const resImage = await apiUploadFormData({
        url: URL_PATH.upload_image,
        body: formData,
      });
      await apiUploadingStatus({
        fileId: resImage?.ID,
        mediaType: 'image',
        retry: 3,
      });
      const mediaId = resImage?.ID;
      _handlerSubmitAttachment('attachment', '', mediaId);
    } catch (error: any) {
      showErrorToast(error.toString() || 'Terjadi Kesalahan');
    } finally {
      setState({isLoading: false});
    }
  };

  const _handlerSubmitAttachment = async (
    type: any,
    message: any,
    mediaId: any,
  ) => {
    const requestBody: any = {
      academi_class_session_id: classDetail?.data?.ID,
      type: type,
      message: message,
      media_id: mediaId,
    };

    try {
      await providerLms.postMeetingLiveSessionMessage(
        isPTN ? 'ptn' : 'guru',
        requestBody,
      );
      setState({
        isLoading: false,
        isShowToastAttachment: true,
      });

      setTimeout(() => {
        setState({
          isShowToastAttachment: false,
        });
      }, 1500);
    } catch (e: any) {
      const errorData = e?.response?.data;
      setState({
        isLoading: false,
      });
      showErrorToast(errorData?.message || 'Internal Server Error');
    }
  };

  const startVidXP = () => {
    setTimeout(async () => {
      try {
        showLoading();
        if (!parseReferenceId()) {
          return;
        }

        const params = {
          activity: parseActivityXP(),
          type: parseServiceType(),
          reference_id: parseReferenceId(),
        };
        const result = await apiPost({
          url: URL_PATH.start_vid_xp_timer,
          body: params,
        });
        setDataXP(result);
        // console.log('startVidXP result : ', result);
      } catch (error) {
        // console.log('startVidXP error : ', error);
      } finally {
        dismissLoading();
      }
    }, 2000);
  };

  const endVidXP = async () => {
    if (!parseReferenceId() || !dataXP?.id) {
      return;
    }

    try {
      // console.log('endVidXP ID : ', dataXP?.id);
      await apiGet({
        url: URL_PATH.end_vid_xp_timer(dataXP?.id || ''),
      });
    } catch (error) {
      // console.log('endVidXP error : ', error);
    }
  };

  const sendRequestCall = async () => {
    try {
      if (showToast) {
        return;
      }

      await requestMicrophonePermission();
      // console.log('mic permission : ', micPerm);
      const res: AxiosResponse<ISendRequestCallResponse> =
        await provider.sendRequestCall(
          isPTN ? 'ptn' : 'guru',
          classDetail?.data?.ID,
        );

      const selectedStatus = getSelectedStatus(res);

      //show toast waiting to approve call
      setUserUUID(res.data?.data?._id!);
      setShowToast(true);

      setCallStatus(prevState => ({
        ...prevState,
        selected: selectedStatus,
      }));
    } catch (e) {
      // console.log(e);
    }
  };

  const checkRequestCall = async () => {
    try {
      const res: AxiosResponse<ICheckRequestCallResponse> =
        await provider.checkRequestCall(userUUID);

      const selectedStatus = getSelectedStatus(res);

      setCallStatus(prevState => ({
        ...prevState,
        selected: selectedStatus,
      }));

      // call closed || selectedStatus is undefined
      if (!selectedStatus || selectedStatus?.call_request === 3) {
        setShowToast(false);
        setUserUUID('');
        return;
      }

      // call rejected
      if (selectedStatus?.call_request === 2) {
        setUserUUID('');
      }

      setShowToast(true);
    } catch (e) {
      // console.log(e);
    }
  };

  const cancellRequestCall = useCallback(async () => {
    try {
      await apiDelete({
        url: URL_PATH.delete_call_request(classDetail?.data?.ID),
        tags: 'cancellRequestCall',
      });
    } catch (error) {}
  }, [classDetail?.data]);

  // listen status call
  useEffect(() => {
    let requestCallCheck = setInterval(async () => {
      if (userUUID) {
        await checkRequestCall();
      }
    }, 3000);
    if (!userUUID) {
      clearInterval(requestCallCheck);
    }
    return () => clearInterval(requestCallCheck);
  }, [userUUID]);

  const getSelectedStatus = (res: any) => {
    if (res?.data?.data?.user_id === 0) {
      return {};
    }

    return res?.data?.data
      ? callStatus?.status?.find(
          (item: StatusType) =>
            item?.call_request === res?.data?.data?.call_request,
        )
      : {};
  };

  // init zoom & join meeting
  useEffect(() => {
    joinMeeting();
  }, []);

  // listener zoom
  useEffect(() => {
    if (!zoomLoaded) {
      return;
    }

    startVidXP();
  }, [zoomLoaded]);

  // prevent back button
  useEffect(() => {
    const backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        _handlerOnPressLeaveMeetingSession();
        return true;
      },
    );
    return () => {
      backHandlerListener.remove();
    };
  }, []);

  // listen status class
  useEffect(() => {
    if (!zoomLoaded) {
      return;
    }

    // if data is empty then leave liveclass
    if (!classDetail?.data) {
      leaveLiveClassSession();
      return;
    }

    const checkStatusClass = setInterval(() => {
      rdxDispatch(fetchClassSessionDetail(parseServiceType(), card_id));
      // 300000 5 menit
    }, 300000);

    return () => clearInterval(checkStatusClass);
  }, [classDetail?.data, zoomLoaded]);

  const joinMeeting = async () => {
    try {
      showLoading();

      const iframeProps: ZoomIframeType = {
        email: getUser?.data?.email,
        name: getUser?.data?.full_name,
        meeting_id: classData?.data?.id_zoom || '',
        password: classData?.data?.passWord || '',
        signature: classData?.data?.signature || '',
        id_session: classDetail?.data?.ID?.toString() || '',
        token: await getToken(),
        type: 'murid',
      };

      const urlZoom = zoomIframeUrl(iframeProps);

      // console.log('cek join meeting zoom ', urlZoom);

      setZoomUrl(urlZoom);
    } catch (error: any) {
      showErrorToast(error?.toString() || 'Terjadi Kesalahan');
      // setZoomLoaded(false);
    } finally {
      // dismissLoading();
    }
  };

  const leaveLiveClassSession = async () => {
    try {
      webviewClearAudio();
      await endVidXP();
      navigation.pop();
    } catch (e) {
      // console.log(e);
    }
  };

  const setVolume = async () => {
    try {
      const vol = await systemSetting.getVolume('call');
      // console.log('cek volume ', vol);
      if (vol > 0.125) {
        setVolumeDevice(0.125);
        systemSetting.setVolume(0.125, {showUI: true, type: 'call'});
        return;
      }
      setVolumeDevice(0.6);
      systemSetting.setVolume(0.6, {showUI: true, type: 'call'});
    } catch (e) {
      // console.log('error get volume ', e);
    }
  };

  const _handlerHideSwipeUpAttachment = () => {
    setState({isShowSwipeUpAttachment: false});
  };

  const _handlerShowSwipeUpAttachment = () => {
    setState({isShowSwipeUpAttachment: true});
  };

  const _renderSwipeUpAttachment = () => {
    return (
      <View style={styles.swipeUpContainer}>
        {initialisationSwipeUpAttachment?.map((value: any, index: any) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.swipeUpContent}
              onPress={value?.onPress}>
              {value?.icon}
              <Text style={styles.swipeUpTitle}>{value?.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _handlerOnPressLeaveMeetingSession = () => {
    setState({
      popupData: {
        icon: SadRobot,
        title: 'Keluar Kelas',
        description:
          'Apakah kamu yakin untuk keluar dari Live Kelas yang sedang berlangsung?',
        labelConfirm: 'Keluar',
        labelCancel: 'Batal',
        onPressConfirm: () => leaveLiveClassSession(true),
        onPressCancel: () => setState({isShowPopup: false}),
      },
      isLoading: false,
      isShowPopup: true,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          styleIconLeft={{marginLeft: 12}}
          iconLeft={volumeDevice > 0.125 ? <VolumeIcon /> : <VolumeMuteIcon />}
          onPressIconLeft={setVolume}
          labelContent={
            <Pressable
              onPress={() => setShowDescription(true)}
              style={styles.headerLabelContainer}>
              <Text style={styles.headerLabel}>
                {classDetail?.data?.subject?.name}
              </Text>
              <ChevronDown />
            </Pressable>
          }
          paddingHorizontal={0}
          colorLabel={Colors.white}
          styleContainer={styles.headerContainer}
          onPressIconRight={() => _handlerOnPressLeaveMeetingSession()}
          iconRight={<Text style={styles.keluarLabel}>Keluar</Text>}
        />
      ),
    });
  }, [volumeDevice, dataXP]);

  const menuItems = [
    {
      id: '1',
      label: 'Telepon Guru',
      icon: <PhoneIcon />,
      onPress: sendRequestCall,
      disabled: !zoomLoaded,
    },
    {
      id: '2',
      label: 'Kirim Pesan',
      icon: <ChatIcon />,
      onPress: () => {
        navigation?.navigate('MeetingLiveSessionChatScreen', {
          service_type: parseServiceType(),
          academi_class_session_id: classDetail?.data?.ID,
          card_id: card_id,
          // academi_class_session_id: 55, // user brama
        });
      },
      disabled: !zoomLoaded || !classDetail?.data?.ID,
    },
    {
      id: '3',
      label: 'Kirim Gambar',
      icon: <AttachmentIcon />,
      onPress: () => _handlerShowSwipeUpAttachment(),
      disabled: !zoomLoaded || !classDetail?.data?.ID,
    },
  ];

  const onWebviewLoad = () => {
    // console.log('onWebviewLoad');
    setZoomLoaded(true);
    return detectEndMeetingIJS;
  };

  const onWebviewLoadStart = () => {
    // console.log('onWebviewLoadStart');
    // showLoading();
  };

  const onWebviewLoadEnd = () => {
    // console.log('onWebviewLoadEndStart');

    dismissLoading();
  };

  /**
   * This function is called before the navigation action.
   * Here, if you change the location of your webview, it will stop the audio.
   */
  const webviewClearAudio = useCallback(() => {
    if (!webViewRef.current) {
      return;
    }

    const pause = clearWebviewAudio();
    webViewRef.current.injectJavaScript(pause);
  }, [webViewRef.current]);

  const onWebviewMessage = useCallback(() => {
    // console.log('cekk on Message ', JSON.stringify(event.nativeEvent.data));
  }, [webViewRef.current]);

  return {
    webViewRef,
    zoomLoaded,
    leaveLiveClassSession,
    setState,
    classDetail,
    showToast,
    callStatus,
    isApproved,
    minutes,
    hours,
    seconds,
    isRejected,
    isShowToastAttachment,
    menuItems,
    isLoading,
    isShowPopup,
    popupData,
    isShowSwipeUpAttachment,
    _handlerHideSwipeUpAttachment,
    _renderSwipeUpAttachment,
    showDescription,
    setShowDescription,
    zoomUrl,
    onWebviewLoadStart,
    onWebviewLoad,
    onWebviewLoadEnd,
    onWebviewMessage,
  };
};
