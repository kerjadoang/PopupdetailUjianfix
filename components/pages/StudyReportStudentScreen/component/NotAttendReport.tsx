import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import Online from '@assets/svg/ic56_kelas_online.svg';
import Offline from '@assets/svg/ic56_kelas_offline.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {CardAbsent} from './CardAbsent';
import {_handlerConvertAllDate} from '@constants/functional';

interface IProps {
  presensiAbsent: any;
}

const NotAttendReport = (props: IProps) => {
  const data = {
    online: props?.presensiAbsent?.online_class,
    offline: props?.presensiAbsent?.offline_class,
    absent_data: props?.presensiAbsent?.absent_data,
  };

  const formatedDate = (day: number, start: number, end: number) => {
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
      <Text style={styles.title}>Laporan Ketidakhadiran Sesi Kelas</Text>
      <View style={styles.row}>
        <View>
          <Online width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Kelas Online</Text>
          <Text style={styles.attendDay}>{`${data.online} Hari`}</Text>
        </View>
        <View>
          <Offline width={56} height={56} style={styles.icon} />
          <Text style={styles.subtitle}>Tatap Muka</Text>
          <Text style={styles.attendDay}>{`${data.offline} Hari`}</Text>
        </View>
      </View>
      <View style={styles.rectangle} />
      <View style={styles.listContainer}>
        <FlatList
          data={data?.absent_data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <CardAbsent
              type={item?.attendance_type}
              day={item.days}
              date={formatedDate(item.days, item.start_date, item.end_date)}
              index={index}
              lengthData={data?.absent_data?.length}
            />
          )}
        />
      </View>
    </View>
  );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
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
  listContainer: {},
  rectangle: {
    width: window.width,
    height: 4,
    backgroundColor: Colors.dark.neutral10,
    marginTop: 24,
    marginHorizontal: -16,
  },
});

export {NotAttendReport};
