/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Linking, Modal, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import DateIcon from '@assets/svg/ic_calendar_blue.svg';
import {Button} from '@components/atoms';
import {StackNavigationProp} from '@react-navigation/stack';
import ProviderLMS from '@services/lms/provider';
import ProviderMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  capitalizeEachWord,
  convertDate,
  isImageFile,
} from '@constants/functional';
import dayjs from 'dayjs';
import DocIcon from '@assets/svg/ic_document.svg';
import ArrowWhiteIcon from '@assets/svg/ic_arrow_left_white.svg';
import DetailNote from '../NotesScreen/components/DetailNote';
import {styles} from './styles';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import RenderImage from '@components/atoms/RenderImage';

const TeacherAbsenceHistoryDetailScreen = () => {
  const {getUser}: any = useSelector((state: RootState) => state);
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'TeacherAbsenceHistoryDetailScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'TeacherAbsenceHistoryDetailScreen'>>();
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmNote, setShowConfirmNote] = useState<boolean>(false);
  const [absenceIdChoosed, setAbsenceIdChoosed] = useState<number>(0);
  const [absenceDetailData, setAbsenceDetailData] = useState<{
    approval_status: string;
    avatar: string;
    days: number;
    end_date: string;
    full_name: string;
    id: number;
    media_id: string;
    note: string;
    reason: string;
    registration_number: string;
    requested_date: string;
    reviewed_date: string;
    reviewer: string;
    reviewer_note: string;
    path_url: string;
    start_date: string;
  }>({
    approval_status: 'menunggu',
    avatar: '',
    days: 0,
    end_date: '',
    full_name: '',
    id: 0,
    media_id: '',
    note: '',
    reason: '',
    registration_number: '',
    requested_date: '',
    reviewed_date: '',
    reviewer: '',
    reviewer_note: '',
    path_url: '',
    start_date: '',
  });

  const handleGetAbsentHistoryDetail = async () => {
    const _resAbsentHistoryDetail: any =
      await ProviderLMS?.getAbsentHistoryDetail(route?.params?.absence_id);
    const resDataGetAbsentHistoryDetail =
      _resAbsentHistoryDetail?.data || false;
    if (resDataGetAbsentHistoryDetail?.code === 100) {
      setIsLoading(false);
      const _resMedia: any = await ProviderMedia?.getImage(
        resDataGetAbsentHistoryDetail?.data?.media_id,
      );
      const ResDataMedia = _resMedia || false;
      resDataGetAbsentHistoryDetail.data.path_url =
        ResDataMedia?.data?.path_url ?? '';
      setAbsenceDetailData(resDataGetAbsentHistoryDetail?.data);
    } else {
      setIsLoading(false);
      Toast?.show({
        type: 'error',
        text1:
          resDataGetAbsentHistoryDetail?.message ??
          'Terjadi kesalahan pada sistem',
      });
    }
  };

  const handleConfirmAttendance = async () => {
    try {
      const _resAcceptAbsence: any = await ProviderLMS?.putAcceptAbsentRequest(
        absenceIdChoosed,
      );
      const ResDataAcceptAbsence = _resAcceptAbsence?.data || false;
      if (ResDataAcceptAbsence.code === 100) {
        Toast?.show({
          type: 'success',
          text1: 'Ketidakhadiran berhasil diterima.',
        });
        navigation.goBack();
      } else {
        Toast?.show({
          type: 'error',
          text1: 'Ketidakhadiran gagal diterima.',
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

  const handleRejectAttendance = async (notes: string) => {
    try {
      const _resAcceptAbsence: any = await ProviderLMS?.putRejectAbsentRequest({
        Absence_id: absenceIdChoosed,
        reviewer_note: notes,
      });
      const ResDataAcceptAbsence = _resAcceptAbsence?.data || false;
      if (ResDataAcceptAbsence.code === 100) {
        setShowConfirmNote(false);
        Toast?.show({
          type: 'success',
          text1: 'Ketidakhadiran berhasil ditolak.',
        });
        navigation.goBack();
      } else {
        setShowConfirmNote(false);
        Toast?.show({
          type: 'error',
          text1: 'Ketidakhadiran gagal ditolak.',
        });
      }
    } catch (error: any) {
      setShowConfirmNote(false);
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ??
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  const handlePathText = (pathText: string) => {
    const _txtRes = pathText.split('/');
    return _txtRes[_txtRes?.length - 1];
  };

  const handleApprovedAction = async () => {
    try {
      const _resAcceptAbsence: any = await ProviderLMS?.putAcceptAbsentRequest(
        route?.params?.absence_id,
      );
      const ResDataAcceptAbsence = _resAcceptAbsence?.data || false;
      if (ResDataAcceptAbsence.code === 100) {
        setIsLoading(false);
        handleGetAbsentHistoryDetail();
        Toast?.show({
          type: 'success',
          text1: 'Ketidakhadiran berhasil diterima.',
        });
      } else {
        setIsLoading(false);
        handleGetAbsentHistoryDetail();
        Toast?.show({
          type: 'error',
          text1: 'Ketidakhadiran gagal diterima.',
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      handleGetAbsentHistoryDetail();
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ??
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  const handleRejectAction = async () => {
    try {
      const _resAcceptAbsence: any = await ProviderLMS?.putRejectAbsentRequest({
        Absence_id: route?.params?.absence_id,
        reviewer_note: route?.params?.rejectNotes ?? '',
      });
      const ResDataAcceptAbsence = _resAcceptAbsence?.data || false;
      if (ResDataAcceptAbsence?.code === 100) {
        setShowConfirmNote(false);
        setIsLoading(false);
        handleGetAbsentHistoryDetail();
        Toast?.show({
          type: 'success',
          text1: 'Ketidakhadiran berhasil ditolak.',
        });
      } else {
        setShowConfirmNote(false);
        setIsLoading(false);
        handleGetAbsentHistoryDetail();
        Toast?.show({
          type: 'error',
          text1: 'Ketidakhadiran gagal ditolak.',
        });
      }
    } catch (error: any) {
      setShowConfirmNote(false);
      setIsLoading(false);
      handleGetAbsentHistoryDetail();
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ??
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 15000);
    if (route?.params?.actionType) {
      if (route?.params?.actionType === 'diterima') {
        handleApprovedAction();
      } else {
        handleRejectAction();
      }
    } else {
      handleGetAbsentHistoryDetail();
    }
  }, []);

  return (
    <View style={styles.mainCOntainer}>
      <Header
        label={'Detail Kehadiran'}
        backgroundColor={Colors.white}
        labelContent={
          <Text allowFontScaling={false} style={styles.titleStyle}>
            {route?.params?.subTitle ? route?.params?.subTitle : 'Kelas Online'}
          </Text>
        }
        colorLabel={Colors.dark.neutral100}
      />
      {isLoading && <LoadingIndicator />}
      <View style={styles.dateContainerStyle}>
        <View style={styles.topContainerStyle}>
          <Text allowFontScaling={false} style={styles.fullNameStyle}>
            {absenceDetailData?.full_name}
          </Text>
          <Text allowFontScaling={false} style={styles.registNumberStyle}>
            {`NIS: ${absenceDetailData?.registration_number || '-'}`}
          </Text>
          <Text allowFontScaling={false} style={styles.dayCountStyle}>
            {`${
              absenceDetailData?.reason &&
              capitalizeEachWord(absenceDetailData?.reason)
            } (${absenceDetailData?.days} hari)`}
          </Text>
          <View style={styles.dateIconContainer}>
            <DateIcon />
            <Text allowFontScaling={false} style={styles.startEndDateStyle}>
              {`${convertDate(absenceDetailData?.start_date).format(
                'DD MMMM YYYY',
              )}${absenceDetailData?.days > 1 ? ' - ' : ''}${
                absenceDetailData?.days > 1
                  ? convertDate(absenceDetailData?.end_date).format(
                      'DD MMMM YYYY',
                    )
                  : ''
              }`}
            </Text>
          </View>
        </View>
      </View>
      <Text allowFontScaling={false} style={styles.attendanceInfoContainer}>
        {`Diajukan pada ${dayjs(absenceDetailData?.requested_date)
          ?.locale('id')
          ?.format('DD MMMM YYYY HH:mm')}`}
      </Text>
      <View style={styles.flexRow}>
        <View
          style={
            absenceDetailData?.approval_status === 'menunggu'
              ? styles.infoDetailMenunggu
              : absenceDetailData?.approval_status === 'ditolak'
              ? styles.infoDetailDitolak
              : styles.infoDetailDiterima
          }>
          <Text
            allowFontScaling={false}
            style={
              absenceDetailData?.approval_status === 'menunggu'
                ? styles.infoDetailTextMenunggu
                : absenceDetailData?.approval_status === 'diterima'
                ? styles.infoDetailTextDiterima
                : styles.infoDetailTextDitolak
            }>
            {absenceDetailData?.approval_status === 'menunggu'
              ? 'Menunggu persetujuan Guru'
              : absenceDetailData?.approval_status === 'diterima'
              ? 'Diterima'
              : 'Ditolak'}
          </Text>
        </View>
        {absenceDetailData?.approval_status === 'Diterima' ||
          (absenceDetailData?.approval_status === 'Ditolak' && (
            <View style={styles.dateToContainer}>
              <Text
                allowFontScaling={false}
                style={styles.adminInfoStyle}>{`Oleh Admin: ${
                absenceDetailData?.reviewer
              } \npada ${dayjs(absenceDetailData?.reviewed_date)
                .locale('id')
                .format('dd MMMM YYYY HH:mm')}`}</Text>
            </View>
          ))}
      </View>
      <View style={styles.separatorStyle} />
      <Text allowFontScaling={false} style={styles.lampiranStyle}>
        Lampiran
      </Text>
      {isImageFile(absenceDetailData?.path_url) ? (
        <Pressable
          onPress={() => setIsOpenPreview(true)}
          style={styles.previewImageButtonStyle}>
          <RenderImage
            imageUrl={absenceDetailData?.path_url}
            style={styles.imagePreviewStyle}
          />
        </Pressable>
      ) : absenceDetailData?.path_url !== '' ? (
        <Pressable
          onPress={() => {
            Linking.openURL(absenceDetailData?.path_url);
          }}
          style={styles.pathTextStyle}>
          <View style={styles.filePathInfoContainerStyle}>
            <Text
              allowFontScaling={false}
              style={styles.filePathInfoTitleStyle}>
              File
            </Text>
            <View style={styles.docIconContainerStyle}>
              <DocIcon />
              <Text allowFontScaling={false} style={styles.docTextStyle}>
                {handlePathText(absenceDetailData?.path_url)}
              </Text>
            </View>
          </View>
        </Pressable>
      ) : (
        <Text allowFontScaling={false} style={styles.stripTextStyle}>
          -
        </Text>
      )}
      <View style={styles.separator2Style} />
      <Text allowFontScaling={false} style={styles.notesContainerStyle}>
        Catatan
      </Text>
      <Text allowFontScaling={false} style={styles.noteStyle}>
        {`${absenceDetailData?.note !== '' ? absenceDetailData?.note : '-'}`}
      </Text>
      {absenceDetailData?.approval_status === 'ditolak' && (
        <>
          <View style={styles.separator3} />
          <Text allowFontScaling={false} style={styles.adminNotesStyle}>
            Catatan dari Admin
          </Text>
          <Text
            allowFontScaling={false}
            style={styles.adminNoteDescriptionStyle}>
            {`${
              absenceDetailData?.reviewer_note !== ''
                ? absenceDetailData?.reviewer_note
                : '-'
            }`}
          </Text>
        </>
      )}

      {absenceDetailData?.approval_status === 'menunggu' &&
        getUser?.data?.user_type_id !== 4 && (
          <View style={styles.actionButtonContainerStyle}>
            <View style={styles.rejectButtonContainer}>
              <Button
                label="Tolak"
                background="white"
                color={Colors.primary.base}
                isDisabled={absenceDetailData?.id === 0 ? true : false}
                borderColor={Colors.primary.base}
                borderWidth={1}
                action={() => {
                  setAbsenceIdChoosed(absenceDetailData?.id);
                  setShowConfirmNote(true);
                }}
              />
            </View>
            <View style={styles.approvedButtonContainer}>
              <Button
                label="Terima"
                background={Colors.success.light1}
                isDisabled={absenceDetailData?.id === 0 ? true : false}
                action={() => {
                  setAbsenceIdChoosed(absenceDetailData?.id);
                  handleConfirmAttendance();
                }}
              />
            </View>
          </View>
        )}
      <DetailNote
        type="reject_attendance"
        mode="create"
        visible={showConfirmNote}
        onClose={() => {
          setShowConfirmNote(false);
        }}
        onSuccessSubmitRejectAttendance={(res: any) => {
          handleRejectAttendance(res?.notes ?? '');
        }}
        coverScreen
        height={100}
      />
      <Modal
        visible={isOpenPreview}
        animationType="fade"
        presentationStyle="pageSheet"
        onDismiss={() => setIsOpenPreview(false)}
        children={
          <View style={styles.previewContainer}>
            <View style={styles.modalPrevieStyle}>
              <Text
                allowFontScaling={false}
                style={styles.modalPreviewLabelStyle}>
                Preview
              </Text>
              <Pressable
                onPress={() => {
                  setIsOpenPreview(false);
                }}
                style={styles.arrowWhiteIconCOntainer}>
                <ArrowWhiteIcon />
              </Pressable>
            </View>
            <RenderImage
              imageUrl={absenceDetailData?.path_url}
              style={styles.absenceDetailImageContainer}
            />
          </View>
        }
      />
    </View>
  );
};

export default TeacherAbsenceHistoryDetailScreen;
