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
import {EmptyDisplay, Header} from '@components/atoms';
import {useScreen} from './useScreen';

import Online from '@assets/svg/ic56_kelas_online.svg';
import Offline from '@assets/svg/ic56_kelas_offline.svg';
import MaskotEmpty from '@assets/svg/maskot_18.svg';
import {CardAbsent} from './component/CardAbsent';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

const StudentAbsentReportScreen = () => {
  const navigation: any = useNavigation();
  const {
    studentDetail,
    approvalType,
    getDetailAbsent,
    filterApproval,
    setFilterApproval,
  }: any = useScreen();
  const detail = studentDetail?.data?.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="Laporan Ketidakhadiran"
          subLabel={`${detail?.full_name || 'murid'} • ${
            detail?.user_rombel?.[0]?.rombel_class_school_name || 'kelas'
          }`}
        />
      ),
    });
  }, [navigation, detail]);

  const absent = getDetailAbsent?.data?.data;

  return (
    <View style={styles.body}>
      <View style={styles.headerContainer}>
        <View>
          <Online width={56} height={56} />
          <Text style={styles.headerLabel}>Kelas Online</Text>
          <Text style={styles.headerValue}>
            {absent?.online_class || '0'} Hari
          </Text>
        </View>
        <View>
          <Offline width={56} height={56} />
          <Text style={styles.headerLabel}>Kelas Offline</Text>
          <Text style={styles.headerValue}>
            {absent?.offline_class || '0'} Hari
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Riwayat Ketidakhadiran</Text>
        <View style={styles.row}>
          {approvalType?.map((element: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={
                  filterApproval === element
                    ? styles.filterSelected
                    : styles.filter
                }
                onPress={() => setFilterApproval(element)}>
                <Text
                  style={
                    filterApproval === element
                      ? styles.filterText
                      : [styles.filterText, {color: Colors.dark.neutral80}]
                  }>
                  {element}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          {absent?.absent_data?.length > 0 ? (
            absent?.absent_data?.map((item: any, _: number) => {
              return (
                <CardAbsent
                  data={item}
                  action={() => {
                    if (item?.absent_id !== 0) {
                      navigation.navigate(
                        'AttendanceApprovalDetailHistoryScreen',
                        {absentId: item.absent_id},
                      );
                    }
                  }}
                />
              );
            })
          ) : (
            <EmptyDisplay
              imageSvg={<MaskotEmpty style={{marginTop: 30}} />}
              title={'Tidak Ada Pengajuan Ketidakhadiran Dari Murid'}
              desc={`Pengajuan ketidakhadiran yang ${filterApproval} akan ditampilkan di sini.`}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};
export {StudentAbsentReportScreen};
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
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterSelected: {
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: 3,
    width: '50%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  filter: {
    borderBottomWidth: 0.5,
    width: '50%',
    paddingBottom: 10,
    alignItems: 'center',
  },
  filterText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
    textTransform: 'capitalize',
  },
});
