/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from '../../style';
import ArrowIcon2 from '@assets/svg/ic_arrow_right_blue.svg';
import ArrowIcon3 from '@assets/svg/ic_arrow_right_grey.svg';
import RobotIconEmpty from '@assets/svg/robot_empty_search_base.svg';
import {PieChart, SwipeUpModal} from '@components/atoms';
import Colors from '@constants/colors';
import FilterDate from '../../swipeUpContent/filterDate';
import FilterClass from '../../swipeUpContent/filterClass';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import FilterButtonComponent from '../../atoms/filterButtonComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {
  fetchGetRombelWithStudentRequests,
  fetchGetStudentsOnlineAttendanceSummary,
  fetchGetTeacherClassesInfo,
} from '@redux';
import dayjs from 'dayjs';
import {SafeAreaView} from 'react-native-safe-area-context';

type _IClass = {id: number; name: string; number_of_students: number};

export type _IResponseFetchGetStudentsOnlineAttendanceSummary = {
  data: {
    code: number;
    message: string;
    data: {
      date: string;
      student_total: number;
      attend_count: number;
      absent_count: number;
      attend_percentage: number;
      absent_percentage: number;
    };
    time: string;
    log_id: string;
  };
};

export type _ITeacherClassesData = {
  id: number;
  name: string;
  number_of_students: number;
};

export type _IFetchGetTeacherClassesInfo = {
  data: {
    code: string;
    message: string;
    data: any[];
    time: 'string';
    log_id: 'string';
  };
};

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

