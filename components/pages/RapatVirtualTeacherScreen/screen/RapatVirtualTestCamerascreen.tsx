import {Button, Header, MainText, MainView, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
} from 'react-native-vision-camera';

import CameraOn from '@assets/svg/ic_camera_on.svg';
import CameraOff from '@assets/svg/ic_camera_off.svg';
import MicOn from '@assets/svg/ic_mic_on.svg';
import MicOff from '@assets/svg/ic_mic_off.svg';
import NotActiveCameraIcon from '@assets/svg/ic40_video_slash.svg';

import {openSettings} from 'react-native-permissions';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {ParamList} from 'type/screen';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {apiGet, apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import Avatar from '@components/atoms/Avatar';
import Fonts from '@constants/fonts';

type ExamInfoProps = {
  title: string;
  time: string;
  description?: string;
  action?: () => void;
};

const ExamInfo: React.FC<ExamInfoProps> = props => {
  return (
    <>
      <Text style={examInfoStyle.title}>{props.title}</Text>
      <Text style={examInfoStyle.time}>{props.time}</Text>
      <Pressable onPress={props.action}>
        <Text style={examInfoStyle.description}>{props.description}</Text>
      </Pressable>
    </>
  );
};

const RapatVirtualTestCamerascreen: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'RapatVirtualTestCamerascreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'RapatVirtualTestCamerascreen'>>();

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const {id, title, time_start, time_end, description} = route.params.data;

  const authorized = cameraPermissionStatus === 'authorized';
  const devices = useCameraDevices();
  const device = devices.front;
  const [swipeDescription, setSwipeDescription] = useState(false);
  const [isCameraOn, setCameraOn] = useState(true);
  const [isMicOn, setMicOn] = useState(true);
  const [listAttandance, setListAttandance] = useState<any>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header />,
    });
  }, [navigation]);

  const getListAttendance = async () => {
    try {
      showLoading();

      const res = await apiGet({
        url: URL_PATH.get_attandence_virtual_meeting(id ?? 0),
      });

      setListAttandance(res);
    } catch (error) {
      showErrorToast('Terjadi Kesalahan');
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    getListAttendance();
  }, []);

  const onJoinMeeting = async () => {
    const token = await AsyncStorage.getItem(Keys.token);
    try {
      showLoading();

      await apiPost({
        url: URL_PATH.post_join_virtual_meeting(id ?? 0),
      });

      navigation.navigate('JitsiScreen', {
        data: route.params.data,
        token: token,
      });
    } catch (error) {
      showErrorToast('Gagal gabung rapat');
    } finally {
      dismissLoading();
    }
  };

  const renderDescription = () => {
    return (
      <View style={styles.swipeUpContainer}>
        <Text style={descriptionStyle.title}>{title}</Text>
        <Text style={descriptionStyle.date}>{`${dayjs
          .tz(time_start, 'Asia/Jakarta')
          .locale('id')
          .format('dddd, DD MMMM YYYY • HH:mm')} - ${dayjs
          .tz(time_end, 'Asia/Jakarta')
          .locale('id')
          .format('HH:mm')}`}</Text>

        <Text style={descriptionStyle.description}>{description}</Text>

        <MainView marginVertical={16}>
          <Button label="Tutup" action={() => setSwipeDescription(false)} />
        </MainView>
      </View>
    );
  };

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.getCameraPermissionStatus();
      switch (status) {
        case 'not-determined':
          const permission = await Camera.requestCameraPermission();
          switch (permission) {
            case 'authorized':
              setCameraPermissionStatus('authorized');
              break;
            default:
              break;
          }
          break;
        default:
          setCameraPermissionStatus(status);
          break;
      }
      await Camera.requestCameraPermission();
    };
    requestPermission();
  }, []);

  if (device == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{gap: 4}} />
      <ExamInfo
        action={() => setSwipeDescription(true)}
        title={title ?? 'Judul Ujian'}
        description={description ? 'Lihat deskripsi rapat' : ''}
        time={`${dayjs
          .tz(time_start, 'Asia/Jakarta')
          .locale('id')
          .format('dddd, DD MMMM YYYY • HH:mm')} - ${dayjs
          .tz(time_end, 'Asia/Jakarta')
          .locale('id')
          .format('HH:mm')}`}
      />
      {authorized ? (
        <View style={{flex: 3}}>
          <ScrollView contentContainerStyle={styles.svContentContainer}>
            {isCameraOn ? (
              <Camera
                style={styles.cameraPreviewContiner}
                device={device}
                isActive={true}
              />
            ) : (
              <MainView
                style={styles.cameraPreviewContiner}
                backgroundColor={Colors.dark.neutral60}
                alignItems="center"
                justifyContent="center">
                <MainText color={Colors.white}>Kamera mati</MainText>
              </MainView>
            )}
            <MainView flexDirection="row" gap={12}>
              <TouchableOpacity
                onPress={() =>
                  isCameraOn ? setCameraOn(false) : setCameraOn(true)
                }>
                {isCameraOn ? <CameraOn /> : <CameraOff />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (isMicOn ? setMicOn(false) : setMicOn(true))}>
                {isMicOn ? <MicOn /> : <MicOff />}
              </TouchableOpacity>
            </MainView>

            <MainText>
              {listAttandance?.participant?.join?.length ?? 0} Orang sudah di
              ruangan
            </MainText>
            <FlatList
              horizontal
              data={listAttandance?.participant?.join}
              renderItem={({item, index}: any) => {
                item = item.item;
                if (index >= 5) {
                  return <></>;
                }
                return (
                  <MainView marginRight={7}>
                    <Avatar
                      id={item?.user?.avatar}
                      style={{width: 24, height: 24}}
                    />
                  </MainView>
                );
              }}
              ListFooterComponent={
                listAttandance?.participant?.join?.length > 5 ? (
                  <MainView
                    width={24}
                    height={24}
                    backgroundColor={Colors.primary.light2}
                    borderRadius={12}
                    alignItems="center"
                    justifyContent="center">
                    <MainText
                      fontSize={12}
                      color={Colors.dark.neutral60}
                      fontFamily={Fonts.RegularPoppins}>
                      + {listAttandance?.participant?.join?.length - 5}
                    </MainText>
                  </MainView>
                ) : null
              }
            />
          </ScrollView>
        </View>
      ) : (
        <View style={styles.cameraNotActiveContainer}>
          <NotActiveCameraIcon />
          <View style={{maxWidth: 250, gap: 4}}>
            <Text style={styles.cameraStatusLabel}>
              Berikan perizinan untuk mengakses kamera
            </Text>
          </View>
          <Button
            label="Ke Pengaturan"
            action={() => openSettings()}
            style={{paddingHorizontal: 12}}
          />
        </View>
      )}

      <View style={styles.btnContainer}>
        <Button
          label="Gabung Rapat"
          isDisabled={!authorized}
          action={onJoinMeeting}
        />
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={swipeDescription}
        onClose={() => {
          setSwipeDescription(false);
        }}
        height={500}
        children={renderDescription()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    gap: 16,
  },
  swipeUpContainer: {
    paddingHorizontal: 16,
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

const descriptionStyle = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral80,
    fontSize: 20,
    textAlign: 'center',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral80,
    fontSize: 14,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral80,
    fontSize: 14,
    paddingVertical: 16,
  },
});

const examInfoStyle = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral80,
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral80,
    textAlign: 'center',
  },
});

export default RapatVirtualTestCamerascreen;
