import Colors from '@constants/colors';
import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import Chevron from '@assets/svg/ic_chevron_right_16x16.svg';
import {CoachmarkLib} from '../Coachmark';

type Props = {
  onPress: (event: any) => void;
  Coachmarks?: any[];
  doneCoachMark?: () => void;
  totalCoachmark?: number;
  scrollViewRef?: any;
  _handlerCoachmark?: (queue: number) => void;
};

const FABSchedule = ({
  onPress,
  Coachmarks,
  doneCoachMark,
  totalCoachmark,
  scrollViewRef,
  _handlerCoachmark,
}: Props) => {
  if (Coachmarks) {
    return (
      <View style={styles.centering}>
        <CoachmarkLib
          ref={ref => (Coachmarks[8] = ref)}
          onNext={() => _handlerCoachmark && _handlerCoachmark(9)}
          onShow={() => scrollViewRef?.current?.stop()}
          onSkip={doneCoachMark}
          buttonOnContent
          queue={9}
          totalCoachmark={totalCoachmark}
          buttonFinishText={'Mulai'}
          childrenStyle={styles.button}
          marginBottomContent={32}
          title={'Jadwal Hari Ini'}
          message={'Lihat jadwal belajar harian kamu di sini.'}>
          <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.textBtn}>Jadwal Hari ini</Text>
            <Chevron width={16} height={16} style={styles.chevronStyle} />
          </Pressable>
        </CoachmarkLib>
      </View>
    );
  }
  return (
    <View style={styles.centering}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.textBtn}>Jadwal Hari ini</Text>
        <Chevron width={16} height={16} style={styles.chevronStyle} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centering: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 16,
    paddingVertical: 6,
    // alignSelf: 'flex-start',
    borderRadius: 10,
  },
  textBtn: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  chevronStyle: {
    transform: [{rotate: '90deg'}],
  },
});

export {FABSchedule};
