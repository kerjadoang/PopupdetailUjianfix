/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import WarningIcon from '@assets/svg/warning.svg';
import {Button, SwipeUpModal} from '@components/atoms';
import FilterButtonComponent from '../atoms/filterButtonComponent';
import CheckIconComponent from '../atoms/checkIconComponent';
import UnggahFilePresensi from '../swipeUpContent/unggahFilePresensi';
import ProviderLMS from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {styles} from '../style';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import DocumentPicker from 'react-native-document-picker';
import FilterDate from '../swipeUpContent/filterDate';
import {useUploadFile} from '@services/media';
import {apiGetFile} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

const LembarKehadiranScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'LembarKehadiranScreen'>>();
  const isFocus = useIsFocused();
  const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
  const [canNext, setCanNext] = useState<boolean>(false);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);
  const [attendanceData, setAttendancedata] = useState<any>([]);
  const [progressUpload, setProgressUpload] = useState<string>('0%');
  const {mutate: uploadFile, data: dataUploadFile} = useUploadFile();
  const [choosedDate, setChoosedDate] = useState<{
    date: any;
    month: any;
    year: any;
  }>({
    date: dayjs().date(),
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });
  const [uploadFileData, setUploadFileData] = useState<{
    path_url: string;
    file_name: string;
    type: string;
  }>({
    path_url: '',
    type: '',
    file_name: '',
  });

  const handleFetchGetOneClassAttendance = async () => {
    try {
      const _fetchData = await ProviderLMS?.getOneClassAttendance({
        rombel_class_school_id: route?.params?.rombel_class_school_id,
        date: `${dayjs(
          `${choosedDate?.year}-${choosedDate?.month}-${choosedDate?.date}`,
        )
          .locale('id')
          .format('YYYY-MM-DD')}`,
      });

      const ResData = _fetchData?.data || false;
      setAttendancedata(ResData?.data);
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ||
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  const handleChooseAttendance = async (
    _attendanceData?: {
      id?: any;
      full_name?: string;
      registration_number?: string;
      attendance_type?: string;
      status?: string;
      date?: string;
    },
    atdType?: string,
  ) => {
    const newArray = attendanceData?.map((obj: any) => {
      if (obj?.id === _attendanceData?.id) {
        obj.status = atdType ?? '';
      }
      return obj;
    });
    setCanNext(true);
    setAttendancedata(newArray);
  };

  const handleSubmitAttendance = async () => {
    let _resDataFinal: any = [];
    await attendanceData?.map((ie: any) => {
      _resDataFinal?.push({
        user_id: ie?.id,
        attendance: ie?.status,
      });
    });
    try {
      const _resInsertData = await ProviderLMS?.insertOfflineAttendance({
        rombel_class_school_id: route?.params?.rombel_class_school_id,
        date: dayjs().format('YYYY-MM-DD'),
        students: _resDataFinal,
      });
      const ResInsertData = _resInsertData?.data || false;
      if (ResInsertData?.code === 100) {
        Toast?.show({
          type: 'success',
          text1: 'Kehadiran berhasil dicatat',
        });
      } else {
        Toast?.show({
          type: 'error',
          text1: ResInsertData?.message || 'Terjadi kesalahan pada sistem kami',
        });
      }
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ||
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  const handleDownloadCsv = async () => {
    try {
      const currentDate = dayjs().format('YYYY-MM-DD');
      const fileName = `file_presensi${currentDate}.csv`;
      await apiGetFile({
        mime: 'text/csv',
        fileNameWithExt: fileName,
        url: URL_PATH.get_download_attendance_format(
          route?.params?.rombel_class_school_id,
        ),
      });
      Toast.show({
        type: 'success',
        text1: `${fileName} berhasil diunduh`,
      });

      setIsOpenPopUp(false);
    } catch (error: any) {
      setIsOpenPopUp(false);
      Toast.show({
        type: 'error',
        text1: error?.message ?? 'Terjadi kesalahan pada saat mengunduh file',
      });
    }
  };

  const onUploadFile = async () => {
    try {
      const fileResult = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setUploadFileData({
        path_url: fileResult.uri ?? '',
        file_name: fileResult.name ?? '',
        type: fileResult.type ?? '',
      });
    } catch (e) {}
  };

  const handleSubmitUpload = async () => {
    try {
      const _res = await ProviderLMS?.insertOfflineAttendanceCsv({
        date: `${dayjs(
          `${choosedDate?.year}-${choosedDate?.month}-${choosedDate?.date}`,
        ).format('YYYY-MM-DD')}`, //2022-12-30
        rombel_class_school_id: route?.params?.rombel_class_school_id,
        csv_link: dataUploadFile?.data?.path_url,
      });
      const ResData = _res?.data ?? false;
      const _resArr: {
        id?: any;
        full_name?: string;
        registration_number?: string;
        attendance_type?: string;
        status?: string;
        date?: any;
      }[] = [];
      ResData?.data?.map(
        async (
          _csvData: {
            RegistrationNumber: string;
            Murid: string;
            Status: string;
          },
          index: number,
        ) => {
          await _resArr.push({
            id: index,
            attendance_type: 'tatap muka',
            date: dayjs(
              dayjs(
                `${choosedDate?.year}-${choosedDate?.month}-${choosedDate?.date}`,
              ),
            )
              .utc()
              .locale('id')
              .format(),
            full_name: _csvData?.Murid,
            registration_number: _csvData?.RegistrationNumber,
            status: _csvData?.Status,
          });
          setAttendancedata(_resArr);
          setCanNext(true);
        },
      );
      setIsOpenPopUp(false);
      Toast?.show({
        type: 'success',
        text1: 'Berhasil mengupload',
      });
    } catch (error: any) {
      setIsOpenPopUp(false);
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ?? 'Terjadi kesalahan pada sistem',
      });
    }
  };

  const handleSubmitDatePicker = (_resDate: {
    date: any;
    month: any;
    year: any;
  }) => {
    setCanNext(false);
    setChoosedDate(_resDate);
    setIsOpenDatePicker(false);
  };

  useEffect(() => {
    handleFetchGetOneClassAttendance();
  }, [isFocus]);

  useEffect(() => {
    handleFetchGetOneClassAttendance();
  }, [choosedDate]);

  useEffect(() => {
    if (
      uploadFileData?.file_name !== '' &&
      uploadFileData?.path_url !== '' &&
      uploadFileData?.type !== ''
    ) {
      const formData: FormData = new FormData();
      formData.append('attachment', {
        name: uploadFileData?.file_name,
        type: uploadFileData?.type,
        uri:
          Platform.OS === 'android'
            ? uploadFileData?.path_url
            : uploadFileData?.path_url?.replace('file://', ''),
      });
      formData.append('type', 'kp_regular');
      formData.append('sub_type', 'learn');

      let i = 0;
      const intervalId = setInterval(() => {
        if (i >= 100) {
          clearInterval(intervalId);
        } else {
          setProgressUpload(`${i + 4}%`);
          i++;
        }
      }, 1000);

      uploadFile(formData)
        .then(() => {
          clearInterval(intervalId);
          setProgressUpload('99%');
          setTimeout(() => {
            setProgressUpload('100%');
          }, 100);
        })
        .catch(() => {
          setUploadFileData({
            file_name: '',
            path_url: '',
            type: '',
          });
        })
        .finally(() => {
          setProgressUpload('0%');
          clearInterval(intervalId);
        });
    }
  }, [uploadFileData]);

  const RenderPresentionCard = ({
    _cardData,
  }: {
    _cardData: {
      id?: any;
      full_name?: string;
      registration_number?: string;
      attendance_type?: string;
      status?: string;
      date?: string;
    };
  }) => {
    return (
      <View style={styles?.LKSAttendanceCardContainer}>
        <Text allowFontScaling={false} style={styles?.LKSAttendanceCardName}>
          {_cardData?.full_name}
        </Text>
        <Text allowFontScaling={false} style={styles.LKSAttendanceCardNIS}>
          NIS: {_cardData?.registration_number}
        </Text>
        <View style={styles?.LKSAttendanceCheckBarContainer}>
          <TouchableOpacity
            onPress={() => {
              handleChooseAttendance(_cardData, 'hadir');
            }}
            style={styles?.LKSAttendanceStatusContainer}>
            <Text
              allowFontScaling={false}
              style={styles?.LKSAttendanceStatusText}>
              Hadir
            </Text>
            <CheckIconComponent
              isChecked={_cardData?.status === 'hadir' ? true : false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChooseAttendance(_cardData, 'izin');
            }}
            style={styles?.LKSAttendanceStatusContainer}>
            <Text
              allowFontScaling={false}
              style={styles?.LKSAttendanceStatusText}>
              Izin
            </Text>
            <CheckIconComponent
              isChecked={_cardData?.status === 'izin' ? true : false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChooseAttendance(_cardData, 'sakit');
            }}
            style={styles?.LKSAttendanceStatusContainer}>
            <Text
              allowFontScaling={false}
              style={styles?.LKSAttendanceStatusText}>
              Sakit
            </Text>
            <CheckIconComponent
              isChecked={_cardData?.status === 'sakit' ? true : false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChooseAttendance(_cardData, 'alpha');
            }}
            style={styles?.LKSAttendanceStatusContainer}>
            <Text
              allowFontScaling={false}
              style={styles?.LKSAttendanceStatusText}>
              Alpha
            </Text>
            <CheckIconComponent
              isChecked={_cardData?.status === 'alpha' ? true : false}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.LKSContainer}>
      <Header
        label={'Lembar Kehadiran'}
        backgroundColor={Colors.white}
        labelContent={
          <Text allowFontScaling={false} style={styles?.LKSHeaderTitle}>
            {route?.params?.subTitle}
          </Text>
        }
        colorLabel={Colors.dark.neutral100}
      />
      <View style={styles?.LKSWarningContainer}>
        <View style={styles.LKSWarningInnerContainer}>
          <View style={styles.LKSWarningIconContainer}>
            <WarningIcon />
          </View>
          <View style={styles.LKSWarningDescriptionContainer}>
            <Text allowFontScaling={false} style={styles?.LKSWarnigDescription}>
              Isi semua kehadiran untuk menyimpan.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles?.LKSWarningUploadButtonContainer}>
        <Button
          label="Unggah File Presensi"
          rightIcon={true}
          background="white"
          color={Colors.primary.base}
          borderWidth={1}
          borderColor={Colors.primary.base}
          action={() => {
            setIsOpenPopUp(true);
          }}
        />
      </View>
      <View style={styles?.LKSFilterButtonContainer}>
        <FilterButtonComponent
          title={`${dayjs(
            `${choosedDate?.year}-${choosedDate?.month}-${choosedDate?.date}`,
          )
            .locale('id')
            .format('DD MMMM YYYY')}`}
          onPress={() => {
            setIsOpenDatePicker(true);
          }}
        />
      </View>
      <ScrollView style={styles?.LKSScrollView}>
        {attendanceData?.map(
          (res: {
            id?: any;
            full_name?: string;
            registration_number?: string;
            attendance_type?: string;
            status?: string;
            date?: string;
          }) => {
            return <RenderPresentionCard key={Math.random()} _cardData={res} />;
          },
        )}
      </ScrollView>
      <View style={styles?.LKSSaveButtonContainer}>
        <Button
          action={() => handleSubmitAttendance()}
          isDisabled={!canNext}
          label="Simpan Kehadiran"
        />
      </View>
      <SwipeUpModal
        isOpenPopUp={isOpenPopUp}
        handleShowPopUp={() => {
          setIsOpenPopUp(false);
        }}
        children={
          <UnggahFilePresensi
            handleDownload={() => handleDownloadCsv()}
            handleUpload={() => {
              onUploadFile();
            }}
            handleRemoveData={() => {
              setUploadFileData({
                file_name: '',
                path_url: '',
                type: '',
              });
            }}
            progressUpload={progressUpload}
            handleReUpload={() => {
              onUploadFile();
            }}
            fileData={uploadFileData}
            handleSubmit={() => {
              handleSubmitUpload();
            }}
          />
        }
      />
      <SwipeUpModal
        isOpenPopUp={isOpenDatePicker}
        handleShowPopUp={() => setIsOpenDatePicker(false)}
        children={
          <FilterDate
            handleClose={() => setIsOpenDatePicker(false)}
            handleSubmit={(_resDate: {date: any; month: any; year: any}) =>
              handleSubmitDatePicker(_resDate)
            }
            date={choosedDate}
          />
        }
      />
    </View>
  );
};

export default LembarKehadiranScreen;