const TabKelasOnline = () => {
  const isEmpty = false;
  const isFocus = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LembarKehadiranScreen'>>();
  const dispatch: any = useDispatch();
  const [swipeUpVisible, setSwipeUpVisible] = useState(false);
  const [attendCount, setAttendCount] = useState<number>(0);
  const [absentCount, setAbsentCount] = useState<number>(0);
  const [attendCountPercentage, setAttendCountPercentage] = useState<number>(0);
  const [absentCountPercentage, setAbsentCountPercentage] = useState<number>(0);
  const [studentTotalCount, setStudentTotalCount] = useState<number>(0);
  const [reqAbsentCount, setReqAbsentCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teacherClassesData, setTeacherClassesData] = useState<any[]>([]);
  const [valueDatePicker, setValueDatePicker] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });
  const [choosedClass, setChoosedClass] = useState<_IClass>({
    id: 0,
    name: '',
    number_of_students: 0,
  });
  const [filterType, setFilterType] = useState<
    'date' | 'class' | 'semester' | 'urutkan'
  >('date');

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setValueDatePicker({
        date: dayjs().get('date'),
        month: dayjs().get('month') + 1,
        year: dayjs().get('year'),
      });
      setChoosedClass({
        id: 0,
        name: '',
        number_of_students: 0,
      });
      dispatch(
        fetchGetStudentsOnlineAttendanceSummary(
          {
            rombel_class_school_id: '',
            date: `${valueDatePicker.year}-${valueDatePicker.month}-${valueDatePicker.date}`,
          },
          (res: _IResponseFetchGetStudentsOnlineAttendanceSummary) => {
            setAttendCount(res?.data.data.attend_count);
            setAbsentCount(res?.data.data.absent_count);
            setAttendCountPercentage(
              res?.data?.data.attend_percentage
                ? Math.round(res?.data?.data.attend_percentage)
                : 0,
            );
            setAbsentCountPercentage(
              res?.data?.data.absent_percentage
                ? Math.round(res?.data?.data.absent_percentage)
                : 0,
            );
            setStudentTotalCount(res?.data.data.student_total);
          },
        ),
      );

      dispatch(
        fetchGetTeacherClassesInfo((res: _IFetchGetTeacherClassesInfo) => {
          setTeacherClassesData(res?.data.data);
        }),
      );

      dispatch(
        fetchGetRombelWithStudentRequests(async (res: any) => {
          let requestArr: number = 0;
          await res?.data?.data?.map((ie: any) => {
            ie?.rombel_class_school?.map((ix: any) => {
              requestArr = requestArr + ix?.absent_request_count;
            });
          });
          setReqAbsentCount(requestArr);
        }),
      );

      setIsLoading(false);
    }, [isFocus]),
  );

  const handleSubmitFilterDate = (dateRes: IDatePicker) => {
    dispatch(
      fetchGetStudentsOnlineAttendanceSummary(
        {
          rombel_class_school_id: '',
          date: `${dateRes.year}-${dateRes.month}-${dateRes.date}`,
        },
        (res: _IResponseFetchGetStudentsOnlineAttendanceSummary) => {
          setAttendCount(res?.data.data.attend_count);
          setAbsentCount(res?.data.data.absent_count);
          setAttendCountPercentage(
            res?.data?.data.attend_percentage
              ? Math.round(res?.data?.data.attend_percentage)
              : 0,
          );
          setAbsentCountPercentage(
            res?.data?.data.absent_percentage
              ? Math.round(res?.data?.data?.absent_percentage)
              : 0,
          );
          setStudentTotalCount(res?.data.data.student_total);
        },
      ),
    );
    setValueDatePicker(dateRes);
    setSwipeUpVisible(false);
    setIsLoading(false);
  };

  const handleSubmitFilterClass = (classRes: _IClass) => {
    dispatch(
      fetchGetStudentsOnlineAttendanceSummary(
        {
          rombel_class_school_id: classRes?.id?.toString(),
          date: `${valueDatePicker.year}-${valueDatePicker.month}-${valueDatePicker.date}`,
        },
        (res: _IResponseFetchGetStudentsOnlineAttendanceSummary) => {
          setAttendCount(res?.data.data.attend_count);
          setAbsentCount(res?.data.data.absent_count);
          setAttendCountPercentage(
            res?.data?.data.attend_percentage
              ? Math.round(res?.data?.data.attend_percentage)
              : 0,
          );
          setAbsentCountPercentage(
            res?.data?.data.absent_percentage
              ? Math.round(res?.data?.data?.absent_percentage)
              : 0,
          );
          setStudentTotalCount(res?.data.data.student_total);
        },
      ),
    );
    setChoosedClass(classRes);
    setSwipeUpVisible(false);
    setIsLoading(false);
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.primary?.base}
          style={styles.mt20}
        />
      ) : (
        <ScrollView
          style={styles.tabKOContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.tabKoHeaderPrimary}>
            <Text allowFontScaling={false} style={styles.tabKOHeaderTextStyle}>
              Ringkasan Kehadiran
            </Text>
            <View style={styles.tabKOFilterContainer}>
              <FilterButtonComponent
                title={`${dayjs(
                  `${valueDatePicker?.year}-${valueDatePicker?.month}-${valueDatePicker?.date}`,
                )
                  .locale('id')
                  .format('DD MMM YYYY')}`}
                onPress={() => {
                  setSwipeUpVisible(true);
                  setFilterType('date');
                }}
              />
              <FilterButtonComponent
                title={
                  choosedClass?.id === 0 ? 'Semua Kelas' : choosedClass?.name
                }
                onPress={() => {
                  setSwipeUpVisible(true);
                  setFilterType('class');
                }}
              />
            </View>
            {isEmpty && (
              <View style={styles.TKOEmptyAttendanceDataContainerStyle}>
                <RobotIconEmpty style={styles.mr50} />
                <Text
                  allowFontScaling={false}
                  style={styles.tabKORingkasanEmptyText1}>
                  Kehadiran Tidak Ditemukan
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.tabKORingkasanEmptyText2}>
                  Cari tanggal atau kelas lain
                </Text>
              </View>
            )}
            {!isEmpty && (
              <View style={styles.TKOAttendanceDataContainerStyle}>
                <View style={styles.TKOPieChartContainerStyle}>
                  <PieChart
                    widthAndHeight={110}
                    series={[
                      attendCountPercentage,
                      0.5, //ini ada separator putih
                      absentCountPercentage,
                      0.5,
                    ]}
                    sliceColor={[
                      Colors.success.base,
                      'white', //ini warna separator
                      Colors.danger.base,
                      'white',
                    ]}
                  />
                  <View style={styles.TKOPieChartDescriptionContainerStyle}>
                    <Text
                      allowFontScaling={
                        false
                      }>{`${studentTotalCount} Murid`}</Text>
                  </View>
                </View>

                <View style={styles.pieDescriptionContainer}>
                  <View style={styles.pieDescriptionInnerContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.pieDescriptionTitleText}>
                      {`${attendCount} Murid (${attendCountPercentage}%)`}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.pieDescriptionSubTitleTextGreen}>
                      {'Hadir'}
                    </Text>
                  </View>
                  <View style={styles.separatorContainerStyle}>
                    <View style={styles.TKOSeparatorStyle} />
                  </View>
                  <View style={styles.pieDescriptionInnerContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.pieDescriptionTitleText}>
                      {`${absentCount} Murid (${absentCountPercentage}%)`}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.pieDescriptionSubTitleTextRed}>
                      {'Tidak Hadir'}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.tabKOPengajuanButtonContainer}>
            <Pressable
              onPress={() =>
                navigation.navigate('PengajuanKetidakHadiranScreen', {
                  type: 'Kelas Online',
                })
              }
              style={styles.tabKOPengajuanButton}>
              <View style={styles.tabKOPengajuanButtonLeftContent}>
                <Text
                  allowFontScaling={false}
                  style={styles.tabKOPengajuanButtonLeftTextTop}>
                  Pengajuan Ketidakhadiran
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.tabKOPengajuanButtonLeftTextBottom}>
                  {'Konfirmasi pengajuan murid yang\nizin atau sakit'}
                </Text>
              </View>
              <View style={styles.tabKOPengajuanButtonRightContent}>
                <View style={styles.tabKOPengajuanButtonRightInnerContainer}>
                  <View style={styles.tabKOPengajuanButtonRightTextContainer}>
                    <Text
                      allowFontScaling={false}
                      style={styles.tabKONumberText}>
                      {reqAbsentCount}
                    </Text>
                  </View>
                  <ArrowIcon2 />
                </View>
              </View>
            </Pressable>
          </View>
          <View style={styles.tabKOLaporanKehadiranKelasContainer}>
            <Text allowFontScaling={false} style={styles.tabKOHeaderTextStyle}>
              Laporan Kehadiran Kelas
            </Text>
            {teacherClassesData?.map((ie: _ITeacherClassesData) => {
              return (
                <Pressable
                  key={`${ie.id}${Math.random()}`}
                  onPress={() =>
                    navigation.navigate('DetailKehadiranScreen', {
                      subTitle: `${ie?.name} • Kelas Online`,
                      type: 'Kelas Online',
                      rombelClassSchoolId: ie?.id,
                      totalStudents: ie?.number_of_students,
                    })
                  }
                  style={styles.tabKOPengajuanButton}>
                  <View style={styles.tabKOLaporanButtonLeftContent}>
                    <Text
                      allowFontScaling={false}
                      style={styles.tabKOPengajuanButtonLeftTextTop}>
                      {ie?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={
                        styles.tabKOLaporanTotalMurid
                      }>{`${ie.number_of_students} Murid`}</Text>
                  </View>
                  <View style={styles.tabKOPengajuanButtonRightContent}>
                    <View
                      style={styles.tabKOPengajuanButtonRightInnerContainer}>
                      <ArrowIcon3 />
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
          <SwipeUpModal
            isOpenPopUp={swipeUpVisible}
            children={
              filterType === 'class' ? (
                <FilterClass
                  data={teacherClassesData}
                  handleSubmit={(classRes: _IClass) => {
                    handleSubmitFilterClass(classRes);
                  }}
                  dataChoosed={choosedClass}
                  handleReset={() => {
                    handleSubmitFilterClass({
                      id: 0,
                      name: '',
                      number_of_students: 0,
                    });
                  }}
                />
              ) : filterType === 'date' ? (
                <FilterDate
                  handleClose={() => setSwipeUpVisible(false)}
                  date={valueDatePicker}
                  handleSubmit={(dateRes: IDatePicker) => {
                    handleSubmitFilterDate(dateRes);
                  }}
                />
              ) : (
                <View />
              )
            }
            handleShowPopUp={() => {
              setSwipeUpVisible(false);
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TabKelasOnline;
