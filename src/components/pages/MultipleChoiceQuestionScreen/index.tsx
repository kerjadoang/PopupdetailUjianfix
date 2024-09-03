import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Header} from '@components/atoms/Header';
import {Text, View} from 'react-native';
import Colors from '@constants/colors';
import {BackHandler} from 'react-native';
import TestMCQ from './TestMCQ';
import {useCountdown} from '@hooks/useCountdown';
import AKMMCQ from './AKMMCQ';
import PracticeMCQ from './PracticeMCQ';
import SoalTestMCQ from './SOALMCQ/SoalTestMCQ';
import SoalPracticeMCQ from './SOALMCQ/SoalPracticeMCQ';
import SOALUTSUASUATMCQ from './SOALMCQ/SOALUTSUASAUTMCQ';
import SoalKuis from './SOALMCQ/SoalKuis';
import BankSoal from './BankSoal';
import {ParamList} from 'type/screen';
import ReminderTimePopable from '@components/atoms/ReminderTimePopable';

export type MCQScreenProp = {
  title?: string;
  navigation: StackNavigationProp<ParamList, 'MultipleChoiceQuestionScreen'>;
  route: RouteProp<ParamList, 'MultipleChoiceQuestionScreen'>;
  showPopUp: {status: boolean; type: 'back' | 'done'};
  setShowPopUp: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      type: 'back' | 'done';
    }>
  >;
  countDown?: number;
  minutes?: number;
  setJeda?: React.Dispatch<
    React.SetStateAction<{
      pause: boolean;
      continue: boolean;
    }>
  >;
  jeda?: {
    pause: boolean;
    continue: boolean;
  };
  setCountDown?: React.Dispatch<React.SetStateAction<number>>;
  subject_id?: number;
  subject_name?: string;
  module?: string;
};

const MultipleChoiceQuestionScreen: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'MultipleChoiceQuestionScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'MultipleChoiceQuestionScreen'>>();
  const {
    service,
    rules,
    subject_id,
    subject_name,
    module,
    subTitle,
    question_data,
    title,
  } = route.params;
  const isAKM = service === 'AKM Literasi' || service === 'AKM Numerasi';

  const isAnyDuration =
    service === 'Kuis'
      ? true
      : isAKM
      ? !!question_data?.data?.end_time
      : !!rules?.max_duration;

  const date = isAKM
    ? new Date(question_data?.data?.end_time || '')
    : new Date().setMinutes(
        new Date().getMinutes() + (rules?.max_duration ?? 1),
      );
  const [showPopUp, setShowPopUp] = useState<MCQScreenProp['showPopUp']>({
    status: false,
    type: 'back',
  });
  const [stopInterval, setStopInterval] = useState<boolean>(false);
  const [jeda, setJeda] = useState<{pause: boolean; continue: boolean}>({
    pause: false,
    continue: true,
  });
  const isPractice =
    service === 'Practice' ||
    service === 'Ulangan Harian Practice' ||
    service === 'Bank Soal';
  const {minutes, seconds, countDown, setCountDown} = useCountdown(
    date,
    jeda.pause || isPractice || !isAnyDuration,
    jeda.continue,
    stopInterval,
  );

  const checkDateIfNaNOrEmpty = (date: any) => {
    if (isNaN(date)) {
      return '00';
    }
    return date || '00';
  };
  const displayTime =
    checkDateIfNaNOrEmpty(minutes) + ':' + checkDateIfNaNOrEmpty(seconds);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={route.params?.title ?? 'Latihan Soal PG'}
          subLabel={subTitle}
          subLabelContent={
            !isPractice &&
            isAnyDuration && (
              <ReminderTimePopable
                label={displayTime}
                countdown={seconds}
                visible={countDown < 61 * 1000}
              />
            )
          }
          onPressIconLeft={() => setShowPopUp({status: true, type: 'back'})}
          onPressIconRight={() => setShowPopUp({status: true, type: 'done'})}
          iconRight={
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 20,
                backgroundColor: Colors.success.light1,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: Colors.white,
                }}>
                Selesai
              </Text>
            </View>
          }
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

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
      setStopInterval(true);
    };
  }, []);

  switch (service) {
    case 'Practice':
      return (
        <PracticeMCQ
          title={title}
          showPopUp={showPopUp}
          navigation={navigation}
          route={route}
          setShowPopUp={setShowPopUp}
        />
      );
    case 'Test':
      return (
        <TestMCQ
          showPopUp={showPopUp}
          navigation={navigation}
          route={route}
          setShowPopUp={setShowPopUp}
          countDown={countDown}
          minutes={minutes}
          setJeda={setJeda}
          jeda={jeda}
        />
      );
    case 'Ulangan Harian Test':
      return (
        <SoalTestMCQ
          showPopUp={showPopUp}
          navigation={navigation}
          route={route}
          setShowPopUp={setShowPopUp}
          countDown={countDown}
          minutes={minutes}
          jeda={jeda}
          setJeda={setJeda}
        />
      );
    case 'Ulangan Harian Practice':
      return (
        <SoalPracticeMCQ
          showPopUp={showPopUp}
          navigation={navigation}
          route={route}
          setShowPopUp={setShowPopUp}
          countDown={countDown}
          minutes={minutes}
        />
      );
    case 'Ujian Akhir Semester':
    case 'Ujian Tengah Semester':
    case 'Ujian Akhir Tahun':
      return (
        <SOALUTSUASUATMCQ
          showPopUp={showPopUp}
          navigation={navigation}
          route={route}
          setShowPopUp={setShowPopUp}
          countDown={countDown}
          minutes={minutes}
          jeda={jeda}
          setJeda={setJeda}
        />
      );
    case 'AKM Literasi':
    case 'AKM Numerasi':
      return (
        <AKMMCQ
          showPopUp={showPopUp}
          navigation={navigation}
          route={route}
          setShowPopUp={setShowPopUp}
          countDown={countDown}
          minutes={minutes}
          setJeda={setJeda}
          jeda={jeda}
          setCountDown={setCountDown}
        />
      );
    case 'Kuis':
      return (
        <SoalKuis
          showPopUp={showPopUp}
          navigation={navigation}
          route={route}
          setShowPopUp={setShowPopUp}
          countDown={countDown}
          minutes={minutes}
          setJeda={setJeda}
          jeda={jeda}
          setCountDown={setCountDown}
        />
      );
    case 'Bank Soal':
      return (
        <BankSoal
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          navigation={navigation}
          route={route}
          subject_id={subject_id}
          subject_name={subject_name}
          module={module}
        />
      );
    default:
      return null;
  }
};

export default MultipleChoiceQuestionScreen;
