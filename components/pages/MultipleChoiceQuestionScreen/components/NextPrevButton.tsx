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
import TryoutNavigationBtnIcon from '@assets/svg/tryout_navigation.svg';

type NextPrevButtonProp = {
  handleNextPrevButton: (param: 'previous' | 'next') => void;
  onPressReview?: PressableProps['onPress'];
  onPressPause?: PressableProps['onPress'];
  onPressTryoutNavigation?: PressableProps['onPress'];
  pausable?: boolean;
  reviewable?: boolean;
  currentQuestion: number;
  tryOutNavgation?: boolean;
  questionData?: any[];
  disableNext?: boolean;
  disablePrev?: boolean;
};

const NextPrevButton: React.FC<NextPrevButtonProp> = props => {
  const sourceArrowImg = (direction: 'next' | 'prev') => {
    switch (direction) {
      case 'next':
        if (props.questionData) {
          return props.currentQuestion >= props.questionData.length
            ? IMAGES.arrowRightPassive
            : IMAGES.arrowRightActive;
        }
        return props.disableNext
          ? IMAGES.arrowRightPassive
          : IMAGES.arrowRightActive;

      case 'prev':
        return props.currentQuestion === 1 || props.disablePrev
          ? IMAGES.arrowRightPassive
          : IMAGES.arrowRightActive;
      default:
        break;
    }
  };

  return (
    <View style={styles.btnNextPrevContainer}>
      <Pressable
        onPress={() => props.handleNextPrevButton('previous')}
        disabled={props.currentQuestion === 1 || props.disablePrev}
        style={styles.pressableSize}>
        <Image source={sourceArrowImg('prev')} style={styles.btnPrev} />
      </Pressable>
      {(props.reviewable || props.pausable || props.tryOutNavgation) && (
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
          {props.tryOutNavgation && (
            <Pressable onPress={props.onPressTryoutNavigation}>
              <TryoutNavigationBtnIcon />
            </Pressable>
          )}
        </View>
      )}
      <Pressable
        onPress={() => props.handleNextPrevButton('next')}
        disabled={
          props.questionData
            ? props.currentQuestion >= props.questionData.length
            : props.disableNext
        }
        style={styles.pressableSize}>
        <Image source={sourceArrowImg('next')} style={styles.pressableSize} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnNextPrevContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pressableSize: {width: 48, height: 48},
  btnPrev: {width: 48, height: 48, transform: [{rotateY: '180deg'}]},
  btnNext: {width: 48, height: 48},
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
