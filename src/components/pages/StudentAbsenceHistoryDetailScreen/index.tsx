/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Linking, Modal, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import DateIcon from '@assets/svg/ic_calendar_blue.svg';
import {Button} from '@components/atoms';
import KonfirmasiKehadiran from '../LMSTeacherLaporanKehadiranMuridScreen/swipeUpContent/konfirmasiKehadiran';
import ProviderLMS from '@services/lms/provider';
import ProviderMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {capitalizeEachWord, convertDate} from '@constants/functional';
import {SvgUri} from 'react-native-svg';
import DocIcon from '@assets/svg/ic_document.svg';
import ArrowWhiteIcon from '@assets/svg/ic_arrow_left_white.svg';
import DetailNote from '../NotesScreen/components/DetailNote';

const StudentAbsenceHistoryDetailScreen = () => {
  const route =
    useRoute<RouteProp<ParamList, 'StudentAbsenceHistoryDetailScreen'>>();
  const isFocus = useIsFocused();
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showConfirmNote, setShowConfirmNote] = useState<boolean>(false);
  const [absenceIdChoosed, setAbsenceIdChoosed] = useState<number>(0);
  const [withoutApprovalButton, setWithoutApprovalButton] =
    useState<boolean>(false);
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
      const _resMedia: any = await ProviderMedia?.getImage(
        resDataGetAbsentHistoryDetail?.data?.media_id,
      );
      const ResDataMedia = _resMedia || false;
      resDataGetAbsentHistoryDetail.data.path_url =
        ResDataMedia?.data?.path_url ?? '';
      setAbsenceDetailData(resDataGetAbsentHistoryDetail?.data);
    } else {
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
        setShowConfirm(false);
        Toast?.show({
          type: 'success',
          text1: 'Ketidakhadiran berhasil diterima.',
        });
      } else {
        setShowConfirm(false);
        Toast?.show({
          type: 'error',
          text1: 'Ketidakhadiran gagal diterima.',
        });
      }
    } catch (error: any) {
      setShowConfirm(false);
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

  const formatDate = (date: string) => {
    return convertDate(date).format('DD MMMM YYYY');
  };
  const formatDateWithTime = (date: string) => {
    return convertDate(date).format('DD MMMM YYYY HH:mm');
  };

  useEffect(() => {
    handleGetAbsentHistoryDetail();
    route?.params?.withoutApprovalButton === true &&
      setWithoutApprovalButton(true);
  }, [isFocus]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        label={'Detail Kehadiran'}
        backgroundColor={Colors.white}
        labelContent={
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
              lineHeight: 16,
            }}>
            Kelas Online
          </Text>
        }
        colorLabel={Colors.dark.neutral100}
      />
      <View style={{width: '100%', marginTop: 20}}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: Colors.primary.light3,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              lineHeight: 24,
              color: Colors.dark.neutral100,
              marginBottom: 3,
            }}>
            {absenceDetailData?.full_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              lineHeight: 16,
              color: Colors.dark.neutral80,
              marginBottom: 3,
            }}>
            {`NIK: ${absenceDetailData?.registration_number || '-'}`}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              lineHeight: 22,
              color: Colors.dark.neutral80,
              marginBottom: 3,
            }}>
            {`${
              absenceDetailData?.reason &&
              capitalizeEachWord(absenceDetailData?.reason)
            } (${absenceDetailData?.days} hari)`}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <DateIcon />
            {absenceDetailData?.days > 1 ? (
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 22,
                  marginTop: 5,
                  marginLeft: 8,
                  color: Colors.dark.neutral80,
                  marginBottom: 3,
                }}>
                {`${formatDate(absenceDetailData?.start_date)} - ${formatDate(
                  absenceDetailData?.end_date,
                )}`}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 22,
                  marginTop: 5,
                  marginLeft: 8,
                  color: Colors.dark.neutral80,
                  marginBottom: 3,
                }}>
                {`${formatDate(absenceDetailData?.start_date)}`}
              </Text>
            )}
          </View>
        </View>
      </View>
      <Text style={{marginLeft: '5%', marginVertical: 15}}>
        {`Diajukan pada ${formatDateWithTime(
          absenceDetailData?.requested_date,
        )}`}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor:
              absenceDetailData?.approval_status === 'menunggu'
                ? Colors.secondary?.light2
                : absenceDetailData?.approval_status === 'diterima'
                ? Colors.success.light2
                : Colors.danger.light2,
            alignItems: 'center',
            paddingVertical: 5,
            marginLeft: '5%',
            paddingHorizontal: 12,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '600',
              fontSize: 14,
              lineHeight: 22,
              color:
                absenceDetailData?.approval_status === 'menunggu'
                  ? Colors.orange.dark1
                  : absenceDetailData?.approval_status === 'diterima'
                  ? Colors.success.base
                  : Colors.danger.base,
            }}>
            {absenceDetailData?.approval_status === 'menunggu'
              ? 'Belum diverifikasi'
              : absenceDetailData?.approval_status === 'diterima'
              ? 'Diterima'
              : 'Ditolak'}
          </Text>
        </View>
        {absenceDetailData?.approval_status !== 'menunggu' && (
          <View style={{paddingLeft: 10, paddingRight: 150}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                lineHeight: 16,
                color: Colors.dark.neutral80,
              }}>{`Oleh Admin: ${
              absenceDetailData?.reviewer
            } \npada ${formatDateWithTime(
              absenceDetailData?.reviewed_date,
            )}`}</Text>
          </View>
        )}
      </View>
      <View
        style={{
          width: '100%',
          borderTopWidth: 4,
          marginVertical: 15,
          borderTopColor: Colors.dark.neutral10,
        }}
      />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 20,
          color: Colors.dark.neutral100,
          marginLeft: '5%',
        }}>
        Lampiran
      </Text>
      {absenceDetailData?.path_url?.endsWith('svg') ? (
        <Pressable onPress={() => setIsOpenPreview(true)}>
          <SvgUri
            uri={absenceDetailData?.path_url}
            style={{width: 50, height: 50}}
          />
        </Pressable>
      ) : absenceDetailData?.path_url?.endsWith('png') ? (
        <Pressable
          onPress={() => setIsOpenPreview(true)}
          style={{
            width: '100%',
            height: 185,
            alignItems: 'center',
            marginVertical: 12,
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: absenceDetailData?.path_url}}
            style={{
              width: '100%',
              resizeMode: 'cover',
              height: '100%',
            }}
          />
        </Pressable>
      ) : absenceDetailData?.path_url?.endsWith('jpg') ? (
        <Pressable
          onPress={() => setIsOpenPreview(true)}
          style={{
            width: '100%',
            height: 185,
            alignItems: 'center',
            marginVertical: 12,
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: absenceDetailData?.path_url}}
            style={{
              width: '100%',
              resizeMode: 'cover',
              height: '100%',
            }}
          />
        </Pressable>
      ) : absenceDetailData?.path_url !== '' ? (
        <Pressable
          onPress={() => {
            Linking.openURL(absenceDetailData?.path_url);
          }}
          style={{width: '100%', alignItems: 'center', marginVertical: 10}}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderWidth: 0.5,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderColor: Colors.dark.neutral50,
            }}>
            <Text
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 3,
                fontFamily: 'Poppins-Regular',
                color: Colors.dark.neutral60,
                alignItems: 'center',
              }}>
              File
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <DocIcon />
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                  lineHeight: 18,
                }}>
                {handlePathText(absenceDetailData?.path_url)}
              </Text>
            </View>
          </View>
        </Pressable>
      ) : (
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            lineHeight: 20,
            color: Colors.dark.neutral100,
            marginTop: 10,
            marginLeft: '5%',
          }}>
          -
        </Text>
      )}
      <View
        style={{
          width: '100%',
          borderTopWidth: 4,
          marginVertical: 15,
          borderTopColor: Colors.dark.neutral10,
        }}
      />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 20,
          color: Colors.dark.neutral100,
          marginLeft: '5%',
        }}>
        Catatan
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 20,
          color: Colors.dark.neutral100,
          marginTop: 10,
          marginLeft: '5%',
        }}>
        {`${absenceDetailData?.note !== '' ? absenceDetailData?.note : '-'}`}
      </Text>
      {absenceDetailData?.approval_status !== 'menunggu' && (
        <>
          <View
            style={{
              width: '100%',
              borderTopWidth: 4,
              marginVertical: 15,
              borderTopColor: Colors.dark.neutral10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              lineHeight: 20,
              color: Colors.dark.neutral100,
              marginLeft: '5%',
            }}>
            Catatan dari Admin
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              lineHeight: 20,
              color: Colors.dark.neutral100,
              marginTop: 10,
              marginLeft: '5%',
            }}>
            {`${
              absenceDetailData?.reviewer_note !== ''
                ? absenceDetailData?.reviewer_note
                : '-'
            }`}
          </Text>
        </>
      )}

      {absenceDetailData?.approval_status === 'menunggu' &&
        withoutApprovalButton === false && (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, paddingLeft: 20}}>
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
            <View style={{flex: 1, paddingRight: 20, paddingLeft: 10}}>
              <Button
                label="Terima"
                background={Colors.success.light1}
                isDisabled={absenceDetailData?.id === 0 ? true : false}
                action={() => {
                  setAbsenceIdChoosed(absenceDetailData?.id);
                  setShowConfirm(true);
                }}
              />
            </View>
          </View>
        )}
      <Modal
        visible={showConfirm}
        transparent={true}
        animationType="fade"
        style={{flex: 1, alignItems: 'center'}}
        children={
          <KonfirmasiKehadiran
            handleClose={() => {
              setShowConfirm(false);
            }}
            handleSubmit={() => {
              handleConfirmAttendance();
            }}
          />
        }
      />
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
        children={
          <View style={{flex: 1, backgroundColor: '#1D252D'}}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                backgroundColor: 'transparent',
                paddingVertical: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  lineHeight: 24,
                  color: Colors.white,
                }}>
                Preview
              </Text>
              <Pressable
                onPress={() => {
                  setIsOpenPreview(false);
                }}
                style={{position: 'absolute', left: 10, top: 12, padding: 5}}>
                <ArrowWhiteIcon />
              </Pressable>
            </View>
            {absenceDetailData?.path_url?.endsWith('svg') ? (
              <SvgUri
                uri={absenceDetailData?.path_url}
                style={{width: '100%', height: '100%'}}
              />
            ) : (
              <Image
                source={{uri: absenceDetailData?.path_url}}
                style={{width: '100%', height: '100%', resizeMode: 'center'}}
              />
            )}
          </View>
        }
      />
    </View>
  );
};

export default StudentAbsenceHistoryDetailScreen;
