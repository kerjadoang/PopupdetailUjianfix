/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms';
import Colors from '@constants/colors';
import {DataItem} from './component/DataItem';
import PresensiContainer from './component/PresensiContainer';
import {useScreen} from './useScreen';
import {SCREEN_NAME} from '@constants/screen';
import Avatar from '@components/atoms/Avatar';

const StudentDetailScreen = () => {
  const navigation: any = useNavigation();
  const {studentDetail, studentYearlyAttendance, id_student}: any = useScreen();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Detail Murid" />,
    });
  }, [navigation]);
  const detail = studentDetail?.data?.data;

  return (
    <>
      <View style={styles.body}>
        <View style={styles.whiteContainer}>
          <View style={styles.imageContainer}>
            <Avatar id={detail?.avatar} style={styles.profilePic} />
          </View>
          <DataItem label="Nama" value={detail?.full_name || '--'} />
          <DataItem
            label="Nomor Induk Siswa (NIS)"
            value={detail?.registration_number || '00'}
          />
          <DataItem
            label="Kelas"
            value={
              detail?.user_rombel?.[0]?.rombel_class_school_name?.replace(
                'Kelas ',
                '',
              ) || detail?.user_rombel?.[0]?.class_name
            }
          />
          <DataItem label="Email" value={detail?.email || 'user@email.com'} />
          <DataItem
            label="No. HP"
            value={detail?.phone_number || '0888880000'}
          />
        </View>
        <PresensiContainer
          year={
            studentYearlyAttendance?.data?.data?.academic_year ||
            'Tahun 20xx - 20xx'
          }
          attend={studentYearlyAttendance?.data?.data?.attend_count || 0}
          notAttend={studentYearlyAttendance?.data?.data?.absent_count || 0}
          onAttend={() => {
            navigation.navigate(SCREEN_NAME.StudentAttendanceReportScreen, {
              id_student: detail.id || id_student,
            });
          }}
          onNotAttend={() => {
            navigation.navigate(SCREEN_NAME.StudentAbsentReportScreen, {
              id_student: detail.id || id_student,
            });
          }}
        />
      </View>
    </>
  );
};

export {StudentDetailScreen};

const styles = StyleSheet.create({
  whiteContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    borderRadius: 15,
    marginBottom: 20,
  },
  body: {
    backgroundColor: Colors.white,
    padding: 16,
    height: '100%',
  },
  imageContainer: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
  },
});
