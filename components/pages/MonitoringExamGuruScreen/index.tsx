import {Header} from '@components/atoms/Header';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Participant, Room, Track} from 'livekit-client';
import {useRoom, AudioSession} from '@livekit/react-native';
import IconEmptyData from '@assets/svg/mascot_delete_video.svg';
import {EmptyDisplay} from '@components/atoms';
import Config from 'react-native-config';
import {ParamList} from 'type/screen';
import MonitoringCard from './Components/MonitoringCard';
import MonitoringModal from './Components/MonitoringModal';
import {useAsyncEffect} from '@hooks/useAsyncEffect';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

const MonitoringExamGuruScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'MonitoringExamGuruScreen'>>();
  const [showFullScreen, setShowFullScreen] = useState<{
    status: boolean;
    participant?: Participant;
  }>({status: false});

  const {subTitle, data} = useMemo(() => route.params, []);
  const [room] = useState(() => new Room());
  const {participants} = useRoom(room);
  const [violationData, setViolationData] = useState<IUjianViolation>();

  useEffect(() => {
    let connect = async () => {
      try {
        await AudioSession.startAudioSession();
        await room.connect(
          Config.LIVEKIT_URL,
          data?.exam_schedule?.teacher_token || '',
        );
      } catch (error) {
        // console.log('cek error: ', error);
        // console.log(
        //   'join room failed ',
        //   Config.LIVEKIT_URL,
        //   ' ',
        //   data?.exam_schedule?.teacher_token,
        // );
      }
    };
    connect();
    return () => {
      room.disconnect();
      AudioSession.stopAudioSession();
    };
  }, [room, data?.exam_schedule?.teacher_token]);

  useAsyncEffect(async () => {
    const interval = setInterval(async () => {
      const resData = await apiGet({
        url: URL_PATH.get_lms_teacher_ujian_violation(
          `${data?.exam_schedule?.id || 0}`,
        ),
      });
      setViolationData(resData);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onPressMonitor = useCallback(
    (status: boolean, participant?: Participant) => {
      setShowFullScreen(prevState => ({...prevState, status, participant}));
    },
    [],
  );

  const renderMonitoringItem = useCallback(
    ({item}: {item: Participant}) => {
      if (item.name === '') {
        return <></>;
      }
      return (
        <MonitoringCard
          violationData={violationData}
          item={item}
          onPressMonitor={(status, participant) =>
            onPressMonitor(status, participant)
          }
        />
      );
    },
    [violationData],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Monitoring'} subLabel={subTitle} />,
    });
  }, []);

  const renderEmptyParticipants = useCallback(
    () => (
      <EmptyDisplay
        title={'Belum Ada Kamera Diaktifkan'}
        desc="Murid yang telah mengaktifkan kamera
            akan tampil di sini."
        containerStyle={{marginTop: '50%'}}
        titleStyle={styles.title}
        descStyle={styles.subtitle}
        imageSvg={<IconEmptyData />}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderMonitoringItem}
        numColumns={2}
        keyExtractor={(item, idx) => `${item.identity}${idx}`}
        contentContainerStyle={{gap: 12}}
        columnWrapperStyle={{gap: 12}}
        data={participants.filter(participant => !!participant.name)}
        ListEmptyComponent={renderEmptyParticipants}
      />
      <MonitoringModal
        visible={showFullScreen.status}
        videoTrack={
          showFullScreen.participant?.getTrack(Track.Source.Camera)?.videoTrack
        }
        subLabel={showFullScreen.participant?.name}
        onPressMonitor={() => onPressMonitor(false)}
      />
    </View>
  );
};
export {MonitoringExamGuruScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  subtitle: {
    fontSize: 14,
  },
  videoView: {
    width: '100%',
    height: 109,
    borderRadius: 10,
  },
  pressableVideoView: {gap: 4, width: '48%'},
  containerVideoView: {width: '100%', borderRadius: 10, overflow: 'hidden'},
  textVideoView: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  modalVideoView: {flex: 1, maxHeight: '85%'},
  modalContainerView: {flex: 1, backgroundColor: Colors.dark.neutral100},
});
