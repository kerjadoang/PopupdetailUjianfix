/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import ZoomUs, {ZoomUsVideoView} from 'react-native-zoom-us';

import PhoneIcon from '@assets/svg/ic24_phone.svg';
import ChatIcon from '@assets/svg/ic24_chat.svg';
import AttachmentIcon from '@assets/svg/ic24_attachment.svg';
import Colors from '@constants/colors';
import {Header} from '@components/atoms/Header';
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
import {PopUp, SwipeUp} from '@components/atoms';
import SadRobot from '@assets/svg/maskot_12.svg';
import ChevronDown from '@assets/svg/ic16_chevron_down_white.svg';
import VolumeIcon from '@assets/svg/ic24_volume_on_white.svg';
import VolumeMuteIcon from '@assets/svg/ic24_volume_off_white.svg';
import systemSetting from 'react-native-system-setting';
import ClassDetail from './components/ClassDetail';
import BottomMenu from './components/BottomMenu';
import {
  _handlerCameraPermission,
  _handlerGalleryPermission,
  limitImageInMb,
  listFileImageExtension,
  maximalLimitImage,
  requestMicrophonePermission,
  useMergeState,
} from '@constants/functional';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import IconCameraBlue from '@assets/svg/ic_camera_blue.svg';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {IUploadImageResponse} from '@services/media/type';
import {useUploadImage} from '@services/media';
import Fonts from '@constants/fonts';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {apiGet, apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

type StatusType = {
  id?: any;
  label?: 'pending' | 'approved' | 'rejected' | null;
  title?: string;
  actionLabel?: string;
  onActionLabel?: PressableProps['onPress'];
};

type CallStatusStateType = {
  selected?: StatusType;
  status?: StatusType[];
};

const MeetingLiveSessionScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'MeetingLiveSessionScreen'>>();
  const {mutate: uploadImage} = useUploadImage();
  const route: any = useRoute();
  const {card_id, type} = route?.params || false;
  const [callStatus, setCallStatus] = useState<CallStatusStateType>({
    selected: {},
    status: [
      {
        id: '1',
        label: 'pending',
        title: 'Menunggu Guru membuka mikrofon',
        actionLabel: 'Batal',
        onActionLabel: () => {
          setUserUUID('');
          setShowToast(false);
        },
      },
      {
        id: '2',
        label: 'approved',
        title: 'Sesi panggilan dengan Guru sedang berlangsung.',
        actionLabel: '',
      },
      {
        id: '3',
        label: 'rejected',
        title: 'Maaf, permintaan panggilan ditolak oleh Guru.',
        actionLabel: 'Tutup',
        onActionLabel: () => setShowToast(false),
      },
    ],
  });
  const parseServiceType = () => {
    if (type?.toLowerCase() === 'ptn') {
      return 'ptn';
    }
    if (type?.toLowerCase() === 'guru') {
      return 'guru';
    }
    return 'lms';
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

  const isPTN = type?.toLowerCase() === 'ptn';
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

  const [showToast, setShowToast] = useState<boolean>(false);
  const [zoomLoaded, setZoomLoaded] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [zoomErrMessage, setZoomErrMessage] = useState<string>('');
  const [userUUID, setUserUUID] = useState<string>('');
  const [dataXP, setDataXP] = useState<any>();
  const [volumeDevice, setVolumeDevice] = useState<number>(0.4);

  const isApproved = callStatus?.selected?.label === 'approved';
  const isRejected = callStatus?.selected?.label === 'rejected';
  const classDetail = useSelector(
    (state: RootState) => state.classSessionDetail,
  ).data;

  const {minutes, seconds, hours} = useCountup(!isApproved);

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

    if (permit) {
      const result: any = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
      });

      if (!result.didCancel) {
        const fileName = result?.assets[0]?.fileName;
        const fileSize = result?.assets[0]?.fileSize;
        const extensionFile = fileName.split('.')?.pop();
        const isFileLowerThanMaxLimit = fileSize <= maximalLimitImage;
        const isFileHigherThanMaxLimit = fileSize > maximalLimitImage;
        const isFileFormatNotValid =
          !listFileImageExtension.includes(extensionFile);

        if (isFileFormatNotValid) {
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
        } else if (isFileHigherThanMaxLimit) {
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
        } else if (isFileLowerThanMaxLimit) {
          setState({isLoading: true});
          _handlerUploadAttachment(result?.assets);
        }
      }
    }
  };

  const _handlerOpenGallery = async () => {
    try {
      const permit = await _handlerGalleryPermission();

      if (permit) {
        const result: any = await launchImageLibrary({
          mediaType: 'photo',
          presentationStyle: 'fullScreen',
        });

        if (!result.didCancel) {
          const fileName = result?.assets[0]?.fileName;
          const fileSize = result?.assets[0]?.fileSize;
          const extensionFile = fileName.split('.')?.pop();
          const isFileLowerThanMaxLimit = fileSize <= maximalLimitImage;
          const isFileHigherThanMaxLimit = fileSize > maximalLimitImage;
          const isFileFormatNotValid =
            !listFileImageExtension.includes(extensionFile);

          if (isFileFormatNotValid) {
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
          } else if (isFileHigherThanMaxLimit) {
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
          } else if (isFileLowerThanMaxLimit) {
            setState({isLoading: true});
            _handlerUploadAttachment(result?.assets);
          }
        }
      }
    } catch (e) {}
  };

  const _handlerUploadAttachment = (asset: ImagePickerResponse['assets']) => {
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
    formData.append('sub_type', 'attahment');

    uploadImage(formData).then((res: IUploadImageResponse) => {
      const mediaId = res?.data?.ID;
      if (mediaId) {
        setTimeout(() => {
          _handlerSubmitAttachment('attachment', '', mediaId);
        }, 500);
      } else {
        setState({isLoading: false});
        Toast.show({
          type: 'error',
          text1: 'Internal Server Error',
        });
      }
    });
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
      // academi_class_session_id: 55, //user brama
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

      Toast.show({
        type: 'error',
        text1: errorData?.message || 'Internal Server Error',
      });
    }
  };

  const startVidXP = async () => {
    if (!parseReferenceId()) {
      return;
    }
    try {
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
      // eslint-disable-next-line no-console
      console.log('startVidXP result : ', result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('startVidXP error : ', error);
    }
  };
  const endVidXP = async () => {
    if (!parseReferenceId()) {
      return;
    }

    try {
      // eslint-disable-next-line no-console
      console.log('endVidXP ID : ', dataXP?.id);
      await apiGet({
        url: URL_PATH.end_vid_xp_timer(dataXP?.id || ''),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('endVidXP error : ', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const joinZoomMeeting = async () => {
        try {
          // await ZoomUs.initialize(
          //   {
          //     clientKey: '4tCNRczVkrEqLsJI7BFmpD6tSNlwxQffO1Xf',
          //     clientSecret: '28WHxodIObgxLG65LUMuuK8PkrH1civ0BZZj',
          //   },
          //   {
          //     enableCustomizedMeetingUI: true,
          //   },
          // );

          // await ZoomUs.joinMeeting({
          //   userName: classData?.data?.userName ?? '',
          //   meetingNumber: classData?.data?.id_zoom!,
          //   password: classData?.data?.passWord ?? '',
          //   zoomAccessToken: classData?.data?.zak_token ?? '',
          //   autoConnectAudio: true,
          //   // noAudio: true,
          //   // noVideo: true,
          // });
          setZoomLoaded(true);
          setZoomErrMessage('');
          await requestMicrophonePermission();
          // await _handlerCameraPermission();
        } catch (e: any) {
          setZoomErrMessage(`Terjadi Kesalahan: ${e.code}`);
        }
      };
      joinZoomMeeting();
    }
  }, []);

  // useEffect(() => {
  //   const listener = ZoomUs.onMeetingStatusChange(({event}) => {
  //     switch (event) {
  //       case 'MEETING_STATUS_DISCONNECTING':
  //       case 'MEETING_STATUS_ENDED':
  //         leaveLiveClassSession();
  //       case 'MEETING_STATUS_LEAVE_BO':
  //         setState({isShowPopup: false});
  //         break;

  //       default:
  //         break;
  //     }
  //   });

  //   return () => listener.remove();
  // }, []);

  useEffect(() => {
    if (zoomLoaded) {
      startVidXP();
    }
  }, [zoomLoaded]);

  const sendRequestCall = async () => {
    try {
      const res: AxiosResponse<ISendRequestCallResponse> =
        await provider.sendRequestCall(
          isPTN ? 'ptn' : 'guru',
          classDetail?.data?.ID,
        );
      await requestMicrophonePermission();
      setUserUUID(res.data?.data?._id!);
      setCallStatus(prevState => ({
        ...prevState,
        selected: res.data?.data
          ? callStatus.status?.[res.data.data?.call_request!]
          : {},
      }));
      setShowToast(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const checkRequestCall = async () => {
    try {
      const res: AxiosResponse<ICheckRequestCallResponse> =
        await provider.checkRequestCall(userUUID);
      if (res.data.data?.call_request === 2) {
        setUserUUID('');
      }
      setCallStatus(prevState => ({
        ...prevState,
        selected: res.data?.data
          ? callStatus.status?.[res.data.data?.call_request!]
          : {},
      }));
      setShowToast(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(() => {
    let requestCallCheck = setInterval(async () => {
      if (userUUID) {
        await checkRequestCall();
      }
    }, 1500);
    if (!userUUID) {
      clearInterval(requestCallCheck);
    }
    return () => clearInterval(requestCallCheck);
  }, [userUUID]);

  const leaveLiveClassSession = async () => {
    try {
      popScreen();
      endVidXP();
      // await ZoomUs.leaveMeeting();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const popScreen = () => {
    if (isPTN) {
      navigation.pop();
    } else {
      navigation.pop(2);
    }
  };

  const setVolume = async () => {
    try {
      const vol = await systemSetting.getVolume();
      if (vol > 0) {
        systemSetting.setVolume(0, {showUI: true});
        setVolumeDevice(0);
      } else {
        systemSetting.setVolume(0.4, {showUI: true});
        setVolumeDevice(0.4);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error get volume ', e);
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
        onPressConfirm: () => {
          leaveLiveClassSession();
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
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
          iconLeft={volumeDevice > 0 ? <VolumeIcon /> : <VolumeMuteIcon />}
          onPressIconLeft={setVolume}
          labelContent={
            <Pressable
              onPress={() => setShowDescription(true)}
              style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  color: Colors.white,
                }}>
                {classDetail?.data?.subject?.name}
              </Text>
              <ChevronDown />
            </Pressable>
          }
          paddingHorizontal={0}
          colorLabel={Colors.white}
          styleContainer={{backgroundColor: 'black', paddingHorizontal: 16}}
          onPressIconRight={() => _handlerOnPressLeaveMeetingSession()}
          iconRight={
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: Colors.white,
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 20,
                backgroundColor: Colors.danger.base,
              }}>
              Keluar
            </Text>
          }
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
      disabled: !!zoomErrMessage,
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
      disabled: !!zoomErrMessage || !classDetail?.data?.ID,
    },
    {
      id: '3',
      label: 'Kirim Gambar',
      icon: <AttachmentIcon />,
      onPress: () => {
        _handlerShowSwipeUpAttachment();
      },
      disabled: !!zoomErrMessage || !classDetail?.data?.ID,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      {/* {Platform.OS === 'android' && zoomLoaded ? (
        <ZoomUsVideoView
          style={{...StyleSheet.absoluteFillObject, backgroundColor: 'red'}}
          layout={[
            // The active speaker
            {kind: 'active', x: 0, y: 0, width: 1, height: 1},
            // Selfcamera preview
            // {
            //   kind: 'preview',
            //   // The percent of video view (required)
            //   x: 0.7,
            //   y: -0.73,
            //   width: 0.25,
            //   height: 0.2,
            //   // Enable border (optional)
            //   border: true,
            //   // Disable show user name (optional)
            //   showUsername: false,
            //   // Show audio off (optional)
            //   showAudioOff: true,
            //   // Background color (optional)
            //   background: '#ccc',
            // },
            // active speaker's share
            {
              kind: 'active-share',
              x: 0,
              y: 0,
              width: 1,
              height: 1,
            },
            // // share video
            // {
            //   kind: 'share',
            //   // The index of user list (required)
            //   userIndex: 0,
            // },
            // // Specify attendee
            // {
            //   kind: 'attendee',
            //   // The index of user list (required)
            //   userIndex: 0,
            // },
            // {
            //   kind: 'attendee',
            //   ...,
            //   userIndex: 1,
            // },
          ]}
        />
      ) : Platform.OS === 'ios' ? (
        <WebView
          source={{uri: classDetail?.data?.lc_zoom?.join_url ?? ''}}
          style={{flex: 1}}
          // setBuiltInZoomControls={false}
          // scalesPageToFit={false}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          userAgent="Mozilla/5.0 (Linux; Win64; x64; rv:46.0)r Gecko/20100101 Firefox/68.0"
        />
      ) : null} */}
      {showToast && (
        <View
          style={{
            paddingHorizontal: 16,
            position: 'absolute',
            width: '100%',
            bottom: 76,
          }}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: Colors.white,
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
            }}>
            <View style={{gap: 2, flexGrow: 1}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 12,
                  color: Colors.dark.neutral100,
                }}>
                {callStatus.selected?.title}
              </Text>
              {isApproved && (
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: Colors.dark.neutral60,
                  }}>
                  {minutes > 0
                    ? `${hours}:${minutes}:${seconds}`
                    : `${minutes}:${seconds}`}
                </Text>
              )}
            </View>
            {callStatus?.selected?.actionLabel && (
              <Pressable onPress={callStatus?.selected?.onActionLabel}>
                <Text
                  style={[
                    {
                      fontFamily: 'Poppins-Regular',
                      color: Colors.danger.base,
                      fontSize: 12,
                    },
                    isRejected && {color: Colors.primary.base},
                  ]}>
                  {callStatus.selected?.actionLabel}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
      {isShowToastAttachment && (
        <View style={styles.toastAttachmentContainer}>
          <View style={styles.toastAttachmentContent}>
            <Text style={styles.toastAttachmentTitle}>
              {'Gambar telah dikirim!'}
            </Text>

            <Text style={styles.toastAttachmentSubtitle}>
              {'Mohon menunggu Guru untuk menjawab.'}
            </Text>
          </View>
        </View>
      )}
      <BottomMenu menus={menuItems} />

      {isLoading ? <LoadingIndicator /> : null}

      <PopUp
        show={isShowPopup}
        Icon={popupData?.icon}
        title={popupData?.title}
        desc={popupData?.description}
        titleConfirm={popupData?.labelConfirm}
        actionConfirm={popupData?.onPressConfirm}
        titleCancel={popupData?.labelCancel}
        actionCancel={popupData?.onPressCancel}
      />

      <SwipeUp
        height={100}
        visible={isShowSwipeUpAttachment}
        onClose={_handlerHideSwipeUpAttachment}
        children={_renderSwipeUpAttachment()}
      />

      <ClassDetail
        visible={showDescription}
        onClose={() => setShowDescription(false)}
      />
    </View>
  );
};

export default MeetingLiveSessionScreen;

const styles = StyleSheet.create({
  swipeUpContainer: {
    padding: 16,
  },
  swipeUpContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeUpTitle: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  toastAttachmentContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    bottom: 76,
  },
  toastAttachmentContent: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toastAttachmentTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  toastAttachmentSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
});
