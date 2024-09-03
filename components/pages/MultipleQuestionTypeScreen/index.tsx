import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {AppState, BackHandler, Dimensions} from 'react-native';
import SoalPRProjekTugas from './SoalPRProjekTugas';
import SoalUjian from './SoalUjian';
import {ILMSUjianStartResponseData} from '@services/lms/type';
import {Room, VideoPresets} from 'livekit-client';
import {AudioSession} from '@livekit/react-native';
import {useSubmitLMSUjianViolation} from '@services/lms';
import Config from 'react-native-config';
import HeaderQuestion from '@components/atoms/HeaderQuestion';

import {ParamList} from 'type/screen';
import {useCountdownV2IsFinish} from '@zustand/countdownV2';
import {
  convertDate,
  isSimulator,
  GenerateUUID,
  isStringContains,
} from '@constants/functional';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {sendErrorLog} from '@services/firebase/firebaseDatabase';
import {UseMutateAsyncFunction, useMutation} from '@tanstack/react-query';
import {apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

export type SoalScreenProps = {
  startData?: any;
  route: RouteProp<ParamList, 'MultipleQuestionTypeScreen'>;
  navigation: StackNavigationProp<ParamList, 'MultipleQuestionTypeScreen'>;
  showAlertTimesUp?: boolean;
  showPopUp: {status: boolean; type: 'back' | 'done'};
  setShowPopUp: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      type: 'back' | 'done';
    }>
  >;
  setShowAlertTimesUp?: React.Dispatch<React.SetStateAction<boolean>>;
  countDown?: number;
  setDate?: React.Dispatch<React.SetStateAction<any>>;
  submitUUID?: ISubmitUUID;
  putUUID?: UseMutateAsyncFunction<ISubmitUUID, Error, void, unknown>;
};

const cameraResolution = {
  // width: 640,
  // height: 360,
  // frameRate: 30,
  ...VideoPresets.h180,
};

