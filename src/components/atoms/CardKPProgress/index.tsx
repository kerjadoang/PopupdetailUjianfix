import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import IcLock from '@assets/svg/ic32_lock.svg';

import Colors from '@constants/colors';
import {ProgressCircle} from '../ProgressCircle';

type Props = {
  title: string;
  progressbar: string;
  unlocked?: boolean;
};
const CardKPProgress: FC<Props> = ({title, progressbar, unlocked}) => {
  const isLocked = unlocked === false;

  return (
    <View
      style={[
        styles.card,
        styles.shadowProp,
        isLocked && {backgroundColor: Colors.dark.neutral20},
      ]}>
      <View style={{flex: 1}}>
        <Text
          style={[styles.titleBold, isLocked && {color: Colors.dark.neutral60}]}
          numberOfLines={2}>
          {title}
        </Text>
      </View>
      <View>
        {isLocked ? (
          <IcLock />
        ) : (
          <ProgressCircle
            progress={+progressbar.replace(/\D/g, '')}
            size={48}
            strokeWidth={4}
            color={Colors.primary.base}
            children={<Text style={styles.subtitle}>{progressbar}</Text>}
          />
        )}
      </View>
    </View>
  );
};

export default CardKPProgress;

const styles = StyleSheet.create({
  titleBold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.primary.base,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderRadius: 10,
    width: 328,
  },
});
