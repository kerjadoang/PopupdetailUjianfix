/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DownloadIcon from '@assets/svg/downloadBlue.svg';
import IconTugas from '@assets/svg/ic64_pr_tugas.svg';
import {Header, MenuItemButtonType, MoreMenu, PopUp} from '@components/atoms';
import {useScreen} from './useScreen';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import CopyIcon from '@assets/svg/ic24_copy_blue.svg';
import MoreIcon from '@assets/svg/ic24_more_gray.svg';
import LatihanIcon from '@assets/svg/ic24_latihan.svg';
import UnduhIcon from '@assets/svg/ic24_download_blue.svg';

// routing
import {useNavigation, useRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {CardStudent} from './component/CardStudent';
import {ScrollView} from 'react-native-gesture-handler';
import {convertDate} from '@constants/functional';
import {INavigation, IRoute, PDFPreviewScreenParam} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';

const DetailTaskScreenTeacher = () => {
  // routing setup
  const route = useRoute<IRoute<'DetailTaskScreen'>>();
  const navigation = useNavigation<INavigation<'DetailTaskScreen'>>();
  const {navigateScreen} = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const {
    isCollaps,
    setIsCollaps,
    detail,
    downloadPDF,
    popUp,
    setPopUp,
    examDetailData,
  } = useScreen(route);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Ujian'}
          iconRight={
            route?.params?.isFromTeacher ? <MoreIcon /> : <DownloadIcon />
          }
          onPressIconRight={() => {
            if (route?.params?.isFromTeacher) {
              setShowMoreMenu(true);
              return;
            }
            setPopUp(true);
          }}
        />
      ),
    });
  }, [navigation, route]);

  const menuData: MenuItemButtonType[] = [
    {
      icon: <CopyIcon />,
      label: 'Duplikat Jadwal Ujian',
      onPress: async () => {
        setShowMoreMenu(false);
        navigation.navigate('CreateJadwalUjianScreen', {
          schedule_id: route?.params?.id,
          isDuplicate: true,
        });
      },
    },
    {
      icon: <UnduhIcon />,
      label: 'Unduh Laporan Ujian',
      onPress: async () => {
        setShowMoreMenu(false);
        setPopUp(true);
      },
    },
    {
      icon: <LatihanIcon />,
      label: 'Analisis Butir Soal',
      onPress: async () => {
        setShowMoreMenu(false);
        navigateScreen<PDFPreviewScreenParam>('PDFPreviewScreen', {
          data: examDetailData,
          getResHeader: true,
          serviceType: 'Analisis Butir Soal',
        });
      },
    },
  ];

  const menuDataLaporan: MenuItemButtonType[] = [
    {
      icon: <UnduhIcon />,
      label: 'Unduh Laporan Ujian',
      onPress: async () => {
        setShowMoreMenu(false);
        setPopUp(true);
      },
    },
    {
      icon: <LatihanIcon />,
      label: 'Analisis Butir Soal',
      onPress: async () => {
        setShowMoreMenu(false);
        navigateScreen<PDFPreviewScreenParam>('PDFPreviewScreen', {
          data: detail?.schedule,
          getResHeader: true,
          serviceType: 'Analisis Butir Soal',
        });
      },
    },
  ];

  const answer = detail?.finish?.length || 0;
  const total = (detail?.finish?.length || 0) + (detail?.not_yet?.length || 0);
  const startTime = convertDate(detail?.schedule?.start_time);
  const endTime = convertDate(detail?.schedule?.end_time);
  const isExpired = convertDate().isAfter(endTime);

  return (
    <ScrollView style={[styles.container]}>
      <View
        style={[
          styles.header,
          {justifyContent: 'flex-start', alignItems: 'center'},
        ]}>
        <IconTugas width={64} height={64} />
        <View style={{marginLeft: 10, width: '80%'}}>
          <Text style={styles.headerTitle}>
            {detail?.schedule?.class?.name} • {detail?.schedule?.service?.name}{' '}
            • {detail?.schedule?.subject?.name}
          </Text>
          <Text style={styles.headerTitle2}>{detail?.schedule?.title}</Text>
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
          <Text style={styles.titleContainer}>Detail Ujian</Text>

          {!isCollaps ? (
            <Icon name="chevron-up" size={16} color={Colors.primary.base} />
          ) : (
            <Icon name="chevron-down" size={16} color={Colors.primary.base} />
          )}
        </TouchableOpacity>
        {isCollaps ? null : (
          <View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Bab</Text>
              <Text style={styles.detailValue}>
                {detail?.schedule?.chapter?.[0]?.chapter?.name}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Tanggal/Jam Ujian</Text>
              <Text style={styles.detailValue}>
                {startTime.format('dddd, DD MMM YYYY • HH:mm') +
                  ' - ' +
                  endTime.format('HH:mm')}{' '}
                ({endTime.diff(startTime) / 1000 / 60} menit)
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Selesai Dinilai</Text>
              <Text style={styles.detailValue}>
                {convertDate(detail?.schedule?.completed_at).format(
                  'dddd, DD MMM YYYY • HH:mm',
                )}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Instruksi Pengerjaan</Text>
              <Text style={styles.detailValue}>
                {detail?.schedule?.instructions}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text style={styles.detailTitle}>Paket Soal</Text>
              <View style={[styles.shadowProp, styles.card]}>
                <View>
                  <Text style={styles.packetTitle}>
                    {detail?.schedule?.package?.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.detailTitle}>Pilihan Ganda</Text>
                    <Text style={styles.countTitle}>
                      {detail?.schedule?.package?.multiple_choice_count ?? 0}{' '}
                      Soal
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.detailTitle}>Uraian</Text>
                    <Text style={styles.countTitle}>
                      {detail?.schedule?.package?.essay_count ?? 0} Soal
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={{paddingBottom: 50}}>
        <Text style={[styles.titleContainer, {marginBottom: 16}]}>
          {answer} dari {total} murid mengumpulkan
        </Text>

        {detail?.finish?.map((item: any, index: number) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                if (!isExpired) {
                  return;
                }
                const studentExam =
                  examDetailData?.exam_schedule?.student_exam?.find(
                    student => student.id === item.student_exam_id,
                  );
                navigation.navigate('TeacherCheckExamScreen', {
                  question_package_id: item.question_package_id,
                  student_exam_id:
                    item.student_exam_id || item.student_exam?.[0]?.id,
                  student_name: item?.fullname,
                  exam_name: item?.title,
                  exam_id: item.id,
                  student_paper_id: studentExam?.student_paper_id || '',
                  mode: 'HISTORY',
                });
              }}
              style={({pressed}) => ({
                opacity: pressed && isExpired ? 0.4 : 1,
                marginVertical: 6,
              })}>
              <CardStudent
                avatar={item?.avatar}
                img={item?.avatar_path_url}
                name={item?.fullname || ''}
                date={convertDate(item?.time_finish).format(
                  'dddd, DD MMM YYYY • hh:mm',
                )}
                score={item?.point || 0}
              />
            </Pressable>
          );
        })}
        {detail?.not_yet?.map((item: any, index: number) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                if (!isExpired) {
                  return;
                }
                const studentExam =
                  examDetailData?.exam_schedule?.student_exam?.find(
                    student => student.id === item.student_exam_id,
                  );
                navigation.navigate('TeacherCheckExamScreen', {
                  question_package_id: item.question_package_id,
                  student_exam_id:
                    item.student_exam_id || item.student_exam?.[0]?.id,
                  student_name: item?.fullname,
                  exam_name: item?.title,
                  exam_id: item.id,
                  student_paper_id: studentExam?.student_paper_id || '',
                  mode: 'HISTORY',
                });
              }}
              style={({pressed}) => ({
                opacity: pressed && isExpired ? 0.4 : 1,
                marginVertical: 6,
              })}>
              <CardStudent
                avatar={item?.avatar_path_id || item?.avatar}
                img={item?.avatar_path_url}
                name={item?.fullname}
                unfinish={true}
                date={convertDate(item?.time_finish).format(
                  'dddd, DD MMM YYYY • hh:mm',
                )}
                score={item?.point}
              />
            </Pressable>
          );
        })}
      </View>
      {popUp ? (
        <PopUp
          title={'Unduh Laporan Ujian'}
          desc={`Apakah Anda yakin untuk mengunduh Laporan Ujian (${detail?.schedule?.title}) ?`}
          actionCancel={() => setPopUp(false)}
          actionConfirm={() => downloadPDF()}
          titleCancel={'Batalkan'}
          titleConfirm={'Unduh'}
        />
      ) : null}
      <MoreMenu
        height={100}
        visible={showMoreMenu}
        menus={route?.params?.isFromLaporan ? menuDataLaporan : menuData}
        onClose={() => setShowMoreMenu(false)}
      />
    </ScrollView>
  );
};
export {DetailTaskScreenTeacher};

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
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 2.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    margin: '1%',
  },
  packetTitle: {
    fontWeight: '600',
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
  },
  countTitle: {
    fontWeight: '400',
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
  },
});
