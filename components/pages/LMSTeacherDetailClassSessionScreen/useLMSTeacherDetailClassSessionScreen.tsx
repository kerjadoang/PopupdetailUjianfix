import {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {useMergeState} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import ProviderLMS from '@services/lms/provider';
import {ParamList} from 'type/screen';

const useLMSTeacherDetailClassSessionScreen = () => {
  const route =
    useRoute<RouteProp<ParamList, 'LMSTeacherDetailClassSessionScreen'>>();
  const {id, navigate_from} = route.params;
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'LMSTeacherDetailClassSessionScreen'>
    >();

  const [state, setState] = useMergeState({
    isLoading: false,
    classSessionDetail: false,
    isShowSwipeUpCancel: false,
    currentActiveTab: 0,
    studentData: [],
    isCancelClassSession: false,
    rate: [
      {id: 1, isActive: false},
      {id: 2, isActive: false},
      {id: 3, isActive: false},
      {id: 4, isActive: false},
      {id: 5, isActive: false},
    ],
  });

  const {
    isLoading,
    classSessionDetail,
    isShowSwipeUpCancel,
    currentActiveTab,
    isCancelClassSession,
    studentData,
    rate,
  }: any = state;

  const [isShowSwipeUpMarkStudent, setShowSwipeUpMarkStudent] =
    useState<boolean>(false);
  const [isMarksSeveralStudent, setMarkSeveralStudent] =
    useState<boolean>(false);
  const [tempMarksSeveralStudent, setTempMarksSeveralStudent] = useState<any[]>(
    [],
  );

  useEffect(() => {
    _handlerGetDataDetail();
  }, []);

  const _handlerGetDataDetail = async (withoutLoading?: boolean) => {
    !withoutLoading && setState({isLoading: true});

    try {
      const res = await provider.getDetailSessionClass(id);

      if (res?.status == 200) {
        var resDataData = res?.data?.data || false;
        const subjectMediaId = resDataData?.subject?.icon_mobile;
        const userCreatedByMediaId = resDataData?.user_created_by?.avatar;
        const mediaRecordByMediaId = resDataData?.media?.media;

        if (subjectMediaId) {
          const subjectRes = await providerMedia.getImage(subjectMediaId);

          if (subjectRes?.code === 100) {
            resDataData.subject.path_url = subjectRes?.data?.path_url || false;
          }
        }

        if (userCreatedByMediaId) {
          const userCreatedByRes = await providerMedia.getImage(
            userCreatedByMediaId,
          );

          if (userCreatedByRes?.code === 100) {
            resDataData.user_created_by.path_url =
              userCreatedByRes?.data?.path_url || false;
          }
        }

        if (mediaRecordByMediaId) {
          const mediaRecordByRes = await providerMedia.getVideoRecording(
            mediaRecordByMediaId,
          );

          if (mediaRecordByRes?.code === 100) {
            resDataData.media.path_url =
              mediaRecordByRes?.data?.path_url || false;
            resDataData.media.thumbnail =
              mediaRecordByRes?.data?.thumbnail || false;
            resDataData.media.status = mediaRecordByRes?.data?.status || '';
          }
        }

        if (resDataData?.participant?.join) {
          const participantJoinArray = resDataData?.participant?.join.map(
            async (item: any, index: any) => {
              const participantJoinMediaId = item?.user?.avatar;
              const participantJoinRes = await providerMedia.getImage(
                participantJoinMediaId,
              );

              if (participantJoinRes?.code == 100) {
                resDataData.participant.join[index].user.path_url =
                  participantJoinRes?.data?.path_url || false;
              }
            },
          );

          await Promise.all(participantJoinArray);
        }

        if (resDataData?.participant?.not_join) {
          const participantNotJoinArray =
            resDataData?.participant?.not_join.map(
              async (item: any, index: any) => {
                const participantNotJoinMediaId = item?.user?.avatar;
                const participantNotJoinRes = await providerMedia.getImage(
                  participantNotJoinMediaId,
                );

                if (participantNotJoinRes?.code == 100) {
                  resDataData.participant.not_join[index].user.path_url =
                    participantNotJoinRes?.data?.path_url || false;
                }
              },
            );

          await Promise.all(participantNotJoinArray);
        }
        setState({
          isLoading: false,
          classSessionDetail: resDataData,
        });
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerOnCloseSwipeUpCancel = () => {
    setState({isShowSwipeUpCancel: false});
  };

  const _handlerOnCloseSwipeUpMarkStudent = () => {
    setShowSwipeUpMarkStudent(!isShowSwipeUpMarkStudent);
  };

  const _handlerShowSwipeUpMarkStudent = (_studentData: any) => {
    setState({studentData: _studentData});
    _studentData?.rating && handleMark(_studentData?.rating);
    setShowSwipeUpMarkStudent(!isShowSwipeUpMarkStudent);
  };

  const _handlerShowSwipeUpMarkSeveralStudent = () => {
    // setState({studentData: _studentData});
    tempMarksSeveralStudent?.[0].rating &&
      handleMark(tempMarksSeveralStudent?.[0].rating);
    setShowSwipeUpMarkStudent(!isShowSwipeUpMarkStudent);
  };

  const _handlerShowSwipeUpCancel = () => {
    setState({isShowSwipeUpCancel: !isShowSwipeUpCancel});
  };

  const _handlerSetMark = (_data: {id: number; isActive: boolean}[]) => {
    setState({rate: _data});
  };

  const _handlerOnSubmitButtonCancel = () => {
    setState({isShowSwipeUpCancel: false});
  };

  const _handlerSetCurrentActiveTab = (text: any) => {
    setState({currentActiveTab: text});
  };

  const _handlerOpenCancelClassSessionModal = (isOpen: boolean) => {
    setState({isCancelClassSession: isOpen});
  };

  const _handlerMarksSeveralStudents = () => {
    setMarkSeveralStudent(!isMarksSeveralStudent);
  };

  const _handlerNavigationToForm = () => {
    navigation.navigate('LMSTeacherFormClassSessionScreen', {
      navigate_from: 'LMSTeacherDetailClassSessionScreen',
      data: classSessionDetail,
      classSessionId: id,
    });
  };

  const _handlerCancelSessionClass = async (_reason: string) => {
    try {
      const _fetch: any = await provider.teacherCancelMeeting(
        classSessionDetail?.id,
        {
          reason: _reason ?? '',
        },
      );

      const ResData = _fetch?.data;
      if (ResData?.code === 100) {
        setState({isCancelClassSession: false});
        Toast?.show({
          type: 'success',
          visibilityTime: 8000,
          text1: 'Sesi kelas berhasil dibatalkan.',
        });
        navigation.goBack();
      } else {
        Toast?.show({
          type: 'error',
          text1: ResData?.message ?? 'Terjadi kesalahan pada sistem kami',
        });
      }
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ??
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  const handleMark = async (markId: number) => {
    let resMarkArr: {id: number; isActive: boolean}[] = [];
    await rate?.map((_markData: {id: number; isActive: boolean}) => {
      if (_markData?.id <= markId) {
        resMarkArr?.push({
          id: _markData?.id,
          isActive: true,
        });
      } else {
        resMarkArr?.push({
          id: _markData?.id,
          isActive: false,
        });
      }
    });
    _handlerSetMark(resMarkArr);
  };

  const handleSubmitRate = async () => {
    const trueCount = await rate?.reduce((count: any, value: any) => {
      if (value?.isActive === true) {
        return count + 1;
      }
      return count;
    }, 0);
    try {
      const mapSeveralStudentRate =
        tempMarksSeveralStudent?.map(data => ({
          user_id: data?.user?.id,
          rating: trueCount,
        })) || [];
      ProviderLMS.class_session_rate({
        class_session_id: id,
        student_rating: [
          ...mapSeveralStudentRate,
          {
            user_id: studentData?.user?.id,
            rating: trueCount,
          },
        ],
      });
      await _handlerGetDataDetail();
      Toast.show({
        type: 'success',
        text1: 'Nilai keaktifan berhasil disimpan',
      });
      handleMark(0);
      _handlerOnCloseSwipeUpMarkStudent();
      setTempMarksSeveralStudent([]);
      _handlerGetDataDetail(true);
    } catch (error: any) {
      _handlerOnCloseSwipeUpMarkStudent();
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1:
            error?.response?.data?.message ?? 'Nilai keaktifan gagal disimpan',
        });
      }, 1000);
      handleMark(0);
      _handlerGetDataDetail();
    }
  };

  return {
    id,
    isLoading,
    classSessionDetail,
    isShowSwipeUpCancel,
    isShowSwipeUpMarkStudent,
    isMarksSeveralStudent,
    currentActiveTab,
    rate,
    isCancelClassSession,
    navigation,
    _handlerOnCloseSwipeUpCancel,
    _handlerShowSwipeUpCancel,
    _handlerOnSubmitButtonCancel,
    _handlerSetCurrentActiveTab,
    _handlerOnCloseSwipeUpMarkStudent,
    _handlerShowSwipeUpMarkStudent,
    _handlerGetDataDetail,
    _handlerNavigationToForm,
    _handlerOpenCancelClassSessionModal,
    _handlerCancelSessionClass,
    _handlerSetMark,
    _handlerMarksSeveralStudents,
    navigate_from,
    studentData,
    handleMark,
    handleSubmitRate,
    tempMarksSeveralStudent,
    setTempMarksSeveralStudent,
    _handlerShowSwipeUpMarkSeveralStudent,
  };
};

export default useLMSTeacherDetailClassSessionScreen;
