import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import IconLMS from '@assets/svg/LMS.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CoachmarkLib} from '../Coachmark';
import {generalStyles} from '@constants/styles';
type Props = {
  action?: any;
  svg?: any;
  akm?: boolean;
  scrollViewRef?: any;
  Coachmarks: any[];
  doneCoachMark: () => void;
  totalCoachmark: number;
  _handlerCoachmark: (queue: number) => void;
};

const LMS = ({
  action,
  scrollViewRef,
  Coachmarks,
  doneCoachMark,
  totalCoachmark,
  _handlerCoachmark,
}: Props) => {
  return (
    <CoachmarkLib
      ref={ref => (Coachmarks[7] = ref)}
      onNext={() => _handlerCoachmark(8)}
      onShow={() => scrollViewRef?.current?.stop()}
      onSkip={doneCoachMark}
      buttonOnContent
      queue={8}
      arrowMiddle
      totalCoachmark={totalCoachmark}
      contentContainerStyle={generalStyles.contentFlex}
      buttonSkipText={'Lewati'}
      title={'LMS'}
      childrenStyle={styles.borderCard}
      message={
        'Akses fitur sekolah digital dengan sistem berbasis teknologi di sini.'
      }>
      <Pressable onPress={action}>
        <View style={styles.container}>
          <IconLMS width={80} height={80} style={styles.images} />
          <View
            style={[generalStyles.rowAlignCenter, generalStyles.rowBetween]}>
            <View>
              <Text style={styles.text}>LMS</Text>
              <Text style={styles.desc}>
                Sistem pembelajaran berbasis teknologi
              </Text>
            </View>
            <View>
              <Icon
                name="chevron-right"
                size={14}
                color={Colors.dark.neutral50}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </CoachmarkLib>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
    // marginVertical: 16,
    height: 80,
  },
  images: {
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    flexWrap: 'wrap',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  desc: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    flexWrap: 'wrap',
    width: '80%',
    marginHorizontal: 8,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
  },
  borderCard: {borderRadius: 15},
});

export {LMS};
