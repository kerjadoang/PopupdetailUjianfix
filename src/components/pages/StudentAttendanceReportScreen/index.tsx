/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  EmptyDisplay,
  Header,
  MainText,
  MainView,
  MonthPicker,
  SwipeUp,
} from '@components/atoms';
import {useScreen} from './useScreen';

import Online from '@assets/svg/ic56_kelas_online.svg';
import Offline from '@assets/svg/ic56_kelas_offline.svg';
import DownArrow from '@assets/svg/ic_arrow_bottom_blue.svg';
import Maskot from '@assets/svg/maskot_18.svg';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {_handlerConvertAllDate} from '@constants/functional';
import dayjs from 'dayjs';

const StudentAttendanceReportScreen = () => {
  const navigation = useNavigation();
  const {
    studentDetail,
    filterMonth,
    setFilterMonth,
    valueDatePicker,
    setValueDatePicker,
    getDetailAttendance,
    swipe,
    setSwipe,
  }: any = useScreen();
  const detail = studentDetail?.data?.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="Laporan Kehadiran"
          subLabel={`${detail?.full_name || 'murid'} • ${
            detail?.user_rombel?.[0]?.rombel_class_school_name || 'kelas'
          }`}
        />
      ),
    });
  }, [navigation, detail]);

  const attendance = getDetailAttendance?.data?.data;
  const renderSwipeUpDateFilter = () => {
    return (
      <MainView paddingHorizontal={16} height={300}>
        <MainText
          paddingVertical={16}
          fontFamily={Fonts.SemiBoldPoppins}
          fontWeight="600"
          fontSize={20}
          color={Colors.dark.neutral100}
          textAlign="center">
          Pilih Bulan
        </MainText>

        <MonthPicker selected={valueDatePicker} onChange={setValueDatePicker} />

        <Button
          action={() => {
            const label = `${dayjs()
              .set('month', valueDatePicker.month - 1)
              .locale('id')
              .format('MMMM')} ${valueDatePicker.year}`;
            const value = `${valueDatePicker.year}-${valueDatePicker.month}`;
            setFilterMonth({label, value});
            setSwipe(false);
          }}
          label="Simpan"
        />
      </MainView>
    );
  };

  return (
    <View style={styles.body}>
      <View style={styles.headerContainer}>
        <View>
          <Online width={56} height={56} />
          <Text style={styles.headerLabel}>Kelas Online</Text>
          <Text style={styles.headerValue}>
            {attendance?.online_class || '00'} Hari
          </Text>
        </View>
        <View>
          <Offline width={56} height={56} />
          <Text style={styles.headerLabel}>Kelas Offline</Text>
          <Text style={styles.headerValue}>
            {attendance?.offline_class || '00'} Hari
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Riwayat Kehadiran</Text>
        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => setSwipe(true)}>
          <Text style={styles.btnFilterLabel}>{filterMonth.label}</Text>
          <DownArrow />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {attendance?.attend_data?.length > 0 ? (
          attendance?.attend_data?.map((item: any) => {
            return (
              <View style={styles.row2}>
                <Text style={styles.textHistoryDesc}>
                  {_handlerConvertAllDate(item.date, 3)}
                </Text>
                <Text style={styles.textHistoryDesc}>
                  {item.start_time || '--'}
                  {item.end_time !== '' ? ` - ${item.end_time}` : ''}
                </Text>
              </View>
            );
          })
        ) : (
          <EmptyDisplay
            imageSvg={<Maskot height={56} width={56} />}
            title="Belum Ada Riwayat Presensi"
            desc="Presensi yang sudah dicatat
akan muncul disini."
          />
        )}
      </ScrollView>
      <SwipeUp
        isSwipeLine={true}
        lineColor="gray"
        height={300}
        visible={swipe}
        onClose={() => setSwipe(false)}
        children={renderSwipeUpDateFilter()}
      />
    </View>
  );
};
export {StudentAttendanceReportScreen};
const styles = StyleSheet.create({
  body: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: Colors.dark.neutral10,
    borderBottomWidth: 4,
    paddingVertical: 20,
  },
  headerLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
  },
  headerValue: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  btnFilter: {
    backgroundColor: Colors.primary.light2,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnFilterLabel: {
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomColor: Colors.dark.neutral10,
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  textHistoryDesc: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
  },
});
