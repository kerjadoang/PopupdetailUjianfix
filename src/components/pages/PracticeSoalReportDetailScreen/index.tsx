/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {bgBlueOrnament, BlueBackArrow, RightArrow} from '@assets/images';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {ProgressCircle} from '@components/atoms';
import Fonts from '@constants/fonts';

import IconVideo from '@assets/svg/ic40_video.svg';
import {CardProgress, DurationContainer} from './component';
import {TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import PracticeIcon from '@assets/svg/ic32_practice.svg';
import TestIcon from '@assets/svg/ic32_test.svg';
import UjianIcon from '@assets/svg/Ujian.svg';
import {SubjectType} from '@constants/subjectType';
import {INavigation} from 'type/screen';

const PracticeSoalReportDetailScreen = ({route}: any) => {
  const {Data, user} = route.params;
  const navigation =
    useNavigation<INavigation<'PracticeSoalReportDetailScreen'>>();
  const [report, setReport] = useState<any>({});

  useEffect(() => {
    const getReport = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get(
          `/soal/v1/laporan/${Data?.subject?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token || tokenParse}`,
            },
          },
        );

        if (response.status === 200) {
          setReport(response.data?.data);
        }
      } catch (err) {
        return;
      }
    };

    getReport();
  }, [Data?.subject?.id]);

  /**
   * Parsing subject report data based on ulangan harian or ujian
   *
   * @param string typeSoal
   * @param number soalServiceId = (3 = Practice | 4 = Test | 5 = Ujian Tengah Semester | 6 = Ujian Akhir Semester | 7 = Ujian Akhir Tahun)
   * @return object subject report
   */
  const __parseSubjectReportData = useCallback(
    (
      typeSoal: 'ULANGAN_HARIAN' | 'UJIAN',
      soalServiceId: 3 | 4 | 5 | 6 | 7,
    ) => {
      if (!typeSoal && !soalServiceId) {
        return [];
      }

      let datas = [];

      if (typeSoal === 'ULANGAN_HARIAN') {
        datas = report?.ulangan_harian;
      } else if (typeSoal === 'UJIAN') {
        datas = report?.ujian;
      }

      return datas?.filter((_value: any) => {
        if (
          _value?.soal_service?.service === 'SOAL' &&
          _value?.soal_service?.id === soalServiceId
        ) {
          return _value;
        }
      })[0];
    },
    [report?.ujian, report?.ulangan_harian],
  );

  return (
    <SafeAreaView style={{paddingBottom: 16}}>
      <ImageBackground source={bgBlueOrnament} style={styles.bg}>
        <Header
          label={'Laporan Latihan Soal'}
          colorLabel={Colors.white}
          backgroundColor={Colors.primary.base}
          iconLeft={
            <Image
              source={RightArrow}
              style={{
                transform: [{rotate: '180deg'}],
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          }
        />
      </ImageBackground>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ProgressCircle
              progress={Data?.summary?.progress_percentage}
              size={64}
              strokeWidth={6}
              color={Colors.primary.base}
              children={
                <SvgUri uri={Data?.subject?.path_url} width={40} height={40} />
              }
            />
            <View style={{marginHorizontal: 15}}>
              <Text style={styles.textTitle}>{Data?.subject?.name}</Text>
              <Text
                style={
                  styles.progress
                }>{`Progres : ${Data?.summary?.progress_percentage}%`}</Text>
            </View>
          </View>
          <CardProgress
            isArrowIcon={true}
            img={<IconVideo width={40} height={40} />}
            title="Video Animasi"
            taskdone={report?.video_progress?.user_progress ?? 0}
            alltask={`dari ${
              report?.video_progress?.total_video ?? 0
            } video ditonton`}
            action={() =>
              navigation.navigate('QuestionBabScreen', {
                chapterData: {
                  ...Data?.subject,
                  icon_path_url: Data?.subject?.path_url,
                },
                category: 'Soal',
                subject_id: Data?.subject?.id,
                subject_name: Data?.subject?.name,
                path_url: Data?.subject?.path_url,
              })
            }
          />
          <View style={styles.whiteContainer}>
            <Text
              style={[styles.textTitle, {fontSize: 16, marginHorizontal: 16}]}>
              Ulangan Harian
            </Text>
            <CardProgress
              isArrowIcon={true}
              img={
                <View style={styles.leftIcon}>
                  <PracticeIcon width={24} height={24} />
                </View>
              }
              title="Practice"
              taskdone={
                __parseSubjectReportData('ULANGAN_HARIAN', 3)?.summary
                  ?.user_progress ?? 0
              }
              alltask={`dari ${
                __parseSubjectReportData('ULANGAN_HARIAN', 3)?.summary
                  ?.total_question ?? 0
              } latihan soal dikerjakan`}
              action={() =>
                navigation.navigate('ChapterSOALScreen', {
                  subject_type: SubjectType?.SOAL.UlanganHarian,
                  subject_data: {
                    ...Data?.subject,
                    icon_path_url: Data?.subject?.path_url,
                  },
                })
              }
            />
            <View style={styles.lineHorizontal} />
            <CardProgress
              isArrowIcon={true}
              img={
                <View style={styles.leftIcon}>
                  <TestIcon width={24} height={24} />
                </View>
              }
              title="Test"
              taskdone={
                __parseSubjectReportData('ULANGAN_HARIAN', 4)?.summary
                  ?.user_progress ?? 0
              }
              alltask={`dari ${
                __parseSubjectReportData('ULANGAN_HARIAN', 4)?.summary
                  ?.total_question ?? 0
              } materi ujian dikerjakan`}
              isAverage={true}
              average={
                __parseSubjectReportData('ULANGAN_HARIAN', 4)?.summary
                  ?.average ?? 0
              }
              action={() =>
                navigation.navigate('ChapterSOALScreen', {
                  subject_type: SubjectType?.SOAL.UlanganHarian,
                  subject_data: {
                    ...Data?.subject,
                    icon_path_url: Data?.subject?.path_url,
                  },
                })
              }
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('HistoryTestAndExamScreen', {
                  type: 'ULANGAN_HARIAN',
                  subjectData: Data,
                  questionPackageServiceId: __parseSubjectReportData(
                    'ULANGAN_HARIAN',
                    4,
                  )?.soal_service?.id,
                  user,
                })
              }>
              <Text style={styles.labelBtn}>Riwayat Nilai Test</Text>
              <Image source={BlueBackArrow} style={styles.iconBtn} />
            </TouchableOpacity>
          </View>

          <View style={[styles.whiteContainer]}>
            <Text
              style={[styles.textTitle, {fontSize: 16, marginHorizontal: 16}]}>
              Ujian
            </Text>
            <CardProgress
              isArrowIcon={true}
              img={
                <View style={styles.leftIcon}>
                  <UjianIcon />
                </View>
              }
              title="Ujian Tengah Semester"
              taskdone={
                __parseSubjectReportData('UJIAN', 5)?.summary?.user_progress ??
                0
              }
              alltask={`dari ${
                __parseSubjectReportData('UJIAN', 5)?.summary?.total_question ??
                0
              } materi ujian dikerjakan`}
              isAverage={true}
              average={
                __parseSubjectReportData('UJIAN', 5)?.summary?.average ?? 0
              }
              action={() =>
                navigation.navigate('ChapterSOALScreen', {
                  subject_type: SubjectType?.SOAL.UjianTengahSemester,
                  subject_data: {
                    ...Data?.subject,
                    icon_path_url: Data?.subject?.path_url,
                  },
                })
              }
            />
            <View style={styles.lineHorizontal} />
            <CardProgress
              isArrowIcon={true}
              img={
                <View style={styles.leftIcon}>
                  <UjianIcon />
                </View>
              }
              title="Ujian Akhir Semester"
              taskdone={
                __parseSubjectReportData('UJIAN', 6)?.summary?.user_progress ??
                0
              }
              alltask={`dari ${
                __parseSubjectReportData('UJIAN', 6)?.summary?.total_question ??
                0
              } materi ujian dikerjakan`}
              isAverage={true}
              average={
                __parseSubjectReportData('UJIAN', 6)?.summary?.average ?? 0
              }
              action={() =>
                navigation.navigate('ChapterSOALScreen', {
                  subject_type: SubjectType?.SOAL.UjianTengahSemester,
                  subject_data: {
                    ...Data?.subject,
                    icon_path_url: Data?.subject?.path_url,
                  },
                })
              }
            />
            <View style={styles.lineHorizontal} />
            <CardProgress
              isArrowIcon={true}
              img={
                <View style={styles.leftIcon}>
                  <UjianIcon />
                </View>
              }
              title="Ujian Akhir Tahun"
              taskdone={
                __parseSubjectReportData('UJIAN', 7)?.summary?.user_progress ??
                0
              }
              alltask={`dari ${
                __parseSubjectReportData('UJIAN', 7)?.summary?.total_question ??
                0
              } materi ujian dikerjakan`}
              isAverage={true}
              average={
                __parseSubjectReportData('UJIAN', 7)?.summary?.average ?? 0
              }
              action={() =>
                navigation.navigate('ChapterSOALScreen', {
                  subject_type: SubjectType?.SOAL.UjianTengahSemester,
                  subject_data: {
                    ...Data?.subject,
                    icon_path_url: Data?.subject?.path_url,
                  },
                })
              }
            />
            <View style={styles.lineHorizontal} />
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('HistoryTestAndExamScreen', {
                  type: 'UJIAN',
                  subjectData: Data,
                  questionPackageServiceId: __parseSubjectReportData('UJIAN', 5)
                    ?.soal_service?.id,
                  user,
                })
              }>
              <Text style={styles.labelBtn}>Riwayat Nilai Ujian</Text>
              <Image source={BlueBackArrow} style={styles.iconBtn} />
            </TouchableOpacity>
          </View>
          <DurationContainer subject={Data?.subject} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 400,
    position: 'absolute',
    paddingTop: 20,
  },
  container: {
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.primary.background,
    top: 100,
    paddingTop: 30,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 30,
  },
  textTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    color: Colors.black,
  },
  progress: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
    fontSize: 14,
  },
  whiteContainer: {
    borderRadius: 15,
    paddingVertical: 16,
    marginBottom: 20,
    backgroundColor: Colors.white,
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: '25%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 8,
  },
  labelBtn: {
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
  },
  iconBtn: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
  },
  leftIcon: {
    backgroundColor: Colors.primary.light3,
    padding: 8,
    borderRadius: 24,
  },
  lineHorizontal: {
    height: 1,
    backgroundColor: Colors.dark.neutral20,
    marginBottom: 16,
    marginHorizontal: 16,
  },
});

export {PracticeSoalReportDetailScreen};
