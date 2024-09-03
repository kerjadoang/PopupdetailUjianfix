import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Modal, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import BlueArrowIcon from '@assets/svg/blueArrow.svg';
import {HistoryBlueIcon} from '@assets/images';
import SeparatorComponent from './atoms/separatorComponent';
import {ScrollView} from 'react-native-gesture-handler';
import AttendanceCardComponent from './atoms/attendanceCardComponent';
import RobotIconEmpty from '@assets/svg/robot_empty_search_base.svg';
import ProviderLMS from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import KonfirmasiKehadiran from '../LMSTeacherLaporanKehadiranMuridScreen/swipeUpContent/konfirmasiKehadiran';
import DetailNote from '../NotesScreen/components/DetailNote';
import {styles} from './styles';

const StudentAbsenceApplicationScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'StudentAbsenceApplicationScreen'>
    >();
  const isFocus = useIsFocused();
  const [absenceListData, setAbsenceListData] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showConfirmNote, setShowConfirmNote] = useState<boolean>(false);
  const [absenceIdChoosed, setAbsenceIdChoosed] = useState<number>(0);

  const handleGetStudentAbsentRequests = async () => {
    try {
      const _res: any = await ProviderLMS?.getStudentAbsentRequests({
        limit: 10,
        offset: 0,
        keyword: '',
        bodyPayload: {
          approval_status: 'menunggu',
          start_date: '',
          end_date: '',
        },
      });
      const resGetTeacherAbsentRequests: {
        code?: number;
        data?: any;
        log_id?: string;
        message?: string;
        time?: string;
      } = _res?.data || false;
      if (resGetTeacherAbsentRequests?.code === 100) {
        setAbsenceListData(resGetTeacherAbsentRequests?.data);
      } else {
        Toast?.show({
          type: 'error',
          text1: resGetTeacherAbsentRequests?.message,
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

  const handleConfirmAttendance = async () => {
    try {
      const _resAcceptAbsence: any = await ProviderLMS?.putAcceptAbsentRequest(
        absenceIdChoosed,
      );
      const ResDataAcceptAbsence = _resAcceptAbsence?.data || false;
      if (ResDataAcceptAbsence.code === 100) {
        setShowConfirm(false);
        handleGetStudentAbsentRequests();
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
        handleGetStudentAbsentRequests();
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

  const handleNavigateToAbsenceHistoryScreen = () => {
    // navigation?.navigate('StudentAbsenceHistoryScreen');
  };

  useEffect(() => {
    handleGetStudentAbsentRequests();
  }, [isFocus]);

  return (
    <View style={styles.mainContainerStyle}>
      <Header
        label={'Pengajuan Ketidakhadiran'}
        backgroundColor={Colors.white}
        onPressIconRight={() => {}}
      />
      <View style={styles.mainInnerContainerStyle}>
        <View style={styles.riwayatPengajuanButtonContainerStyle}>
          <View style={styles.riwayatIconContainerStyle}>
            <Image source={HistoryBlueIcon} style={styles.riwayatIconStyle} />
          </View>
          <Pressable
            onPress={() => handleNavigateToAbsenceHistoryScreen()}
            style={styles.riwayatPengajuanButtonStyle}>
            <View>
              <Text style={styles.riwayatPengajuanButtonTitleStyle}>
                Riwayat Pengajuan
              </Text>
            </View>
          </Pressable>
          <View style={styles.blueArrowIconContainerStyle}>
            <BlueArrowIcon />
          </View>
        </View>
        <SeparatorComponent />
        {absenceListData?.length > 0 && (
          <View style={styles.pengajuanCountTitleContainerStyle}>
            <Text style={styles.pengajuanCountTitleStyle}>
              {absenceListData?.length} Pengajuan
            </Text>
          </View>
        )}
        {absenceListData.length <= 0 ? (
          <View style={styles.emptyDataContainerStyle}>
            <RobotIconEmpty style={styles.robotEmptyStyle} />
            <Text style={styles.emptyDataDescriptionStyle}>
              Belum Ada Pengajuan Ketidakhadiran
            </Text>
            <Text style={styles.emptyDataSubDescriptionStyle}>
              Daftar guru yang mengajukan{'\n'}ketidakhadiran akan ditampilkan
              di sini.
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.listDataContainerStyle}>
            {absenceListData?.map((ie: any) => {
              return (
                <AttendanceCardComponent
                  key={Math.random()}
                  data={ie}
                  handleAccept={() => {
                    setAbsenceIdChoosed(ie?.id);
                    setShowConfirm(true);
                  }}
                  handleIgnore={() => {
                    setAbsenceIdChoosed(ie?.id);
                    setShowConfirmNote(true);
                  }}
                  handleGoDetail={() =>
                    navigation?.navigate('TeacherAbsenceHistoryDetailScreen', {
                      absence_id: ie?.id,
                    })
                  }
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <Modal
        visible={showConfirm}
        transparent={true}
        animationType="fade"
        style={styles.modalStyle}
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
    </View>
  );
};

export default StudentAbsenceApplicationScreen;
