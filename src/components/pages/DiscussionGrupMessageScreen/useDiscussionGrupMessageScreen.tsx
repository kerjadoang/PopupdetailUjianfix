import {
  _handlerCameraPermission,
  _handlerConvertTimeTrackerPlayer,
  _handlerGalleryPermission,
  limitImageInMb,
  listFileImageExtension,
  maximalLimitImage,
  recordAudioPermission,
  useMergeState,
} from '@constants/functional';
import provider from '@services/lms/provider';
import {useEffect, useRef} from 'react';
import providerMedia from '@services/media/provider';
import {useSelector} from 'react-redux';
import {Platform, ScrollView} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useUploadImage} from '@services/media';
import {IUploadImageResponse} from '@services/media/type';
import {useUploadFile} from '@services/media';
import {StackNavigationProp} from '@react-navigation/stack';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import IconCameraBlue from '@assets/svg/ic_camera_blue.svg';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import React from 'react';
const audioRecorderPlayer = new AudioRecorderPlayer();

interface RootState {
  getUser: any;
}

const useDiscussionGrupMessageScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiscussionGrupMessageScreen'>
    >();
  const {getUser} = useSelector((state: RootState) => state);
  const trackPlayerProgress = useProgress();
  const [state, setState] = useMergeState({
    isLoading: false,
    isOnSearching: false,
    searchQuery: false,
    groupData: false,
    allMessageData: [],
    isShowRecordFrame: false,
    recordSecs: false,
    recordTime: 0,
    messageText: false,
    limit: 15,
    isShowSwipeUpAttachment: false,
    searchResultTotal: false,
    currentSelectedSearch: 1,
    messageTextPosition: 0,
  });

  const {
    isLoading,
    isOnSearching,
    searchQuery,
    groupData,
    allMessageData,
    isShowRecordFrame,
    recordSecs,
    recordTime,
    messageText,
    limit,
    isShowSwipeUpAttachment,
    searchResultTotal,
    currentSelectedSearch,
    messageTextPosition,
  }: any = state;
  const currentUserId = getUser?.data?.id;
  const isFocused = useIsFocused();
  const {mutate: uploadImage} = useUploadImage();
  const {mutate: uploadFile} = useUploadFile();
  const refferenceScrollView = useRef<ScrollView>(null);
  let timerId: any;

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

  useEffect(() => {
    if (isFocused) {
      _handlerGetGroupInformation();
      _handlerGetAllMessage();
      _handlerSetOnline();

      timerId = setInterval(_handlerAppendRealtimeMessage, 1000);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [isFocused]);

  useEffect(() => {
    _handlerGetAllMessage();
  }, [allMessageData?.length]);

  useEffect(() => {
    async function fethDataTrackerPlayer() {
      const stateTracker: any = await TrackPlayer.getState();

      if (stateTracker == 'stopped') {
        let datum = allMessageData;
        datum?.data?.map((item: any, _: number) => {
          return (
            (item.audio_player_is_runnning = false),
            (item.current_progress = 0),
            (item.current_progress_duration = false)
          );
        });

        TrackPlayer.reset();
        setState({
          allMessageData: datum,
        });
      }
    }

    fethDataTrackerPlayer();
  }, [trackPlayerProgress]);

  useEffect(() => {
    initializeTrackerPlayer();
  }, []);

  const initializeTrackerPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const _handlerSubmitMessage = async (
    type: any,
    message: any,
    mediaId: any,
  ) => {
    const requestBody = {
      type: type,
      message: message,
      media_id: mediaId,
    };

    try {
      await provider.postDiscusssionGroupMessage(requestBody);

      if (allMessageData?.length != 0) {
        setTimeout(() => {
          refferenceScrollView?.current?.scrollToEnd({animated: true});
        }, 100);
      }

      if (allMessageData?.length == 0) {
        _handlerGetAllMessage();
      }
      _handlerAppendRealtimeMessage();
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

  const _handlerGetGroupInformation = async () => {
    setState({isLoading: true});
    try {
      const res = await provider.getDiscusssionGroupInformation();

      var resDataData = res?.data?.data || false;
      const schoolMediaId = resDataData?.avatar;

      if (schoolMediaId) {
        const schoolRes = await providerMedia.getImage(schoolMediaId);

        if (schoolRes?.code === 100) {
          resDataData.path_url = schoolRes?.data?.path_url || false;
        }
      }

      if (resDataData?.users) {
        const usersArray = resDataData?.users?.map(
          async (item: any, index: any) => {
            const usersMediaId = item?.avatar;
            const usersRes = await providerMedia.getImage(usersMediaId);

            if (usersRes?.code == 100) {
              resDataData.users[index].path_url =
                usersRes?.data?.path_url || false;
            }
          },
        );

        await Promise.all(usersArray);
      }

      // console.log(
      //   'abcde resDataData>>>',
      //   JSON.stringify(resDataData, null, 2),
      // );

      setState({
        groupData: resDataData,
        isLoading: false,
      });
    } catch (e: any) {
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
      setState({
        isLoading: false,
      });
    }
  };

  const _handlerAppendRealtimeMessage = async () => {
    try {
      let datum = allMessageData;
      const res = await provider.getDiscusssionGroupRealtimeMessage();

      var resData = res?.data || false;
      // console.log('abcde resDataData>>>', JSON.stringify(resDataData, null, 2));

      if (resData?.data) {
        const messageArray = resData?.data?.map(
          async (item: any, index: any) => {
            const itemType = item?.type;
            const avatarMediaId = item?.avatar;
            const attachmentMediaId = item?.media_id;
            const isTypeImage = itemType === 'attachment';
            const isTypeVoice = itemType === 'voice';

            if (isTypeVoice) {
              resData.data[index].audio_player_is_runnning = false;
            }

            if (avatarMediaId) {
              const avatarRes = await providerMedia.getImage(avatarMediaId);

              if (avatarRes?.code == 100) {
                resData.data[index].path_url_avatar =
                  avatarRes?.data?.path_url || false;
              }
            }

            if (isTypeImage) {
              if (attachmentMediaId) {
                const attachmentRes = await providerMedia.getImage(
                  attachmentMediaId,
                );

                if (attachmentRes?.code == 100) {
                  resData.data[index].path_url_attachment =
                    attachmentRes?.data?.path_url || false;
                  resData.data[index].file_name_attachment =
                    attachmentRes?.data?.file_name || false;
                }
              }
            } else if (isTypeVoice) {
              if (attachmentMediaId) {
                const attachmentRes: any = await providerMedia.getFile(
                  attachmentMediaId,
                );

                if (attachmentRes?.code == 100) {
                  resData.data[index].path_url_attachment =
                    attachmentRes?.data?.path_url || false;
                  resData.data[index].file_name_attachment =
                    attachmentRes?.data?.file_name || false;
                }
              }
            }
          },
        );

        await Promise.all(messageArray);
      }

      if (resData?.data) {
        datum.data = datum?.data.concat(resData?.data);

        // console.log(
        //   '_handlerAppendRealtimeMessage datum>>>',
        //   JSON.stringify(datum, null, 2),
        // );

        setState({
          allMessageData: datum,
        });

        if (allMessageData?.length != 0) {
          setTimeout(() => {
            refferenceScrollView?.current?.scrollToEnd({animated: true});
          }, 100);
        }
      }
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

  const _handlerGetAllMessage = async () => {
    setState({searchQuery: false, isOnSearching: false});

    try {
      const res = await provider.getDiscusssionGroupMessage(limit);

      var resData = res?.data || false;
      // console.log('abcde item>>>', JSON.stringify(resData, null, 2));

      if (resData?.data) {
        const messageArray = resData?.data?.map(
          async (item: any, index: any) => {
            const itemType = item?.type;
            const avatarMediaId = item?.avatar;
            const attachmentMediaId = item?.media_id;
            const isTypeImage = itemType === 'attachment';
            const isTypeVoice = itemType === 'voice';

            if (isTypeVoice) {
              resData.data[index].audio_player_is_runnning = false;
            }

            if (avatarMediaId) {
              const avatarRes = await providerMedia.getImage(avatarMediaId);

              if (avatarRes?.code == 100) {
                resData.data[index].path_url_avatar =
                  avatarRes?.data?.path_url || false;
              }
            }

            if (isTypeImage) {
              if (attachmentMediaId) {
                const attachmentRes = await providerMedia.getImage(
                  attachmentMediaId,
                );

                if (attachmentRes?.code == 100) {
                  resData.data[index].path_url_attachment =
                    attachmentRes?.data?.path_url || false;
                  resData.data[index].file_name_attachment =
                    attachmentRes?.data?.file_name || false;
                }
              }
            } else if (isTypeVoice) {
              if (attachmentMediaId) {
                const attachmentRes: any = await providerMedia.getFile(
                  attachmentMediaId,
                );
                const attachmentResData = attachmentRes?.data || false;

                if (attachmentResData?.code == 100) {
                  resData.data[index].path_url_attachment =
                    attachmentResData?.data?.path_url || false;
                  resData.data[index].file_name_attachment =
                    attachmentResData?.data?.file_name || false;
                }
              }
            }
          },
        );

        await Promise.all(messageArray);
      }

      const resDataSort = resData?.data?.sort((a: any, b: any) => {
        const varA: any = _handlerConvertToIso(a?.created_at);
        const varB: any = _handlerConvertToIso(b?.created_at);

        return varA - varB;
      });

      resData.data = resDataSort;

      // console.log(
      //   '_handlerGetAllMessage resData>>>',
      //   JSON.stringify(resData, null, 2),
      // );

      setState({
        allMessageData: resData,
      });
      setTimeout(() => {
        refferenceScrollView?.current?.scrollToEnd({});
      }, 200);
    } catch (e: any) {
      setTimeout(() => {
        const errorData = e?.response?.data;

        if (errorData?.message) {
          Toast.show({
            type: 'error',
            text1: errorData?.message || 'Internal Server Error',
          });
        }
      }, 500);
    }
  };

  const _handlerGetNextPreviousPage = async (
    limit: number,
    type: 'next' | 'prev',
    created_at: any,
  ) => {
    try {
      const res = await provider.getDiscusssionGroupNextPreviousPage(
        limit,
        type,
        created_at,
      );

      var resData = res?.data || false;
      // console.log('abcde item>>>', JSON.stringify(resData, null, 2));

      const messageArray = resData?.data?.map(async (item: any, index: any) => {
        const itemType = item?.type;
        const avatarMediaId = item?.avatar;
        const attachmentMediaId = item?.media_id;
        const isTypeImage = itemType === 'attachment';
        const isTypeVoice = itemType === 'voice';

        if (isTypeVoice) {
          resData.data[index].audio_player_is_runnning = false;
        }

        if (avatarMediaId) {
          const avatarRes = await providerMedia.getImage(avatarMediaId);

          if (avatarRes?.code == 100) {
            resData.data[index].path_url_avatar =
              avatarRes?.data?.path_url || false;
          }
        }

        if (isTypeImage) {
          if (attachmentMediaId) {
            const attachmentRes = await providerMedia.getImage(
              attachmentMediaId,
            );

            if (attachmentRes?.code == 100) {
              resData.data[index].path_url_attachment =
                attachmentRes?.data?.path_url || false;
              resData.data[index].file_name_attachment =
                attachmentRes?.data?.file_name || false;
            }
          }
        } else if (isTypeVoice) {
          if (attachmentMediaId) {
            const attachmentRes: any = await providerMedia.getFile(
              attachmentMediaId,
            );

            const attachmentResData = attachmentRes?.data || false;

            if (attachmentResData?.code == 100) {
              resData.data[index].path_url_attachment =
                attachmentResData?.data?.path_url || false;
              resData.data[index].file_name_attachment =
                attachmentResData?.data?.file_name || false;
            }
          }
        }
      });

      await Promise.all(messageArray);

      const resDataSort = resData?.data?.sort((a: any, b: any) => {
        const varA: any = _handlerConvertToIso(a?.created_at);
        const varB: any = _handlerConvertToIso(b?.created_at);

        return varA - varB;
      });

      if (type == 'prev') {
        resData.data = resDataSort;
        resData.data = resData?.data.concat(allMessageData?.data);
      } else if (type == 'next') {
        resData.data = allMessageData?.data.concat(resData?.data);
      }

      // console.log(
      //   '_handlerGetNewAllMessage resData>>>',
      //   JSON.stringify(resData, null, 2),
      // );

      setState({
        allMessageData: resData,
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

  const _handlerOnSubmitSearch = async () => {
    setState({
      isLoading: true,
      currentSelectedSearch: 1,
    });
    // console.log('searchQuery', searchQuery);

    const requestBody: any = {
      search: searchQuery,
    };

    try {
      const res = await provider.postDiscusssionGroupMessageSearch(
        limit,
        requestBody,
      );

      var resData = res?.data || false;
      if (resData?.data) {
        const messageArray = resData?.data?.map(
          async (item: any, index: any) => {
            const itemType = item?.type;
            const avatarMediaId = item?.avatar;
            const attachmentMediaId = item?.media_id;
            const isTypeImage = itemType === 'attachment';
            const isTypeVoice = itemType === 'voice';

            if (isTypeVoice) {
              resData.data[index].audio_player_is_runnning = false;
            }

            if (avatarMediaId) {
              const avatarRes = await providerMedia.getImage(avatarMediaId);

              if (avatarRes?.code == 100) {
                resData.data[index].path_url_avatar =
                  avatarRes?.data?.path_url || false;
              }
            }

            if (isTypeImage) {
              if (attachmentMediaId) {
                const attachmentRes = await providerMedia.getImage(
                  attachmentMediaId,
                );

                if (attachmentRes?.code == 100) {
                  resData.data[index].path_url_attachment =
                    attachmentRes?.data?.path_url || false;
                  resData.data[index].file_name_attachment =
                    attachmentRes?.data?.file_name || false;
                }
              }
            } else if (isTypeVoice) {
              if (attachmentMediaId) {
                const attachmentRes: any = await providerMedia.getFile(
                  attachmentMediaId,
                );

                const attachmentResData = attachmentRes?.data || false;

                if (attachmentResData?.code == 100) {
                  resData.data[index].path_url_attachment =
                    attachmentResData?.data?.path_url || false;
                  resData.data[index].file_name_attachment =
                    attachmentResData?.data?.file_name || false;
                }
              }
            }
          },
        );

        await Promise.all(messageArray);

        const resDataSort = resData?.data?.sort((a: any, b: any) => {
          const varA: any = _handlerConvertToIso(a?.created_at);
          const varB: any = _handlerConvertToIso(b?.created_at);

          return varA - varB;
        });

        resData.data = resDataSort;

        // console.log(
        //   '_handlerOnSubmitSearch resData>>>',
        //   JSON.stringify(resData, null, 2),
        // );

        setTimeout(() => {
          setState({
            isLoading: false,
            allMessageData: resData,
            searchResultTotal: resData?.total_data,
          });
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
            searchResultTotal: 'not-found',
          });
        }, 500);
      }
    } catch (e: any) {
      setTimeout(() => {
        setState({
          isLoading: false,
        });
      }, 500);
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerGetNextPreviousSearch = async (type: 'prev' | 'next') => {
    setState({isLoading: true});

    let currentSelectedItemSearch = currentSelectedSearch;

    if (type === 'prev') {
      currentSelectedItemSearch -= 1;
      setState({currentSelectedSearch: currentSelectedItemSearch});
    } else {
      currentSelectedItemSearch += 1;
      setState({currentSelectedSearch: currentSelectedItemSearch});
    }

    try {
      const requestBody = {
        search: searchQuery,
      };

      const res = await provider.postDiscusssionGroupNextPreviousSearch(
        20,
        currentSelectedItemSearch,
        requestBody,
      );

      var resData = res?.data || false;
      // console.log(
      //   'abcde  _handlerGetNextPreviousSearch item>>>',
      //   JSON.stringify(resData, null, 2),
      // );

      const messageArray = resData?.data?.map(async (item: any, index: any) => {
        const itemType = item?.type;
        const avatarMediaId = item?.avatar;
        const attachmentMediaId = item?.media_id;
        const isTypeImage = itemType === 'attachment';
        const isTypeVoice = itemType === 'voice';

        if (isTypeVoice) {
          resData.data[index].audio_player_is_runnning = false;
        }

        if (avatarMediaId) {
          const avatarRes = await providerMedia.getImage(avatarMediaId);

          if (avatarRes?.code == 100) {
            resData.data[index].path_url_avatar =
              avatarRes?.data?.path_url || false;
          }
        }

        if (isTypeImage) {
          if (attachmentMediaId) {
            const attachmentRes = await providerMedia.getImage(
              attachmentMediaId,
            );

            if (attachmentRes?.code == 100) {
              resData.data[index].path_url_attachment =
                attachmentRes?.data?.path_url || false;
              resData.data[index].file_name_attachment =
                attachmentRes?.data?.file_name || false;
            }
          }
        } else if (isTypeVoice) {
          if (attachmentMediaId) {
            const attachmentRes: any = await providerMedia.getFile(
              attachmentMediaId,
            );

            const attachmentResData = attachmentRes?.data || false;

            if (attachmentResData?.code == 100) {
              resData.data[index].path_url_attachment =
                attachmentResData?.data?.path_url || false;
              resData.data[index].file_name_attachment =
                attachmentResData?.data?.file_name || false;
            }
          }
        }
      });

      await Promise.all(messageArray);

      const resDataSort = resData?.data?.sort((a: any, b: any) => {
        const varA: any = _handlerConvertToIso(a?.created_at);
        const varB: any = _handlerConvertToIso(b?.created_at);

        return varA - varB;
      });

      resData.data = resDataSort;
      // console.log(
      //   '_handlerGetNextPreviousSearch resData>>>',
      //   JSON.stringify(resData, null, 2),
      // );

      setTimeout(() => {
        setState({
          isLoading: false,
          allMessageData: resData,
        });
      }, 500);

      refferenceScrollView.current?.scrollTo({
        x: 0,
        y: messageTextPosition,
        animated: true,
      });
    } catch (e: any) {
      setState({
        isLoading: false,
      });
      const errorData = e?.response?.data;

      if (errorData?.message) {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }
    }
  };

  const _handlerOnPressPlayAudioButton = async (index: number) => {
    const stateTracker: any = await TrackPlayer.getState();
    let datum = allMessageData;

    datum?.data?.map((item: any, _: number) => {
      return (item.audio_player_is_runnning = false);
    });

    datum.data[index].audio_player_is_runnning = true;

    const track = {
      id: index,
      url: datum?.data?.[index]?.path_url_attachment,
    };

    // console.log('OnPlay stateTracker >>>', stateTracker);

    if (!track?.url) {
      Toast.show({
        type: 'error',
        text1: 'Rekaman tidak ditemukan.',
      });

      datum?.data?.map((item: any, _: number) => {
        return (item.audio_player_is_runnning = false);
      });

      TrackPlayer.reset();
      setState({
        allMessageData: datum,
      });
    }

    if (stateTracker == 'stopped') {
      TrackPlayer.reset();
      TrackPlayer.play();
    } else if (stateTracker == 'playing') {
      TrackPlayer.reset();
      TrackPlayer.add(track);
      TrackPlayer.play();
    } else if (stateTracker == 'paused') {
      TrackPlayer.play();
    } else if (stateTracker == 'idle') {
      TrackPlayer.add(track);
      TrackPlayer.play();
    }

    setState({
      allMessageData: datum,
    });
  };

  const _handlerOnPressPauseAudioButton = async (index: number) => {
    const stateTracker: any = await TrackPlayer.getState();
    let datum = allMessageData;
    datum.data[index].audio_player_is_runnning = false;

    TrackPlayer.pause();

    if (stateTracker == 'playing') {
      const currentProgress = Math.round(
        (trackPlayerProgress?.position / trackPlayerProgress?.duration) * 155,
      );

      const currentProgressDuration = _handlerConvertTimeTrackerPlayer(
        Math.floor(trackPlayerProgress?.position),
      );

      datum.data[index].current_progress = currentProgress;
      datum.data[index].current_progress_duration = currentProgressDuration;
    }

    setState({
      allMessageData: datum,
    });
  };

  const _handlerConvertToIso = (date: any) => {
    let dateCnv = new Date(date);
    dateCnv.getTime();
    return dateCnv;
  };

  const _handlerPermissionRecordAudio = async () => {
    try {
      const permit = await recordAudioPermission();

      if (permit) {
        _handlerOnStartRecordVoice();
      }
    } catch (e) {}
  };

  const _handlerOnStartRecordVoice = async () => {
    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setState({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
  };

  const _handleOnStopRecordVoice = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      recordSecs: 0,
      recordTime: 0,
    });
    uploadingVoice(result);
    // console.log('_handleOnStopRecordVoice res>>', result);
  };

  const _handleOnCancelRecordVoice = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      recordSecs: 0,
      recordTime: 0,
      isShowRecordFrame: !isShowRecordFrame,
    });
  };

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
          _handlerUploadImage(result?.assets);
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
            _handlerUploadImage(result?.assets);
          }
        }
      }
    } catch (e) {}
  };

  const _handlerUploadImage = (asset: ImagePickerResponse['assets']) => {
    const formData = new FormData();

    formData.append('attachment', {
      name: asset?.[0]?.fileName,
      type: asset?.[0]?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', ''),
    });
    formData.append('type', 'grup diskusi');
    formData.append('sub_type', 'message');

    uploadImage(formData).then((res: IUploadImageResponse) => {
      const mediaId = res?.data?.ID;
      if (mediaId) {
        setTimeout(() => {
          _handlerSubmitMessage('attachment', '', mediaId);
          setState({isLoading: false});
        }, 100);
      } else {
        setState({isLoading: false});
        Toast.show({
          type: 'error',
          text1: 'Internal Server Error',
        });
      }
    });
  };

  const uploadingVoice = (uri: any) => {
    const formData = new FormData();

    formData.append('attachment', {
      name: Platform.OS === 'android' ? 'record_voice.mp4' : 'record_voice.m4a',
      type: Platform.OS === 'android' ? 'audio/mp4' : 'audio/.m4a',
      uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
    });
    formData.append('type', 'grup diskusi');
    formData.append('sub_type', 'message');

    uploadFile(formData).then((res: IUploadImageResponse) => {
      _handlerSubmitMessage('voice', '', res?.data?.ID);
    });
  };

  const _handlerOnSubmitText = () => {
    setState({messageText: false});
    _handlerSubmitMessage('message', messageText, '');
  };

  const _handlerSetOnline = async () => {
    try {
      await provider.putSetOnline();
      // console.log('abcde res>>>', JSON.stringify(res, null, 2));
    } catch (e) {}
  };

  const _handlerOnChangeSearching = (value: any) => {
    setState({searchQuery: value, searchResultTotal: false});
  };

  const _handlerOnChangeMessageText = (value: any) => {
    setState({messageText: value});
  };

  const _handlerSetActiveSearch = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setState({
      isOnSearching: true,
      recordSecs: 0,
      recordTime: 0,
      isShowRecordFrame: false,
      searchResultTotal: false,
    });
  };

  const _handlerSetNotActiveSearch = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setState({
      isOnSearching: false,
      searchQuery: false,
      recordSecs: 0,
      recordTime: 0,
      isShowRecordFrame: false,
      searchResultTotal: false,
    });
  };

  const _handlerSetStatusToogleRecord = () => {
    setState({
      isShowRecordFrame: !isShowRecordFrame,
    });
    if (isShowRecordFrame) {
      _handleOnStopRecordVoice();
    } else {
      _handlerPermissionRecordAudio();
    }
  };

  const _handlerOnPressGoBack = () => {
    navigation?.pop();
  };

  const _handlerOnScroll = (event: any) => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const eventScroll = contentOffset.y;
    const maxLayout = contentSize?.height - layoutMeasurement?.height;
    const isTopReached = eventScroll === 0;
    const isBottomReached = Math.round(eventScroll) === Math.round(maxLayout);

    if (isTopReached) {
      const firstData = allMessageData?.data[0]?.created_at;
      _handlerGetNextPreviousPage(limit, 'prev', firstData);
    }

    if (isBottomReached) {
      const lastDataIndex = allMessageData?.data?.length - 1;
      const lastData = allMessageData?.data[lastDataIndex]?.created_at;
      _handlerGetNextPreviousPage(15, 'next', lastData);
    }
  };

  const _handlerShowSwipeUpAttachment = () => {
    setState({
      isShowSwipeUpAttachment: true,
    });
  };

  const _handlerHideSwipeUpAttachment = () => {
    setState({
      isShowSwipeUpAttachment: false,
    });
  };

  const _handlerNavigateToDiscussionGroup = () => {
    navigation?.navigate('DiscussionGrupScreen');
  };

  const _handlerNavigateToPhotoScreen = (
    path_url: string,
    header_label: string,
  ) => {
    navigation?.navigate('ViewPhotoScreen', {
      path_url: path_url,
      header_label: header_label,
    });
  };

  const _handlerSetMessageTextPosition = (value: number) => {
    setState({
      messageTextPosition: value,
    });
  };

  return {
    isLoading,
    isOnSearching,
    groupData,
    allMessageData,
    searchQuery,
    currentUserId,
    isShowRecordFrame,
    recordTime,
    recordSecs,
    messageText,
    refferenceScrollView,
    navigation,
    trackPlayerProgress,
    isShowSwipeUpAttachment,
    initialisationSwipeUpAttachment,
    searchResultTotal,
    currentSelectedSearch,
    _handlerSetActiveSearch,
    _handlerSetNotActiveSearch,
    _handlerOnChangeSearching,
    _handlerSetStatusToogleRecord,
    _handleOnCancelRecordVoice,
    _handlerOnChangeMessageText,
    _handlerOnSubmitText,
    _handlerOnSubmitSearch,
    _handlerOnPressGoBack,
    _handlerNavigateToPhotoScreen,
    _handlerOnPressPlayAudioButton,
    _handlerOnPressPauseAudioButton,
    _handlerShowSwipeUpAttachment,
    _handlerHideSwipeUpAttachment,
    _handlerGetNextPreviousSearch,
    _handlerNavigateToDiscussionGroup,
    _handlerOnScroll,
    _handlerSetMessageTextPosition,
  };
};

export default useDiscussionGrupMessageScreen;
