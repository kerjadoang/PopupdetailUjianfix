/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import WarningIcon from '@assets/svg/warning.svg';
import {SwipeUpModal} from '@components/atoms';
import KonfirmasiUbahKehadiran from '../swipeUpContent/konfirmasiUbahKehadiran';
import {styles} from '../style';
import moment from 'moment';
import UbahKehadiran from '../swipeUpContent/ubahKehadiran';
import UbahKonfirmasiKehadiran from '../swipeUpContent/ubahKonfirmasiKehadiran';
import ChevronIcon from '@assets/svg/ic_arrow_right_blue.svg';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetStudentsAttendanceCalendar} from '@redux';
import provider from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import client from '@api/alternate';
import {URL_PATH} from '@constants/url';
import {showErrorToast} from '@constants/functional';

type IAttendanceDateData = {
  id?: any;
  school_id?: any;
  user_id?: any;
  absent_id?: any;
  user_type_id?: any;
  rombel_class_school_id?: any;
  status?: string;
  type?: string;
  date?: string;
};

const TanggalKehadiranScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'TanggalKehadiranScreen'>>();
  const dispatch: any = useDispatch();
  const {getStudentsAttendanceCalendar}: any = useSelector(state => state);
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [studentsAttendanceData, setStudentsAttendanceData] = useState<any>([]);
  const [filterType, setFilterType] = useState<'ubah' | 'konfirmasi'>(
    'konfirmasi',
  );
  const [isOpenConfirmationPopUp, setIsOpenConfirmationPopUp] =
    useState<boolean>(false);
  const listDay = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const [date, setDate] = useState<any>(dayjs().format());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [choosedStatus, setChoosedStatus] = useState<string>('hadir');
  const [choosedAttendanceId, setChoosedAttendanceId] = useState<any>();
  const type = 0;

  const isSameDay = (day1: moment.Moment, day2: moment.Moment) => {
    return day1.isSame(day2, 'day');
  };

  const isSameMonth = (day1: moment.Moment, day2: moment.Moment) => {
    return day1.isSame(day2, 'month');
  };

  const prevMonth = async () => {
    setDate(moment(date).clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setDate(moment(date).clone().add(1, 'month'));
  };
  const renderCalendar = () => {
    let dayName: any = [];
    listDay.map((e, idx) => {
      dayName.push(
        <Text allowFontScaling={false} key={idx} style={styles.dayName}>
          {e}
        </Text>,
      );
    });
    return <View style={styles.ViewDay}>{dayName}</View>;
  };

  const handleFetchGetStudentAttendanceCalendar = async () => {
    await dispatch(
      fetchGetStudentsAttendanceCalendar(
        route?.params?.studentData?.id,
        dayjs(date).format('YYYY-MM'),
      ),
    );
  };

  const handleChangeAttendanceDateStatus = async (_statChoosed: string) => {
    setIsLoading(true);
    try {
      const res = await provider.changeStudentOfflineAttendance({
        attendance_id: choosedAttendanceId,
        status: _statChoosed,
      });
      if (res?.status === 200) {
        Toast?.show({
          type: 'success',
          text1: 'Konfirmasi kehadiran berhasil diubah',
        });
      } else {
        showErrorToast(
          res?.data?.message ?? 'Tidak bisa mengubah absen kelas online',
        );
      }
      setIsLoading(false);
      setIsOpenPopUp(false);
      handleFetchGetStudentAttendanceCalendar();
    } catch (error: any) {
      showErrorToast(
        error?.data?.message ?? 'Tidak bisa mengubah absen kelas online',
      );
      setIsLoading(false);
      setIsOpenPopUp(false);
      handleFetchGetStudentAttendanceCalendar();
    }
  };

  const handleDeleteAttendanceDateStatus = async () => {
    setIsLoading(true);
    try {
      const res: any = await client.delete(
        URL_PATH.delete_student_offline_attendance(choosedAttendanceId),
      );
      if (res?.status === 200) {
        Toast?.show({
          type: 'success',
          text1: 'Konfirmasi kehadiran berhasil dihapus',
        });
      } else {
        Toast?.show({
          type: 'error',
          text1:
            res?.data?.message ?? 'Tidak bisa menghapus absen kelas online',
        });
      }
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.data?.message ?? 'Tidak bisa menghapus absen kelas online',
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);
      setIsOpenConfirmationPopUp(false);
      handleFetchGetStudentAttendanceCalendar();
    }
    handleFetchGetStudentAttendanceCalendar();
    setIsOpenPopUp(false);
    setIsOpenConfirmationPopUp(false);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchGetStudentAttendanceCalendar();
  }, []);

  useEffect(() => {
    handleFetchGetStudentAttendanceCalendar();
  }, [date]);

  useEffect(() => {
    setStudentsAttendanceData(getStudentsAttendanceCalendar?.data);
  }, [getStudentsAttendanceCalendar]);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View>
          <Text allowFontScaling={false} style={styles.title}>
            {moment(date).format('MMMM YYYY')}
          </Text>
        </View>
        <View style={styles.navigation}>
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() => prevMonth()}
              style={{transform: [{rotate: '180deg'}]}}>
              <ChevronIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nextMonth()}>
              <ChevronIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderDaysOfCalendar = useMemo(() => {
    let monthStart = moment(date)?.clone()?.startOf('month');
    let monthEnd = moment(date)?.clone()?.endOf('month');
    // render week
    let weekStart = moment(date)?.clone()?.startOf('week');
    let weekEnd = weekStart?.clone()?.add(7, 'days');

    let startDate = monthStart?.startOf('week');
    let endDate = monthEnd?.endOf('week');
    let rows = [];

    let days = [];
    let day = type === 0 ? startDate : weekStart;

    if (type === 0) {
      while (day.isSameOrBefore(endDate, 'day')) {
        for (let i = 0; i < 7; i++) {
          const dayClone = day.clone();

          const isToday = isSameDay(dayClone, moment(date));
          days.push(
            <TouchableOpacity
              key={dayClone?.format('YYYY-MM-DD')}
              onPress={() => {
                studentsAttendanceData?.find((item: IAttendanceDateData) => {
                  if (
                    dayjs(item?.date)?.format('YYYY-MM-DD') ===
                    dayClone?.format('YYYY-MM-DD')
                  ) {
                    setDate(dayClone?.format());
                    setChoosedAttendanceId(item?.id);
                    setChoosedStatus(item?.status ?? '');
                    setFilterType('konfirmasi');
                    setIsOpenPopUp(true);
                  }
                });
              }}
              style={styles.date}>
              <Text
                allowFontScaling={false}
                style={
                  isToday
                    ? styles.TKSDaycloneTitleIsToday
                    : isSameMonth(dayClone, moment(date))
                    ? styles.TKSDaycloneTitleIsSamMont
                    : styles.TKSDaycloneTitle
                }>
                {dayClone?.format('D')}
              </Text>
              <View
                style={[
                  styles.TKSDotDate,
                  studentsAttendanceData?.map(
                    (attendanceData: IAttendanceDateData) => {
                      if (
                        dayjs(attendanceData?.date)
                          .locale('id')
                          .format('YYYY-MM-DD') ===
                        dayjs(dayClone.format())
                          .locale('id')
                          .format('YYYY-MM-DD')
                      ) {
                        switch (attendanceData?.status) {
                          case 'hadir':
                            return {
                              backgroundColor: Colors.success?.base,
                            };
                          case 'alpha':
                            return {
                              backgroundColor: Colors.dark.neutral50,
                            };
                          case 'sakit':
                            return {
                              backgroundColor: Colors?.danger?.base,
                            };
                          case 'izin':
                            return {
                              backgroundColor: Colors?.orange?.base,
                            };
                          default:
                            break;
                        }
                      }
                    },
                  ),
                ]}
              />
            </TouchableOpacity>,
          );
          day?.add(1, 'day');
        }
        rows?.push(
          <View key={day?.format('YYYY-MM-DD')} style={styles.flexRow}>
            {days}
          </View>,
        );
        days = [];
      }
      return <View>{rows}</View>;
    } else {
      while (day?.isBefore(weekEnd)) {
        const dayClone = day?.clone();
        const isToday = isSameDay(dayClone, moment(date));
        days?.push(
          <TouchableOpacity
            key={dayClone?.format('YYYY-MM-DD')}
            onPress={() => {}}
            style={[isToday ? styles.date2 : styles.date]}>
            <Text
              allowFontScaling={false}
              style={
                isToday ? styles.daycloneLabel1IsToday : styles.dayCloneLabel1
              }>
              {dayClone?.format('D')}
            </Text>
          </TouchableOpacity>,
        );
        day?.add(1, 'day');
      }
      return <View style={styles.row}>{days ?? ''}</View>;
    }
  }, [studentsAttendanceData, date]);

  return (
    <View style={styles.TKSMainContainer}>
      <Header
        label={'Kehadiran Tatap Muka'}
        backgroundColor={Colors.white}
        labelContent={
          <Text allowFontScaling={false} style={styles.TKSHeaderTitle}>
            {route?.params?.subTitle}
          </Text>
        }
      />
      {isLoading && <LoadingIndicator />}
      <View style={styles.TKSWarningBox}>
        <View style={styles.TKSWarningBoxInner}>
          <View style={styles.TKSWarningIcon}>
            <WarningIcon />
          </View>
          <View style={styles.LKSWarningDescriptionContainer}>
            <Text allowFontScaling={false} style={styles.TKSWarningText}>
              Tap tanggal untuk ubah dan hapus
            </Text>
          </View>
        </View>
        {renderHeader()}
        <View>{renderCalendar()}</View>
        <View style={styles.TKSRenderDaysContainer}>
          {renderDaysOfCalendar}
        </View>
        <View style={styles.TKSAttendanceTypeContainer}>
          <View style={styles.TKSAttendanceTypeInner}>
            <View style={styles.TKSAttendDot} />
            <Text allowFontScaling={false} style={styles.TKSAttendLabel}>
              Hadir
            </Text>
          </View>
          <View style={styles.TKSAttendanceTypeInner}>
            <View style={styles.TKSPermitDot} />
            <Text allowFontScaling={false} style={styles.TKSPermitLabel}>
              Izin
            </Text>
          </View>
          <View style={styles.TKSAttendanceTypeInner}>
            <View style={styles.TKSSickDot} />
            <Text allowFontScaling={false} style={styles.TKSSickLabel}>
              Sakit
            </Text>
          </View>
          <View style={styles.TKSAttendanceTypeInner}>
            <View style={styles.TKSAlphaDot} />
            <Text allowFontScaling={false} style={styles.TKSAlphaLabel}>
              Alpha
            </Text>
          </View>
        </View>
      </View>

      <SwipeUpModal
        isOpenPopUp={isOpenPopUp}
        handleShowPopUp={() => {
          setIsOpenPopUp(false);
        }}
        children={
          filterType === 'ubah' ? (
            <UbahKehadiran
              handleClose={() => setIsOpenPopUp(false)}
              handleSubmit={(_statChoosed: string) =>
                handleChangeAttendanceDateStatus(_statChoosed)
              }
              attendanceDate={date}
              attendanceStatus={choosedStatus}
            />
          ) : (
            <UbahKonfirmasiKehadiran
              handleEdit={() => {
                setIsOpenPopUp(false);
                setFilterType('ubah');
                setIsOpenPopUp(true);
              }}
              handleRemove={() => {
                setIsOpenPopUp(false);
                setIsOpenConfirmationPopUp(true);
              }}
            />
          )
        }
      />
      <Modal
        visible={isOpenConfirmationPopUp}
        children={
          <KonfirmasiUbahKehadiran
            handleClose={() => setIsOpenConfirmationPopUp(false)}
            handleSubmit={() => handleDeleteAttendanceDateStatus()}
            className={route?.params?.className}
            requestDate={date}
            absentStatus={choosedStatus ?? ''}
            studentName={route?.params?.studentData?.full_name}
          />
        }
        transparent={true}
      />
    </View>
  );
};

export default TanggalKehadiranScreen;
