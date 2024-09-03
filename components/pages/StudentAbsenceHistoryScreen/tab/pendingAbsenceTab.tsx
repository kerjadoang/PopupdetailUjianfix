/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {SwipeUp} from '@components/atoms';
import FilterDateRiwayat from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/swipeUpContent/filterDateRiwayat';
import FilterDate from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/swipeUpContent/filterDate';
import FilterButtonComponent from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/atoms/filterButtonComponent';
import ProviderLMS from '@services/lms/provider';
import RobotEmptyIcon from '@assets/svg/robot_empty_state.svg';
import RobotEmptySearchIcon from '@assets/svg/robot_empty_search.svg';
import AttendanceCardComponent from '@components/pages/TeacherAbsenceApplicationScreen/atoms/attendanceCardComponent';
import Colors from '@constants/colors';
import {dismissLoading, showLoading} from '@constants/functional';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const PendingAbsenceTab = ({isSearchActive, searchKey, classRombelId}: any) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'RiwayatKetidakhadiranScreen'>
    >();
  const isFocus = useIsFocused();
  const [absentData, setAbsentData] = useState<any>([]);
  const [swipeUpVisible, setSwipeUpVisible] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [dateTo, setDateTo] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [filterType, setFilterType] = useState<
    'Semua Tanggal' | 'Pilih Tanggal'
  >('Semua Tanggal');
  const [swipeUpStartDateVisible, setSwipeUpStartDateVisible] =
    useState<boolean>(false);
  const [swipeUpEndDateVisible, setSwipeUpEndDateVisible] =
    useState<boolean>(false);

  const handleFetchData = async ({
    limit,
    offset,
    keyword,
    bodyPayload,
  }: {
    limit: number;
    offset: number;
    keyword: string;
    bodyPayload: {
      approval_status: 'menunggu' | 'diterima' | 'ditolak';
      start_date: string;
      end_date: string;
      rombel_class_school_id: any;
    };
  }) => {
    try {
      showLoading();
      const _resGetTeachersAbsentRequestHistory =
        await ProviderLMS?.getStudentAbsentRequests({
          limit: limit ?? 10,
          offset: offset ?? 0,
          keyword: keyword ?? '',
          bodyPayload: {
            approval_status: bodyPayload?.approval_status ?? 'menunggu',
            start_date: bodyPayload?.start_date ?? '',
            end_date: bodyPayload?.end_date ?? '',
            rombel_class_school_id: classRombelId ?? 0,
          },
        });
      const ResDataGetTeachersAbsentRequestHostory =
        _resGetTeachersAbsentRequestHistory?.data || false;
      if (ResDataGetTeachersAbsentRequestHostory?.code === 100) {
        setAbsentData(ResDataGetTeachersAbsentRequestHostory?.data);
      }
    } catch (error: any) {
      return null;
    } finally {
      dismissLoading();
    }
  };

  const handleSubmitFilter = async (
    _filterType: 'Pilih Tanggal' | 'Semua Tanggal',
  ) => {
    setFilterType(_filterType);
    setSwipeUpVisible(false);
    if (_filterType === 'Semua Tanggal') {
      handleFetchData({
        limit: 30,
        offset: 0,
        keyword: '',
        bodyPayload: {
          approval_status: 'menunggu',
          start_date: '',
          end_date: '',
          rombel_class_school_id: classRombelId ?? 0,
        },
      });
    } else {
      handleFetchData({
        limit: 30,
        offset: 0,
        keyword: '',
        bodyPayload: {
          approval_status: 'menunggu',
          start_date: `${dateFrom?.year}-${dateFrom?.month}-${dateFrom?.date}`,
          end_date: `${dateTo?.year}-${dateTo?.month}-${dateTo?.date}`,
          rombel_class_school_id: classRombelId ?? 0,
        },
      });
    }
  };

  const handleSubmitFilterDate = (
    dateRes: IDatePicker,
    dateType: 'start' | 'end',
  ) => {
    if (dateType === 'start') {
      setDateFrom({
        date: dateRes?.date,
        month: dateRes?.month,
        year: dateRes?.year,
      });
      setSwipeUpStartDateVisible(false);
    } else {
      setDateTo({
        date: dateRes?.date,
        month: dateRes?.month,
        year: dateRes?.year,
      });
      setSwipeUpEndDateVisible(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setDateFrom({
        date: dayjs().get('date'),
        month: dayjs().get('month') + 1,
        year: dayjs().get('year'),
      });
      setDateTo({
        date: dayjs().get('date'),
        month: dayjs().get('month') + 1,
        year: dayjs().get('year'),
      });
      handleFetchData({
        limit: 30,
        offset: 0,
        keyword: '',
        bodyPayload: {
          approval_status: 'menunggu',
          start_date: '',
          end_date: '',
          rombel_class_school_id: classRombelId ?? 0,
        },
      });
    }, [isFocus]),
  );

  useFocusEffect(
    useCallback(() => {
      handleFetchData({
        limit: 30,
        offset: 0,
        keyword: searchKey,
        bodyPayload: {
          approval_status: 'menunggu',
          start_date: '',
          rombel_class_school_id: classRombelId ?? 0,
          end_date: '',
        },
      });
    }, [searchKey]),
  );

  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          marginLeft: '5%',
          marginBottom: 10,
        }}>
        <FilterButtonComponent
          title={
            filterType === 'Semua Tanggal'
              ? 'Semua Tanggal'
              : `${dayjs(
                  `${dateFrom?.year}-${dateFrom?.month}-${dateFrom?.date}`,
                )
                  .locale('id')
                  .format('DD MMM YYYY')} - ${dayjs(
                  `${dateTo?.year}-${dateTo?.month}-${dateTo?.date}`,
                )
                  .locale('id')
                  .format('DD MMM YYYY')}`
          }
          onPress={() => {
            setSwipeUpVisible(true);
          }}
        />
      </View>
      <View>
        {absentData?.length > 0 ? (
          absentData?.map((ie: any) => {
            return (
              <AttendanceCardComponent
                data={ie}
                key={Math.random()}
                handleGoDetail={() => {
                  navigation?.navigate('StudentAbsenceHistoryDetailScreen', {
                    absence_id: ie?.id,
                    withoutApprovalButton: true,
                  });
                }}
                withoutApprovalButton={true}
              />
            );
          })
        ) : isSearchActive ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '50%',
            }}>
            <RobotEmptySearchIcon />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                marginTop: 13,
                lineHeight: 20,
                color: Colors?.dark.neutral100,
              }}>
              Pencarian Tidak Ditemukan
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                marginTop: 6,
                fontSize: 14,
                lineHeight: 18,
                color: Colors?.dark.neutral60,
              }}>
              {`Hasil pencarian “${searchKey}” nihil.\nCoba masukkan kata kunci lainnya!`}
            </Text>
          </View>
        ) : filterType === 'Semua Tanggal' ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '50%',
            }}>
            <RobotEmptyIcon />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                marginTop: 13,
                lineHeight: 20,
                color: Colors?.dark.neutral100,
                textAlign: 'center',
              }}>
              Belum Ada Pengajuan Ketidakhadiran{'\n'}Yang Menunggu Diverifikasi
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                marginTop: 6,
                fontSize: 14,
                lineHeight: 18,
                color: Colors?.dark.neutral60,
              }}>
              Pengajuan ketidakhadiran yang diterim{'\n'}oleh admin akan
              ditampilkan di sini.
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '50%',
            }}>
            <RobotEmptyIcon />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                marginTop: 13,
                lineHeight: 20,
                color: Colors?.dark.neutral100,
              }}>
              Hasil filter tidak ditemukan
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                marginTop: 6,
                fontSize: 14,
                lineHeight: 18,
                color: Colors?.dark.neutral60,
              }}>
              Coba atur ulang filter yang{'\n'}sudah Anda atur sebelumnya
            </Text>
          </View>
        )}
      </View>
      <SwipeUp
        visible={swipeUpVisible}
        isSwipeLine
        children={
          <View>
            <FilterDateRiwayat
              dateFrom={dateFrom}
              dateTo={dateTo}
              handleChooseDateFrom={() => setSwipeUpStartDateVisible(true)}
              handleChooseDateTo={() => {
                setSwipeUpEndDateVisible(true);
              }}
              handleSubmitAction={(
                _filterType: 'Semua Tanggal' | 'Pilih Tanggal',
              ) => {
                handleSubmitFilter(_filterType);
              }}
            />
            <SwipeUp
              visible={swipeUpStartDateVisible}
              children={
                <FilterDate
                  handleClose={() => setSwipeUpStartDateVisible(false)}
                  date={dateFrom}
                  handleSubmit={(dateRes: IDatePicker) =>
                    handleSubmitFilterDate(dateRes, 'start')
                  }
                />
              }
              onClose={() => {
                setSwipeUpStartDateVisible(false);
              }}
            />

            <SwipeUp
              visible={swipeUpEndDateVisible}
              children={
                <FilterDate
                  handleClose={() => setSwipeUpEndDateVisible(false)}
                  date={dateFrom}
                  handleSubmit={(dateRes: IDatePicker) =>
                    handleSubmitFilterDate(dateRes, 'end')
                  }
                />
              }
              onClose={() => {
                setSwipeUpEndDateVisible(false);
              }}
            />
          </View>
        }
        onClose={() => setSwipeUpVisible(false)}
      />
    </ScrollView>
  );
};

export default PendingAbsenceTab;
