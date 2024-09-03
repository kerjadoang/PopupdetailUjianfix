/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Online from '@assets/svg/ic56_kelas_online.svg';
import Offline from '@assets/svg/ic56_kelas_offline.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import useReport from '../useReport';
import {CardAbsent} from './CardAbsent';
import {useNavigation} from '@react-navigation/native';
import {_handlerConvertAllDate} from '@constants/functional';

const NotAttendReport = ({setPresensiShow2}: {setPresensiShow2: any}) => {
  const {presensiAbsent} = useReport();
  const navigation = useNavigation<any>();

  const data = {
    online: presensiAbsent?.data?.data?.online_class,
    offline: presensiAbsent?.data?.data?.offline_class,
    absent_data: presensiAbsent?.data?.data?.absent_data,
  };

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laporan Ketidakhadiran</Text>
      <View style={styles.row}>
        <View>
          <Online width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Kelas Online</Text>
          <Text style={styles.attendDay}>{`${data?.online} Hari`}</Text>
        </View>
        <View>
          <Offline width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Tatap Muka</Text>
          <Text style={styles.attendDay}>{`${data?.offline} Hari`}</Text>
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
          showsVerticalScrollIndicator={false}
          style={{height: 300}}
          data={data.absent_data}
          keyExtractor={(_, id): any => id}
          renderItem={({item}) => (
            <CardAbsent
              type={item?.attendance_type}
              day={item.days}
              date={formatedDate(item.days, item.start_date, item.end_date)}
              reason={item.reason}
              arrow={true}
              action={() => {
                setPresensiShow2(false);

                return navigation.navigate(
                  'AttendanceApprovalDetailHistoryScreen',
                  {absentId: item.absent_id},
                );
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
    height: 500,
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
