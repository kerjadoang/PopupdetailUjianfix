import {Button, MainView, SwipeUp} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {TabView} from './component/TabView';
import IconEdit from '@assets/svg/ic_edit.svg';
import {SvgUri} from 'react-native-svg';
import {formatDate, hostEndsWith} from '@constants/functional';
import useLMSTeacherDetailClassSessionScreen from './useLMSTeacherDetailClassSessionScreen';
import {Content} from './component/Content';
import {styles} from './style';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import VideoPlayer from '@components/atoms/VideoPlayer';
import ActiveStar from '@assets/svg/star-active.svg';
import InActiveStar from '@assets/svg/star_inactive.svg';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStartMeeting, fetchTeacherJoinMeeting} from '@redux';
import DetailNote from '../NotesScreen/components/DetailNote';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Avatar from '@components/atoms/Avatar';
import {generalStyles} from '@constants/styles';
import {RootState} from 'src/redux/rootReducer';

const LMSTeacherDetailClassSessionScreen = () => {
  const {
    isLoading,
    classSessionDetail,
    isShowSwipeUpCancel,
    currentActiveTab,
    isCancelClassSession,
    studentData,
    isShowSwipeUpMarkStudent,
    isMarksSeveralStudent,
    navigation,
    _handlerOnCloseSwipeUpCancel,
    _handlerCancelSessionClass,
    _handlerShowSwipeUpMarkStudent,
    _handlerGetDataDetail,
    _handlerOnCloseSwipeUpMarkStudent,
    _handlerSetCurrentActiveTab,
    _handlerOpenCancelClassSessionModal,
    _handlerNavigationToForm,
    handleMark,
    handleSubmitRate,
    _handlerMarksSeveralStudents,
    rate,
    navigate_from,
    tempMarksSeveralStudent,
    setTempMarksSeveralStudent,
    _handlerShowSwipeUpMarkSeveralStudent,
  } = useLMSTeacherDetailClassSessionScreen();
  const dispatch = useDispatch();
  const [isCanNextRate, setIsCanNextRate] = useState<boolean>(false);
  const {data: userData}: any = useSelector(
    (state: RootState) => state?.getUser,
  );
  const isRenderAttendance =
    classSessionDetail?.status != 'canceled'
      ? true
      : classSessionDetail?.status === 'finsih' && userData?.user_type_id !== 4
      ? true
      : false;

  const buttonSubmitTitle =
    classSessionDetail?.platform != 'zoom' &&
    classSessionDetail != 'google_meet'
      ? 'Masuk Kelas'
      : classSessionDetail?.status === 'on_going'
      ? 'Masuk Kelas'
      : classSessionDetail?.status === 'unstarted'
      ? 'Mulai Kelas'
      : '';

  const buttonSubmitOnPress = () => {
    if (classSessionDetail?.zoom !== null) {
      classSessionDetail?.status === 'on_going' &&
        dispatch(
          fetchTeacherJoinMeeting(classSessionDetail?.id, () =>
            navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
          ),
        );

      classSessionDetail?.status === 'unstarted' &&
        dispatch(
          fetchStartMeeting(
            {
              class_session_id: classSessionDetail?.id,
              subject_id: classSessionDetail?.subject?.id,
              subject: classSessionDetail?.subject?.name,
              rombel_class_id: classSessionDetail?.rombel_class_id,
              rombel_class: classSessionDetail?.rombel_class?.name,
              platform: classSessionDetail?.platform,
            },
            () => navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
          ),
        );
    } else if (classSessionDetail?.google_meet !== null) {
      if (classSessionDetail?.google_meet?.start_url !== '') {
        const meetUrl = classSessionDetail?.google_meet?.start_url;
        classSessionDetail?.status === 'on_going' &&
          classSessionDetail?.start_soon == true &&
          dispatch(
            fetchStartMeeting(
              {
                class_session_id: classSessionDetail?.id,
                subject_id: classSessionDetail?.subject?.id,
                subject: classSessionDetail?.subject?.name,
                rombel_class_id: classSessionDetail?.rombel_class_id,
                rombel_class: classSessionDetail?.rombel_class?.name,
                platform: classSessionDetail?.platform,
              },
              () =>
                Linking.openURL(meetUrl)
                  .then(() => {
                    navigation.goBack();
                  })
                  .catch(() => {}),
            ),
          );

        classSessionDetail?.status === 'on_going' &&
          classSessionDetail?.start_soon == false &&
          dispatch(
            fetchTeacherJoinMeeting(classSessionDetail?.id ?? 0, () => {
              Linking.openURL(meetUrl)
                .then(() => {
                  navigation.goBack();
                })
                .catch(() => {});
            }),
          );

        classSessionDetail?.status === 'unstarted' &&
          dispatch(
            fetchStartMeeting(
              {
                class_session_id: classSessionDetail?.id,
                subject_id: classSessionDetail?.subject?.id,
                subject: classSessionDetail?.subject?.name,
                rombel_class_id: classSessionDetail?.rombel_class_id,
                rombel_class: classSessionDetail?.rombel_class?.name,
                platform: classSessionDetail?.platform,
              },
              () =>
                Linking.openURL(meetUrl)
                  .then(() => {
                    navigation.goBack();
                  })
                  .catch(() => {}),
            ),
          );
      } else {
        Toast?.show({
          type: 'error',
          text1: 'Gagal masuk google meet',
        });
      }
    }
  };
  // keep sementara
  // classSessionDetail?.platform != 'zoom' &&
  // classSessionDetail != 'google_meet'
  //   ? () => {}
  //   : classSessionDetail?.status === 'on_going'
  //   ? () => {
  //       dispatch(
  //         fetchTeacherJoinMeeting(classSessionDetail?.id, () =>
  //           navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
  //         ),
  //       );
  //     }
  //   : classSessionDetail?.status === 'unstarted'
  //   ? () => {
  //       dispatch(
  //         fetchStartMeeting(
  //           {
  //             class_session_id: classSessionDetail?.id,
  //             subject_id: classSessionDetail?.subject?.id,
  //             subject: classSessionDetail?.subject?.name,
  //             rombel_class_id: classSessionDetail?.rombel_class_id,
  //             rombel_class: classSessionDetail?.rombel_class?.name,
  //             platform: classSessionDetail?.platform,
  //           },
  //           () => navigation.navigate('LMSTeacherMeetingLiveSessionScreen'),
  //         ),
  //       );
  //     }
  //   : () => {};
  const typeTitle =
    classSessionDetail?.type == 'live'
      ? 'Langsung'
      : classSessionDetail?.type == 'record'
      ? 'Rekaman'
      : '';

  const platformTitle =
    classSessionDetail?.platform == 'zoom'
      ? 'Zoom'
      : classSessionDetail?.platform == 'google_meet'
      ? 'Google Meet'
      : '';

  const date = formatDate(
    classSessionDetail?.time_start,
    classSessionDetail?.time_end,
  );

  const _renderSwipeUpCancel = () => {
    return (
      <View>
        <Text>{'Cancel'}</Text>
      </View>
    );
  };

  const _renderSwipeUpMarkStudent = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.markSwipeTitle}>Nilai Keaktifan Murid</Text>
        <Text style={styles.markSwipeStudentName}>
          {studentData?.user?.full_name}
        </Text>
        <View style={styles.markSwipeStarContainer}>
          {rate?.map((_rate: {id: number; isActive: boolean}) => {
            return (
              <TouchableOpacity
                key={_rate?.id}
                onPress={() => {
                  setIsCanNextRate(true);
                  handleMark(_rate.id);
                }}
                style={styles.markSwipeStatInnerContainer}>
                {_rate?.isActive ? (
                  <ActiveStar width={50} height={50} />
                ) : (
                  <InActiveStar width={50} height={50} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          action={() => {
            handleSubmitRate();
          }}
          isDisabled={!isCanNextRate}
          label="Simpan Nilai"
          style={{marginVertical: 10, width: '90%'}}
        />
      </View>
    );
  };

  const renderBadge = (status: string, start_soon?: boolean) => {
    switch (status) {
      case 'on_going':
        if (start_soon) {
          return (
            <View style={styles.badgeStatusContainer}>
              <Text style={styles.badgeStatusTitle}>{'Belum Berlangsung'}</Text>
            </View>
          );
        }
        return (
          <View style={styles.onGoingContainer}>
            <View style={styles.onGoingCard}>
              <View style={styles.onGoingDotOutter}>
                <View style={styles.onGoingDotInner} />
              </View>
              <Text style={styles.onGoingTitle}>{'Sedang berlangsung'}</Text>
            </View>
          </View>
        );

      case 'unstarted':
        return (
          <View style={styles.badgeStatusContainer}>
            <Text style={styles.badgeStatusTitle}>{'Belum Berlangsung'}</Text>
          </View>
        );

      case 'canceled':
        return (
          <View style={styles.badgeStatusContainer}>
            <Text
              style={[
                styles.badgeStatusTitle,
                {
                  backgroundColor: Colors.dark.neutral10,
                  color: Colors.dark.neutral80,
                },
              ]}>
              {'Dibatalkan'}
            </Text>
          </View>
        );

      case 'finish':
        return (
          <View style={styles.badgeStatusContainer}>
            <Text
              style={[
                styles.badgeStatusTitle,
                {
                  backgroundColor: Colors.success.light2,
                  color: Colors.success.base,
                },
              ]}>
              {'Selesai'}
            </Text>
          </View>
        );

      default:
        break;
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Header
          label={'Detail Sesi Kelas'}
          iconRight={
            classSessionDetail?.status !== 'finish' &&
            userData?.user_type_id !== 4 ? (
              <IconEdit width={20} height={20} />
            ) : null
          }
          onPressIconRight={() => {
            _handlerNavigationToForm();
          }}
        />
        <ScrollView
          bounces={false}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          {classSessionDetail?.media?.media ? (
            <View>
              <VideoPlayer
                uri={classSessionDetail?.media?.path_url}
                thumbnail={classSessionDetail?.media?.thumbnail}
                status={classSessionDetail?.media?.status}
                fetch={_handlerGetDataDetail}
              />
            </View>
          ) : null}

          <View style={styles.headerContainer}>
            <View style={styles.badgeContainer}>
              <View style={styles.badgeCard}>
                <Text style={styles.badgeTitle}>
                  {classSessionDetail?.rombel_class?.name}
                </Text>
              </View>

              <View style={styles.badgeCard}>
                <Text style={styles.badgeTitle}>{typeTitle}</Text>
              </View>

              {platformTitle?.length == 0 ? null : (
                <View style={styles.badgeCard}>
                  <Text style={styles.badgeTitle}>{platformTitle}</Text>
                </View>
              )}
            </View>

            <View style={styles.headerContent}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerSubjectTitle}>
                  {classSessionDetail?.title}
                </Text>

                <Text style={styles.headerContentTitle}>
                  {classSessionDetail?.subject?.name}
                </Text>

                <Text style={styles.headerDateTitle}>{date}</Text>
              </View>

              {!classSessionDetail?.subject
                ?.path_url ? null : classSessionDetail?.subject?.path_url?.endsWith(
                  '.svg',
                ) ? (
                <SvgUri
                  uri={classSessionDetail?.subject?.path_url}
                  style={styles.headerContentIcon}
                />
              ) : (
                <Image
                  source={hostEndsWith(
                    classSessionDetail?.subject?.path_url ?? '',
                  )}
                  style={styles.headerContentIcon}
                />
              )}
            </View>

            {renderBadge(
              classSessionDetail?.status,
              classSessionDetail?.start_soon,
            )}
          </View>

          <View style={styles.lineGrey} />

          {classSessionDetail?.status == 'canceled' ? (
            <View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.headTitle}>{'Alasan Pembatalan'}</Text>

                <Text style={styles.descriptionTitle}>
                  {classSessionDetail?.cancel_reason}
                </Text>
              </View>

              <View style={styles.lineGrey} />
            </View>
          ) : null}

          {classSessionDetail?.description ? (
            <View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.headTitle}>{'Deskripsi'}</Text>

                <Text style={styles.descriptionTitle}>
                  {classSessionDetail?.description}
                </Text>
              </View>

              <View style={styles.lineGrey} />
            </View>
          ) : null}

          <View style={styles.createdByContainer}>
            <Avatar id={classSessionDetail?.user_created_by?.avatar} />

            <View>
              <Text style={styles.headTitle}>{'Diajar Oleh'}</Text>
              <Text style={styles.userCreatedByDescription}>
                {classSessionDetail?.user_created_by?.full_name}
              </Text>
            </View>
          </View>

          <View style={styles.lineGrey} />

          {isRenderAttendance ? (
            <View>
              <View style={styles.headTitleWrapper}>
                <Text style={styles.headTitle}>{'Peserta'}</Text>
              </View>

              <TabView
                onAttend={() => {
                  _handlerSetCurrentActiveTab(0);
                }}
                onNotAttend={() => {
                  _handlerSetCurrentActiveTab(1);
                }}
                totalAttend={classSessionDetail?.participant?.join?.length || 0}
                totalNotAttend={
                  classSessionDetail?.participant?.not_join?.length || 0
                }
                active={currentActiveTab}
              />

              <Content
                type={classSessionDetail?.type}
                status={classSessionDetail?.status}
                data={classSessionDetail?.participant}
                active={currentActiveTab}
                showMarkStudent={(studentData: any) => {
                  _handlerShowSwipeUpMarkStudent(studentData);
                }}
                isMarkSeveralStudent={isMarksSeveralStudent}
                severalStudentItems={tempMarksSeveralStudent}
                markSeveralStudentItems={(studentData: any) => {
                  setTempMarksSeveralStudent((prevState: any) => {
                    return (prevState || [])?.pushOrRemove(studentData, {
                      customCondition: (data: any) =>
                        data.id === studentData.id,
                    });
                  });
                }}
              />
            </View>
          ) : null}
        </ScrollView>

        {navigate_from === 'LMSTeacherHistoryClassSessionScreen' ? null : (
          <View style={styles.descriptionContainer}>
            {classSessionDetail?.status == 'on_going' &&
            classSessionDetail?.start_soon ? (
              <View>
                {userData?.user_type_id !== 4 ? (
                  <View>
                    <Button
                      label={buttonSubmitTitle}
                      background={Colors.primary.base}
                      color={Colors.white}
                      action={buttonSubmitOnPress}
                      bottom={12}
                    />
                    <Button
                      label={'Batalkan Kelas'}
                      outline
                      color={Colors.white}
                      action={() => _handlerOpenCancelClassSessionModal(true)}
                    />
                  </View>
                ) : null}
              </View>
            ) : null}

            {classSessionDetail?.status === 'on_going' &&
            !classSessionDetail?.start_soon ? (
              <Button
                label={buttonSubmitTitle}
                background={Colors.primary.base}
                color={Colors.white}
                action={buttonSubmitOnPress}
              />
            ) : null}

            {classSessionDetail?.status == 'unstarted' &&
            userData?.user_type_id !== 4 ? (
              <Button
                label={'Batalkan Kelas'}
                outline
                color={Colors.white}
                action={() => _handlerOpenCancelClassSessionModal(true)}
              />
            ) : null}
          </View>
        )}

        {navigate_from !== 'LMSTeacherHistoryClassSessionScreen' ||
        classSessionDetail?.type !== 'live' ||
        userData?.user_type_id === 4 ? null : (
          <View
            style={[
              styles.descriptionContainerShadow,
              {backgroundColor: Colors.white},
            ]}>
            <View style={styles.descriptionContainer}>
              {!isMarksSeveralStudent ? (
                <Button
                  label={'Nilai Langsung Beberapa Murid'}
                  background={Colors.primary.base}
                  color={Colors.white}
                  action={_handlerMarksSeveralStudents}
                />
              ) : (
                <MainView flexDirection="row" gap={12}>
                  <Button
                    style={generalStyles.contentFlex}
                    outline
                    label={'Batal'}
                    color={Colors.primary.base}
                    action={_handlerMarksSeveralStudents}
                  />
                  <Button
                    isDisabled={tempMarksSeveralStudent?.length === 0}
                    style={generalStyles.contentFlex}
                    label={`Nilai ${tempMarksSeveralStudent?.length} Murid`}
                    background={Colors.primary.base}
                    color={Colors.white}
                    action={_handlerShowSwipeUpMarkSeveralStudent}
                  />
                </MainView>
              )}
            </View>
          </View>
        )}

        <DetailNote
          type={'close_class_session'}
          mode={'edit'}
          onSuccessSubmitRejectAttendance={(param: {
            chapter_material_id?: any;
            file_path?: string;
            notes?: string;
            path_url?: string;
          }) => {
            _handlerCancelSessionClass(param?.notes ?? '');
          }}
          onClose={() => _handlerOpenCancelClassSessionModal(false)}
          visible={isCancelClassSession}
        />
      </View>

      <SwipeUp
        height={100}
        visible={isShowSwipeUpCancel}
        onClose={_handlerOnCloseSwipeUpCancel}
        children={_renderSwipeUpCancel()}
      />

      <SwipeUp
        height={100}
        animationDuration={1000}
        visible={isShowSwipeUpMarkStudent}
        onClose={_handlerOnCloseSwipeUpMarkStudent}
        children={_renderSwipeUpMarkStudent()}
      />

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default LMSTeacherDetailClassSessionScreen;
