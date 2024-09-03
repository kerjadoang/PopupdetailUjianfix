/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import FilterButtonComponent from '../../atoms/filterButtonComponent';
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetStudentsAbsentRequestHistory} from '@redux';
import AttendanceCardComponent from '../../atoms/attendanceCardComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import {SwipeUpModal} from '@components/atoms';
import FilterDate from '../../swipeUpContent/filterDate';
import FilterDateRiwayat from '../../swipeUpContent/filterDateRiwayat';
import {styles} from '../../style';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const TabRiwayatDitolak = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'RiwayatKetidakhadiranScreen'>
    >();
  const isFocus = useIsFocused();
  const route = useRoute<RouteProp<ParamList, 'RiwayatKetidakhadiranScreen'>>();
  const dispatch: any = useDispatch();
  const [absentData, setAbsentData] = useState<any>([]);
  const [isAllDateChoosed, setIsAllDateChoosed] = useState<boolean>(false);
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
  const [swipeUpDateFromVisible, setSwipeUpDateFromVisible] =
    useState<boolean>(false);
  const [swipeUpDateToVisible, setSwipeUpDateToVisible] =
    useState<boolean>(false);
  const {getUser}: any = useSelector(state => state);

  useFocusEffect(
    useCallback(() => {
      setIsAllDateChoosed(true);
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
      dispatch(
        fetchGetStudentsAbsentRequestHistory(
          {
            approval_status: 'ditolak',
            end_date: '',
            start_date: '',
            rombel_class_school_id: route?.params?.rombelClassSchoolId,
          },
          (res: any) => {
            setAbsentData(res?.data?.data);
          },
        ),
      );
    }, [isFocus]),
  );

  const handleSubmitFilterDate = async (
    _filterType: 'Semua Tanggal' | 'Pilih Tanggal',
  ) => {
    if (_filterType === 'Semua Tanggal') {
      setIsAllDateChoosed(true);
      await dispatch(
        fetchGetStudentsAbsentRequestHistory(
          {
            approval_status: 'ditolak',
            end_date: '',
            start_date: '',
            rombel_class_school_id: route?.params?.rombelClassSchoolId,
          },
          (res: any) => {
            setAbsentData(res?.data?.data);
          },
        ),
      );
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
      setSwipeUpVisible(false);
    } else {
      setIsAllDateChoosed(false);
      await dispatch(
        fetchGetStudentsAbsentRequestHistory(
          {
            approval_status: 'ditolak',
            end_date: `${dateTo?.year}-${dateTo?.month}-${dateTo?.date}`,
            start_date: `${dateFrom?.year}-${dateFrom?.month}-${dateFrom?.date}`,
            rombel_class_school_id: route?.params?.rombelClassSchoolId,
          },
          (res: any) => {
            setAbsentData(res?.data?.data);
          },
        ),
      );
      setSwipeUpVisible(false);
    }
  };

  return (
    <ScrollView style={styles.historyTabContainer}>
      <View style={styles.historyTabHeader}>
        <FilterButtonComponent
          title={
            isAllDateChoosed
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
        {absentData?.map((ie: any) => {
          return (
            <AttendanceCardComponent
              data={ie}
              key={Math.random()}
              handleGoDetail={() => {
                navigation?.navigate('TeacherAbsenceHistoryDetailScreen', {
                  absence_id: ie?.id,
                  role_id: getUser?.user_type_id,
                  subTitle: route?.params?.subTitle,
                });
              }}
            />
          );
        })}
      </View>
      <SwipeUpModal
        isOpenPopUp={swipeUpVisible}
        children={
          <FilterDateRiwayat
            dateFrom={dateFrom}
            dateTo={dateTo}
            handleChooseDateFrom={() => {
              setSwipeUpDateFromVisible(true);
            }}
            handleChooseDateTo={() => {
              setSwipeUpDateToVisible(true);
            }}
            handleSubmitAction={(filterType: any) => {
              handleSubmitFilterDate(filterType);
            }}
          />
        }
        handleShowPopUp={() => {
          setSwipeUpVisible(false);
        }}
      />

      <SwipeUpModal
        isOpenPopUp={swipeUpDateFromVisible}
        children={
          <FilterDate
            handleClose={() => setSwipeUpDateFromVisible(false)}
            date={dateFrom}
            handleSubmit={(dateRes: IDatePicker) => {
              setDateFrom({
                date: dateRes.date,
                month: dateRes.month,
                year: dateRes.year,
              });
              setSwipeUpDateFromVisible(false);
            }}
          />
        }
        handleShowPopUp={() => {
          setSwipeUpDateFromVisible(false);
        }}
      />

      <SwipeUpModal
        isOpenPopUp={swipeUpDateToVisible}
        children={
          <FilterDate
            handleClose={() => setSwipeUpDateToVisible(false)}
            date={dateTo}
            handleSubmit={(dateRes: IDatePicker) => {
              setDateTo({
                date: dateRes.date,
                month: dateRes.month,
                year: dateRes.year,
              });
              setSwipeUpDateToVisible(false);
            }}
          />
        }
        handleShowPopUp={() => {
          setSwipeUpDateToVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default TabRiwayatDitolak;
