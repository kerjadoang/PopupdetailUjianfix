import {Button, Header, MainText, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AppStateStatus,
  AppState,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
} from 'react-native-vision-camera';

import ActiveCameraIcon from '@assets/svg/ic40_video_green.svg';
import NotActiveCameraIcon from '@assets/svg/ic40_video_slash.svg';

import {openSettings} from 'react-native-permissions';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  capitalizeEachWord,
  formatScheduleDate,
  isSimulator,
} from '@constants/functional';
import {useStartLMSUjian} from '@services/lms';
import {ILMSUjianStartResponse} from '@services/lms/type';
import {ParamList} from 'type/screen';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
const internetStatusLabel = {
  weak: 'Lemah',
  strong: 'Baik',
};

type ExamInfoProps = {
  title: string;
  subject: string;
  time: string;
};

const ExamInfo: React.FC<ExamInfoProps> = ({...props}) => {
  return (
    <View>
      <Text style={examInfoStyle.title}>{props.title}</Text>
      <Text style={examInfoStyle.subject}>{props.subject}</Text>
      <Text style={examInfoStyle.time}>{props.time}</Text>
    </View>
  );
};

const LMSUjianTestCameraScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LMSUjianTestCameraScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'LMSUjianTestCameraScreen'>>();

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const [internetStrength, setInternetStrength] = useState<'weak' | 'strong'>(
    'strong',
  );
  const [isReadyToExam, setIsReadyToExam] = useState<boolean>(false);
  const {
    title,
    subject,
    start_time,
    end_time,
    id,
    id_relation,
    time_start,
    time_finish,
  } = route.params.data;
  const {refetch: startLMSUjian, data: detailExam} = useStartLMSUjian();
  const startData = useMemo(() => detailExam?.data, [detailExam]);
  // console.log('🚀 ~ startData:', startData);
  const internetLabel = internetStatusLabel[internetStrength];
  const internetIsStrong = internetStatusLabel[internetStrength] === 'Baik';
  const authorized = cameraPermissionStatus === 'authorized';
  const devices = useCameraDevices();
  const device = devices.front;
  // const [startData, setStartData] = useState<any>(null);
  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(
    isSimulator ? false : true,
  );
  // listener to turn off camera when navigate
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setIsCameraActive(false);
    });
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header />,
    });
  }, [navigation]);

  useEffect(() => {
    if (!startData) {
      return;
    }
    if (!startData.is_active_proctoring) {
      return;
    }
    const checkInternet = setInterval(async () => {
      try {
        const start = new Date().getTime();
        await fetch('https://google.com');
        const end = new Date().getTime();
        const kbPerSecond =
          Math.floor(1024 / ((end - start) / 1000)) >= 1000 ? 'strong' : 'weak';
        setInternetStrength(kbPerSecond);
      } catch (error) {}
    }, 2000);
    return () => clearInterval(checkInternet);
  }, [startData]);

  const onStartExam = async () => {
    if (!internetIsStrong && startData) {
      Toast.show({
        type: 'warning',
        text1: 'Pastikan koneksi internetmu stabil.',
      });
      return;
    }
    try {
      navigation.replace('MultipleQuestionTypeScreen', {
        type: 'ujian',
        title,
        start_data: startData as ILMSUjianStartResponse,
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e?.response?.data?.message ?? `${e?.message} Terjadi Kesalahan`,
      });
    }
  };

  const getStartData = async () => {
    try {
      const res = await startLMSUjian(id ?? id_relation);
      // setStartData(res?.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (id || id_relation) {
        getStartData();
      }
    }, [id, id_relation]),
  );

  const requestCameraPermission = async (requestCount: number = 1) => {
    try {
      if (cameraPermissionStatus === 'authorized' || requestCount === 0) {
        return;
      }

      const permission = await Camera.requestCameraPermission();
      switch (permission) {
        case 'authorized':
          setCameraPermissionStatus('authorized');
          break;
        case 'denied':
          if (requestCount === 0) {
            setCameraPermissionStatus('denied');
            return;
          }
          requestCameraPermission(requestCount - 1);
          break;
        default:
          break;
      }
    } catch (error) {
      // console.log('request permission error ', error);
    }
  };

  const requestPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    switch (status) {
      case 'not-determined':
        requestCameraPermission();
        break;
      case 'denied':
        requestCameraPermission();
        break;
      default:
        setCameraPermissionStatus(status);
        break;
    }
    // await Camera.requestCameraPermission();
  };

  useEffect(() => {
    if (!startData) {
      return;
    }
    if (!startData.is_active_proctoring) {
      return;
    }
    requestPermission();
  }, [startData]);

  useEffect(() => {
    if (!startData) {
      return;
    }
    if (!startData.is_active_proctoring) {
      setIsReadyToExam(true);
      return;
    }
    if (authorized && startData) {
      setTimeout(() => {
        setIsReadyToExam(true);
      }, 3000);
    }
  }, [startData, authorized]);

  const handleAppstate = async (changedState: AppStateStatus) => {
    if (changedState === 'active') {
      if (isOpenSettings) {
        requestCameraPermission();
        setIsOpenSettings(false);
      }
      return;
    }
  };

  useAsyncEffect(async () => {
    const handleChangeState = AppState.addEventListener(
      'change',
      handleAppstate,
    );

    return async () => {
      handleChangeState.remove();
    };
  }, [isOpenSettings]);

  if (device == null && !isSimulator) {
    return null;
  }

  const renderCameraView = () => {
    return authorized ? (
      <View style={{flex: 3}}>
        <ScrollView contentContainerStyle={styles.svContentContainer}>
          <View style={{borderRadius: 10, overflow: 'hidden'}}>
            {!isSimulator && device && (
              <Camera
                style={styles.cameraPreviewContiner}
                device={device}
                isActive={isCameraActive}
                fps={30}
              />
            )}
          </View>
          <View style={{gap: 12}}>
            <ActiveCameraIcon />
          </View>
          <View style={{maxWidth: 200, gap: 4}}>
            <Text style={styles.cameraStatusLabel}>Kamera kamu aktif</Text>
            <Text style={styles.cameraInfoLabel}>
              Kamu wajib menyalakan kamera selama ujian berlangsung
            </Text>
          </View>
          <Text style={styles.connectionLabel}>
            Stabilitas koneksi:{' '}
            <Text
              style={[
                styles.connectionOk,
                !internetIsStrong && styles.connectionNotOk,
              ]}>
              {internetLabel}
            </Text>
          </Text>
        </ScrollView>
      </View>
    ) : (
      <View style={styles.cameraNotActiveContainer}>
        <NotActiveCameraIcon />
        <View style={{maxWidth: 250, gap: 4}}>
          <Text style={styles.cameraStatusLabel}>Kamera kamu tidak aktif</Text>
          <Text style={styles.cameraInfoLabel}>
            Nyalakan kamera untuk memulai ujian
          </Text>
        </View>
        <Button
          label="Ke Pengaturan"
          action={async () => {
            await openSettings();
            setIsOpenSettings(true);
          }}
          style={{paddingHorizontal: 12}}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: startData?.is_active_proctoring
            ? undefined
            : 'space-between',
          alignItems: startData?.is_active_proctoring ? 'center' : undefined,
        },
      ]}>
      <View style={{gap: 4}} />
      <View>
        <ExamInfo
          title={
            route?.params?.data?.service?.name ??
            capitalizeEachWord(route?.params?.data?.type || '').toString() ??
            subject?.name ??
            'Judul Ujian'
          }
          subject={subject?.name ?? title ?? 'Judul Mapel'}
          time={formatScheduleDate(
            start_time ?? time_start,
            end_time ?? time_finish,
            true,
          )}
        />
        {/* {startData && !startData?.is_active_proctoring && <ExamInstruction />} */}
        {startData && !startData?.is_active_proctoring && (
          <MainView marginTop={12}>
            <MainText type="Bold">Instruksi Pengerjaan :</MainText>
            <RenderHtmlView
              source={{html: startData.instructions || ''}}
              contentWidth={WINDOW_WIDTH - 16}
            />
          </MainView>
        )}
      </View>

      {startData?.is_active_proctoring ? renderCameraView() : null}

      <View style={styles.btnContainer}>
        <Button
          label="Mulai Ujian"
          // isDisabled={!authorized && !startData }
          isDisabled={!isReadyToExam}
          action={onStartExam}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
    gap: 16,
  },
  cameraPreviewContiner: {height: 260, width: 196, borderRadius: 10},
  svContentContainer: {alignItems: 'center', gap: 16},
  cameraStatusLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  cameraInfoLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral80,
    textAlign: 'center',
  },
  connectionLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral80,
    textAlign: 'center',
    fontSize: 12,
  },
  connectionOk: {color: Colors.success.base},
  connectionNotOk: {color: Colors.danger.base},
  cameraNotActiveContainer: {
    gap: 12,
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center',
  },
  btnContainer: {padding: 16, backgroundColor: Colors.white, width: '100%'},
});

const examInfoStyle = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral80,
    fontSize: 16,
    textAlign: 'center',
  },
  subject: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 14,
    textAlign: 'center',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral80,
    textAlign: 'center',
  },
});

export default LMSUjianTestCameraScreen;
