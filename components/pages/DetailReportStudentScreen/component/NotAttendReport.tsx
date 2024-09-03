/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Online from '@assets/svg/ic56_kelas_online.svg';
import Offline from '@assets/svg/ic56_kelas_offline.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {CardAbsent} from './CardAbsent';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {_handlerConvertAllDate} from '@constants/functional';
import {services} from '../services';

const NotAttendReport = ({data}: any) => {
  const route = useRoute<RouteProp<ParamList, 'DetailReportStudentScreen'>>();

  const {setPresensiShow2}: any = services(route);
  const formatedDate = (day: any, start: any, end: any) => {
    if (day > 1) {
      return `${_handlerConvertAllDate(start, 1, 2)} - ${_handlerConvertAllDate(
        end,
        1,
        2,
      )}`;
    } else {
      return `${_handlerConvertAllDate(start, 1, 2)}`;
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laporan Ketidakhadiran</Text>
      <View style={styles.row}>
        <View>
          <Online width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Kelas Online</Text>
          <Text style={styles.attendDay}>{`${
            data?.online_class || 0
          } Hari`}</Text>
        </View>
        <View>
          <Offline width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Tatap Muka</Text>
          <Text style={styles.attendDay}>{`${
            data?.offline_class || 0
          } Hari`}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View
          style={{
            height: 4,
            width: '100%',
            marginVertical: 12,
            backgroundColor: Colors.dark.neutral10,
          }}
        />

        <FlatList
          data={data.absent_data || []}
          keyExtractor={(_, id): any => id}
          renderItem={({item}) => (
            <CardAbsent
              type={item?.attendance_type}
              day={item?.days}
              date={formatedDate(item?.days, item?.start_date, item?.end_date)}
              reason={item?.reason || '--'}
              arrow={item?.reason === 'sakit' ? true : false}
              action={() => {
                setPresensiShow2(false);
                navigation.navigate('AttendanceApprovalDetailHistoryScreen', {
                  absentId: item?.absent_id,
                });
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    width: '100%',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  attendDay: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  listContainer: {
    marginTop: 15,
  },
});

export {NotAttendReport};
