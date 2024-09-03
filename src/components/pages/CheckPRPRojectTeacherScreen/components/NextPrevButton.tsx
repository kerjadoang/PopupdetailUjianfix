import Colors from '@constants/colors';
import {IMAGES} from '@constants/image';
import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  PressableProps,
} from 'react-native';
import Pause from '@assets/svg/ic_pause.svg';

type NextPrevButtonProp = {
  handleNextPrevButton: (param: 'previous' | 'next') => void;
  onPressReview?: PressableProps['onPress'];
  onPressPause?: PressableProps['onPress'];
  pausable?: boolean;
  reviewable?: boolean;
  currentQuestion: number;
  questionLength: number;
  separateButton?: boolean;
};

const NextPrevButton: React.FC<NextPrevButtonProp> = props => {
  return (
    <View style={!props.separateButton ? styles.btnNextPrevContainer : null}>
      <Pressable
        onPress={() => props.handleNextPrevButton('previous')}
        disabled={props.currentQuestion === 1}
        style={
          !props.separateButton
            ? styles.pressableSize
            : [styles.pressableSize, styles.btnPrevAbsolute]
        }>
        <Image
          source={
            props.currentQuestion === 1
              ? IMAGES.arrowRightPassive
              : IMAGES.arrowRightActive
          }
          style={styles.btnPrev}
        />
      </Pressable>
      {(props.reviewable || props.pausable) && (
        <View style={styles.containerBtnReviewPause}>
          {props.reviewable && (
            <Pressable onPress={props.onPressReview} style={styles.btnReview}>
              <Text style={styles.btnLabel}>Tinjau</Text>
            </Pressable>
          )}
          {props.pausable && (
            <Pressable onPress={props.onPressPause} style={styles.btnPause}>
              <View style={styles.containerBtnPause}>
                <Pause />
                <Text style={styles.btnLabel}>Jeda</Text>
              </View>
            </Pressable>
          )}
        </View>
      )}
      <Pressable
        onPress={() => props.handleNextPrevButton('next')}
        disabled={props.currentQuestion >= props.questionLength}
        style={
          !props.separateButton
            ? styles.pressableSize
            : [styles.pressableSize, styles.btnNextAbsolute]
        }>
        <Image
          source={
            props.currentQuestion >= props.questionLength
              ? IMAGES.arrowRightPassive
              : IMAGES.arrowRightActive
          }
          style={styles.pressableSize}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnNextPrevContainer: {
    paddingLeft: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pressableSize: {width: 48, height: 48},
  btnPrev: {width: 48, height: 48, transform: [{rotateY: '180deg'}]},
  btnPrevAbsolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  btnNext: {width: 48, height: 48},
  btnNextAbsolute: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  containerBtnReviewPause: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  btnReview: {
    paddingHorizontal: 22,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
  },
  btnPause: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
  },
  btnLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.base,
  },
  containerBtnPause: {flexDirection: 'row', alignItems: 'center', gap: 10},
});

export default React.memo(NextPrevButton);
