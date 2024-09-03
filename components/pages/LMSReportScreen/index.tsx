/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {Header} from '@components/atoms/Header';
import {SwipeUp} from '@components/atoms';
import {
  DownloadReport,
  Card,
  AttendReport,
  NotAttendReport,
  CardScore,
  ItemSubject,
} from './component';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import PresensiContainer from './component/PresensiContainer';
import {RightArrow} from '@assets/images';
import {useNavigation} from '@react-navigation/native';
import useReport from './useReport';
import {fetchMapel} from '@redux';
import provider from '@services/lms/provider';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import SnackbarResult from '@components/atoms/SnackbarResult';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {URL_PATH} from '@constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import jwtDecode from 'jwt-decode';
import {useGetLKSSummaryReport} from '@services/lms';
import CardLKS from './component/CardLKS';
import {SubjectType} from '@constants/subjectType';
import Config from 'react-native-config';

const LMSReportScreen = () => {
  const navigation = useNavigation<any>();
  const {getUser, presensi, task, exam, akm, mapel, dispatch} = useReport();
  const [isLoading, setIsLoading] = useState(true);
  const [presensiShow, setPresensiShow] = useState(false);
  const [presensiShow2, setPresensiShow2] = useState(false);
  const [refForScroll, setRefForScroll] = useState<any>(null);
  const [heightViewLaporanMapel, setHeightViewLaporanMapel] = useState(0);
  const [isShowBtnLaporanMapel, setIsShowBtnLaporanMapel] = useState(true);
  const [isDownloadERapor, setIsDownloadERapor] = useState(false);
  const [semesterERapor, setSemesterERapor] = useState('-');
  const [ERaporData, setERaporData] = useState<any>(null);
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);
  const [dataUser, setDataUser] = useState<IBaseJWTUser>({});
  const {data: lksSummaryReportData} = useGetLKSSummaryReport(dataUser.id);

  const dataAkm = {
    done: akm?.data?.data?.akm_done,
  };

  const dataExam = {
    total: exam?.data?.data?.total_exam,
    highest: exam?.data?.data?.highest,
    lowest: exam?.data?.data?.lowest,
  };

  const dataPresensi = {
    attend: presensi?.data?.data?.attend_count,
    absent: presensi?.data?.data?.absent_count,
    year: presensi?.data?.data?.academic_year,
  };

  const dataTask = {
    done: task?.data?.data?.task_done,
    undone: task?.data?.data?.task_undone,
    highest: task?.data?.data?.highest,
    lowest: task?.data?.data?.lowest,
  };

  const data = {
    username: getUser?.data?.context?.user?.name,
    kelas: getUser.data?.class?.name,
    nisn: '0117363440',
    class_id: getUser?.data?.class_id,
  };

  useLayoutEffect(() => {
    const getReportCheckDownload = async () => {
      try {
        const murid_id = getUser?.data?.id;

        const {
          status,
          data: {
            data: {
              user_rombel,
              academic_year_id,
              academic_phase_id,
              school_id,
              semester,
            },
          },
        } = await provider.getDetailMurid(murid_id);

        setSemesterERapor(semester);

        if (status === 200) {
          const {
            status: _status,
            data: {
              data: {download, erapor},
            },
          } = await provider.getReportCheckDownload({
            murid_id,
            rombel_class_school_id: user_rombel?.[0]?.rombel_class_school_id,
            academic_year_id,
            academic_phase_id,
            school_id,
          });

          if (_status === 200) {
            setERaporData(erapor);
            setIsDownloadERapor(download);
          }
        }
      } catch (_) {}

      setIsLoading(false);
    };

    getReportCheckDownload();
    dispatch(fetchMapel(data?.class_id) as any);
  }, []);

  useEffect(() => {
    const userData = async (): Promise<IBaseJWTUser> => {
      const token = await AsyncStorage.getItem(Keys.token);
      if (token) {
        let userId: IBaseJWTUser = jwtDecode(token);
        setDataUser(userId);
        return Promise.resolve(userId);
      }
      return Promise.reject({});
    };
    userData();
  }, []);

  const handleDownloadERapor = async () => {
    setIsLoading(true);

    try {
      const tokenParse = await JSON.parse(
        (await AsyncStorage.getItem(Keys.token)) || '',
      );

      const fileName = `e-Rapor ${ERaporData?.user?.full_name}.pdf`;
      const mime = 'application/pdf';

      ReactNativeBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + fileName,
          title: fileName,
          mime,
        },
      })
        .fetch(
          'GET',
          `${Config.BASEURL}/${URL_PATH.generate_erapor_murid(ERaporData?.id)}`,
          {Authorization: `Bearer ${tokenParse}`},
        )
        .then(async res => {
          await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
            {name: fileName, parentFolder: '', mimeType: mime},
            'Download',
            res.path(),
          );

          setIsLoading(false);
          setIsShowSnackbar(true);
        })
        .catch(() => setIsLoading(false));
    } catch (_) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        label={'Laporan LMS'}
        colorLabel={Colors.white}
        backgroundColor={'transparent'}
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
      />
      <Image source={bgBlueOrnament} style={styles.bg} />
      <View style={styles.whiteContainer}>
        <ScrollView
          ref={ref => setRefForScroll(ref)}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={_event => {
            if (
              Math.round(_event.nativeEvent.contentOffset.y) + 236 >=
              heightViewLaporanMapel
            ) {
              setIsShowBtnLaporanMapel(false);
            } else {
              setIsShowBtnLaporanMapel(true);
            }
          }}>
          <DownloadReport
            semester={semesterERapor}
            isDownload={isDownloadERapor}
            action={handleDownloadERapor}
          />
          <View style={styles.margin}>
            <PresensiContainer
              year={dataPresensi.year}
              attend={dataPresensi.attend}
              notAttend={dataPresensi.absent}
              onAttend={() => {
                setPresensiShow(true);
              }}
              onNotAttend={() => {
                setPresensiShow2(true);
              }}
            />
          </View>
          <View style={styles.margin}>
            <Card
              isExam
              finished={dataExam.total}
              highest={
                dataExam.highest ? (
                  dataExam?.highest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        key={index}
                        num={index + 1}
                        name={item.subject}
                        score={item.point}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
              lowest={
                dataExam.lowest ? (
                  dataExam?.lowest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        isLow
                        key={index}
                        num={index + 1}
                        name={item.subject}
                        score={item.point}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
            />
          </View>
          <View style={styles.margin}>
            <Card
              finished={dataTask.done}
              unfinished={dataTask.undone}
              onPRProjekTugas={() => navigation.navigate('LMSPRTugasScreen')}
              highest={
                dataTask.highest ? (
                  dataTask?.highest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        key={index}
                        num={index + 1}
                        name={item.subject}
                        score={item.value}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
              lowest={
                dataTask.lowest ? (
                  dataTask?.lowest?.map((item: any, index: number) => {
                    return (
                      <CardScore
                        key={index}
                        isLow
                        num={index + 1}
                        name={item.subject}
                        score={item.value}
                      />
                    );
                  })
                ) : (
                  <Text>Tidak Ada Data</Text>
                )
              }
            />
          </View>
          <View style={styles.margin}>
            <Card
              finished={dataAkm.done}
              isAKM
              onAKM={() =>
                navigation.navigate('ChapterAKMScreen', {
                  subject_type: SubjectType.AKM.AKM,
                  subject_data: {},
                })
              }
            />
          </View>
          <View style={styles.margin}>
            <CardLKS
              lksSummaryReportData={lksSummaryReportData?.data ?? undefined}
              navigation={navigation}
            />
          </View>
          <View
            style={styles.margin}
            onLayout={({
              nativeEvent: {
                layout: {y},
              },
            }) => setHeightViewLaporanMapel(y)}>
            <View style={styles.containerMapel}>
              <Text style={styles.titleMapel}>Laporan Mata Pelajaran</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {mapel?.map(
                  (item: {
                    id: any;
                    path_url: any;
                    name: any;
                    class_id: any;
                  }) => {
                    return (
                      <ItemSubject
                        key={item.id}
                        name={item.name}
                        img={item.path_url}
                        action={() => {
                          navigation.navigate('StudyReportStudentScreen', {
                            subject: {
                              id: item.id,
                              name: item.name,
                              class_id: item.class_id,
                            },
                          });
                        }}
                      />
                    );
                  },
                )}
              </View>
            </View>
          </View>
          <View style={styles.marginBottom} />
        </ScrollView>
      </View>

      {isShowBtnLaporanMapel && (
        <Pressable
          style={styles.btn}
          onPress={() =>
            refForScroll.scrollTo({
              x: 0,
              y: heightViewLaporanMapel + 64,
              animated: true,
            })
          }>
          <Text style={styles.textBtn}>Laporan Mata Pelajaran</Text>
          <Image
            source={RightArrow}
            style={[styles.iconBtn, {width: 12, height: 12}]}
          />
        </Pressable>
      )}

      <SwipeUp
        height={100}
        onClose={() => {
          setPresensiShow(false);
        }}
        visible={presensiShow}
        children={<AttendReport />}
      />
      <SwipeUp
        height={100}
        onClose={() => {
          setPresensiShow2(false);
        }}
        visible={presensiShow2}
        children={<NotAttendReport setPresensiShow2={setPresensiShow2} />}
      />

      <SnackbarResult
        label="e-Rapor berhasil diunduh."
        visible={isShowSnackbar}
        onPressClose={() => setIsShowSnackbar(false)}
        type="SUCCESS"
      />

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: Colors.primary.background,
  },
  whiteContainer: {
    backgroundColor: Colors.primary.background2,
    padding: 16,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profilePic: {
    width: 56,
    height: 56,
    borderRadius: 30,
  },
  username: {
    fontSize: 16,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    textTransform: 'capitalize',
  },
  class: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
  },
  margin: {
    marginTop: 16,
  },
  marginBottom: {
    marginBottom: 100,
  },
  btn: {
    position: 'absolute',
    bottom: 12,
    backgroundColor: Colors.primary.base,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 22,
  },
  iconBtn: {
    width: 20,
    height: 20,
    marginLeft: 20,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  textBtn: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.white,
  },
  titleMapel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
  containerMapel: {
    padding: 16,
    backgroundColor: Colors.white,
    elevation: 8,
    borderRadius: 15,
  },
});

export {LMSReportScreen};
