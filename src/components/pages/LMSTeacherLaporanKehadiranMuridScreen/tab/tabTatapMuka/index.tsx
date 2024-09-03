/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {styles} from '../../style';
import ArrowIcon3 from '@assets/svg/ic_arrow_right_grey.svg';
import RobotIconEmpty from '@assets/svg/robot_empty_search_base.svg';
import {PieChart, SwipeUpModal} from '@components/atoms';
import Colors from '@constants/colors';
import FilterDate from '../../swipeUpContent/filterDate';
import FilterClass from '../../swipeUpContent/filterClass';
import FilterSemester from '../../swipeUpContent/filterSemester';
import FilterSort from '../../swipeUpContent/filterSort';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import FilterButtonComponent from '../../atoms/filterButtonComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {
  fetchGetStudentsOfflinetendanceSummary,
  fetchGetTeacherClassesInfo,
} from '@redux';
import dayjs from 'dayjs';

type _IClass = {id: number; name: string; number_of_students: number};

export type _IResponseFetchGetStudentsOfflineAttendanceSummary = {
  data: {
    code: number;
    message: string;
    data: {
      date: string;
      student_total: number;
      attend_count: number;
      permit_count: number;
      sick_count: number;
      alpha_count: number;
      attend_precentage: number;
      permit_precentage: number;
      sick_precentage: number;
      alpha_precentage: number;
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

const TabTatapMuka = () => {
  const isEmpty = false;
  const dispatch: any = useDispatch();
  const isFocus = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LembarKehadiranScreen'>>();
  const [swipeUpVisible, setSwipeUpVisible] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [attendCount, setAttendCount] = useState<number>(0);
  const [permitCount, setPermitCount] = useState<number>(0);
  const [alphaCount, setAlphaCount] = useState<number>(0);
  const [sickCount, setSickCount] = useState<number>(0);
  const [attendPercentage, setAttendPercentage] = useState<number>(0);
  const [permitPercentage, setPermitPercentage] = useState<number>(0);
  const [alphaPercentage, setAlphaPercentage] = useState<number>(0);
  const [sickPercentage, setSickPercentage] = useState<number>(0);
  const [teacherClassesData, setTeacherClassesData] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<
    'date' | 'class' | 'semester' | 'urutkan'
  >('date');
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

  useFocusEffect(
    useCallback(() => {
      dispatch(
        fetchGetStudentsOfflinetendanceSummary(
          {
            rombel_class_school_id: null,
            // date: '2023-05-16',
            date: `${valueDatePicker.year}-${valueDatePicker.month}-${valueDatePicker.date}`,
          },
          (res: _IResponseFetchGetStudentsOfflineAttendanceSummary) => {
            setAttendCount(res?.data.data.attend_count ?? 0);
            setPermitCount(res?.data.data.permit_count ?? 0);
            setAlphaCount(res?.data.data.alpha_count ?? 0);
            setSickCount(res?.data.data.sick_count ?? 0);
            setAttendPercentage(
              res?.data.data.attend_precentage
                ? Math.round(res?.data.data.attend_precentage)
                : 0,
            );
            setPermitPercentage(
              res?.data.data.permit_precentage
                ? Math.round(res?.data.data.permit_precentage)
                : 0,
            );
            setAlphaPercentage(
              res?.data.data.alpha_precentage
                ? Math.round(res?.data.data.alpha_precentage)
                : 0,
            );
            setSickPercentage(
              res?.data.data.sick_precentage
                ? Math.round(res?.data.data.sick_precentage)
                : 0,
            );
            setTotalCount(res?.data.data.student_total ?? 0);
          },
        ),
      );

      dispatch(
        fetchGetTeacherClassesInfo((res: _IFetchGetTeacherClassesInfo) => {
          setTeacherClassesData(res?.data.data);
        }),
      );
    }, [isFocus]),
  );

  const handleSubmitFilterDate = (dateRes: IDatePicker) => {
    dispatch(
      fetchGetStudentsOfflinetendanceSummary(
        {
          rombel_class_school_id: null,
          // date: 'YYYY-MM-DD',
          date: `${dateRes.year}-${dateRes.month}-${dateRes.date}`,
        },
        (res: _IResponseFetchGetStudentsOfflineAttendanceSummary) => {
          setAttendCount(res?.data.data.attend_count ?? 0);
          setPermitCount(res?.data.data.permit_count ?? 0);
          setAlphaCount(res?.data.data.alpha_count ?? 0);
          setSickCount(res?.data.data.sick_count ?? 0);
          setAttendPercentage(
            res?.data.data.attend_precentage
              ? Math.round(res?.data.data.attend_precentage)
              : 0,
          );
          setPermitPercentage(
            res?.data.data.permit_precentage
              ? Math.round(res?.data.data.permit_precentage)
              : 0,
          );
          setAlphaPercentage(
            res?.data.data.alpha_precentage
              ? Math.round(res?.data.data.alpha_precentage)
              : 0,
          );
          setSickPercentage(
            res?.data.data.sick_precentage
              ? Math.round(res?.data.data.sick_precentage)
              : 0,
          );
          setTotalCount(res?.data.data.student_total ?? 0);
        },
      ),
    );
    setValueDatePicker(dateRes);
    setSwipeUpVisible(false);
  };

  const handleSubmitFilterClass = (classRes: _IClass) => {
    dispatch(
      fetchGetStudentsOfflinetendanceSummary(
        {
          rombel_class_school_id: classRes?.id,
          // date: 'YYYY-MM-DD',
          date: `${valueDatePicker.year}-${valueDatePicker.month}-${valueDatePicker.date}`,
        },
        (res: _IResponseFetchGetStudentsOfflineAttendanceSummary) => {
          setAttendCount(res?.data.data.attend_count ?? 0);
          setPermitCount(res?.data.data.permit_count ?? 0);
          setAlphaCount(res?.data.data.alpha_count ?? 0);
          setSickCount(res?.data.data.sick_count ?? 0);
          setAttendPercentage(
            res?.data.data.attend_precentage
              ? Math.round(res?.data.data.attend_precentage)
              : 0,
          );
          setPermitPercentage(
            res?.data.data.permit_precentage
              ? Math.round(res?.data.data.permit_precentage)
              : 0,
          );
          setAlphaPercentage(
            res?.data.data.alpha_precentage
              ? Math.round(res?.data.data.alpha_precentage)
              : 0,
          );
          setSickPercentage(
            res?.data.data.sick_precentage
              ? Math.round(res?.data.data.sick_precentage)
              : 0,
          );
          setTotalCount(res?.data.data.student_total ?? 0);
        },
      ),
    );
    setChoosedClass(classRes);
    setSwipeUpVisible(false);
  };

  return (
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
            title={choosedClass?.id === 0 ? 'Semua Kelas' : choosedClass?.name}
            onPress={() => {
              setSwipeUpVisible(true);
              setFilterType('class');
            }}
          />
        </View>
        {isEmpty && (
          <View style={styles.TTMEmptyAttendanceContainerStyle}>
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
          <View style={styles.TTMAttendanceDataContainerStyle}>
            <View style={styles.TTMPieChartStyle}>
              <PieChart
                widthAndHeight={110}
                series={[
                  alphaPercentage, //alpha
                  0.5, //ini ada separator putih
                  sickPercentage, //sakit
                  0.5,
                  permitPercentage, //izin
                  0.5,
                  attendPercentage, //hadir'
                  0.5,
                ]}
                sliceColor={[
                  Colors.dark.neutral80,
                  'white', //ini warna separator
                  Colors.danger.base,
                  'white',
                  Colors.orange.base,
                  'white',
                  Colors.success.base,
                  'white',
                ]}
              />
              <View style={styles.TTMPieChartDescriptionStyle}>
                <Text allowFontScaling={false}>{`${totalCount} Murid`}</Text>
              </View>
            </View>
            <View style={styles.pieDescriptionContainer}>
              <View style={styles.pieDescriptionInnerContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionTitleText}>
                  {`${attendCount} Murid${'\n'}(${attendPercentage}%)`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionSubTitleTextGreen}>
                  {'Hadir'}
                </Text>
              </View>
              <View style={styles.separator1}>
                <View style={styles.TTMSeparatorStyle} />
              </View>
              <View style={styles.pieDescriptionInnerContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionTitleText}>
                  {`${permitCount} Murid${'\n'}(${permitPercentage}%)`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionSubTitleTextYellow}>
                  {'Izin'}
                </Text>
              </View>
              <View style={styles.separator2}>
                <View style={styles.TTMSeparatorStyle} />
              </View>
              <View style={styles.pieDescriptionInnerContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionTitleText}>
                  {`${sickCount} Murid${'\n'}(${sickPercentage}%)`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionSubTitleTextRed}>
                  {'Sakit'}
                </Text>
              </View>
              <View style={styles.separator1}>
                <View style={styles.TTMSeparatorStyle} />
              </View>
              <View style={styles.pieDescriptionInnerContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionTitleText}>
                  {`${alphaCount} Murid${'\n'}(${alphaPercentage}%)`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={styles.pieDescriptionSubTitleTextGrey}>
                  {'Alpha'}
                </Text>
              </View>
            </View>
          </View>
        )}
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
                  subTitle: `${ie?.name} • tatap Muka`,
                  className: ie?.name,
                  type: 'Tatap Muka',
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
                <View style={styles.tabKOPengajuanButtonRightInnerContainer}>
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
          ) : filterType === 'semester' ? (
            <FilterSemester
              filterData={''}
              handleReset={() => {}}
              handleSubmit={() => {}}
            />
          ) : filterType === 'urutkan' ? (
            <FilterSort filterData={''} handleSubmit={() => {}} />
          ) : (
            <View />
          )
        }
        handleShowPopUp={() => {
          setSwipeUpVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default TabTatapMuka;
