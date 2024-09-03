/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header} from '@components/atoms/Header';
import {ExamHeader, Monitoring, CardPackage, CardStudent} from './component';
import Colors from '@constants/colors';
import ArrowBottom from '@assets/svg/blue_arrow_down.svg';
import ArrowTop from '@assets/svg/blueArrowUp.svg';
import Fonts from '@constants/fonts';
import {Button, PopUp} from '@components/atoms';
import {useExam} from './useExam';
import {EmptyDisplay} from '@components/atoms';
import Maskot11 from '@assets/svg/maskot_11.svg';
import Maskot2 from '@assets/svg/maskot_2.svg';
import {
  _handlerConvertAllDate,
  rdxDispatch,
  showErrorToast,
} from '@constants/functional';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {ExamDetailDestroy} from '@redux';

const ExamDetailGuruScreen = () => {
  const {
    navigation,
    examDetail,
    isCollected,
    setIsCollected,
    show,
    setShow,
    formatDate,
    toast,
    setToast,
    endExam,
    endEx,
    exam_id,
  } = useExam();
  const detail: ITeacherExamDetail | undefined = examDetail?.data?.data;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Ujian'}
          onPressIconLeft={() => {
            navigation.goBack();
            rdxDispatch(ExamDetailDestroy());
          }}
        />
      ),
    });
  }, []);
  const [popup, setPopup] = useState(false);

  const studentStatus = detail?.student_status?.mengumpulkan?.flatMap(
    (item: any) => item?.status,
  );

  const allStudentDone = studentStatus?.some((item: any) => item === 'selesai');
  const isExamDone = detail?.exam_schedule?.status === 'done';

  return (
    <View style={styles.body}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExamHeader
          title={`${detail?.exam_schedule?.class?.name || 'Kelas --'} • ${
            detail?.exam_schedule?.service?.name || 'Ulangan --'
          } • ${detail?.exam_schedule?.subject?.name || 'Subject --'}`}
          chapter={detail?.exam_schedule?.title || 'Ulangan --'}
        />
        <Monitoring
          action={() => {
            navigation.navigate('MonitoringExamGuruScreen', {
              subTitle: `${detail?.exam_schedule?.class?.name} • ${detail?.exam_schedule?.title}`,
              data: detail,
            });
          }}
        />
        <View style={styles.detailContainer}>
          <View style={styles.headerDetail}>
            <Text style={styles.titleDetail}>Detail Ujian</Text>
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={{
                width: 50,
                alignItems: 'flex-end',
              }}>
              {show ? <ArrowTop /> : <ArrowBottom />}
            </TouchableOpacity>
          </View>
          {show ? (
            <View>
              <View style={styles.item}>
                <Text style={styles.titleData}>Bab</Text>
                <Text style={[styles.titleData, {color: Colors.black}]}>
                  {detail?.exam_schedule?.chapters}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.titleData}>Tanggal/Jam Ujian</Text>
                <Text style={[styles.titleData, {color: Colors.black}]}>
                  {formatDate(
                    detail?.exam_schedule?.start_time,
                    detail?.exam_schedule?.end_time,
                    detail?.exam_schedule?.duration,
                  )}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.titleData}>Instruksi Pengerjaan</Text>
                <Text style={[styles.titleData, {color: Colors.black}]}>
                  {detail?.exam_schedule?.instructions}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.titleData}>Paket Soal</Text>
                <CardPackage data={detail?.exam_schedule?.package} />
              </View>
            </View>
          ) : null}
        </View>
        <View
          style={[styles.headerDetail, {paddingVertical: 0, paddingTop: 15}]}>
          <TouchableOpacity
            style={
              isCollected
                ? styles.filterStudentActive
                : styles.filterStudentNonActive
            }
            onPress={() => setIsCollected(true)}>
            <Text
              style={
                isCollected
                  ? styles.titleFilterActive
                  : styles.titleFilterNonActive
              }>
              Mengumpulkan {detail?.student_status?.mengumpulkan?.length || 0}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              !isCollected
                ? styles.filterStudentActive
                : styles.filterStudentNonActive
            }
            onPress={() => setIsCollected(false)}>
            <Text
              style={
                !isCollected
                  ? styles.titleFilterActive
                  : styles.titleFilterNonActive
              }>
              Belum Selesai {detail?.student_status?.belum_selesai?.length || 0}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 16,
          }}>
          {isCollected ? (
            <View>
              {(detail?.student_status?.mengumpulkan?.length || 0) > 0 ? (
                detail?.student_status?.mengumpulkan?.map(
                  (item: BelumSelesai, index: number) => {
                    return (
                      <CardStudent
                        key={index}
                        name={item?.fullname || '-'}
                        imgUrl={item?.avatar || '-'}
                        date={
                          _handlerConvertAllDate(item.time_finish, 9) || '-'
                        }
                        onCheck={() => {
                          const studentExam =
                            detail.exam_schedule?.student_exam?.find(
                              student => student.id === item.student_exam_id,
                            );

                          if (studentExam?.student_paper_id === '') {
                            return showErrorToast(
                              'Data ujian murid tidak ditemukan',
                            );
                          }
                          navigation.navigate('TeacherCheckExamScreen', {
                            question_package_id:
                              detail?.exam_schedule?.package?.id,
                            student_exam_id: item.student_exam_id,
                            student_name: item?.fullname,
                            exam_name: detail?.exam_schedule?.title,
                            exam_id: exam_id,
                            student_paper_id: studentExam?.student_paper_id,
                            mode: 'SCORING',
                          });
                        }}
                        check={item.status !== 'selesai'}
                        isChecked={item.status === 'selesai'}
                        point={item?.point2 || item?.point}
                      />
                    );
                  },
                )
              ) : (
                <View style={{marginTop: 50}}>
                  <EmptyDisplay
                    imageSvg={<Maskot11 width={100} height={100} />}
                    title={'Belum Ada Ujian Dikumpulkan'}
                    desc={
                      'Murid yang telah mengumpulkan ujian akan tampil di sini.'
                    }
                  />
                </View>
              )}
            </View>
          ) : (
            <View>
              {(detail?.student_status?.belum_selesai?.length || 0) > 0 ? (
                detail?.student_status?.belum_selesai?.map(
                  (item: any, index: number) => {
                    return (
                      <CardStudent
                        key={index}
                        name={item?.fullname || '-'}
                        imgUrl={item?.avatar || '-'}
                      />
                    );
                  },
                )
              ) : (
                <View style={{marginTop: 50}}>
                  <EmptyDisplay
                    imageSvg={<Maskot2 width={100} height={100} />}
                    title={'Belum Ada Ujian Dikumpulkan'}
                    desc={
                      'Murid yang telah mengumpulkan ujian akan tampil di sini.'
                    }
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.btmbtn}>
        <Button
          label={'Selesaikan Penilaian'}
          action={() => {
            setPopup(!popup);
          }}
          isDisabled={!allStudentDone || !isExamDone}
        />
      </View>

      <PopUp
        title={'Selesaikan Ujian'}
        desc={`Apakah Anda yakin untuk menyelesaikan ${
          detail?.exam_schedule?.title || 'Ujian '
        }? Pastikan semua Murid sudah selesai diperiksa. 
  ${detail?.exam_schedule?.submitted} dari ${
          detail?.exam_schedule?.total_students
        } telah dinilai`}
        titleCancel={'Batal'}
        titleConfirm={'Riwayatkan'}
        actionCancel={() => setPopup(!popup)}
        actionConfirm={() => {
          setPopup(!popup);
          endExam();
        }}
        show={popup}
      />
      <SnackbarResult
        visible={toast}
        label={
          endEx?.code === 100
            ? 'Ujian berhasil diselesaikan'
            : 'Ujian tidak berhasil diselesaikan'
        }
        type={endEx?.code === 100 ? 'SUCCESS' : 'FAILED'}
        onPressClose={() => setToast(false)}
      />
    </View>
  );
};

export {ExamDetailGuruScreen};

const styles = StyleSheet.create({
  detailContainer: {
    borderTopColor: Colors.dark.neutral10,
    borderBottomColor: Colors.dark.neutral10,
    borderTopWidth: 4,
    borderBottomWidth: 4,
  },
  body: {
    padding: 16,
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
  },
  headerDetail: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleDetail: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.black,
    fontFamily: Fonts.SemiBoldPoppins,
  },

  titleData: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.RegularPoppins,
  },
  item: {
    marginVertical: 8,
  },

  btmbtn: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    alignSelf: 'center',
  },
  filterStudentActive: {
    width: '50%',
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: 3,
    paddingBottom: 6,
  },
  filterStudentNonActive: {
    width: '50%',
    paddingBottom: 6,
  },

  titleFilterActive: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  titleFilterNonActive: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.SemiBoldPoppins,
  },
});
