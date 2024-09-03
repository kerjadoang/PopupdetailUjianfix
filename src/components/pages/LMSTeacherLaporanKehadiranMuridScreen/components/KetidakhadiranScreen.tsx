/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import ArrowBlue from '@assets/svg/blueArrow.svg';
import HistoryIcon from '@assets/svg/ic24_history_blue.svg';
import RobotEmptyIcon from '@assets/svg/robot_empty_search_base.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGetStudentsAbsentRequestHistory,
  fetchPutAcceptAbsentRequest,
  fetchPutIgnoreAbsentRequest,
} from '@redux';
import AttendanceCardComponent from '../atoms/attendanceCardComponent';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import KonfirmasiKehadiran from '../swipeUpContent/konfirmasiKehadiran';
import {Modal} from 'react-native';
import DetailNote from '@components/pages/NotesScreen/components/DetailNote';
import {styles} from '../style';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const KetidakhadiranScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'KetidakhadiranScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'KetidakhadiranScreen'>>();
  const dispatch: any = useDispatch();
  const isFocus = useIsFocused();
  const [absentData, setAbsentData] = useState<any>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showConfirmNote, setShowConfirmNote] = useState<boolean>(false);
  const [approvedCount, setApprovedCount] = useState<number>(0);
  const [rejectedCount, setRejectedCount] = useState<number>(0);
  const [countDone, setCountDone] = useState<number>(0);
  const [confirmType, setConfirmType] = useState<'accept' | 'reject'>('accept');
  const [choosedId, setChoosedId] = useState<any>();
  const {getUser}: any = useSelector(state => state);

  const handleActionAttendance = (
    _id: any,
    _confirmType: 'accept' | 'reject',
  ) => {
    setChoosedId(_id);
    setConfirmType(_confirmType);
    setShowConfirm(true);
  };

  const handleConfirmAttendance = () => {
    dispatch(
      fetchPutAcceptAbsentRequest({absence_id: choosedId}, (_res: any) => {
        if (_res?.data?.code === 100) {
          Toast.show({
            type: 'success',
            text1: 'Kehadiran berhasil diterima',
          });
          setShowConfirm(false);
          dispatch(
            fetchGetStudentsAbsentRequestHistory(
              {
                approval_status: 'menunggu',
                end_date: '',
                start_date: '',
                rombel_class_school_id: route?.params.rombelClassSchoolId,
              },
              (_ie: any) => {
                setAbsentData(_ie?.data?.data);
              },
            ),
          );
        } else {
          Toast.show({
            type: 'error',
            text1: _res?.data?.message ?? 'Kehadiran gagal diterima',
          });
          setShowConfirm(false);
        }
      }),
    );
  };

  const handleRejectAttendance = (notes: string) => {
    dispatch(
      fetchPutIgnoreAbsentRequest(
        {absence_id: choosedId, reviewer_note: notes},
        (_res: any) => {
          if (_res?.data?.code === 100) {
            Toast.show({
              type: 'success',
              text1: 'Kehadiran berhasil ditolak',
            });
            setShowConfirm(false);
            setShowConfirmNote(false);
            dispatch(
              fetchGetStudentsAbsentRequestHistory(
                {
                  approval_status: 'menunggu',
                  end_date: '',
                  start_date: '',
                  rombel_class_school_id: route?.params.rombelClassSchoolId,
                },
                (_ie: any) => {
                  setAbsentData(_ie?.data?.data);
                },
              ),
            );
          } else {
            Toast.show({
              type: 'error',
              text1: _res?.data?.message ?? 'Kehadiran gagal ditolak',
            });
            setShowConfirm(false);
            setShowConfirmNote(false);
          }
        },
      ),
    );
  };

  const handleGoAttendanceDetail = async (absence_id: any) => {
    navigation?.navigate('TeacherAbsenceHistoryDetailScreen', {
      absence_id: absence_id,
      role_id: getUser?.user_type_id,
      subTitle: route?.params?.subTitle,
    });
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 15000);
    dispatch(
      fetchGetStudentsAbsentRequestHistory(
        {
          approval_status: 'menunggu',
          end_date: '',
          start_date: '',
          rombel_class_school_id: route?.params.rombelClassSchoolId,
        },
        (res: any) => {
          setCountDone(prevCount => prevCount + 1);
          setAbsentData(res?.data?.data);
        },
      ),
    );
    dispatch(
      fetchGetStudentsAbsentRequestHistory(
        {
          approval_status: 'diterima',
          end_date: '',
          start_date: '',
          rombel_class_school_id: route?.params.rombelClassSchoolId,
        },
        (res: any) => {
          setCountDone(prevCount => prevCount + 1);
          setApprovedCount(res?.data?.data?.length);
        },
      ),
    );
    dispatch(
      fetchGetStudentsAbsentRequestHistory(
        {
          approval_status: 'ditolak',
          end_date: '',
          start_date: '',
          rombel_class_school_id: route?.params.rombelClassSchoolId,
        },
        (res: any) => {
          setCountDone(prevCount => prevCount + 1);
          setRejectedCount(res?.data?.data?.length);
        },
      ),
    );
  }, [isFocus]);

  useEffect(() => {
    if (countDone === 3) {
      setIsLoading(false);
      setCountDone(prevCount => prevCount * 0);
    }
  }, [countDone]);

  return (
    <View style={styles.KSContainerStyle}>
      {isLoading && <LoadingIndicator />}
      <Header
        label={'Ketidakhadiran'}
        backgroundColor={Colors.white}
        labelContent={
          <Text allowFontScaling={false} style={styles.KSSubtitleStyle}>
            {route?.params?.subTitle}
          </Text>
        }
      />
      <View style={styles.KSHistory}>
        <Pressable style={styles.KSHistoryButtonContainerStyle}>
          <View style={styles.KSHistoryIconStyle}>
            <HistoryIcon />
          </View>
          <View style={styles.flex1}>
            <Pressable
              onPress={() => {
                navigation.navigate('RiwayatKetidakhadiranScreen', {
                  rombelClassSchoolId: route?.params.rombelClassSchoolId,
                  subTitle: route?.params?.subTitle,
                  type: route?.params?.type,
                });
              }}>
              <Text
                allowFontScaling={false}
                style={styles.KSApplicationsHostoryStyle}>
                Riwayat Pengajuan
              </Text>
              <Text
                allowFontScaling={false}
                style={styles.KSApplicationHistoryCountStyle}>
                {approvedCount + rejectedCount} Murid
              </Text>
            </Pressable>
          </View>
          <View style={styles.KSArrowBlueContainer}>
            <ArrowBlue />
          </View>
        </Pressable>
      </View>
      <Text allowFontScaling={false} style={styles.KSAbsenceApplicationStyle}>
        Pengajuan Ketidakhadiran
      </Text>
      {absentData?.length <= 0 ? (
        <View style={styles.KSEmptyContainer}>
          <View style={styles.mr50}>
            <RobotEmptyIcon />
          </View>
          <Text
            allowFontScaling={false}
            style={styles.KSEmptyAbsenceApplicationStyle}>
            Belum Ada Pengajuan Ketidakhadiran
          </Text>
          <Text
            allowFontScaling={false}
            style={styles.KSEmptyAbsenceApplicationDescriptionStyle}>
            Daftar murid yang mengajukan{'\n'}ketidakhadiran akan ditampilkan di
            sini.
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {absentData?.map((ie: any) => {
            return (
              <AttendanceCardComponent
                data={ie}
                handleAccept={() => {
                  handleActionAttendance(ie?.id, 'accept');
                }}
                handleIgnore={() => {
                  handleActionAttendance(ie?.id, 'reject');
                }}
                handleGoDetail={() => {
                  handleGoAttendanceDetail(ie?.id);
                }}
              />
            );
          })}
        </ScrollView>
      )}
      <Modal
        visible={showConfirm}
        transparent={true}
        style={styles.KSKonfirmasiKehadiranModal}
        children={
          <KonfirmasiKehadiran
            handleClose={() => {
              setShowConfirm(false);
            }}
            handleSubmit={() => {
              setShowConfirm(false);
              confirmType === 'accept'
                ? handleConfirmAttendance()
                : setShowConfirmNote(true);
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
    </View>
  );
};

export default KetidakhadiranScreen;
