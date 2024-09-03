import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
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
import DetailNote from '../NotesScreen/components/DetailNote';
import {useSelector} from 'react-redux';
import {styles} from './styles';

const TeacherAbsenceApplicationScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'TeacherAbsenceApplicationScreen'>
    >();
  const {getUser}: any = useSelector(state => state);
  const isFocus = useIsFocused();
  const [absenceListData, setAbsenceListData] = useState<any>([]);
  const [showConfirmNote, setShowConfirmNote] = useState<boolean>(false);
  const [absenceIdChoosed, setAbsenceIdChoosed] = useState<number>(0);

  const handleGetTeacherAbsentRequests = async () => {
    try {
      const _res: any = await ProviderLMS?.getTeacherAbsentRequests({
        limit: 50,
        offset: 0,
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
        resGetTeacherAbsentRequests?.data !== null &&
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

  const handleConfirmAttendance = async (absence_id: any) => {
    navigation?.navigate('TeacherAbsenceHistoryDetailScreen', {
      absence_id: absence_id,
      role_id: getUser?.user_type_id,
      actionType: 'diterima',
    });
  };

  const handleRejectAttendance = async (notes: string) => {
    setShowConfirmNote(false);
    navigation?.navigate('TeacherAbsenceHistoryDetailScreen', {
      absence_id: absenceIdChoosed,
      role_id: getUser?.user_type_id,
      actionType: 'ditolak',
      rejectNotes: notes,
    });
  };

  useEffect(() => {
    handleGetTeacherAbsentRequests();
  }, [isFocus]);

  return (
    <View style={styles.indexContainer}>
      <Header
        label={'Pengajuan Ketidakhadiran'}
        backgroundColor={Colors.white}
        onPressIconRight={() => {}}
      />
      <View style={styles.indexBodyContainer}>
        <Pressable style={styles.historyButtonStyle}>
          <View style={styles.historyIconContainer}>
            <Image source={HistoryBlueIcon} style={styles.historyIcon} />
          </View>
          <Pressable
            onPress={() =>
              navigation?.navigate('TeacherAbsenceHistoryScreen', {
                role: 'admin',
              })
            }
            style={styles.historyButtonContainer}>
            <View>
              <Text
                allowFontScaling={false}
                style={styles.hstoryButtonTitleStyle}>
                Riwayat Pengajuan
              </Text>
            </View>
          </Pressable>
          <View style={styles.blueArrowIconContainer}>
            <BlueArrowIcon />
          </View>
        </Pressable>
        <SeparatorComponent />
        {absenceListData?.length > 0 && (
          <View style={styles.attendanceListContainer}>
            <Text allowFontScaling={false} style={styles.absenceCountStyle}>
              {absenceListData?.length} Pengajuan
            </Text>
          </View>
        )}
        {absenceListData?.length <= 0 ? (
          <View style={styles.emptyContainerStyle}>
            <RobotIconEmpty style={styles.marginRight50} />
            <Text allowFontScaling={false} style={styles.emptyDescriptionStyle}>
              Belum Ada Pengajuan Ketidakhadiran
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.emptyDescription2Style}>
              Daftar guru yang mengajukan{'\n'}ketidakhadiran akan ditampilkan
              di sini.
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.marginBottom200}
            showsVerticalScrollIndicator={false}>
            {absenceListData?.map((ie: any) => {
              return (
                <AttendanceCardComponent
                  key={Math.random()}
                  data={ie}
                  handleAccept={() => {
                    setAbsenceIdChoosed(ie?.id);
                    handleConfirmAttendance(ie?.id);
                  }}
                  handleIgnore={() => {
                    setAbsenceIdChoosed(ie?.id);
                    setShowConfirmNote(true);
                  }}
                  handleGoDetail={() =>
                    navigation?.navigate('TeacherAbsenceHistoryDetailScreen', {
                      absence_id: ie?.id,
                      role_id: getUser?.user_type_id,
                    })
                  }
                />
              );
            })}
          </ScrollView>
        )}
      </View>

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

export default TeacherAbsenceApplicationScreen;
