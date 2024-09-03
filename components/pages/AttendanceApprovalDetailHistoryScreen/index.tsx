/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import {
  _handlerCapitalizeFirstLetter,
  convertDate,
  hostEndsWith,
  lisFileSvgExtension,
  listFileImageExtension,
} from '@constants/functional';
import IconFileBlue from '@assets/svg/ic_file_blue.svg';
import IconCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useAttendanceApprovalDetailHistoryScreen from './useAttendanceApprovalDetailHistoryScreen';
import {SvgUri} from 'react-native-svg';

const AttendanceApprovalDetailHistoryScreen = () => {
  const navigation: any = useNavigation();
  const {
    isLoading,
    badgeStyle,
    titleBadgeStyle,
    detailHistoryAttendance,
    approvalTitle,
    classUser,
    createdByTitle,
    _handlerSelectFile,
  } = useAttendanceApprovalDetailHistoryScreen();

  const {
    approval_status,
    days,
    start_date,
    end_date,
    reason,
    registration_number,
    full_name,
    reviewer,
    reviewed_date,
    requested_date,
    note,
    reviewer_note,
    media_id,
    file_type,
    path_url,
    file_name,
    original_name,
    rombel_class_school_name,
  } = detailHistoryAttendance;

  const formatDateToCustomFormatNoDays = (dateString: any) => {
    const formattedDate = convertDate(dateString).format('D MMMM YYYY');
    return formattedDate;
  };

  const formatDateToCustomFormatWithTime = (dateString: any) => {
    const formattedDate = convertDate(dateString).format('D MMMM YYYY HH:mm');
    return formattedDate;
  };

  const isAprovalWaiting = approval_status === 'menunggu';
  const startDateFrom = formatDateToCustomFormatNoDays(start_date);
  const untilDateFrom = formatDateToCustomFormatNoDays(end_date);
  const requestDateFrom = formatDateToCustomFormatWithTime(requested_date);
  const reviewedDateFrom = formatDateToCustomFormatWithTime(reviewed_date);

  const attachmentExtension = path_url && path_url?.split('.')?.pop();
  const isAttachmentImage =
    listFileImageExtension.includes(attachmentExtension);
  const isAttachmentSvg = lisFileSvgExtension.includes(attachmentExtension);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Ketidakhadiran'}
          subLabel={`${classUser ?? rombel_class_school_name} • Kelas Online`}
        />
      ),
    });
  }, [navigation, detailHistoryAttendance]);

  const _renderContent = () => {
    return (
      <View>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardHeadTitle}>{full_name}</Text>
            <Text
              style={styles.cardNisTitle}>{`NIS: ${registration_number}`}</Text>
            <Text
              style={styles.cardReasonTitle}>{`${_handlerCapitalizeFirstLetter(
              reason,
            )} (${days} hari)`}</Text>
            <View style={styles.cardDateContainer}>
              <IconCalendarBlue width={24} height={24} />

              <Text style={styles.cardDateTitle}>
                {`${startDateFrom} - ${untilDateFrom}`}
              </Text>
            </View>
          </View>

          <Text style={styles.attendanceRequestTitle}>
            {`Diajukan pada ${requestDateFrom}`}
          </Text>

          <View style={styles.aprrovedContainer}>
            <View style={badgeStyle}>
              <Text style={titleBadgeStyle}>
                {_handlerCapitalizeFirstLetter(approvalTitle)}
              </Text>
            </View>
            {!isAprovalWaiting ? (
              <Text style={styles.approvedByTitle}>
                {`Oleh ${createdByTitle}: ${
                  reviewer || '-'
                }\npada ${reviewedDateFrom}`}
              </Text>
            ) : null}
          </View>
        </View>

        {path_url ? (
          <>
            <View style={styles.lineGrey} />

            <View style={styles.content}>
              <Text style={styles.attachmentHeadTitle}>{'Lampiran'}</Text>

              {isAttachmentSvg || isAttachmentImage ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ViewAttachmentScreen', {
                      mediaId: media_id,
                      type: file_type,
                    });
                  }}
                  style={styles.attachmentImageContainer}>
                  {path_url && isAttachmentSvg ? (
                    <SvgUri uri={path_url} style={styles.imageIcon} />
                  ) : path_url && isAttachmentImage ? (
                    <Image
                      source={hostEndsWith(path_url ?? '')}
                      style={styles.imageIcon}
                    />
                  ) : null}
                </TouchableOpacity>
              ) : null}

              {!isAttachmentSvg && !isAttachmentImage ? (
                <TouchableOpacity
                  onPress={() => {
                    _handlerSelectFile(path_url);
                  }}
                  style={styles.attachmentFileContainer}>
                  <Text style={styles.attachmentFileHeadTitle}>{'File'}</Text>

                  <View style={styles.attachmentDescriptionWrapper}>
                    <IconFileBlue width={24} height={24} />

                    <Text style={styles.attachmentFileDescriptionTitle}>
                      {original_name ?? file_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        ) : null}

        {note ? (
          <>
            <View style={styles.lineGrey} />

            <View style={styles.content}>
              <Text style={styles.noteHeadTitle}>{'Catatan'}</Text>
              <Text style={styles.noteDescriptionTitle}>{note}</Text>
            </View>
          </>
        ) : null}

        {reviewer_note ? (
          <>
            <View style={styles.lineGrey} />

            <View style={styles.content}>
              <Text style={styles.noteHeadTitle}>{'Catatan dari Guru'}</Text>
              <Text style={styles.noteDescriptionTitle}>{reviewer_note}</Text>
            </View>
          </>
        ) : null}
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
        <ScrollView
          bounces={false}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          {_renderContent()}
        </ScrollView>
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default AttendanceApprovalDetailHistoryScreen;
