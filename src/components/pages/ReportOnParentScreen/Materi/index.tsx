/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Colors from '@constants/colors';
import {CardProgress} from '../component/CardProgress';
import Fonts from '@constants/fonts';
import {SubjectType} from '@constants/subjectType';
import LogoRegular from '@assets/svg/kelaspintar_regular.svg';
import ArrowDown from '@assets/svg/ic_arrow_bottom_blue.svg';
import ArrowRight from '@assets/svg/ic_arrow_right_blue.svg';
import Clock from '@assets/svg/ic16_clock.svg';
import LearnLogo from '@assets/svg/ic32_learn.svg';
import PracticeLogo from '@assets/svg/ic32_practice.svg';
import TestLogo from '@assets/svg/ic32_test.svg';
import MateriType1 from '@assets/svg/videoPresentasi.svg';
import MateriType2 from '@assets/svg/videoAnimasi.svg';
import MateriType3 from '@assets/svg/learnEbook.svg';
import api from '@api/index';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SwipeUp} from '@components/atoms';
import {IStudentReportMaterialBySubjectId} from 'type/student-report-material-by-subject-id';
import apiWithoutToken from '@api/withoutToken';
import {IStudentReportMaterialSummaryDurationBySubject} from 'type/student-report-material-summary-duration-by-subject-id';
import {ChapterKPRegularScreenParam, ParamList} from 'type/screen';
import {URL_PATH} from '@constants/url';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {isStringContains} from '@constants/functional';
import MateriChart from '../component/MateriChart';
interface MateriProps {
  subject?: Subject;
  data?: any;
}
const Materi: React.FC<MateriProps> = ({subject, data}) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ReportOnParentScreen'>>();
  const isFocus = useIsFocused();
  const [chapter, setChapter] = useState<any[]>();
  const [materiKP, setMateriKP] = useState<IStudentReportMaterialBySubjectId>();
  const [
    selectedChapterMateriKelasPintar,
    setSelectedChapterMateriKelasPintar,
  ] = useState({
    label: '',
    value: '',
  });
  const [selectedChapterMateriSekolah, setSelectedChapterMateriSekolah] =
    useState({
      label: '',
      value: '',
    });
  const [swipeUpChapterMateriKelasPintar, setSwipeUpChapterMateriKelasPintar] =
    useState<Boolean>(false);
  const [swipeUpChapterMateriSekolah, setSwipeUpChapterMateriSekolah] =
    useState<Boolean>(false);
  const [durationLearning, setDurationLearning] =
    useState<IStudentReportMaterialSummaryDurationBySubject>();

  const cekType = (x: string) => {
    if (x === 'learn') {
      return SubjectType.KPRegular.Learn;
    } else if (x === 'practice') {
      return SubjectType.KPRegular.Practice;
    } else {
      return SubjectType.KPRegular.Test;
    }
  };

  useEffect(() => {
    fetchMateri();
  }, [selectedChapterMateriKelasPintar]);

  const fetchMateri = () => {
    apiWithoutToken
      .get(
        // `/lms/v1/student-report/material/${subject?.id}${
        //   selectedChapterMateriKelasPintar.value &&
        //   `?chapterId=${selectedChapterMateriKelasPintar.value}`
        // }`,
        // `/lpt/v1/report/${subject?.id}?studentId=${data?.user_id}`,
        URL_PATH.get_all_subject_report(subject?.id!, data?.user_id),
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        },
      )
      .then(response => {
        setMateriKP(response?.data?.data);
      })
      .catch(() => {});
  };

  const fetchDurationLearning = () => {
    apiWithoutToken
      .get(`/lms/v1/student-report/material/summary/duration/${subject?.id}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      })
      .then(response => {
        setDurationLearning(response?.data?.data);
      })
      .catch(() => {});
  };

  const fetchChapter = () => {
    api
      .get(`/master/v1/chapter-list-by-subject/school/${subject?.id}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      })
      .then(response => {
        setChapter(response?.data?.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!isFocus) {
      return;
    }
    fetchChapter();
    fetchMateri();
    fetchDurationLearning();
  }, [isFocus]);

  const renderChapterSelectedMateriKelasPintar = () => {
    return (
      <View>
        <View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Pilih Kurikulum
          </Text>
        </View>
        <View style={{padding: 16}}>
          <Pressable
            onPress={() =>
              setSelectedChapterMateriKelasPintar({
                label: '',
                value: '',
              })
            }
            key={99}
            style={{
              marginVertical: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Semua Bab</Text>
            <View
              style={{
                borderRadius: 100,
                width: 24,
                height: 24,
                borderColor:
                  selectedChapterMateriKelasPintar.label === ''
                    ? Colors.primary.base
                    : Colors.dark.neutral60,
                borderWidth:
                  selectedChapterMateriKelasPintar.label === '' ? 8 : 1,
              }}
            />
          </Pressable>
          {chapter?.map(
            (
              item: {name: any; id: any},
              index: React.Key | null | undefined,
            ) => (
              <Pressable
                onPress={() =>
                  setSelectedChapterMateriKelasPintar({
                    label: item.name,
                    value: item.id,
                  })
                }
                key={item.id || index}
                style={{
                  marginVertical: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{item?.name}</Text>
                <View
                  style={{
                    borderRadius: 100,
                    width: 24,
                    height: 24,
                    borderColor:
                      item.name === selectedChapterMateriKelasPintar?.label
                        ? Colors.primary.base
                        : Colors.dark.neutral60,
                    borderWidth:
                      item.name === selectedChapterMateriKelasPintar?.label
                        ? 8
                        : 1,
                  }}
                />
              </Pressable>
            ),
          )}
        </View>
      </View>
    );
  };
  const renderChapterSelectedMateriSekolah = () => {
    return (
      <View>
        <View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Pilih Kurikulum
          </Text>
        </View>
        <View style={{padding: 16}}>
          <Pressable
            onPress={() =>
              setSelectedChapterMateriSekolah({
                label: '',
                value: '',
              })
            }
            key={99}
            style={{
              marginVertical: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Semua Bab</Text>
            <View
              style={{
                borderRadius: 100,
                width: 24,
                height: 24,
                borderColor:
                  selectedChapterMateriSekolah.label === ''
                    ? Colors.primary.base
                    : Colors.dark.neutral60,
                borderWidth: selectedChapterMateriSekolah.label === '' ? 8 : 1,
              }}
            />
          </Pressable>
          {chapter?.map(
            (
              item: {name: any; id: any},
              index: React.Key | null | undefined,
            ) => (
              <Pressable
                onPress={() =>
                  setSelectedChapterMateriSekolah({
                    label: item.name,
                    value: item.id,
                  })
                }
                key={index}
                style={{
                  marginVertical: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{item?.name}</Text>
                <View
                  style={{
                    borderRadius: 100,
                    width: 24,
                    height: 24,
                    borderColor:
                      item.name === selectedChapterMateriSekolah?.label
                        ? Colors.primary.base
                        : Colors.dark.neutral60,
                    borderWidth:
                      item.name === selectedChapterMateriSekolah?.label ? 8 : 1,
                  }}
                />
              </Pressable>
            ),
          )}
        </View>
      </View>
    );
  };

  const mapelKPAverageTestSoalPG = materiKP?.average_test.find(data =>
    isStringContains(data?.test_name, 'Soal Pilihan Ganda'),
  );

  const mapelKPAverageTestAdaptif = materiKP?.average_test.find(data =>
    isStringContains(data?.test_name, 'adaptif'),
  );

  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        <SvgUri uri={subject?.path_url || ''} width={50} height={50} />
        <Text style={styles.subjectName}>{subject?.name}</Text>
      </View>

      <View style={styles.whiteContainer}>
        <View style={[styles.subjectContainer, {marginBottom: 10}]}>
          <Text
            style={[
              styles.subjectName,
              {fontSize: 16, marginLeft: 0, marginRight: 8},
            ]}>
            Materi
          </Text>
          <LogoRegular />
        </View>
        <View style={{width: WINDOW_WIDTH * 0.32}}>
          <Pressable
            style={styles.btn}
            onPress={() => setSwipeUpChapterMateriKelasPintar(true)}>
            <Text style={styles.btnText}>
              {selectedChapterMateriKelasPintar.label !== ''
                ? selectedChapterMateriKelasPintar.label
                : 'Semua Bab'}
            </Text>
            <ArrowDown />
          </Pressable>
        </View>
        <CardProgress
          type={'Learn'}
          allTask={materiKP?.total_history?.learn?.total_materi || 0}
          progress={materiKP?.total_history?.learn?.user_progress || 0}
          desc={'materi dipelajari'}
          img={<LearnLogo width={50} height={50} />}
          action={() =>
            navigation.navigate('ChapterKPRegularScreen', {
              subject_type: cekType('learn'),
              subject_data:
                subject as ChapterKPRegularScreenParam['subject_data'],
            })
          }
        />
        <CardProgress
          type={'Practice'}
          allTask={materiKP?.total_history?.practice?.total_materi || 0}
          progress={materiKP?.total_history?.practice?.user_progress || 0}
          desc={'materi latihan dikerjakan'}
          img={<PracticeLogo width={50} height={50} />}
          action={() =>
            navigation.navigate('ChapterKPRegularScreen', {
              subject_type: cekType('practice'),
              subject_data:
                subject as ChapterKPRegularScreenParam['subject_data'],
            })
          }
        />

        <CardProgress
          type={'Test'}
          allTask={materiKP?.total_history?.test?.total_materi || 0}
          progress={materiKP?.total_history?.test?.user_progress || 0}
          desc={'materi ujian dikerjakan'}
          img={<TestLogo width={50} height={50} />}
          action={() =>
            navigation.navigate('ChapterKPRegularScreen', {
              subject_type: cekType('test'),
              subject_data:
                subject as ChapterKPRegularScreenParam['subject_data'],
            })
          }
        />

        <View style={styles.averageContainer}>
          <View>
            <Text style={styles.greyText}>
              {'Rata-rata Nilai \nTest Adaptif'}
            </Text>
            <Text style={styles.averageValue}>
              {mapelKPAverageTestAdaptif?.average || '-'}
            </Text>
          </View>
          <View>
            <Text style={styles.greyText}>
              {'Rata-rata Nilai \nTes Soal Pilihan Ganda'}
            </Text>
            <Text style={styles.averageValue}>
              {mapelKPAverageTestSoalPG?.average || '-'}
            </Text>
          </View>

          {/* {(materiKP?.average_test?.length || 0) > 0 ? (
            materiKP?.average_test?.map((item: any, index: number) => {
              return (
                <View
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    width: 100,
                  }}>
                  <Text
                    style={
                      styles.greyText
                    }>{`Rata-rata Nilai\n${item.test_name}`}</Text>
                  <Text style={styles.averageValue}>{item.average}</Text>
                </View>
              );
            })
          ) : (
            <Text>Belum Ada Nilai Rata-rata Test</Text>
          )} */}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('KPRegularHistoryScoreScreen', {
                report: {subject: subject},
                student: data,
                user: data,
              });
            }}
            style={[
              styles.btn,
              {
                width: 185,
                alignSelf: 'center',
                marginTop: 16,
                paddingHorizontal: 16,
              },
            ]}>
            <Text style={styles.btnText}>Riwayat Nilai Test</Text>
            <ArrowRight width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.whiteContainer}>
        <View style={[styles.subjectContainer, {marginBottom: 10}]}>
          <Text
            style={[
              styles.subjectName,
              {fontSize: 16, marginLeft: 0, marginRight: 8},
            ]}>
            Materi Sekolah
          </Text>
        </View>
        <View style={{width: WINDOW_WIDTH * 0.32}}>
          <Pressable
            style={styles.btn}
            onPress={() => setSwipeUpChapterMateriSekolah(true)}>
            <Text style={styles.btnText}>
              {selectedChapterMateriSekolah.label !== ''
                ? selectedChapterMateriSekolah.label
                : 'Semua Bab'}
            </Text>
            <ArrowDown />
          </Pressable>
        </View>
        <CardProgress
          type={'Video Presentasi'}
          allTask={materiKP?.total_history?.learn?.total_materi || 0}
          progress={materiKP?.total_history?.learn?.user_progress || 0}
          desc={'materi dipelajari'}
          img={<MateriType1 width={50} height={50} />}
          action={() =>
            navigation.navigate('ChapterKPRegularScreen', {
              subject_type: cekType('learn'),
              subject_data:
                subject as ChapterKPRegularScreenParam['subject_data'],
            })
          }
        />
        <CardProgress
          type={'Video Animasi'}
          allTask={materiKP?.total_history?.learn?.total_materi || 0}
          progress={materiKP?.total_history?.learn?.user_progress || 0}
          desc={'materi dipelajari'}
          img={<MateriType2 width={50} height={50} />}
          action={() =>
            navigation.navigate('ChapterKPRegularScreen', {
              subject_type: cekType('learn'),
              subject_data:
                subject as ChapterKPRegularScreenParam['subject_data'],
            })
          }
        />
        <CardProgress
          type={'E-book'}
          allTask={materiKP?.total_history?.learn?.total_materi || 0}
          progress={materiKP?.total_history?.learn?.user_progress || 0}
          desc={'materi dipelajari'}
          img={<MateriType3 width={50} height={50} />}
          action={() =>
            navigation.navigate('ChapterKPRegularScreen', {
              subject_type: cekType('learn'),
              subject_data:
                subject as ChapterKPRegularScreenParam['subject_data'],
            })
          }
        />
      </View>
      <View style={styles.whiteContainer}>
        <View style={styles.subjectContainer}>
          <Clock width={25} height={25} />
          <Text style={[styles.subjectName, {fontSize: 16}]}>
            Durasi Belajar
          </Text>
        </View>
        <View style={styles.durationHeader}>
          <View>
            <Text style={styles.greyText}>Total</Text>
            <Text style={styles.averageValue}>
              {durationLearning?.total
                ? `${durationLearning?.total?.hour} Jam ${durationLearning?.total?.minute} Menit`
                : '-'}
            </Text>
          </View>
          <View>
            <Text style={styles.greyText}>Total Minggu Ini</Text>
            <Text style={styles.averageValue}>
              {durationLearning?.total_per_week
                ? `${durationLearning?.total_per_week?.hour} Jam ${durationLearning?.total_per_week?.minute} Menit`
                : '-'}
            </Text>
          </View>
        </View>
        <Text style={styles.greyText}>Grafik Minggu Ini</Text>
        <ScrollView
          horizontal={true}
          persistentScrollbar={true}
          showsHorizontalScrollIndicator={false}>
          <View>
            <MateriChart data={durationLearning?.total_per_day || []} />
          </View>
        </ScrollView>
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={swipeUpChapterMateriKelasPintar}
        onClose={() => {
          setSwipeUpChapterMateriKelasPintar(false);
        }}
        height={500}
        children={renderChapterSelectedMateriKelasPintar()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={swipeUpChapterMateriSekolah}
        onClose={() => {
          setSwipeUpChapterMateriSekolah(false);
        }}
        height={500}
        children={renderChapterSelectedMateriSekolah()}
      />
      {/* <View style={styles.whiteContainer} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    paddingBottom: 25,
  },
  subjectContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  subjectName: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    marginLeft: 18.5,
    textAlignVertical: 'center',
  },
  whiteContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    borderRadius: 15,
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
  },
  greyText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  averageValue: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  durationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
});

export {Materi};
