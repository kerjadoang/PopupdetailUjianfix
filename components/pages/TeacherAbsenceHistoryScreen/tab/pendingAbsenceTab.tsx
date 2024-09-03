/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {SwipeUp} from '@components/atoms';
import FilterDateRiwayat from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/swipeUpContent/filterDateRiwayat';
import FilterDate from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/swipeUpContent/filterDate';
import FilterButtonComponent from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/atoms/filterButtonComponent';
import ProviderLMS from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import RobotEmptyIcon from '@assets/svg/robot_sedih.svg';
import RobotEmptySearchIcon from '@assets/svg/robot_empty_search.svg';
import AttendanceCardComponent from '@components/pages/TeacherAbsenceApplicationScreen/atoms/attendanceCardComponent';
import {styles} from '../style';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const PendingAbsenceTab = ({isSearchActive, searchKey}: any) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'RiwayatKetidakhadiranScreen'>
    >();
  const isFocus = useIsFocused();
  const {getUser}: any = useSelector(state => state);
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
    };
  }) => {
    try {
      const _resGetTeachersAbsentRequestHistory =
        await ProviderLMS?.getTeachersAbsentRequestHistory({
          limit: limit ?? 10,
          offset: offset ?? 0,
          keyword: keyword ?? '',
          bodyPayload: {
            approval_status: bodyPayload?.approval_status ?? 'menunggu',
            start_date: bodyPayload?.start_date ?? '',
            end_date: bodyPayload?.end_date ?? '',
          },
        });
      const ResDataGetTeachersAbsentRequestHostory =
        _resGetTeachersAbsentRequestHistory?.data || false;
      if (ResDataGetTeachersAbsentRequestHostory?.code === 100) {
        setAbsentData(ResDataGetTeachersAbsentRequestHostory?.data);
      } else {
        Toast?.show({
          type: 'error',
          text1: 'Terjadi kesalahan pada sistem kami',
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

  const handleSubmitFilter = async (
    _filterType: 'Pilih Tanggal' | 'Semua Tanggal',
  ) => {
    setFilterType(_filterType);
    setSwipeUpVisible(false);
    if (_filterType === 'Semua Tanggal') {
      handleFetchData({
        limit: 10,
        offset: 0,
        keyword: '',
        bodyPayload: {
          approval_status: 'menunggu',
          start_date: '',
          end_date: '',
        },
      });
    } else {
      handleFetchData({
        limit: 10,
        offset: 0,
        keyword: '',
        bodyPayload: {
          approval_status: 'menunggu',
          start_date: `${dateFrom?.year}-${dateFrom?.month}-${dateFrom?.date}`,
          end_date: `${dateTo?.year}-${dateTo?.month}-${dateTo?.date}`,
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
    }, [isFocus]),
  );

  useEffect(() => {
    handleFetchData({
      limit: 10,
      offset: 0,
      keyword: searchKey,
      bodyPayload: {
        approval_status: 'menunggu',
        start_date: '',
        end_date: '',
      },
    });
  }, [searchKey, isFocus]);

  return (
    <ScrollView style={styles.PAContainer}>
      <View style={styles.PAFilterContainer}>
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
                  navigation?.navigate('TeacherAbsenceHistoryDetailScreen', {
                    absence_id: ie?.id,
                    role_id: getUser?.data?.user_type?.id,
                  });
                }}
              />
            );
          })
        ) : isSearchActive ? (
          <View style={styles.PAEmptyContainer}>
            <RobotEmptySearchIcon />
            <Text allowFontScaling={false} style={styles.PAEmptyText}>
              Pencarian Tidak Ditemukan
            </Text>
            <Text allowFontScaling={false} style={styles.PAEmptyText}>
              {`Hasil pencarian “${searchKey}” nihil.\nCoba masukkan kata kunci lainnya!`}
            </Text>
          </View>
        ) : filterType === 'Semua Tanggal' ? (
          <View style={styles.PAEmptyFilterDateContainer}>
            <RobotEmptyIcon />
            <Text allowFontScaling={false} style={styles.PAEmptyFilterDateText}>
              Belum Ada Pengajuan Ketidakhadiran{'\n'}Yang Diverifikasi
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.PAEmptyFilterDateText2}>
              Pengajuan ketidakhadiran yang diterim{'\n'}oleh admin akan
              ditampilkan di sini.
            </Text>
          </View>
        ) : (
          <View style={styles.PAEmptyDataContainer}>
            <RobotEmptyIcon />
            <Text allowFontScaling={false} style={styles.PAEmptyDataText}>
              Hasil filter tidak ditemukan
            </Text>
            <Text allowFontScaling={false} style={styles.PAEmptyDataText2}>
              Coba atur ulang filter yang{'\n'}sudah Anda atur sebelumnya
            </Text>
          </View>
        )}
      </View>
      <SwipeUp
        visible={swipeUpVisible}
        children={
          <View>
            <FilterDateRiwayat
              dateFrom={dateFrom}
              dateTo={dateTo}
              handleChooseDateFrom={() => setSwipeUpStartDateVisible(true)}
              handleChooseDateTo={() => setSwipeUpEndDateVisible(true)}
              handleSubmitAction={(
                _filterType: 'Semua Tanggal' | 'Pilih Tanggal',
              ) => handleSubmitFilter(_filterType)}
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
              onClose={() => setSwipeUpStartDateVisible(false)}
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
              onClose={() => setSwipeUpEndDateVisible(false)}
            />
          </View>
        }
        onClose={() => setSwipeUpVisible(false)}
      />
    </ScrollView>
  );
};

export default PendingAbsenceTab;
