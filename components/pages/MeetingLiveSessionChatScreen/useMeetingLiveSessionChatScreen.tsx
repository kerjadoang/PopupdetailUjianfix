import {showErrorToast, useMergeState} from '@constants/functional';
import provider from '@services/lms/provider';
import {useEffect, useRef} from 'react';
import providerMedia from '@services/media/provider';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';

interface RootState {
  getUser: any;
}

const useMeetingLiveSessionChatScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'MeetingLiveSessionChatScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'MeetingLiveSessionChatScreen'>>();
  const {service_type, academi_class_session_id, card_id}: any = route?.params;
  const {getUser} = useSelector((state: RootState) => state);
  const [state, setState] = useMergeState({
    isLoading: false,
    allMessageData: [],
    messageText: false,
    currentOffset: 1,
    limit: 10,
  });

  const {isLoading, allMessageData, messageText, currentOffset, limit}: any =
    state;
  const currentUserId = getUser?.data.id;
  const isFocused = useIsFocused();
  const refFlatList = useRef<FlatList>(null);

  useEffect(() => {
    if (isFocused) {
      _handlerGetAllMessage();
      setState({currentOffset: 1});
    }

    const timerId = setInterval(_handlerAppendRealtimeMessage, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [isFocused]);

  const _handlerSubmitMessage = async (
    type: any,
    message: any,
    mediaId: any,
  ) => {
    const requestBody = {
      academi_class_session_id: academi_class_session_id,
      type: type,
      message: message,
      media_id: mediaId,
    };

    try {
      await provider.postMeetingLiveSessionMessage(service_type, requestBody);

      if (allMessageData?.length != 0) {
        setTimeout(() => {
          refFlatList?.current?.scrollToEnd({animated: true});
        }, 100);
      }

      if (allMessageData?.length == 0) {
        _handlerGetAllMessage();
      }

      _handlerAppendRealtimeMessage();
    } catch (e: any) {
      const errorData = e?.response?.data;

      setState({
        isLoading: false,
      });

      if (errorData?.message) {
        showErrorToast('errorData?.message' || 'Internal Server Error');
      }
    }
  };

  const _handlerAppendRealtimeMessage = async () => {
    try {
      let datum = allMessageData;

      if (!datum || datum?.length == 0) {
        _handlerGetAllMessage();
      } else {
        const res = await provider.getMeetingLiveSessionRealtimeMessage(
          academi_class_session_id,
        );
        var resDataData = res?.data?.data || false;

        if (resDataData?.chat?.length > 0) {
          const messageArray = resDataData?.chat?.map(
            async (item: any, index: any) => {
              const itemType = item?.type;
              const avatarMediaId = item?.avatar;
              const attachmentMediaId = item?.media_id;
              const isTypeImage = itemType === 'attachment';

              if (avatarMediaId) {
                const avatarRes = await providerMedia.getImage(avatarMediaId);

                if (avatarRes?.code == 100) {
                  resDataData.chat[index].path_url_avatar =
                    avatarRes?.data?.path_url || false;
                }
              }

              if (isTypeImage) {
                if (attachmentMediaId) {
                  const attachmentRes = await providerMedia.getImage(
                    attachmentMediaId,
                  );

                  if (attachmentRes?.code == 100) {
                    resDataData.chat[index].path_url_attachment =
                      attachmentRes?.data?.path_url || false;
                    resDataData.chat[index].file_name_attachment =
                      attachmentRes?.data?.file_name || false;
                  }
                }
              }
            },
          );

          await Promise.all(messageArray);
        }

        if (resDataData?.renew) {
          datum.data = datum?.data?.concat(resDataData?.chat);

          setState({
            allMessageData: datum,
          });

          if (allMessageData.length != 0) {
            setTimeout(() => {
              refFlatList?.current?.scrollToEnd({animated: true});
            }, 100);
          }
        }
      }
    } catch (e) {}
  };

  const _handlerGetAllMessage = async () => {
    // setState({isLoading: true});

    try {
      const res = await provider.getMeetingLiveSessionMessage(
        academi_class_session_id,
        limit,
        1,
      );

      var resData = res?.data || false;

      if (resData?.data) {
        const messageArray = resData?.data?.map(
          async (item: any, index: any) => {
            const itemType = item?.type;
            const avatarMediaId = item?.avatar;
            const attachmentMediaId = item?.media_id;
            const isTypeImage = itemType === 'attachment';

            if (avatarMediaId) {
              const avatarRes = await providerMedia.getImage(avatarMediaId);
              resData.data[index].path_url_avatar = avatarRes?.data?.path_url;
            }

            if (isTypeImage) {
              if (attachmentMediaId) {
                const attachmentRes = await providerMedia.getImage(
                  attachmentMediaId,
                );

                resData.data[index].path_url_attachment =
                  attachmentRes?.data?.path_url || '';
                resData.data[index].file_name_attachment =
                  attachmentRes?.data?.file_name || '';
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
      resData.total_show_data = resData?.data?.length;

      // console.log(
      //   '_handlerGetAllMessage resData>>>',
      //   JSON.stringify(resData, null, 2),
      // );

      if (!resData?.data) {
        return;
      }

      setTimeout(() => {
        setState({
          isLoading: false,
          allMessageData: resData,
        });
        setTimeout(() => {
          refFlatList?.current?.scrollToEnd({});
        }, 100);
      }, 500);
    } catch (e: any) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerGetNewAllMessage = async (limit: number, offset: number) => {
    setState({isLoading: true});

    try {
      const res = await provider.getMeetingLiveSessionMessage(
        academi_class_session_id,
        limit,
        offset,
      );
      var resData = res?.data || false;
      // console.log('abcde item>>>', JSON.stringify(resData, null, 2));

      if (resData?.data) {
        const messageArray = resData?.data?.map(
          async (item: any, index: any) => {
            const itemType = item?.type;
            const avatarMediaId = item?.avatar;
            const attachmentMediaId = item?.media_id;
            const isTypeImage = itemType === 'attachment';

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
      resData.data = resData?.data.concat(allMessageData?.data);
      resData.total_show_data = resData?.data?.length;

      // console.log(
      //   '_handlerGetNewAllMessage resData>>>',
      //   JSON.stringify(resData, null, 2),
      // );

      setTimeout(() => {
        setState({
          isLoading: false,
          allMessageData: resData,
        });
      }, 500);
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerConvertToIso = (date: any) => {
    let dateCnv = new Date(date);
    dateCnv.getTime();
    return dateCnv;
  };

  const _handlerOnSubmitText = () => {
    setState({messageText: false});
    _handlerSubmitMessage('message', messageText, '');
  };

  const _handlerOnChangeMessageText = (value: any) => {
    setState({messageText: value});
  };

  const _handlerOnScrollTopReached = (e: any) => {
    const eventScroll = e?.nativeEvent?.contentOffset?.y;

    if (eventScroll == 0) {
      const offset = currentOffset;
      const totalData = allMessageData?.total_data;

      const calculate = Math.ceil(totalData / limit);
      let maxOffset;

      if (calculate <= 0 || !calculate) {
        maxOffset = 1;
      } else {
        maxOffset = calculate;
      }

      if (maxOffset > offset) {
        setState({currentOffset: offset + 1});
        _handlerGetNewAllMessage(limit, offset + 1);
      }
    }
  };

  const _handlerOnClearChat = () => {
    setState({messageText: ''});
  };

  return {
    isLoading,
    allMessageData,
    currentUserId,
    messageText,
    refFlatList,
    navigation,
    card_id,
    service_type,
    _handlerOnChangeMessageText,
    _handlerOnSubmitText,
    _handlerOnScrollTopReached,
    _handlerOnClearChat,
  };
};

export default useMeetingLiveSessionChatScreen;
