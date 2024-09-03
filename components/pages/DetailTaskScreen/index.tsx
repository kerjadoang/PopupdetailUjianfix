/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DownloadIcon from '@assets/svg/downloadBlue.svg';
import IconTugas from '@assets/svg/ic64_pr_tugas.svg';
import {Header, PopUp} from '@components/atoms';
import {useScreen} from './useScreen';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

// routing
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import {CardStudent} from './component/CardStudent';
import {convertDate} from '@constants/functional';

const DetailTaskScreen = () => {
  // routing setup
  const route = useRoute<RouteProp<ParamList, 'DetailTaskScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailTaskScreen'>>();

  const {isCollaps, setIsCollaps, detail, downloadPDF, popUp, setPopUp} =
    useScreen(route);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Tugas'}
          iconRight={<DownloadIcon />}
          onPressIconRight={() => setPopUp(true)}
        />
      ),
    });
  }, [navigation]);

  const answer = detail?.finish?.length || 0;
  const total = (detail?.finish?.length || 0) + (detail?.not_yet?.length || 0);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {justifyContent: 'flex-start', alignItems: 'center'},
        ]}>
        <IconTugas width={64} height={64} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.headerTitle}>
            {detail?.task_teacher?.rombel_class_school?.name} •{' '}
            {detail?.task_teacher?.type} • {detail?.task_teacher?.subject?.name}
          </Text>
          <Text style={styles.headerTitle2}>{detail?.task_teacher?.title}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <TouchableOpacity
          onPress={() => setIsCollaps(!isCollaps)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.titleContainer}>Detail Tugas</Text>

          {isCollaps ? (
            <Icon name="chevron-up" size={16} color={Colors.primary.base} />
          ) : (
            <Icon name="chevron-down" size={16} color={Colors.primary.base} />
          )}
        </TouchableOpacity>
        {isCollaps ? null : (
          <View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Tanggal/Jam Pengerjaan</Text>
              <Text style={styles.detailValue}>
                {convertDate(detail?.task_teacher?.time_start)
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Tanggal/Jam Pengumpulan</Text>
              <Text style={styles.detailValue}>
                {convertDate(detail?.task_teacher?.time_finish)
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Selesai Dinilai</Text>
              <Text style={styles.detailValue}>
                {convertDate(detail?.task_teacher?.time_correction)
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Instruksi Pengerjaan</Text>
              <Text style={styles.detailValue}>
                {detail?.task_teacher?.instructions}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View>
        <Text style={[styles.titleContainer, {marginBottom: 16}]}>
          {answer} dari {total} murid mengumpulkan
        </Text>

        {detail?.finish?.map((item, index) => {
          return (
            <View key={index} style={{marginVertical: 6}}>
              <CardStudent
                img={item?.user?.avatar_path_url}
                name={item?.user?.full_name}
                date={convertDate(item?.time_correction)
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')}
                score={item?.value}
              />
            </View>
          );
        })}
        {detail?.not_yet?.map((item, index) => {
          return (
            <View key={index} style={{marginVertical: 6}}>
              <CardStudent
                img={item?.user?.avatar_path_url}
                name={item?.user?.full_name}
                date={convertDate(item?.time_correction)
                  .locale('id')
                  .format('dddd, DD MMM YYYY • hh:mm')}
                score={item?.vlue}
              />
            </View>
          );
        })}
      </View>
      {popUp ? (
        <PopUp
          title={'Unduh Laporan Tugas'}
          desc={
            'Apakah Anda yakin untuk mengunduh Laporan Tugas (PR Pola Bilangan) ?'
          }
          actionCancel={() => setPopUp(false)}
          actionConfirm={() => downloadPDF()}
          titleCancel={'Batalkan'}
          titleConfirm={'Unduh'}
        />
      ) : null}
    </View>
  );
};
export {DetailTaskScreen};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
  },
  headerTitle2: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  detailContainer: {
    borderTopWidth: 4,
    borderTopColor: Colors.dark.neutral10,
    borderBottomWidth: 4,
    borderBottomColor: Colors.dark.neutral10,
    paddingVertical: 16,
    marginVertical: 10,
  },
  detailList: {
    paddingTop: 16,
  },
  detailTitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  detailValue: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  titleContainer: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
  },
});