const MultipleQuestionTypeScreen: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'MultipleQuestionTypeScreen'>>();
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'MultipleQuestionTypeScreen'>
    >();
  const appState = useRef(AppState.currentState);
  const [showAlertTimesUp, setShowAlertTimesUp] = useState<boolean>(false);

  const {type, title, start_data} = route.params;
  const {mutate: submitLMSUjianViolation} = useSubmitLMSUjianViolation();
  // const isPrProjekTugas = type === 'pr_projek_tugas';
  const isPrProjekTugas = type === 'pr_projek_tugas';
  const [isRoomConnected, setIsRoomConnected] = useState<boolean>(false);
  const [isPermissionRequested, setIsPermissionRequested] =
    useState<boolean>(false);
  const isCountdownFinish = useCountdownV2IsFinish();

  const startDate = !isPrProjekTugas
    ? convertDate().toDate()
    : (start_data as ILMSUjianStartResponseData)?.start_time;
  const endTime = convertDate(
    (start_data as ILMSUjianStartResponseData)?.end_time,
  );

  const [room] = useState(
    () =>
      new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
          deviceId: '',
          facingMode: 'user',
          resolution: cameraResolution,
        },
        publishDefaults: {
          simulcast: false,
          videoEncoding: {
            maxBitrate: 60_000,
            maxFramerate: 8,
          },
        },
      }),
  );

  const [showPopUp, setShowPopUp] = useState<SoalScreenProps['showPopUp']>({
    status: false,
    type: 'back',
  });

  useEffect(() => {
    const backAction = () => {
      setShowPopUp({status: true, type: 'back'});
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    // if (!isPermissionRequested) return;
    if (!isPrProjekTugas && isPermissionRequested) {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          try {
            submitLMSUjianViolation({
              student_exam_id:
                (start_data as ILMSUjianStartResponseData).student_exam?.[0]
                  ?.id ?? 0,
              violation: 'minimize_app',
            });
          } catch (error) {
            // console.log('error minimze app ', error);
          }
        }

        appState.current = nextAppState;
      });

      return () => {
        subscription.remove();
      };
    }
  }, [isPermissionRequested]);

  useEffect(() => {
    // if (!isPermissionRequested) return;
    if (!isPrProjekTugas && isPermissionRequested) {
      const subscription = Dimensions.addEventListener(
        'change',
        ({window, screen}) => {
          if (
            window.height < screen.height * 0.5 ||
            window.width < screen.width * 0.5
          ) {
            try {
              submitLMSUjianViolation({
                student_exam_id:
                  (start_data as ILMSUjianStartResponseData).student_exam?.[0]
                    ?.id ?? 0,
                violation: 'open_multi_window',
              });
            } catch (error) {
              // console.log('error open multi window ', error);
            }
          }
        },
      );
      return () => subscription?.remove();
    }
  }, [isPermissionRequested]);

  const joinRoom = async () => {
    try {
      const token =
        (start_data as ILMSUjianStartResponseData)?.student_exam?.[0]?.token ??
        '';
      await AudioSession.startAudioSession();
      await room.connect(Config.LIVEKIT_URL, token, {});
      setIsRoomConnected(true);
      // console.log('room connected ', room.state);
    } catch (error: any) {
      // console.log('cek error livekit ', error);
      sendErrorLog({
        feature: 'lms_ujian',
        serviceName: 'LMS',
        type: 'ERROR',
        message: error,
        title: 'joinRoom',
        screenName: 'MultipleQuestionTypeScreen',
      });
    }
  };

  useEffect(() => {
    // is proctoring active
    if (!(start_data as ILMSUjianStartResponseData).is_active_proctoring) {
      setIsPermissionRequested(true);
      return;
    }
    if (!isPrProjekTugas && start_data && room && !isRoomConnected) {
      joinRoom();
    }

    return () => {
      room.disconnect();
      AudioSession.stopAudioSession();
    };
  }, [room, isPrProjekTugas, start_data, Config.LIVEKIT_URL]);

  useAsyncEffect(async () => {
    try {
      if (isSimulator) {
        return;
      }
      if (!isRoomConnected) {
        return;
      }
      const devices = await Room.getLocalDevices('videoinput', true);
      const currentDevice = devices.find(item => item.facing === 'front');
      if (room.options.videoCaptureDefaults) {
        room.options.videoCaptureDefaults.deviceId = currentDevice.deviceId;
      }
      await room.localParticipant.setCameraEnabled(true);
      // await room.localParticipant.enableCameraAndMicrophone();
      const tracks = await room.localParticipant.createScreenTracks({
        audio: true,
        resolution: cameraResolution,
      });
      await room.localParticipant.publishTrack(tracks);
    } catch (error: any) {
      if (isStringContains(error.toString(), 'getSettings')) {
        return;
      }
      // console.log('cekkk error track', error);
      sendErrorLog({
        feature: 'lms_ujian',
        serviceName: 'LMS',
        type: 'ERROR',
        message: error,
        title: 'activeCamera',
        screenName: 'MultipleQuestionTypeScreen',
      });
    } finally {
      const isRoomCameraEnabled = room.localParticipant.isCameraEnabled;
      if (isRoomCameraEnabled) {
        setIsPermissionRequested(true);
      }
    }
  }, [isRoomConnected]);

  const {data: submitUUID, mutateAsync: putUUID} = useMutation({
    mutationKey: ['submit-uuid'],
    mutationFn: async () => {
      const uuid = GenerateUUID();
      const resData = await apiPut<ISubmitUUID>({
        url: URL_PATH.put_uuid_lms_ujian(uuid),
      });
      return resData;
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <HeaderQuestion
          validateTime={{
            validate: true,
            url: URL_PATH.get_time_student_exam(
              (start_data as ILMSUjianStartResponseData).id,
            ),
            interval: 10000,
          }}
          label={title ?? 'Soal'}
          onPressIconRight={async () => {
            await putUUID();
            // setIsPausedCountdown(true);
            onPressBackOrDone({status: true, type: 'done'});
          }}
          onPressIconLeft={() => {
            if (isCountdownFinish) {
              setShowAlertTimesUp?.(true);
              return;
            }
            // setIsPausedCountdown(true);
            onPressBackOrDone({status: true, type: 'back'});
          }}
          showCountdown={!isPrProjekTugas}
          startTime={startDate?.toString()}
          endTime={endTime.toString()}
        />
      ),
    });
  }, [putUUID, isCountdownFinish]);

  const onPressBackOrDone = (param: SoalScreenProps['showPopUp']) => {
    setShowPopUp({status: param.status, type: param.type});
  };

  const render = () => {
    switch (type) {
      case 'pr_projek_tugas':
        return (
          <SoalPRProjekTugas
            route={route}
            navigation={navigation}
            setShowPopUp={setShowPopUp}
            showPopUp={showPopUp}
          />
        );

      case 'ujian':
        return (
          <SoalUjian
            route={route}
            navigation={navigation}
            showAlertTimesUp={showAlertTimesUp}
            setShowAlertTimesUp={setShowAlertTimesUp}
            setShowPopUp={setShowPopUp}
            showPopUp={showPopUp}
            startData={start_data}
            submitUUID={submitUUID}
            putUUID={putUUID}
          />
        );
      default:
        return null;
    }
  };

  /*const videoView = participants.length > 0 && (
    <VideoView
      style={{flex: 1, width: '100%'}}
      videoTrack={participants[0].getTrack(Track.Source.Camera)?.videoTrack}
    />
  ); */

  return (
    <>
      {/* {videoView} */}
      {render()}
    </>
  );
};

export default MultipleQuestionTypeScreen;
