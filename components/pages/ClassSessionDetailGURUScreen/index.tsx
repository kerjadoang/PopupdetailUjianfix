/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import Fonts from '@constants/fonts';
import LiveIcon from '@assets/svg/ic16_live.svg';
import {Button, MainView, PopUp} from '@components/atoms';
import {useScreen} from './useGuru';
import {
  _handlerConvertAllDate,
  requestMicrophonePermission,
} from '@constants/functional';
import {SvgUri} from 'react-native-svg';
import {fetchJoinLiveClassSession} from '@redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import RobotIcon from '@assets/svg/maskot_16.svg';
import {RootState} from 'src/redux/rootReducer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {openSettings} from 'react-native-permissions';

const window = Dimensions.get('window');

const ClassSessionDetailGURUScreen = () => {
  const {classSessionDetail, service_type} = useScreen();
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'ClassSessionDetailGURUScreen'>
    >();
  const dispatch = useDispatch();
  const joinLiveClassSession = useSelector(
    (state: RootState) => state.joinLiveClassSession,
  );
  const [popUpConfirm, setShowPopupConfirm] = useState<boolean>(false);
  const isPTN = service_type === 'ptn';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Detail Sesi Kelas'} />,
    });
  }, [navigation]);
  const isLive = true;

  const onClassJoin = async () => {
    try {
      await requestMicrophonePermission();
      dispatch(
        fetchJoinLiveClassSession(
          classSessionDetail.data?.data?.ID,
          () => {
            setShowPopupConfirm(false);
            navigation.replace('MeetingLiveSessionV2Screen', {
              card_id: classSessionDetail.data?.data?.ID,
              type: isPTN ? 'ptn' : 'guru',
            });
          },
          isPTN ? 'ptn' : 'guru',
        ),
      );
    } catch (e) {
      Toast.show({
        type: 'warning',
        text1: 'Mohon berikan izin untuk akses microphone',
        onPress: () => openSettings(),
      });
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.subjectContainer}>
        <View style={styles.leftSubjectContainer}>
          <Text style={styles.subjectName}>
            {classSessionDetail?.data?.data?.subject_ptn?.name ||
              classSessionDetail?.data?.data?.subject?.name}
          </Text>
          <Text style={styles.subjectTitle}>
            {' '}
            {classSessionDetail?.data?.data?.description ||
              classSessionDetail?.data?.data?.chapter?.name}
          </Text>
          <Text style={styles.subjectDate}>
            {_handlerConvertAllDate(
              classSessionDetail?.data?.data?.time_start,
              9,
            )}
            -
            {_handlerConvertAllDate(
              classSessionDetail?.data?.data?.time_finish,
              8,
            )}
          </Text>

          {isLive ? (
            <View
              style={[
                styles.chips,
                {
                  marginTop: 4,
                  alignSelf: 'flex-start',
                  backgroundColor: Colors.danger.light2,
                  flexDirection: 'row',
                },
              ]}>
              <LiveIcon width={16} height={16} style={{marginRight: 8}} />
              <Text style={[styles.chipsText, {color: Colors.danger.base}]}>
                Sedang Berlangsung
              </Text>
            </View>
          ) : null}
        </View>
        {/* <Image source={{uri: classSessionDetail?.data?.data?.user?.path_url}} /> */}
        <MainView flex={1}>
          <SvgUri
            uri={classSessionDetail?.data?.data?.subject?.path_url}
            width={70}
            height={60}
          />
        </MainView>
      </View>
      <View style={styles.rectangle} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Deskripsi</Text>
        <Text style={styles.descriptionText}>
          {classSessionDetail?.data?.data?.description}
        </Text>
      </View>
      <View style={styles.rectangle} />
      <View style={styles.userContainer}>
        <Image
          source={{uri: classSessionDetail?.data?.data?.user?.path_url}}
          style={styles.avaMentor}
        />
        <View>
          <Text style={styles.userTitleText}>Diajar Oleh </Text>
          <Text style={styles.userName}>
            {classSessionDetail?.data?.data?.user?.full_name}
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          label={isLive ? 'Gabung Sesi Kelas' : ''}
          isDisabled={isLive ? false : true}
          action={() => setShowPopupConfirm(true)}
        />
      </View>
      <PopUp
        Icon={RobotIcon}
        show={popUpConfirm}
        title="Gabung Sesi Live Kelas"
        desc={`Kamu akan diarahkan ke Live Kelas untuk mengikuti kelas ${
          classSessionDetail.data?.data?.subject_ptn?.name ||
          classSessionDetail.data?.data?.subject?.name
        } - ${
          classSessionDetail.data?.data?.description ||
          classSessionDetail.data?.data?.chapter?.name
        }`}
        titleCancel={'Kembali'}
        titleConfirm="Gabung"
        actionConfirm={onClassJoin}
        actionCancel={() => setShowPopupConfirm(false)}
        disabledActionCancel={joinLiveClassSession.loading}
        disabledActionConfirm={joinLiveClassSession.loading}
      />
    </View>
  );
};

export {ClassSessionDetailGURUScreen};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    padding: 16,
    height: '100%',
  },
  subjectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSubjectContainer: {
    flexDirection: 'column',
    flexGrow: 4,
    flex: 1,
  },
  subjectName: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
  },
  subjectTitle: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.1,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    paddingVertical: 4,
  },
  subjectDate: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
  },
  chips: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    marginTop: -10,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  chipsText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    fontWeight: '400',
    textAlign: 'center',
  },
  rectangle: {
    marginVertical: 16,
    width: window.width,
    height: 4,
    backgroundColor: Colors.dark.neutral10,
    marginHorizontal: -16,
  },
  descriptionContainer: {
    flexDirection: 'column',
  },
  descriptionTitle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    paddingTop: 4,
  },
  userContainer: {
    flexDirection: 'row',
  },
  userTitleText: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    fontWeight: '600',
  },
  userName: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    fontWeight: '400',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 16,
    width: window.width * 0.95,
    alignSelf: 'center',
  },
  avaMentor: {width: 60, height: 60, borderRadius: 27, marginRight: 10},
});
