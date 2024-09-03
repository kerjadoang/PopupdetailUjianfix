import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Plus from '@assets/svg/ic56_floating_plus.svg';
import {CoachmarkLib} from '../Coachmark';
import {generalStyles} from '@constants/styles';

type Props = {
  onPress: (event: any) => void;
  Coachmarks?: any[];
  doneCoachMark?: () => void;
  scrollViewRef?: any;
  totalCoachmark?: number;
  queue?: number;
  message?: string;
  _handlerCoachmark?: (queue: number) => void;
};

const FABPlus = ({
  onPress,
  Coachmarks,
  doneCoachMark,
  scrollViewRef,
  totalCoachmark,
  queue = 1,
  message,
  _handlerCoachmark,
}: Props) => {
  if (Coachmarks) {
    return (
      <View style={styles.containerButton}>
        <CoachmarkLib
          ref={ref => (Coachmarks[queue - 1] = ref)}
          onNext={() => _handlerCoachmark && _handlerCoachmark(queue)}
          onSkip={doneCoachMark}
          onShow={() => scrollViewRef?.current?.stop()}
          buttonOnContent
          queue={queue}
          contentContainerStyle={[generalStyles.contentFlex, styles.button]}
          totalCoachmark={totalCoachmark}
          buttonSkipText={'Lewati'}
          title={'Tambah Aktivitas Baru'}
          childrenStyle={styles.button}
          maxWidth={64}
          message={
            message ??
            'Ketuk tombol “+” untuk membuat rapat virtual dan pengumuman.'
          }>
          <Pressable onPress={onPress}>
            <Plus width={56} height={56} style={styles.button} />
          </Pressable>
        </CoachmarkLib>
      </View>
    );
  }
  return (
    <View style={styles.containerButton}>
      <Pressable onPress={onPress}>
        <Plus width={56} height={56} style={styles.button} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
  containerButton: {
    position: 'absolute',
    zIndex: 1000,
    bottom: 16,
    right: 5,
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 16,
  },
});

export {FABPlus};
