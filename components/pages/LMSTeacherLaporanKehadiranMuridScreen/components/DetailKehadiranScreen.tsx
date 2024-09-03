/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import DownloadIcon from '@assets/svg/downloadBlue.svg';
import FilterButtonComponent from '../atoms/filterButtonComponent';
import {Button, SwipeUpModal} from '@components/atoms';
import FilterSemester from '../swipeUpContent/filterSemester';
import FilterSort from '../swipeUpContent/filterSort';
import EditIcon from '@assets/svg/ic_edit.svg';
import KonfirmasiCatatKehadiran from '../swipeUpContent/konfirmasiCatatKehadiran';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {fetchGetStudentOnlineAttendanceDetail} from '@redux';
import ProviderLMS from '@services/lms/provider';
import {styles} from '../style';
import dayjs from 'dayjs';
import {apiGetFile} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '@constants/functional';

const DetailKehadiranScreen = ({}: any) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailKehadiranScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'DetailKehadiranScreen'>>();
  const isFocus = useIsFocused();
  const dispatch: any = useDispatch();
  const [isOpenSwipeUp, setIsOpenSwipeUp] = useState<boolean>(false);
  const [swipeUpKonfirmasiVisible, setSwipeUpKonfirmasiVisible] =
    useState<boolean>(false);
  const [filterType, setFilterType] = useState<
    'semester' | 'sort' | 'konfirmasi'
  >('semester');
  const [attendanceData, setAttendanceData] = useState([]);
  const [semesterChoosed, setSemesterChoosed] = useState<
    'Genap' | 'Ganjil' | ''
  >('Genap');
  const [sortChoosed, setSortChoosed] = useState<
    'name' | 'most_attend' | 'most_absent'
  >('name');

  const handleFetchDataTatapMuka = async () => {
    try {
      const _resGetData = await ProviderLMS?.getOfflineClassAttendanceDetail({
        rombel_class_school_id: route?.params?.rombelClassSchoolId ?? 0,
        semester: semesterChoosed,
        sort: sortChoosed,
      });
      const ResData = _resGetData?.data || false;
      if (ResData?.code !== 100) {
        showErrorToast('Terjadi kesalahan pada sistem kami');
        return;
      }

      setAttendanceData(ResData?.data);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message ?? 'Terjadi kesalahan pada sistem kami',
      );
    }
  };

  const handleDownloadPresentionFormat = async () => {
    try {
      showWarningToast('Proses unduh file, harap menunggu', {
        visibilityTime: 3000,
      });
      const dateNow = dayjs().format('DDMMYYYY');
      const fileName = `LaporanKehadiranMurid${dateNow}${Math.floor(
        Math.random() * (999 - 100 + 1) + 100,
      )}.pdf`;
      const mime = 'application/pdf';

      const resFile = await apiGetFile({
        fileNameWithExt: fileName,
        mime: mime,
        url: URL_PATH.get_download_detail_kehadiran_report(
          route?.params?.rombelClassSchoolId,
          semesterChoosed,
        ),
      });

      showSuccessToast('Berhasil didownload', {visibilityTime: 3000});

      navigation.navigate('ReportViewScreen', {
        fileName: 'Laporan Kehadiran ' + route?.params?.className,
        filePath: resFile.filePath || '',
      });
    } catch (_) {
      showErrorToast('Gagal didownload');
    }
  };

  useEffect(() => {
    if (route?.params?.type === 'Kelas Online') {
      dispatch(
        fetchGetStudentOnlineAttendanceDetail(
          {
            rombel_class_school_id: route?.params?.rombelClassSchoolId ?? 0,
            semester: semesterChoosed,
            sortBy: sortChoosed,
          },
          (_res: any) => {
            if (_res?.data?.code !== 100) {
              showErrorToast(_res?.data?.message ?? 'Terjadi kesalahan');
              return;
            }
            setAttendanceData(_res?.data?.data);
          },
        ),
      );
    } else {
      handleFetchDataTatapMuka();
    }
  }, [isFocus]);

  useEffect(() => {
    if (route?.params?.type === 'Kelas Online') {
      dispatch(
        fetchGetStudentOnlineAttendanceDetail(
          {
            rombel_class_school_id: route?.params?.rombelClassSchoolId ?? 0,
            semester: semesterChoosed,
            sortBy: sortChoosed,
          },
          (_res: any) => {
            if (_res?.data?.code !== 100) {
              showErrorToast(_res?.data?.message ?? 'Terjadi kesalahan');
              return;
            }
            setAttendanceData(_res?.data?.data);
          },
        ),
      );
    } else {
      handleFetchDataTatapMuka();
    }
    setIsOpenSwipeUp(false);
  }, [semesterChoosed, sortChoosed]);

  return (
    <View style={styles.DKSContainerStyle}>
      <Header
        label={'Detail Kehadiran'}
        backgroundColor={Colors.white}
        labelContent={
          <Text allowFontScaling={false} style={styles.DKSSubTitleStyle}>
            {route?.params?.subTitle}
          </Text>
        }
        colorLabel={Colors.dark.neutral100}
        iconRight={<DownloadIcon />}
        onPressIconRight={() => {
          handleDownloadPresentionFormat();
        }}
      />
      <View style={styles.DKSFilterContainer}>
        <FilterButtonComponent
          onPress={() => {
            setIsOpenSwipeUp(true);
            setFilterType('semester');
          }}
          title={
            semesterChoosed === 'Genap'
              ? 'Semester Genap'
              : semesterChoosed === 'Ganjil'
              ? 'Semester Ganjil'
              : 'Pilih Semester'
          }
        />
        <FilterButtonComponent
          onPress={() => {
            setIsOpenSwipeUp(true);
            setFilterType('sort');
          }}
          title={
            sortChoosed === 'name'
              ? 'Nama'
              : sortChoosed === 'most_attend'
              ? 'Kehadiran Terbanyak'
              : 'Kehadiran Terendah'
          }
        />
      </View>
      <Text allowFontScaling={false} style={styles.DKSTotalStudentStyle}>{`${
        route?.params?.totalStudents ?? 0
      } Murid`}</Text>
      <ScrollView style={styles.mt10}>
        {attendanceData?.map(
          (ie: {
            absent_count?: number;
            attend_count?: number;
            attendance_type?: string;
            full_name?: string;
            id?: any;
            registration_number?: string;
            semester?: string;
            attend_precentage?: number;
            absent_precentage?: number;
            permit_percentage?: number;
            alpha_percentage?: number;
            sick_percentage?: number;
            permit_count?: number;
            sick_count?: number;
            alpha_count?: number;
          }) => {
            return (
              <Pressable
                key={Math.random()}
                onPress={() => {}}
                style={styles.DKSAttendanceCardStyle}>
                <View style={styles.flexRow}>
                  <View style={styles.flex1}>
                    <Text
                      allowFontScaling={false}
                      style={styles.DKSAttendanceNameStyle}>
                      {ie?.full_name}
                    </Text>
                  </View>
                  <View style={styles.DKSEditIconContainer}>
                    {route?.params.type === 'Kelas Online' ? null : (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('TanggalKehadiranScreen', {
                            className: route?.params?.className,
                            rombel_class_school_id:
                              route?.params?.rombelClassSchoolId,
                            subTitle: route?.params?.subTitle,
                            studentData: ie,
                          })
                        }
                        style={styles.DKSEditIconStyle}>
                        <EditIcon />
                      </Pressable>
                    )}
                  </View>
                </View>
                <Text allowFontScaling={false} style={styles.DKSNISStyle}>
                  {`NIS: ${ie?.registration_number}`}
                </Text>
                <View style={styles.flexRow}>
                  <View style={styles.flex1}>
                    <Text
                      allowFontScaling={false}
                      style={styles.DKSAttendanceTypeAttendStyle}>
                      Hadir
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.DKSAttendanceTypeAttendDescriptionStyle}>
                      {`${ie?.attend_count ?? 0} hari (${Math.round(
                        ie?.attend_precentage ?? 0,
                      )}%)`}
                    </Text>
                  </View>
                  {route?.params.type === 'Kelas Online' && (
                    <View style={styles.flex1}>
                      <Text
                        allowFontScaling={false}
                        style={styles.DKSAttendanceTypeAbsenceStyle}>
                        Tidak Hadir
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={styles.DKSAttendanceTypeAbsenceDescriptionStyle}>
                        {`${ie?.absent_count ?? 0} hari (${Math.round(
                          ie?.absent_precentage ?? 0,
                        )}%)`}
                      </Text>
                    </View>
                  )}
                  {route?.params?.type === 'Tatap Muka' && (
                    <View style={styles.DKSAbenceCategoryLabel}>
                      <View style={styles.flex1}>
                        <Text
                          allowFontScaling={false}
                          style={styles.DKSAttendanceTypePermitStyle}>
                          Izin
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={
                            styles.DKSAttendanceTypePermitDescriptionStyle
                          }>
                          {`${ie?.permit_count ?? 0} hari (${Math.round(
                            ie?.permit_percentage ?? 0,
                          )}%)`}
                        </Text>
                      </View>
                      <View style={styles.flex1}>
                        <Text
                          allowFontScaling={false}
                          style={styles.DKSAttendanceTypeSickStyle}>
                          Sakit
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.DKSAttendanceTypeSickDescriptionStyle}>
                          {`${ie?.sick_count ?? 0} hari (${Math.round(
                            ie?.sick_percentage ?? 0,
                          )}%)`}
                        </Text>
                      </View>
                      <View style={styles.flex1}>
                        <Text
                          allowFontScaling={false}
                          style={styles.DKSAttendanceTypeAlphaStyle}>
                          Alpha
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.DKSAttendanceTypeAlphaDescriptionStyle}>
                          {`${ie?.alpha_count ?? 0} hari (${Math.round(
                            ie?.alpha_percentage ?? 0,
                          )}%)`}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          },
        )}
      </ScrollView>
      {route?.params.type !== 'Kelas Online' && (
        <View style={styles.w100}>
          <Button
            label="Catat Kehadiran"
            action={() => {
              setSwipeUpKonfirmasiVisible(true);
              setFilterType('konfirmasi');
            }}
          />
        </View>
      )}
      <SwipeUpModal
        handleShowPopUp={() => {
          setIsOpenSwipeUp(false);
        }}
        isOpenPopUp={isOpenSwipeUp}
        children={
          filterType === 'semester' ? (
            <FilterSemester
              filterData={semesterChoosed}
              handleReset={() => {
                setSemesterChoosed('Genap');
              }}
              handleSubmit={(_semester: 'Ganjil' | 'Genap' | '') => {
                setSemesterChoosed(_semester);
              }}
            />
          ) : filterType === 'sort' ? (
            <FilterSort
              filterData={sortChoosed}
              handleSubmit={(_sort: 'name' | 'most_attend' | 'most_absent') => {
                setSortChoosed(_sort);
              }}
            />
          ) : (
            <View />
          )
        }
      />

      <Modal
        visible={swipeUpKonfirmasiVisible}
        transparent={true}
        animationType="fade"
        children={
          <KonfirmasiCatatKehadiran
            handleClose={() => setSwipeUpKonfirmasiVisible(false)}
            className={route?.params?.className ?? ''}
            handleSubmit={() => {
              setSwipeUpKonfirmasiVisible(false);
              navigation.navigate('LembarKehadiranScreen', {
                rombel_class_school_id: route?.params?.rombelClassSchoolId,
                subTitle: route?.params?.subTitle,
              });
            }}
          />
        }
      />
    </View>
  );
};

export default DetailKehadiranScreen;
